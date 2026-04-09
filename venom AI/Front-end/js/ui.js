// UI Handling Module

// DOM Elements
let mobileMenuBtn, navLinks;
let tabBtns, tabContents;
let filterBtns, snakeGrid;
let snakeDetailsModal, modalSnakeDetails, closeModalBtn;
let emergencyBtn, findHospitalBtn, viewAllSnakesBtn;
let identifySnakeBtn, assessBiteBtn, useCameraBtn;
let firstAidBtn, antivenomBtn, hospitalBtn, researchBtn, downloadAppBtn;

// Initialize UI components
function initUI() {
    // Get DOM elements
    mobileMenuBtn = document.getElementById('mobileMenuBtn');
    navLinks = document.getElementById('navLinks');
    
    tabBtns = document.querySelectorAll('.tab-btn');
    tabContents = document.querySelectorAll('.tab-content');
    
    filterBtns = document.querySelectorAll('.filter-btn');
    snakeGrid = document.getElementById('snakeGrid');
    
    snakeDetailsModal = document.getElementById('snakeDetailsModal');
    modalSnakeDetails = document.getElementById('modalSnakeDetails');
    closeModalBtn = document.getElementById('closeModalBtn');
    
    emergencyBtn = document.getElementById('emergencyBtn');
    findHospitalBtn = document.getElementById('findHospitalBtn');
    viewAllSnakesBtn = document.getElementById('viewAllSnakesBtn');
    
    identifySnakeBtn = document.getElementById('identifySnakeBtn');
    assessBiteBtn = document.getElementById('assessBiteBtn');
    useCameraBtn = document.getElementById('useCameraBtn');
    
    firstAidBtn = document.getElementById('firstAidBtn');
    antivenomBtn = document.getElementById('antivenomBtn');
    hospitalBtn = document.getElementById('hospitalBtn');
    researchBtn = document.getElementById('researchBtn');
    downloadAppBtn = document.getElementById('downloadAppBtn');
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up smooth scrolling
    setupSmoothScrolling();
}

// Set up all event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.getAttribute('data-tab')));
    });
    
    // Snake database filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterSnakes(btn.getAttribute('data-filter')));
    });
    
    // Modal close button
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === snakeDetailsModal) {
            closeModal();
        }
    });
    
    // Hero buttons
    identifySnakeBtn.addEventListener('click', () => {
        scrollToSection('analysis');
        switchTab('snake-tab');
    });
    
    assessBiteBtn.addEventListener('click', () => {
        scrollToSection('analysis');
        switchTab('bite-tab');
    });
    
    useCameraBtn.addEventListener('click', () => {
        scrollToSection('analysis');
        // Show camera for snake identification by default
        setAnalysisType('snake');
        showCameraContainer('snake');
    });
    
    // Emergency button
    emergencyBtn.addEventListener('click', showEmergencyGuide);
    
    // Find hospital button
    findHospitalBtn.addEventListener('click', showHospitalLocator);
    
    // View all snakes button
    viewAllSnakesBtn.addEventListener('click', () => {
        scrollToSection('database');
        filterSnakes('all');
    });
    
    // Footer resource buttons
    firstAidBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showFirstAidGuide();
    });
    
    antivenomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showAntivenomDatabase();
    });
    
    hospitalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showHospitalLocator();
    });
    
    researchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showResearchPapers();
    });
    
    downloadAppBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDownloadApp();
    });
}

// Set up smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            scrollToSection(targetId.substring(1));
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Switch between tabs
function switchTab(tabId) {
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
    
    // Show corresponding tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// Filter snakes in database
function filterSnakes(filter) {
    // Update active filter button
    filterBtns.forEach(b => b.classList.remove('active'));
    document.querySelector(`.filter-btn[data-filter="${filter}"]`).classList.add('active');
    
    // Filter snakes (actual filtering logic is in database.js)
    window.filterSnakesByType(filter);
}

// Show snake details in modal
function showSnakeDetails(snake) {
    modalSnakeDetails.innerHTML = generateSnakeModalContent(snake);
    snakeDetailsModal.style.display = 'flex';
}

// Close modal
function closeModal() {
    snakeDetailsModal.style.display = 'none';
}

// Generate snake modal content
function generateSnakeModalContent(snake) {
    // Determine venom class and text
    const venomInfo = getVenomInfo(snake.venom);
    
    return `
        <div>
            <img class="modal-snake-image" src="https://via.placeholder.com/400x300/4CAF50/FFFFFF?text=${encodeURIComponent(snake.name)}" alt="${snake.name}">
            <div class="venom-indicator ${venomInfo.class}" style="margin-top: 15px; text-align: center;">${venomInfo.text}</div>
        </div>
        <div>
            <h3 style="color: var(--primary-dark); margin-bottom: 10px;">${snake.name}</h3>
            <p style="font-style: italic; color: var(--light-text); margin-bottom: 15px;">${snake.scientific}</p>
            
            <p style="margin-bottom: 20px;">${snake.description}</p>
            
            <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Details</h4>
            <ul style="list-style-type: none; margin-bottom: 20px;">
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Venom Type:</strong> ${snake.venomType}</li>
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>LD50:</strong> ${snake.ld50}</li>
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Geographic Region:</strong> ${snake.region}</li>
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Habitat:</strong> ${snake.habitat}</li>
                <li style="padding: 5px 0; border-bottom: 1px solid #eee;"><strong>Antivenom:</strong> ${snake.antivenom}</li>
                <li style="padding: 5px 0;"><strong>Fatality Rate:</strong> ${snake.fatality}</li>
            </ul>
            
            <h4 style="color: var(--primary-dark); margin-bottom: 10px;">Common Symptoms</h4>
            <p style="margin-bottom: 20px;">${snake.symptoms}</p>
            
            <button class="cta-button" style="width: 100%;" onclick="useSnakeForAnalysis(${snake.id})">
                <i class="fas fa-search"></i> Use for Bite Analysis
            </button>
        </div>
    `;
}

// Get venom information
function getVenomInfo(venomLevel) {
    switch(venomLevel) {
        case 'high':
            return { class: 'high-venom', text: 'Highly Venomous' };
        case 'medium':
            return { class: 'medium-venom', text: 'Moderately Venomous' };
        case 'low':
            return { class: 'low-venom', text: 'Mildly Venomous' };
        default:
            return { class: 'low-venom', text: 'Non-Venomous' };
    }
}

// Global function to use snake for analysis
window.useSnakeForAnalysis = function(snakeId) {
    const snake = window.getSnakeById(snakeId);
    if (snake) {
        // Switch to bite assessment tab
        switchTab('bite-tab');
        
        // Scroll to analysis section
        scrollToSection('analysis');
        
        // Close modal
        closeModal();
        
        // Show message
        alert(`Now analyzing bite for ${snake.name}. Please upload or capture a bite mark image.`);
    }
};

// Scroll to section
function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        // Close mobile menu if open
        navLinks.classList.remove('active');
        
        // Scroll to target
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show emergency guide
function showEmergencyGuide() {
    const guide = `
        === SNAKEBITE EMERGENCY PROTOCOL ===
        
        IMMEDIATE ACTIONS:
        1. CALL EMERGENCY SERVICES IMMEDIATELY
        2. Keep victim calm and still
        3. Position bite below heart level
        4. Remove tight clothing/jewelry
        5. Note time of bite and symptoms
        
        DO NOT:
        ✗ Do NOT apply tourniquet
        ✗ Do NOT cut the wound
        ✗ Do NOT attempt to suck venom
        ✗ Do NOT apply ice
        ✗ Do NOT give alcohol/caffeine
        ✗ Do NOT wash bite area (for identification)
        
        IDENTIFICATION:
        • Take photo of snake if SAFE
        • Note color, pattern, size
        • Our AI can identify from photo
        
        SYMPTOMS TO MONITOR:
        • Pain, swelling at bite site
        • Nausea, vomiting, dizziness
        • Difficulty breathing
        • Blurred vision
        • Bleeding from gums/nose
        
        MEDICAL INFORMATION:
        • Antivenom is primary treatment
        • Provide photo to medical team
        • Note time for antivenom administration
        
        Global Emergency: +1-800-SNAKE-AID
        VenomAI Emergency: emergency@venomai.org
    `;
    
    alert(guide);
}

// Show first aid guide
function showFirstAidGuide() {
    const guide = `
        === SNAKEBITE FIRST AID GUIDE ===
        
        STEP 1: IMMEDIATE RESPONSE
        • Move away from snake
        • Call for help immediately
        • Keep victim calm and still
        • Position bite below heart level
        
        STEP 2: BITE MANAGEMENT
        • Remove constrictive items
        • Clean with soap/water if NO venom identification needed
        • Cover with clean, dry dressing
        • Immobilize limb with splint
        
        STEP 3: MONITORING
        • Check breathing every 5 minutes
        • Monitor pulse and consciousness
        • Note time and progression of swelling
        • Watch for systemic symptoms
        
        STEP 4: TRANSPORT
        • Carry victim if possible
        • Keep bite site immobilized
        • Bring snake photo if available
        • Notify hospital en route
        
        VENOM-SPECIFIC GUIDANCE:
        
        NEUROTOXIC (Cobras, Kraits, Mambas):
        • Watch for breathing difficulty
        • Be prepared for CPR
        • Antivenom is critical
        
        HEMOTOXIC (Vipers, Adders):
        • Watch for bleeding
        • Monitor blood pressure
        • Avoid blood thinners
        
        CYTOTOXIC (Some vipers, Pit vipers):
        • Expect severe swelling
        • Watch for tissue damage
        • May require surgery
        
        PREVENTION TIPS:
        • Wear boots in snake areas
        • Use flashlight at night
        • Avoid reaching into hidden areas
        • Learn local snake species
    `;
    
    alert(guide);
}

// Show antivenom database
function showAntivenomDatabase() {
    const database = `
        === GLOBAL ANTIVENOM DATABASE ===
        
        SOUTH ASIA:
        • Polyvalent Antivenom (India)
          - Covers: Cobra, Krait, Russell's viper, Saw-scaled viper
          - Manufacturers: Serum Institute, Bharat Serums
        
        • Monovalent Antivenoms
          - Anti-cobra, Anti-krait, Anti-viper
        
        SOUTHEAST ASIA:
        • Thai Red Cross Antivenoms
          - Monovalent for local species
          - Green pit viper, Malayan pit viper, Cobras
        
        • Indonesian Antivenoms
          - Specific to local species
        
        AFRICA:
        • South African Institute Antivenoms
          - Polyvalent for African snakes
          - Boomslang, Puff adder, Mamba
        
        • North Africa Antivenoms
          - Saw-scaled viper, Horned viper
        
        AUSTRALIA:
        • CSL Antivenoms
          - Specific to Australian species
          - Tiger snake, Brown snake, Taipan, Death adder
        
        AMERICAS:
        • CroFab (North America)
          - Rattlesnakes, Copperheads, Cottonmouths
        
        • Antivipmyn (Latin America)
          - Bothrops, Crotalus species
        
        • Instituto Butantan (Brazil)
          - Local Brazilian species
        
        STORAGE & ADMINISTRATION:
        • Refrigerated storage required
        • Intravenous administration
        • Test for serum sensitivity
        • Multiple vials often needed
        
        ALTERNATIVES:
        • In absence of specific antivenom:
          1. Polyvalent antivenom
          2. Nearest geographic match
          3. Supportive care only
        
        CRITICAL NOTES:
        • Antivenom is species-specific
        • Administer as soon as possible
        • Monitor for allergic reactions
        • May require repeat doses
    `;
    
    alert(database);
}

// Show hospital locator
function showHospitalLocator() {
    alert("Hospital Locator Feature:\n\n1. Based on your location and identified snake species\n2. Finding nearest hospitals with antivenom stocks\n3. Displaying contact information and directions\n4. Showing estimated travel time\n\n(This feature requires GPS permissions and backend integration)");
}

// Show research papers
function showResearchPapers() {
    alert("Research papers section would include:\n\n1. Clinical studies on snakebite treatment\n2. AI/ML models for snake identification\n3. Antivenom efficacy studies\n4. Epidemiology of snakebites globally");
}

// Show download app
function showDownloadApp() {
    alert("Mobile App Features:\n\n1. Offline snake identification\n2. Emergency SOS functionality\n3. GPS-based hospital navigation\n4. Push notifications for updates\n5. First aid video guides\n\nAvailable on iOS App Store and Google Play Store");
}

// Show camera container
function showCameraContainer(type) {
    const container = document.getElementById(`${type}CameraContainer`);
    const previewContainer = document.getElementById(`${type}PreviewContainer`);
    
    if (container && previewContainer) {
        container.style.display = 'flex';
        previewContainer.style.display = 'none';
    }
}

// Hide camera container
function hideCameraContainer(type) {
    const container = document.getElementById(`${type}CameraContainer`);
    if (container) {
        container.style.display = 'none';
    }
}

// Show results section
function showResultsSection() {
    const resultsSection = document.getElementById('results');
    if (resultsSection) {
        resultsSection.style.display = 'block';
        scrollToSection('results');
    }
}

// Update results UI
function updateResultsUI(data) {
    // This function will be called from analysis.js
    // to update the results section with analysis data
    console.log('Updating results UI with:', data);
}