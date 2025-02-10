# run_backend.py
from src.services.meeting_facilitator import app

if __name__ == "__main__":
    app.run(debug=True, port=5000)
