// Main JavaScript File - Initializes and coordinates all modules

// Global variables
let currentStream = null;
let currentAnalysisType = null; // 'snake' or 'bite'

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('VenomAI Pro - Snakebite Diagnosis System Initializing...');
    
    // Initialize all modules
    initUI();
    initDatabase();
    initCamera();
    initAnalysis();
    
    // Set current date
    document.getElementById('analysisDate').textContent = new Date().toLocaleDateString();
    
    // Handle page load with hash
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }
    
    console.log('Application initialized successfully');
});

// Stop camera when page is hidden
document.addEventListener('visibilitychange', function() {
    if (document.hidden && currentStream) {
        stopCamera();
    }
});

// Stop camera when window is closed
window.addEventListener('beforeunload', function() {
    stopCamera();
});

// Global camera control function
function stopCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
        currentStream = null;
    }
}

// Global function to set current stream
function setCurrentStream(stream) {
    currentStream = stream;
}

// Global function to get current stream
function getCurrentStream() {
    return currentStream;
}

// Global function to set analysis type
function setAnalysisType(type) {
    currentAnalysisType = type;
}

// Global function to get analysis type
function getAnalysisType() {
    return currentAnalysisType;
}