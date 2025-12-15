Commands to Test API Request Backend(in terminal)
ollama --version
ollama pull llama3
ollama run llama3
What is stock market?
new terminal
cd backend
python -m pip install fastapi uvicorn requests
python -m ensurepip --upgrade
python -m pip install --upgrade pip
python -m uvicorn app:app --reload
in chrome open http://127.0.0.1:8000/docs after that to test--> 
{
  "message": "What is the stock market?"
}


Commands to RUN Frontend Gpt interface (inside terminal)
cd "C:\Users\raksh\Downloads\finr1llm-main (1)\finr1llm-main\finchatgpt"
dir and get this file -->  finchatgpt
cd finchatgpt
dir and get this files -->
d-----        13-12-2025     23:22                instance
d-----        13-12-2025     23:22                static
d-----        13-12-2025     23:22                templates
-a----        13-12-2025     23:22           3583 app.py
-a----        13-12-2025     23:22          20480 database.db
-a----        13-12-2025     23:22           2442 financial_model.py
-a----        13-12-2025     23:22            770 models.py
-a----        13-12-2025     23:22             52 requirements.txt
-a----        15-12-2025     12:31            983 router.py
python -m pip install -r requirements.txt
python -m pip install flask flask-login sqlalchemy werkzeug requests
python -m pip install flask_sqlalchemy
(terminal 2) In new terminal--> ollama run llama3.2:1b
and test What is stock market?
and back to (terminal 1) python app.py


 

