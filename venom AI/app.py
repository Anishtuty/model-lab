from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np
from PIL import Image
import cv2

app = Flask(__name__)
CORS(app)  # Allow frontend to access

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10MB max

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/health', methods=['GET'])
def health_check():
    """Check if API is running"""
    return jsonify({"status": "healthy", "message": "VenomAI API is running"})

@app.route('/api/identify-snake', methods=['POST'])
def identify_snake():
    """Identify snake species from image"""
    try:
        # Check if image was uploaded
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            # Save the file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Process image (placeholder - replace with ML model)
            # TODO: Add your ML model here
            
            # Simulate analysis for now
            import random
            snake_species = [
                "Common Cobra (Naja naja)",
                "Russell's Viper (Daboia russelii)", 
                "Green Pit Viper (Trimeresurus spp.)",
                "Common Krait (Bungarus caeruleus)"
            ]
            
            venom_types = ["Neurotoxic", "Hemotoxic", "Cytotoxic", "Mixed"]
            regions = ["South Asia", "Southeast Asia", "Africa", "Americas"]
            
            result = {
                'success': True,
                'species': random.choice(snake_species),
                'confidence': round(random.uniform(85.0, 97.5), 1),
                'venom_type': random.choice(venom_types),
                'region': random.choice(regions),
                'antivenom': "Available",
                'recommendations': [
                    "Keep patient calm and immobile",
                    "Do not wash bite area",
                    "Seek medical help immediately"
                ],
                'image_path': filepath
            }
            
            # Clean up (optional)
            # os.remove(filepath)
            
            return jsonify(result)
        
        return jsonify({'error': 'Invalid file type'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analyze-bite', methods=['POST'])
def analyze_bite():
    """Analyze bite mark severity"""
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        location = request.form.get('location', 'Unknown')
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if file and allowed_file(file.filename):
            # Save file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Simulate analysis
            import random
            
            severities = ['high', 'medium', 'low']
            selected_severity = random.choice(severities)
            
            severity_data = {
                'high': {
                    'level': 'High Severity',
                    'description': 'Potential neurotoxic or hemotoxic envenomation',
                    'action_time': 'Immediate (within 30 minutes)'
                },
                'medium': {
                    'level': 'Medium Severity',
                    'description': 'Local envenomation with possible systemic effects',
                    'action_time': 'Within 2-4 hours'
                },
                'low': {
                    'level': 'Low Severity',
                    'description': 'Minimal envenomation or dry bite likely',
                    'action_time': 'Within 24 hours'
                }
            }
            
            result = {
                'success': True,
                'severity': selected_severity,
                'severity_details': severity_data[selected_severity],
                'location': location,
                'confidence': round(random.uniform(80.0, 95.0), 1),
                'recommendations': [
                    "Clean wound with soap and water",
                    "Keep affected area immobilized",
                    f"Seek medical attention {severity_data[selected_severity]['action_time']}"
                ]
            }
            
            return jsonify(result)
        
        return jsonify({'error': 'Invalid file type'}), 400
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/snakes', methods=['GET'])
def get_snakes():
    """Get snake database"""
    # This could connect to a real database
    snakes = [
        {
            'id': 1,
            'name': 'Common Cobra',
            'scientific': 'Naja naja',
            'venom': 'Neurotoxic',
            'region': 'South Asia'
        },
        # Add more snakes...
    ]
    return jsonify({'snakes': snakes})

if __name__ == '__main__':
    print("Starting VenomAI API server...")
    print("API Documentation:")
    print("  GET  /api/health        - Health check")
    print("  POST /api/identify-snake - Identify snake from image")
    print("  POST /api/analyze-bite   - Analyze bite severity")
    print("  GET  /api/snakes        - Get snake database")
    app.run(debug=True, port=5000)