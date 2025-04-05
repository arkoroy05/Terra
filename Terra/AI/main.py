from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from google import genai
from PIL import Image
from pydantic import BaseModel, Field
import os
import json
import tempfile
from dotenv import load_dotenv

# Load environment variables from .env file
# load_dotenv()

# Fetch API key from environment variable for production purposes
GEMINI_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GEMINI_API_KEY:
    raise Exception("GOOGLE_API_KEY not found in environment variables")

# os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY
client = genai.Client(api_key=GEMINI_API_KEY)

# Define output schema using pydantic
class Output(BaseModel):
    Type: str = Field(
        description="The type of electronic waste as High Hazard, Medium Hazard or Low Hazard"
    )
    Intro: str = Field(
        description="Introduction about the type of e-waste"
    )
    Tags: str = Field(
        description="Tags to identify the electronic waste"
    )
    Information: str = Field(
        description="Trivia about the e-waste"
    )
    Instructions: str = Field(
        description="Instructions to dispose the electronic waste"
    )

def identify_ewaste(image_path: str, location: str = "default location"):
    """
    Analyzes the image to determine the type of electronic waste and returns disposal instructions.
    """
    try:
        img = Image.open(image_path)
    except Exception as e:
        raise Exception(f"Error opening image: {e}")
    
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[
            f"What type of electronic waste (High Hazard, Medium Hazard or Low Hazard) is in this image and give introduction about the type of e-waste. Also give 3-4 creative tags like for e.g. High Hazardus, Lithium ion etc. and at last give 3 trivia points about the e-waste with short headings and give instructions to dispose the type of e-waste based on the {location}",
            img
        ],
        config={
            "response_mime_type": "application/json",
            "response_schema": Output
        }
    )
    result = response.text
    try:
        result_json = json.loads(result)
    except Exception as e:
        raise Exception(f"Error parsing JSON response: {e}")
    return result_json

app = FastAPI(title="Electronic Waste Identification API")

@app.post("/identify_ewaste")
async def identify_ewaste_endpoint(file: UploadFile = File(...), location: str = "default location"):
    """
    Accepts an image file and an optional location parameter. Returns the electronic waste classification,
    disposal instructions, and creative tags.
    """
    # Save the uploaded file to a temporary file
    try:
        suffix = os.path.splitext(file.filename)[1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {e}")

    try:
        result_json = identify_ewaste(tmp_path, location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Clean up the temporary file
        os.remove(tmp_path)
    
    return JSONResponse(content=result_json)

# For running the API with "uvicorn main:app"
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
