from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import io
from PIL import Image
import dehaze  # import your dehazing function from model.py

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origin later as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/dehaze")
async def dehaze_image(file: UploadFile = File(...)):
    # Reading the uploaded image
    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    # Using the dehaze function from the dehaze module (update this as per your implementation)
    dehazed_image = dehaze.dehaze(image)

    # Convert the dehazed image to PNG format in memory
    buf = io.BytesIO()
    dehazed_image.save(buf, format="PNG")
    buf.seek(0)  # Reset buffer position for reading

    # Return the dehazed image as a base64-encoded string
    return {"message": "Success", "data": buf.getvalue().decode("utf-8")}

