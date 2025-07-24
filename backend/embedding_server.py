from fastapi import FastAPI
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2')

class EmbeddingRequest(BaseModel):
    text: str

@app.post('/embed')
async def embed(req: EmbeddingRequest):
    embedding = model.encode([req.text])[0].tolist()
    return {"embedding": embedding}