// Number of bits (you can adjust this to have more or fewer bits)
const numBits = 8;

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

// Initialize the calculator
initializeBinaryButtons();
updateDisplay();
