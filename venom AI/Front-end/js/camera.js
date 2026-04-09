// Camera Handling Module

// DOM Elements
let uploadSnakeOption, snakeImageInput, cameraSnakeOption;
let snakeCameraContainer, snakeCameraPreview, captureSnakeBtn, cancelSnakeCameraBtn, snakeCameraCanvas;
let snakePreviewContainer, snakePreviewImage, snakeFileName;

let uploadBiteOption, biteImageInput, cameraBiteOption;
let biteCameraContainer, biteCameraPreview, captureBiteBtn, cancelBiteCameraBtn, biteCameraCanvas;
let bitePreviewContainer, bitePreviewImage, biteFileName;

// Initialize camera module
function initCamera() {
    console.log('Initializing camera module...');
    
    // Get DOM elements
    uploadSnakeOption = document.getElementById('uploadSnakeOption');
    snakeImageInput = document.getElementById('snakeImageInput');
    cameraSnakeOption = document.getElementById('cameraSnakeOption');
    snakeCameraContainer = document.getElementById('snakeCameraContainer');
    snakeCameraPreview = document.getElementById('snakeCameraPreview');
    captureSnakeBtn = document.getElementById('captureSnakeBtn');
    cancelSnakeCameraBtn = document.getElementById('cancelSnakeCameraBtn');
    snakeCameraCanvas = document.getElementById('snakeCameraCanvas');
    snakePreviewContainer = document.getElementById('snakePreviewContainer');
    snakePreviewImage = document.getElementById('snakePreviewImage');
    snakeFileName = document.getElementById('snakeFileName');
    
    uploadBiteOption = document.getElementById('uploadBiteOption');
    biteImageInput = document.getElementById('biteImageInput');
    cameraBiteOption = document.getElementById('cameraBiteOption');
    biteCameraContainer = document.getElementById('biteCameraContainer');
    biteCameraPreview = document.getElementById('biteCameraPreview');
    captureBiteBtn = document.getElementById('captureBiteBtn');
    cancelBiteCameraBtn = document.getElementById('cancelBiteCameraBtn');
    biteCameraCanvas = document.getElementById('biteCameraCanvas');
    bitePreviewContainer = document.getElementById('bitePreviewContainer');
    bitePreviewImage = document.getElementById('bitePreviewImage');
    biteFileName = document.getElementById('biteFileName');
    
    // Set up event listeners
    setupCameraEventListeners();
}

// Set up camera event listeners
function setupCameraEventListeners() {
    // Snake image upload
    uploadSnakeOption.addEventListener('click', () => snakeImageInput.click());
    
    snakeImageInput.addEventListener('change', function() {
        handleImageUpload(this, snakePreviewContainer, snakePreviewImage, snakeFileName);
        hideCameraContainer('snake');
    });
    
    // Snake camera capture
    cameraSnakeOption.addEventListener('click', () => {
        setAnalysisType('snake');
        showCameraContainer('snake');
    });
    
    captureSnakeBtn.addEventListener('click', () => captureImage('snake'));
    cancelSnakeCameraBtn.addEventListener('click', () => {
        hideCameraContainer('snake');
        stopCamera();
    });
    
    // Bite image upload
    uploadBiteOption.addEventListener('click', () => biteImageInput.click());
    
    biteImageInput.addEventListener('change', function() {
        handleImageUpload(this, bitePreviewContainer, bitePreviewImage, biteFileName);
        hideCameraContainer('bite');
    });
    
    // Bite camera capture
    cameraBiteOption.addEventListener('click', () => {
        setAnalysisType('bite');
        showCameraContainer('bite');
    });
    
    captureBiteBtn.addEventListener('click', () => captureImage('bite'));
    cancelBiteCameraBtn.addEventListener('click', () => {
        hideCameraContainer('bite');
        stopCamera();
    });
    
    // Drag and drop functionality
    setupDragAndDrop();
}

// Set up drag and drop
function setupDragAndDrop() {
    // Snake upload area
    uploadSnakeOption.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadSnakeOption.style.borderColor = 'var(--primary-color)';
    });
    
    uploadSnakeOption.addEventListener('dragleave', () => {
        uploadSnakeOption.style.borderColor = '#ddd';
    });
    
    uploadSnakeOption.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadSnakeOption.style.borderColor = '#ddd';
        if (e.dataTransfer.files.length) {
            snakeImageInput.files = e.dataTransfer.files;
            handleImageUpload(snakeImageInput, snakePreviewContainer, snakePreviewImage, snakeFileName);
        }
    });
    
    // Bite upload area
    uploadBiteOption.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBiteOption.style.borderColor = 'var(--primary-color)';
    });
    
    uploadBiteOption.addEventListener('dragleave', () => {
        uploadBiteOption.style.borderColor = '#ddd';
    });
    
    uploadBiteOption.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBiteOption.style.borderColor = '#ddd';
        if (e.dataTransfer.files.length) {
            biteImageInput.files = e.dataTransfer.files;
            handleImageUpload(biteImageInput, bitePreviewContainer, bitePreviewImage, biteFileName);
        }
    });
}

// Handle image upload
function handleImageUpload(input, previewContainer, previewImage, fileNameElement) {
    const file = input.files[0];
    if (file) {
        // Validate file type
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPG, PNG, JPEG)');
            return;
        }
        
        // Validate file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert('File size exceeds 10MB limit. Please upload a smaller image.');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            previewContainer.style.display = 'block';
            fileNameElement.textContent = file.name;
        }
        
        reader.onerror = function() {
            alert('Error reading file. Please try again.');
        }
        
        reader.readAsDataURL(file);
    }
}

// Show camera container
function showCameraContainer(type) {
    let container, preview;
    
    if (type === 'snake') {
        container = snakeCameraContainer;
        preview = snakeCameraPreview;
    } else {
        container = biteCameraContainer;
        preview = biteCameraPreview;
    }
    
    if (container && preview) {
        container.style.display = 'flex';
        startCamera(preview);
    }
}

// Hide camera container
function hideCameraContainer(type) {
    const container = type === 'snake' ? snakeCameraContainer : biteCameraContainer;
    if (container) {
        container.style.display = 'none';
    }
}

// Start camera stream
async function startCamera(videoElement) {
    try {
        // Stop any existing stream
        const currentStream = getCurrentStream();
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
        
        // Get camera stream
        const constraints = {
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        setCurrentStream(stream);
        
        videoElement.srcObject = stream;
        
        // Handle camera errors
        stream.getVideoTracks()[0].onended = function() {
            console.log('Camera stream ended');
            hideCameraContainer(getAnalysisType());
        };
        
    } catch (err) {
        console.error('Error accessing camera:', err);
        
        // User-friendly error messages
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            alert('Camera access was denied. Please allow camera access to use this feature.');
        } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
            alert('No camera found on your device.');
        } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
            alert('Camera is already in use by another application.');
        } else {
            alert('Unable to access camera. Please check permissions and try again.');
        }
        
        hideCameraContainer(getAnalysisType());
    }
}

// Capture image from camera
function captureImage(type) {
    let videoElement, canvasElement, previewContainer, previewImage, fileNameElement;
    
    if (type === 'snake') {
        videoElement = snakeCameraPreview;
        canvasElement = snakeCameraCanvas;
        previewContainer = snakePreviewContainer;
        previewImage = snakePreviewImage;
        fileNameElement = snakeFileName;
    } else {
        videoElement = biteCameraPreview;
        canvasElement = biteCameraCanvas;
        previewContainer = bitePreviewContainer;
        previewImage = bitePreviewImage;
        fileNameElement = biteFileName;
    }
    
    if (!videoElement.srcObject) {
        alert('Camera not ready. Please try again.');
        return;
    }
    
    // Set canvas dimensions to video dimensions
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    
    // Draw video frame to canvas
    const ctx = canvasElement.getContext('2d');
    ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
    
    // Convert canvas to data URL
    const imageData = canvasElement.toDataURL('image/jpeg', 0.9);
    
    // Show preview
    previewImage.src = imageData;
    previewContainer.style.display = 'block';
    fileNameElement.textContent = `camera-capture-${Date.now()}.jpg`;
    
    // Hide camera container
    hideCameraContainer(type);
    
    // Stop camera
    stopCamera();
    
    // Provide feedback
    showCaptureFeedback();
}

// Show capture feedback
function showCaptureFeedback() {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 10px 20px;
        border-radius: var(--radius);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    feedback.innerHTML = `
        <i class="fas fa-check-circle"></i> Image captured successfully
    `;
    
    document.body.appendChild(feedback);
    
    // Remove after 3 seconds
    setTimeout(() => {
        feedback.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 300);
    }, 3000);
}

// Add CSS animations for feedback
if (!document.querySelector('#cameraFeedbackStyles')) {
    const style = document.createElement('style');
    style.id = 'cameraFeedbackStyles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}