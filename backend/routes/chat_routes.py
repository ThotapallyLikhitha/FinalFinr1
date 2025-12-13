from fastapi import APIRouter
from models.finetuned_loader import load_finetuned_model

router = APIRouter()

# Load model once when API starts
model, tokenizer = load_finetuned_model()

@router.post("/")
async def chat(payload: dict):
    prompt = payload["query"]

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=200,
        temperature=0.7,
        do_sample=True
    )

    reply = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": reply}
