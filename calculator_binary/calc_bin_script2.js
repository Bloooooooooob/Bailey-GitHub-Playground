// Number of bits (you can adjust this to have more or fewer bits)
const numBits = 10;

// Binary number represented as an array of bits
let binaryArray = new Array(numBits).fill(0);

// Initialize the binary buttons
function initializeBinaryButtons() {
    const binaryButtonsDiv = document.getElementById('binaryButtons');
    binaryButtonsDiv.innerHTML = ''; // Clear any existing buttons

    for (let i = 0; i < numBits; i++) {
        const button = document.createElement('button');
        button.classList.add('binary-button');
        button.textContent = binaryArray[i];
        button.dataset.index = i;
        button.onclick = () => toggleBit(i);
        binaryButtonsDiv.appendChild(button);
    }
}

// Toggle the bit at the given index (switch between 0 and 1)
function toggleBit(index) {
    binaryArray[index] = binaryArray[index] === 0 ? 1 : 0;
    updateDisplay();
}

// Convert binary array to decimal
function binaryToDecimal() {
    return binaryArray.reduce((acc, bit, index) => acc + bit * Math.pow(2, numBits - 1 - index), 0);
}

// Convert decimal to binary array
function decimalToBinary(decimal) {
    let binaryString = decimal.toString(2).padStart(numBits, '0');
    binaryArray = Array.from(binaryString).map(Number); // Update the binary array with new values
}

// Update the display for binary and decimal output
function updateDisplay() {
    // Update binary buttons
    const binaryButtons = document.getElementsByClassName('binary-button');
    for (let i = 0; i < binaryButtons.length; i++) {
        binaryButtons[i].textContent = binaryArray[i];
    }

    // Update binary and decimal outputs
    const binaryString = binaryArray.join('');
    const decimalValue = binaryToDecimal();
    document.getElementById('binaryOutput').textContent = binaryString;
    document.getElementById('decimalOutput').textContent = decimalValue;
}

// Increment the binary number by 1
function incrementByOne() {
    let decimalValue = binaryToDecimal();
    decimalValue += 1; // Increment the decimal value by 1
    if (decimalValue >= Math.pow(2, numBits)) {
        decimalValue = Math.pow(2, numBits) - 1; // Cap to the maximum possible value for the number of bits
    }
    decimalToBinary(decimalValue);
    updateDisplay();
}

// Decrement the binary number by 1
function decrementByOne() {
    let decimalValue = binaryToDecimal();
    decimalValue -= 1; // Decrement the decimal value by 1
    if (decimalValue < 0) {
        decimalValue = 0; // Cap to 0 as the minimum value
    }
    decimalToBinary(decimalValue);
    updateDisplay();
}

// Initialize the calculator
initializeBinaryButtons();
updateDisplay();

// List of predefined colors (or you can generate them randomly)
const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF', '#33FFD1', '#FFD133', '#D1FF33'];

function initializeBinaryButtons() {
    const binaryButtonsDiv = document.getElementById('binaryButtons');
    binaryButtonsDiv.innerHTML = ''; // Clear any existing buttons

    for (let i = 0; i < numBits; i++) {
        const button = document.createElement('button');
        button.classList.add('binary-button');
        button.textContent = binaryArray[i];
        button.dataset.index = i;
        button.onclick = () => toggleBit(i);

        // Set the background color from the colors array
        button.style.backgroundColor = colors[i % colors.length]; // Loops through the colors array
        binaryButtonsDiv.appendChild(button);
    }
}
