import cv2
import numpy as np
import sys
import time
import requests

# Force UTF-8 encoding to avoid Unicode errors in Windows
sys.stdout.reconfigure(encoding='utf-8')

def calculate_dark_channel(image, patch_size):
    min_channel = np.min(image, axis=2)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (patch_size, patch_size))
    return cv2.erode(min_channel, kernel)

def estimate_atmospheric_light(image, dark_channel, top_percent=0.001):
    num_pixels = int(top_percent * dark_channel.size)
    indices = np.argsort(dark_channel.flatten())[-num_pixels:]
    return np.max(image.reshape(-1, 3)[indices], axis=0)

def calculate_transmission_map(image, atmospheric_light, omega, patch_size):
    normalized_image = image / (atmospheric_light + 1e-6)  # Prevent division by zero
    return 1 - omega * calculate_dark_channel(normalized_image, patch_size)

def refine_transmission(image, transmission_map, radius=60, eps=1e-3):
    try:
        gray = cv2.cvtColor((image * 255).astype(np.uint8), cv2.COLOR_BGR2GRAY)
        guided_filter = cv2.ximgproc.createGuidedFilter(gray, radius, eps)
        return guided_filter.filter(transmission_map)
    except Exception as e:
        print(f"Error refining transmission: {e}")
        return transmission_map  # Use the unrefined map if refinement fails

def recover_radiance(image, atmospheric_light, transmission_map, t_min=0.1):
    transmission = np.clip(transmission_map, t_min, 1)[:, :, np.newaxis]
    return np.clip((image - atmospheric_light) / transmission + atmospheric_light, 0, 1)

def calculate_psnr(original_image, dehazed_image):
    mse = np.mean((original_image - dehazed_image) ** 2)
    if mse == 0:
        return float('inf')
    max_pixel = 255.0
    return 20 * np.log10(max_pixel / np.sqrt(mse))

def remove_haze(image_path, output_path, transmission_path):
    start_time = time.time()  # Start timing the process

    try:
        print(f"Processing image: {image_path}")  # Debugging log

        # Load and process the image
        image = cv2.imread(image_path).astype(np.float32) / 255.0
        if image is None:
            raise ValueError("Failed to load image. Please check the file path.")

        print("Image loaded successfully")  # Debugging log

        dark_channel = calculate_dark_channel(image, 15)
        atmospheric_light = estimate_atmospheric_light(image, dark_channel)
        transmission_map = calculate_transmission_map(image, atmospheric_light, 0.95, 15)
        refined_transmission = refine_transmission(image, transmission_map)
        dehazed_image = recover_radiance(image, atmospheric_light, refined_transmission)

        # Save the output images
        cv2.imwrite(output_path, (dehazed_image * 255).astype(np.uint8))
        cv2.imwrite(transmission_path, (refined_transmission * 255).astype(np.uint8))

        print(f"Output saved to: {output_path} and {transmission_path}")  # Debugging log

        # Calculate metrics
        processing_time = time.time() - start_time  # Total processing time
        psnr = calculate_psnr(image * 255, dehazed_image * 255)  # PSNR between original and dehazed image
        success = True  # Assume success unless an exception occurs

        # Prepare metrics to send to the backend
        metrics = {
            "processedImages": 1,  # Increment this for each image processed
            "successfulImages": 1 if success else 0,  # Successful images (1 if no errors)
            "avgProcessingTime": processing_time,  # Time taken for this image
            "psnr": psnr,  # PSNR value
        }

        # Send metrics to the backend (replace with your backend API endpoint)
        try:
            response = requests.post("http://localhost:5000/api/metrics", json=metrics)
            print("Metrics sent to backend:", response.status_code)
        except Exception as e:
            print("Failed to send metrics to backend:", e)

        print("Processing complete")

    except Exception as e:
        print("Image processing failed:", str(e))
        # Send failure metrics to the backend
        metrics = {
            "processedImages": 0,
            "successfulImages": 0,
            "avgProcessingTime": 0,
            "psnr": 0,
        }
        try:
            response = requests.post("http://localhost:5000/api/metrics", json=metrics)
            print("Failure metrics sent to backend:", response.status_code)
        except Exception as e:
            print("Failed to send failure metrics to backend:", e)

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python dehaze.py <input_path> <output_path> <transmission_path>")
        sys.exit(1)

    input_path, output_path, transmission_path = sys.argv[1], sys.argv[2], sys.argv[3]
    remove_haze(input_path, output_path, transmission_path)