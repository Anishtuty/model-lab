// Snake Database Module

// Snake database
const snakeDatabase = [
    {
        id: 1,
        name: "Common Cobra",
        scientific: "Naja naja",
        image: "cobra.jpg",
        venom: "high",
        venomType: "Neurotoxic",
        region: "South Asia",
        antivenom: "Polyvalent, Monovalent",
        description: "Highly venomous snake responsible for many snakebite fatalities in South Asia. Identifiable by its hood when threatened.",
        symptoms: "Ptosis, paralysis, respiratory failure, local pain and swelling",
        ld50: "0.29 mg/kg",
        habitat: "Agricultural areas, forests, near human settlements",
        fatality: "10-20% without treatment"
    },
    {
        id: 2,
        name: "Russell's Viper",
        scientific: "Daboia russelii",
        image: "viper.jpg",
        venom: "high",
        venomType: "Hemotoxic, Cytotoxic",
        region: "South and Southeast Asia",
        antivenom: "Polyvalent",
        description: "Highly venomous viper responsible for most snakebite deaths in India and Southeast Asia.",
        symptoms: "Severe pain, swelling, bleeding disorders, kidney failure",
        ld50: "0.03 mg/kg",
        habitat: "Open grasslands, farmlands, scrub forests",
        fatality: "15-30% without treatment"
    },
    {
        id: 3,
        name: "Green Pit Viper",
        scientific: "Trimeresurus spp.",
        image: "green-pit-viper.jpg",
        venom: "medium",
        venomType: "Cytotoxic, Hemotoxic",
        region: "Southeast Asia",
        antivenom: "Monovalent (region-specific)",
        description: "Arboreal pit viper with excellent camouflage. Bites are painful but rarely fatal with treatment.",
        symptoms: "Severe local pain, swelling, blistering, tissue necrosis",
        ld50: "1.0-2.0 mg/kg",
        habitat: "Trees, shrubs in forests and gardens",
        fatality: "<1% with treatment"
    },
    {
        id: 4,
        name: "Common Krait",
        scientific: "Bungarus caeruleus",
        image: "krait.jpg",
        venom: "high",
        venomType: "Neurotoxic",
        region: "South Asia",
        antivenom: "Polyvalent",
        description: "Nocturnal snake with highly potent neurotoxic venom. Bites often painless but deadly.",
        symptoms: "Abdominal pain, ptosis, paralysis, respiratory failure",
        ld50: "0.09 mg/kg",
        habitat: "Agricultural fields, termite mounds, human dwellings",
        fatality: "70-80% without treatment"
    },
    {
        id: 5,
        name: "Saw-scaled Viper",
        scientific: "Echis carinatus",
        image: "saw-scaled-viper.jpg",
        venom: "high",
        venomType: "Hemotoxic, Cytotoxic",
        region: "Middle East, South Asia, Africa",
        antivenom: "Polyvalent",
        description: "Small but highly aggressive viper responsible for many bites in dry regions.",
        symptoms: "Local swelling, bleeding, necrosis, coagulopathy",
        ld50: "0.24 mg/kg",
        habitat: "Arid regions, rocky areas, dry grasslands",
        fatality: "20% without treatment"
    },
    {
        id: 6,
        name: "King Cobra",
        scientific: "Ophiophagus hannah",
        image: "king-cobra.jpg",
        venom: "high",
        venomType: "Neurotoxic, Cardiotoxic",
        region: "Southeast Asia, India",
        antivenom: "Monovalent",
        description: "World's longest venomous snake. Venom delivery can be very high volume.",
        symptoms: "Severe pain, dizziness, paralysis, cardiac arrest",
        ld50: "1.09 mg/kg",
        habitat: "Forests, bamboo thickets, mangrove swamps",
        fatality: "50-60% without treatment"
    },
    {
        id: 7,
        name: "Black Mamba",
        scientific: "Dendroaspis polylepis",
        image: "black-mamba.jpg",
        venom: "high",
        venomType: "Neurotoxic, Cardiotoxic",
        region: "Sub-Saharan Africa",
        antivenom: "Monovalent",
        description: "Fast, aggressive snake with highly potent neurotoxic venom.",
        symptoms: "Rapid onset paralysis, respiratory failure, cardiac arrest",
        ld50: "0.25 mg/kg",
        habitat: "Savannas, rocky hills, woodlands",
        fatality: "100% without treatment"
    },
    {
        id: 8,
        name: "Copperhead",
        scientific: "Agkistrodon contortrix",
        image: "copperhead.jpg",
        venom: "low",
        venomType: "Hemotoxic",
        region: "North America",
        antivenom: "CroFab, Anavip",
        description: "Pit viper with relatively mild venom. Bites are rarely fatal.",
        symptoms: "Pain, swelling, nausea, tissue damage",
        ld50: "10.9 mg/kg",
        habitat: "Forests, rocky areas, near water",
        fatality: "<0.01%"
    },
    {
        id: 9,
        name: "Green Vine Snake",
        scientific: "Ahaetulla nasuta",
        image: "vine-snake.jpg",
        venom: "low",
        venomType: "Mildly toxic",
        region: "South and Southeast Asia",
        antivenom: "Not required",
        description: "Rear-fanged snake with mild venom harmless to humans.",
        symptoms: "Mild local irritation",
        ld50: "N/A",
        habitat: "Trees, shrubs, gardens",
        fatality: "None"
    },
    {
        id: 10,
        name: "Boa Constrictor",
        scientific: "Boa constrictor",
        image: "boa.jpg",
        venom: "none",
        venomType: "Non-venomous",
        region: "Central and South America",
        antivenom: "Not applicable",
        description: "Large non-venomous snake that kills by constriction.",
        symptoms: "Bite wounds from teeth",
        ld50: "N/A",
        habitat: "Rainforests, semi-arid regions",
        fatality: "None from venom"
    }
];

// Initialize database
function initDatabase() {
    console.log('Initializing snake database...');
    filterSnakesByType('all');
}

// Filter snakes by type
function filterSnakesByType(filter) {
    const snakeGrid = document.getElementById('snakeGrid');
    if (!snakeGrid) return;
    
    snakeGrid.innerHTML = '';
    
    let filteredSnakes = [];
    
    switch(filter) {
        case 'all':
            filteredSnakes = snakeDatabase;
            break;
        case 'venomous':
            filteredSnakes = snakeDatabase.filter(snake => snake.venom !== 'none');
            break;
        case 'high-venom':
            filteredSnakes = snakeDatabase.filter(snake => snake.venom === 'high');
            break;
        case 'non-venomous':
            filteredSnakes = snakeDatabase.filter(snake => snake.venom === 'none');
            break;
        case 'region':
            filteredSnakes = snakeDatabase; // Grouping by region would need additional logic
            break;
        default:
            filteredSnakes = snakeDatabase;
    }
    
    // Display snakes
    filteredSnakes.forEach(snake => {
        const snakeCard = createSnakeCard(snake);
        snakeGrid.appendChild(snakeCard);
    });
}

// Create snake card element
function createSnakeCard(snake) {
    const card = document.createElement('div');
    card.className = 'snake-card';
    card.setAttribute('data-id', snake.id);
    
    // Determine venom class and text
    const venomInfo = getVenomInfo(snake.venom);
    
    card.innerHTML = `
        <img class="snake-image" src="https://via.placeholder.com/300x180/4CAF50/FFFFFF?text=${encodeURIComponent(snake.name)}" alt="${snake.name}">
        <div class="snake-info">
            <div class="snake-name">${snake.name}</div>
            <div class="snake-scientific">${snake.scientific}</div>
            <div class="snake-details">
                <div><strong>Region:</strong> ${snake.region}</div>
                <div><strong>Venom:</strong> ${snake.venomType}</div>
            </div>
            <div class="venom-indicator ${venomInfo.class}">${venomInfo.text}</div>
        </div>
    `;
    
    // Add click event to show details
    card.addEventListener('click', () => {
        // This will call the function from ui.js
        if (typeof window.showSnakeDetails === 'function') {
            window.showSnakeDetails(snake);
        }
    });
    
    return card;
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

// Get snake by ID
function getSnakeById(id) {
    return snakeDatabase.find(snake => snake.id === id);
}

// Get random snake (for demo purposes)
function getRandomSnake() {
    const venomousSnakes = snakeDatabase.filter(snake => snake.venom === 'high' || snake.venom === 'medium');
    return venomousSnakes[Math.floor(Math.random() * venomousSnakes.length)];
}

// Get all snakes
function getAllSnakes() {
    return snakeDatabase;
}

// Get snakes by region
function getSnakesByRegion(region) {
    return snakeDatabase.filter(snake => snake.region.toLowerCase().includes(region.toLowerCase()));
}

// Export functions to global scope
window.filterSnakesByType = filterSnakesByType;
window.getSnakeById = getSnakeById;
window.getRandomSnake = getRandomSnake;
window.getAllSnakes = getAllSnakes;
window.getSnakesByRegion = getSnakesByRegion;