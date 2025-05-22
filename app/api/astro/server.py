from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict
from datetime import datetime
import json

app = FastAPI(title="AstroTunes API", description="Generate music based on astrological data")

class AstroData(BaseModel):
    planets: List[Dict[str, str]]
    
class MusicResponse(BaseModel):
    success: bool
    music: Dict[str, str]
    
@app.get("/")
def read_root():
    return {"message": "Welcome to AstroTunes API"}

@app.post("/generate", response_model=MusicResponse)
async def generate_music(data: AstroData):
    try:
        # Example music generation logic (replace with actual implementation)
        music_data = {
            "key": "C",
            "tempo": 120,
            "mood": "harmonic",
            "instruments": ["piano", "violin"]
        }
        
        return MusicResponse(success=True, music=music_data)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Add CORS middleware
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
