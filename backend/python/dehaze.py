# import cv2
# import numpy as np
# import sys
# import time
# import requests
# from skimage.metrics import structural_similarity as ssim  # Import SSIM for accuracy calculation

# sys.stdout.reconfigure(encoding="utf-8") 

# def calculate_dark_channel(image, patch_size):
#     """Calculate the dark channel of an image."""
#     min_channel = np.min(image, axis=2)
#     kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (patch_size, patch_size))
#     return cv2.erode(min_channel, kernel)

# def estimate_atmospheric_light(image, dark_channel, top_percent=0.001):
#     """Estimate the atmospheric light in an image."""
#     num_pixels = int(top_percent * dark_channel.size)
#     indices = np.argsort(dark_channel.flatten())[-num_pixels:]
#     return np.max(image.reshape(-1, 3)[indices], axis=0)

# def calculate_transmission_map(image, atmospheric_light, omega, patch_size):
#     """Compute the transmission map of the image."""
#     normalized_image = image / (atmospheric_light + 1e-6)  # Prevent division by zero
#     return 1 - omega * calculate_dark_channel(normalized_image, patch_size)

# def refine_transmission(image, transmission_map, radius=60, eps=1e-3):
#     """Refine the transmission map using guided filtering."""
#     try:
#         gray = cv2.cvtColor((image * 255).astype(np.uint8), cv2.COLOR_BGR2GRAY)
#         guided_filter = cv2.ximgproc.createGuidedFilter(gray, radius, eps)
#         return guided_filter.filter(transmission_map)
#     except Exception as e:
#         print(f"Error refining transmission: {e}")
#         return transmission_map  # Use the unrefined map if refinement fails

# def recover_radiance(image, atmospheric_light, transmission_map, t_min=0.1):
#     """Recover the radiance of the image using the transmission map."""
#     transmission = np.clip(transmission_map, t_min, 1)[:, :, np.newaxis]
#     return np.clip((image - atmospheric_light) / transmission + atmospheric_light, 0, 1)

# def calculate_psnr(original_image, dehazed_image):
#     """Calculate Peak Signal-to-Noise Ratio (PSNR)."""
#     mse = np.mean((original_image - dehazed_image) ** 2)
#     if mse == 0:
#         return float('inf')
#     max_pixel = 255.0
#     return 20 * np.log10(max_pixel / np.sqrt(mse))

# def calculate_accuracy(original_image, dehazed_image):
#     """Calculate accuracy using Structural Similarity Index (SSIM)."""
#     try:
#         # Validate input images
#         if original_image.shape != dehazed_image.shape:
#             print("Error: Image dimensions don't match")
#             return 0
            
#         if original_image.size == 0 or dehazed_image.size == 0:
#             print("Error: Empty image provided")
#             return 0
            
#         # Convert images to grayscale for SSIM calculation
#         original_gray = cv2.cvtColor(original_image.astype(np.uint8), cv2.COLOR_BGR2GRAY)
#         dehazed_gray = cv2.cvtColor(dehazed_image.astype(np.uint8), cv2.COLOR_BGR2GRAY)
        
#         # Compute SSIM score (returns value between 0 and 1)
#         accuracy = ssim(original_gray, dehazed_gray, 
#                        data_range=dehazed_gray.max() - dehazed_gray.min(),
#                        win_size=3)  # You can adjust window size
        
#         # Debug output
#         print(f"SSIM raw value: {accuracy:.4f}")
        
#         return accuracy * 100  # Convert to percentage
        
#     except Exception as e:
#         print(f"Error calculating accuracy: {e}")
#         return 0  # Return 0 if calculation fails

# def remove_haze(image_path, output_path, transmission_path):
#     """Process the image to remove haze and compute performance metrics."""
#     start_time = time.time()  # Start timing

#     try:
#         print(f"Processing image: {image_path}")

#         # Load image and normalize to range [0,1]
#         image = cv2.imread(image_path).astype(np.float32) / 255.0
#         if image is None:
#             raise ValueError("Failed to load image. Check the file path.")

#         print("Image loaded successfully")

#         # Compute dehazing process
#         dark_channel = calculate_dark_channel(image, 15)
#         atmospheric_light = estimate_atmospheric_light(image, dark_channel)
#         transmission_map = calculate_transmission_map(image, atmospheric_light, 0.95, 15)
#         refined_transmission = refine_transmission(image, transmission_map)
#         dehazed_image = recover_radiance(image, atmospheric_light, refined_transmission)

#         # Save the processed images
#         cv2.imwrite(output_path, (dehazed_image * 255).astype(np.uint8))
#         cv2.imwrite(transmission_path, (refined_transmission * 255).astype(np.uint8))

#         print(f"Output saved to: {output_path} and {transmission_path}")

#         # Calculate performance metrics
#         processing_time = time.time() - start_time
#         psnr = calculate_psnr(image * 255, dehazed_image * 255)
#         accuracy = calculate_accuracy(image * 255, dehazed_image * 255)

#         # Send metrics to backend
#         metrics = {
#             "processedImages": 1,
#             "successfulImages": 1,
#             "avgProcessingTime": processing_time,
#             "psnr": psnr,
#             "accuracy": accuracy  # Include accuracy metric
#         }

#         try:
#             response = requests.post("http://localhost:5000/api/metrics", json=metrics)
#             print("Metrics sent to backend:", response.status_code)
#         except Exception as e:
#             print("Failed to send metrics to backend:", e)

#         print("Processing complete")

#     except Exception as e:
#         print("Image processing failed:", str(e))

#         # Send failure metrics to backend
#         metrics = {
#             "processedImages": 0,
#             "successfulImages": 0,
#             "avgProcessingTime": 0,
#             "psnr": 0,
#             "accuracy": 0  # Accuracy is 0 on failure
#         }
#         try:
#             response = requests.post("http://localhost:5000/api/metrics", json=metrics)
#             print("Failure metrics sent to backend:", response.status_code)
#         except Exception as e:
#             print("Failed to send failure metrics to backend:", e)

# if __name__ == "__main__":
#     if len(sys.argv) != 4:
#         print("Usage: python dehaze.py <input_path> <output_path> <transmission_path>")
#         sys.exit(1)

#     input_path, output_path, transmission_path = sys.argv[1], sys.argv[2], sys.argv[3]
#     remove_haze(input_path, output_path, transmission_path)

import cv2
import numpy as np
import sys
import time
import requests
from skimage.metrics import structural_similarity as ssim

sys.stdout.reconfigure(encoding="utf-8")

def calculate_dark_channel(image, patch_size):
    """Calculate dark channel by taking the minimum across RGB channels and applying erosion."""
    min_channel = np.min(image, axis=2)
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (patch_size, patch_size))
    dark_channel = cv2.erode(min_channel, kernel)
    return dark_channel

def estimate_atmospheric_light(image, dark_channel, top_percent=0.001):
    """Estimate the atmospheric light using the brightest pixels in the dark channel."""
    num_pixels = max(1, int(top_percent * dark_channel.size))
    flat_dark = dark_channel.ravel()
    flat_image = image.reshape(-1, 3)

    indices = np.argpartition(flat_dark, -num_pixels)[-num_pixels:]
    return np.max(flat_image[indices], axis=0)

def calculate_transmission_map(image, atmospheric_light, omega=0.95, patch_size=15):
    """Estimate transmission map which represents the thickness of haze/smoke."""
    norm_image = image / (atmospheric_light[np.newaxis, np.newaxis, :] + 1e-8)
    return 1 - omega * calculate_dark_channel(norm_image, patch_size)

def refine_transmission(image, transmission_map, radius=40, eps=1e-3):
    """Refine transmission map using guided filter or fallback edge-preserving filter."""
    try:
        gray = cv2.cvtColor((image * 255).astype(np.uint8), cv2.COLOR_BGR2GRAY)
        guided_filter = cv2.ximgproc.createGuidedFilter(gray, radius, eps)
        return guided_filter.filter(transmission_map)
    except Exception as e:
        print(f"[!] Guided filter failed: {e} — Using edge-preserving fallback.")
        return cv2.edgePreservingFilter(transmission_map.astype(np.float32), flags=1, sigma_s=64, sigma_r=0.2)

def recover_radiance(image, atmospheric_light, transmission_map, t_min=0.1):
    """Restore haze/smoke-free image using atmospheric light and transmission."""
    transmission = np.clip(transmission_map[:, :, np.newaxis], t_min, 1.0)
    radiance = (image - atmospheric_light) / transmission + atmospheric_light
    return np.clip(radiance, 0, 1)

def calculate_psnr(original_image, dehazed_image):
    """Calculate Peak Signal-to-Noise Ratio."""
    mse = np.mean((original_image - dehazed_image) ** 2)
    return float('inf') if mse == 0 else 20 * np.log10(255.0 / np.sqrt(mse))

def calculate_accuracy(original_image, dehazed_image):
    """Compute SSIM score between original and dehazed image."""
    try:
        if original_image.shape != dehazed_image.shape or original_image.size == 0:
            print("Invalid images for SSIM calculation.")
            return 0

        original_gray = cv2.cvtColor(original_image.astype(np.uint8), cv2.COLOR_BGR2GRAY)
        dehazed_gray = cv2.cvtColor(dehazed_image.astype(np.uint8), cv2.COLOR_BGR2GRAY)

        score = ssim(original_gray, dehazed_gray, data_range=255)
        print(f"[+] SSIM: {score:.4f}")
        return score * 100
    except Exception as e:
        print(f"[!] SSIM error: {e}")
        return 0

def remove_smoke_or_haze(image_path, output_path, transmission_path):
    """Main dehazing/desmoking pipeline from loading to metrics upload."""
    start_time = time.time()

    try:
        print(f"[~] Loading image: {image_path}")
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError("Could not load image.")
        image_norm = image.astype(np.float32) / 255.0

        dark_channel = calculate_dark_channel(image_norm, patch_size=15)
        atmospheric_light = estimate_atmospheric_light(image_norm, dark_channel)
        transmission = calculate_transmission_map(image_norm, atmospheric_light)
        refined_trans = refine_transmission(image_norm, transmission)
        dehazed = recover_radiance(image_norm, atmospheric_light, refined_trans)

        # Save results
        cv2.imwrite(output_path, (dehazed * 255).astype(np.uint8))
        cv2.imwrite(transmission_path, (refined_trans * 255).astype(np.uint8))

        processing_time = time.time() - start_time
        psnr = calculate_psnr(image, dehazed * 255)
        accuracy = calculate_accuracy(image, dehazed * 255)

        metrics = {
            "processedImages": 1,
            "successfulImages": 1,
            "avgProcessingTime": processing_time,
            "psnr": psnr,
            "accuracy": accuracy
        }

        try:
            response = requests.post("http://localhost:5000/api/metrics", json=metrics)
            print("[+] Metrics sent:", response.status_code)
        except Exception as e:
            print("[!] Backend send failed:", e)

        print("[✓] Smoke/Haze removal complete.")

    except Exception as e:
        print(f"[x] Error during process: {e}")
        metrics = {
            "processedImages": 0,
            "successfulImages": 0,
            "avgProcessingTime": 0,
            "psnr": 0,
            "accuracy": 0
        }
        try:
            requests.post("http://localhost:5000/api/metrics", json=metrics)
        except:
            pass

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python dehaze.py <input_path> <output_path> <transmission_path>")
        sys.exit(1)

    input_path, output_path, transmission_path = sys.argv[1:]
    remove_smoke_or_haze(input_path, output_path, transmission_path)
