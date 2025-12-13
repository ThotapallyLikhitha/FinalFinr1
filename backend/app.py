from fastapi import FastAPI
import requests

app = FastAPI()

OLLAMA_API = "http://localhost:11434/api/generate"

@app.post("/chat")
async def chat(payload: dict):
    question = payload.get("query", "")

    # If user sends empty question
    if not question:
        return {"response": "Please enter a query."}

    try:
        # Send request to Ollama
        res = requests.post(
            OLLAMA_API,
            json={
                "model": "llama3.2:1b",
                "prompt": question,
                "stream": False
            }
        )

        data = res.json()

        # Return the model output
        return {"response": data.get("response", "No response from model.")}

    except Exception as e:
        return {"error": str(e)}
        

@app.get("/")
async def root():
    return {"status": "Backend Running", "model": "llama3.2:1b"}
