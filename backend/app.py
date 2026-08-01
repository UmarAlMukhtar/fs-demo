import os

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [frontend_url]
        }
    },
)


@app.get("/")
def home():
    return jsonify(
        message="Flask backend is running"
    )


@app.get("/api/message")
def message():
    return jsonify(
        message="React successfully connected to Flask on Render"
    )


@app.get("/health")
def health():
    return jsonify(
        status="healthy"
    )


if __name__ == "__main__":
    app.run(debug=True)