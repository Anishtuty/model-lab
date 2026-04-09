// Analysis Module

// DOM Elements
let analyzeSnakeBtn, analyzeBiteBtn;
let resultsSection, resultTitle, resultSubtitle, severityIndicator;
let speciesName, scientificName, venomType, venomPotency, geographicRegion, antivenomAvailable, fatalityRate;
let recommendationsList, confidenceScore, analysisDate;

// Analysis results templates
const biteSeverityData = {
    high: {
        severity: "High Severity",
        title: "Bite Severity Assessment",
        subtitle: "Potential neurotoxic or hemotoxic envenomation detected",
        characteristics: [
            "Deep fang marks with significant venom deposition",
            "Rapid swelling extending from bite site",
            "Early systemic symptoms detected",
            "Multiple bite marks present",
            "Significant pain reported"
        ],
        recommendations: [
            "THIS IS A MEDICAL EMERGENCY - Call emergency services immediately",
            "Keep victim calm and immobilized",
            "Do not elevate the bitten limb",
            "Remove constrictive items (watches, rings, etc.)",
            "Transport to hospital with antivenom capability",
            "Do not give anything by mouth"
        ]
    },
    medium: {
        severity: "Medium Severity",
        title: "Bite Severity Assessment",
        subtitle: "Local envenomation with potential systemic effects",
        characteristics: [
            "Moderate swelling around bite site",
            "Local tissue damage indicators present",
            "Pain localized to bite area",
            "Two distinct fang marks visible",
            "Mild systemic symptoms possible"
        ],
        recommendations: [
            "Seek medical attention within 2-4 hours",
            "Clean wound with soap and water",
            "Immobilize the affected limb",
            "Monitor for spreading swelling or systemic symptoms",
            "Update tetanus immunization if needed",
            "Avoid traditional remedies or incision"
        ]
    },
    low: {
        severity: "Low Severity",
        title: "Bite Severity Assessment",
        subtitle: "Minimal envenomation or dry bite likely",
        characteristics: [
            "Superficial bite marks",
            "Minimal swelling localized to bite area",
            "No systemic symptoms detected",
            "Possible dry bite (no venom injected)",
            "Pain manageable with basic analgesics"
        ],
        recommendations: [
            "Clean wound thoroughly with soap and water",
            "Apply antiseptic and bandage",
            "Monitor for any delayed symptoms",
            "Seek medical advice within 24 hours",
            "Update tetanus immunization if needed",
            "Watch for signs of infection"
        ]
    }
};

// Initialize analysis module
function initAnalysis() {
    console.log('Initializing analysis module...');
    
    // Get DOM elements
    analyzeSnakeBtn = document.getElementById('analyzeSnakeBtn');
    analyzeBiteBtn = document.getElementById('analyzeBiteBtn');
    
    resultsSection = document.getElementById('results');
    resultTitle = document.getElementById('resultTitle');
    resultSubtitle = document.getElementById('resultSubtitle');
    severityIndicator = document.getElementById('severityIndicator');
    
    speciesName = document.getElementById('speciesName');
    scientificName = document.getElementById('scientificName');
    venomType = document.getElementById('venomType');
    venomPotency = document.getElementById('venomPotency');
    geographicRegion = document.getElementById('geographicRegion');
    antivenomAvailable = document.getElementById('antivenomAvailable');
    fatalityRate = document.getElementById('fatalityRate');
    
    recommendationsList = document.getElementById('recommendationsList');
    confidenceScore = document.getElementById('confidenceScore');
    analysisDate = document.getElementById('analysisDate');
    
    // Set up event listeners
    setupAnalysisEventListeners();
}

// Set up analysis event listeners
function setupAnalysisEventListeners() {
    analyzeSnakeBtn.addEventListener('click', analyzeSnake);
    analyzeBiteBtn.addEventListener('click', analyzeBite);
}

// Analyze snake image
async function analyzeSnake() {
    const snakeImageInput = document.getElementById('snakeImageInput');
    const snakePreviewImage = document.getElementById('snakePreviewImage');
    
    // Check if image is uploaded
    if (!snakeImageInput.files.length && snakePreviewImage.src === '') {
        alert('Please upload or capture a snake image first');
        return;
    }
    
    // Show loading state
    const originalText = analyzeSnakeBtn.innerHTML;
    analyzeSnakeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeSnakeBtn.disabled = true;
    
    try {
        // Simulate API call delay (in production, this would be a real API call)
        await simulateAPICall(1500);
        
        // Get random snake for demo (in production, this would be the actual ML model result)
        const randomSnake = getRandomSnake();
        
        // Update results with snake data
        updateSnakeResults(randomSnake);
        
        // Show results section
        showResultsSection();
        
    } catch (error) {
        console.error('Analysis error:', error);
        alert('Analysis failed. Please try again.');
    } finally {
        // Reset button
        analyzeSnakeBtn.innerHTML = originalText;
        analyzeSnakeBtn.disabled = false;
    }
}

// Analyze bite image
async function analyzeBite() {
    const biteImageInput = document.getElementById('biteImageInput');
    const bitePreviewImage = document.getElementById('bitePreviewImage');
    
    // Check if image is uploaded
    if (!biteImageInput.files.length && bitePreviewImage.src === '') {
        alert('Please upload or capture a bite mark image first');
        return;
    }
    
    // Show loading state
    const originalText = analyzeBiteBtn.innerHTML;
    analyzeBiteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    analyzeBiteBtn.disabled = true;
    
    try {
        // Simulate API call delay
        await simulateAPICall(1500);
        
        // Get random severity and snake for demo
        const severities = ['high', 'medium', 'low'];
        const randomSeverity = severities[Math.floor(Math.random() * severities.length)];
        const randomSnake = getRandomSnake();
        
        // Update results with bite data
        updateBiteResults(randomSeverity, randomSnake);
        
        // Show results section
        showResultsSection();
        
    } catch (error) {
        console.error('Analysis error:', error);
        alert('Analysis failed. Please try again.');
    } finally {
        // Reset button
        analyzeBiteBtn.innerHTML = originalText;
        analyzeBiteBtn.disabled = false;
    }
}

// Simulate API call
function simulateAPICall(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

// Update snake identification results
function updateSnakeResults(snake) {
    // Update basic information
    resultTitle.textContent = "Snake Species Identification";
    resultSubtitle.innerHTML = `Analyzed on <span id="analysisDate">${new Date().toLocaleDateString()}</span> | Confidence: <span id="confidenceScore">${Math.floor(Math.random() * 10) + 90}%</span>`;
    
    // Update snake details
    speciesName.textContent = `${snake.name}`;
    scientificName.textContent = snake.scientific;
    venomType.textContent = snake.venomType;
    venomPotency.textContent = getVenomPotencyText(snake.venom);
    geographicRegion.textContent = snake.region;
    antivenomAvailable.textContent = snake.antivenom;
    fatalityRate.textContent = snake.fatality;
    
    // Update severity indicator
    updateSeverityIndicator(snake.venom);
    
    // Update recommendations
    updateRecommendations(snake.venom, snake.venomType);
    
    // Update verification details for snake identification
    updateVerificationDetails('snake', snake);
}

// Update bite assessment results
function updateBiteResults(severity, snake) {
    // Update basic information
    resultTitle.textContent = "Bite Mark Assessment & Verification";
    resultSubtitle.innerHTML = `Analyzed on <span id="analysisDate">${new Date().toLocaleDateString()}</span> | Confidence: <span id="confidenceScore">${Math.floor(Math.random() * 10) + 85}%</span>`;
    
    // Update snake details
    speciesName.textContent = `${snake.name} (Probable)`;
    scientificName.textContent = snake.scientific;
    venomType.textContent = snake.venomType;
    venomPotency.textContent = getVenomPotencyText(snake.venom);
    geographicRegion.textContent = snake.region;
    antivenomAvailable.textContent = snake.antivenom;
    fatalityRate.textContent = snake.fatality;
    
    // Update severity indicator
    updateSeverityIndicator(severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low');
    
    // Update recommendations
    updateRecommendations(severity === 'high' ? 'high' : severity === 'medium' ? 'medium' : 'low', snake.venomType);
    
    // Update verification details for bite assessment
    updateVerificationDetails('bite', severity, snake);
}

// Get venom potency text
function getVenomPotencyText(venomLevel) {
    switch(venomLevel) {
        case 'high': return 'High';
        case 'medium': return 'Medium';
        case 'low': return 'Low';
        default: return 'None';
    }
}

// Update severity indicator
function updateSeverityIndicator(severity) {
    let severityClass, severityText;
    
    if (severity === 'high') {
        severityClass = 'high-severity';
        severityText = 'High Severity';
    } else if (severity === 'medium') {
        severityClass = 'medium-severity';
        severityText = 'Medium Severity';
    } else {
        severityClass = 'low-severity';
        severityText = 'Low Severity';
    }
    
    severityIndicator.textContent = severityText;
    severityIndicator.className = `severity-indicator ${severityClass}`;
}

// Update recommendations
function updateRecommendations(severity, venomType) {
    recommendationsList.innerHTML = '';
    
    let recommendations = [];
    
    if (severity === 'high') {
        recommendations = [
            "THIS IS A MEDICAL EMERGENCY - Seek help immediately",
            "Keep patient calm and immobilize affected limb",
            "Do not wash bite area (venom samples help ID antivenom)",
            "Remove constrictive items (watches, rings, etc.)",
            "Transport to hospital with ventilator support capability",
            venomType.includes("Neurotoxic") ? "Antivenom required: Neurotoxic-specific antivenom" : "Antivenom required: Hemotoxic/Cytotoxic-specific antivenom",
            venomType.includes("Neurotoxic") ? "Monitor respiratory function - may require ventilation" : "Monitor bleeding and coagulation parameters"
        ];
    } else if (severity === 'medium') {
        recommendations = [
            "Seek medical attention within 2-4 hours",
            "Clean wound with soap and water if not already done",
            "Immobilize the affected limb",
            "Monitor for spreading swelling or systemic symptoms",
            "Update tetanus immunization if needed",
            "Avoid traditional remedies or incision",
            "Watch for signs of compartment syndrome"
        ];
    } else {
        recommendations = [
            "Clean wound thoroughly with soap and water",
            "Apply antiseptic and bandage",
            "Monitor for any delayed symptoms",
            "Seek medical advice within 24 hours",
            "Update tetanus immunization if needed",
            "Watch for signs of infection",
            "Over-the-counter pain relievers if needed"
        ];
    }
    
    recommendations.forEach(rec => {
        const li = document.createElement("li");
        li.textContent = rec;
        recommendationsList.appendChild(li);
    });
}

// Update verification details
function updateVerificationDetails(type, severityOrSnake, snake = null) {
    const verificationSteps = document.querySelector('.verification-steps');
    if (!verificationSteps) return;
    
    verificationSteps.innerHTML = '';
    
    let steps = [];
    
    if (type === 'snake') {
        const snakeData = severityOrSnake;
        steps = [
            { icon: 'fa-check-circle', text: `Confirmed species: ${snakeData.name}` },
            { icon: 'fa-check-circle', text: `Identification confidence: ${Math.floor(Math.random() * 10) + 90}%` },
            { icon: 'fa-check-circle', text: `Venom type: ${snakeData.venomType}` },
            { icon: 'fa-check-circle', text: `Geographic match: Confirmed in ${snakeData.region}` },
            { icon: 'fa-clock', text: 'Analysis completed in 1.2 seconds' }
        ];
    } else {
        const severity = severityOrSnake;
        const biteData = biteSeverityData[severity];
        
        steps = [
            { icon: 'fa-check-circle', text: `Confirmed snakebite: ${Math.floor(Math.random() * 10) + 88}% confidence` },
            { icon: 'fa-check-circle', text: `Severity level: ${biteData.severity}` },
            { icon: 'fa-check-circle', text: biteData.characteristics[0] },
            { icon: 'fa-check-circle', text: biteData.characteristics[1] },
            { icon: 'fa-clock', text: 'Time since bite estimate: 15-45 minutes' }
        ];
    }
    
    steps.forEach(step => {
        const li = document.createElement("li");
        li.innerHTML = `<i class="fas ${step.icon}"></i><span>${step.text}</span>`;
        verificationSteps.appendChild(li);
    });
}

// Show results section
function showResultsSection() {
    if (resultsSection) {
        resultsSection.style.display = 'block';
        
        // Scroll to results section
        setTimeout(() => {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

// Get random snake (helper function)
function getRandomSnake() {
    if (typeof window.getRandomSnake === 'function') {
        return window.getRandomSnake();
    }
    
    // Fallback if database module not loaded
    const venomousSnakes = [
        {
            name: "Common Cobra",
            scientific: "Naja naja",
            venom: "high",
            venomType: "Neurotoxic",
            region: "South Asia",
            antivenom: "Polyvalent, Monovalent",
            fatality: "10-20% without treatment"
        },
        {
            name: "Russell's Viper",
            scientific: "Daboia russelii",
            venom: "high",
            venomType: "Hemotoxic, Cytotoxic",
            region: "South and Southeast Asia",
            antivenom: "Polyvalent",
            fatality: "15-30% without treatment"
        },
        {
            name: "Green Pit Viper",
            scientific: "Trimeresurus spp.",
            venom: "medium",
            venomType: "Cytotoxic, Hemotoxic",
            region: "Southeast Asia",
            antivenom: "Monovalent (region-specific)",
            fatality: "<1% with treatment"
        }
    ];
    
    return venomousSnakes[Math.floor(Math.random() * venomousSnakes.length)];
}
// Add more realistic confidence scores
const getConfidenceScore = (type) => {
    const base = type === 'snake' ? 90 : 85;
    const variation = Math.floor(Math.random() * 10);
    return base + variation;
};

// Add more specific recommendations based on venom type
const getVenomSpecificRecommendations = (venomType) => {
    const recommendations = {
        'Neurotoxic': [
            "Monitor breathing every 5 minutes",
            "Be prepared for artificial ventilation",
            "Keep airway clear and elevated"
        ],
        'Hemotoxic': [
            "Monitor for bleeding from gums/nose",
            "Check blood pressure regularly",
            "Avoid blood thinners (aspirin, ibuprofen)"
        ],
        'Cytotoxic': [
            "Watch for compartment syndrome",
            "Elevate limb to reduce swelling",
            "May require surgical intervention"
        ]
    };
    return recommendations[venomType] || [];
};