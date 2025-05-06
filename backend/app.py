from flask import Flask, request, jsonify
from flask_cors import CORS
from predict_model import predict_letter

app = Flask(__name__)
CORS(app)  

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    landmarks = data.get("landmarks")

    if not landmarks or len(landmarks) != 63:
        return jsonify({"error": "Expected 63 landmark values"}), 400

    try:
        letter = predict_letter(landmarks)
        return jsonify({"letter": letter})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)