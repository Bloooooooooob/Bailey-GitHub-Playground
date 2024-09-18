// Total number of bits (8 bits each for Red, Green, and Blue)
const numBits = 24; 

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

// Convert a binary array slice to decimal (for each color channel)
function binarySliceToDecimal(start, end) {
    return binaryArray.slice(start, end).reduce((acc, bit, index) => acc + bit * Math.pow(2, end - start - 1 - index), 0);
}

// Update the display for binary, RGB, and the color box
function updateDisplay() {
    // Update binary buttons
    const binaryButtons = document.getElementsByClassName('binary-button');
    for (let i = 0; i < binaryButtons.length; i++) {
        binaryButtons[i].textContent = binaryArray[i];
    }

    // Update binary output
    const binaryString = binaryArray.join('');
    document.getElementById('binaryOutput').textContent = binaryString;

    // Convert the binary values to RGB
    const red = binarySliceToDecimal(0, 8);    // First 8 bits for Red
    const green = binarySliceToDecimal(8, 16); // Next 8 bits for Green
    const blue = binarySliceToDecimal(16, 24); // Last 8 bits for Blue

    // Update RGB output
    const rgbString = `(${red}, ${green}, ${blue})`;
    document.getElementById('rgbOutput').textContent = rgbString;

    // Update the color display
    document.getElementById('colorDisplay').style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}

// Increment the binary number by 1
function incrementByOne() {
    let decimalValue = parseInt(binaryArray.join(''), 2); // Convert binary array to decimal
    decimalValue += 1; // Increment by 1
    if (decimalValue >= Math.pow(2, numBits)) {
        decimalValue = Math.pow(2, numBits) - 1; // Cap at the maximum value for 24 bits
    }
    decimalToBinary(decimalValue);
    updateDisplay();
}

// Decrement the binary number by 1
function decrementByOne() {
    let decimalValue = parseInt(binaryArray.join(''), 2); // Convert binary array to decimal
    decimalValue -= 1; // Decrement by 1
    if (decimalValue < 0) {
        decimalValue = 0; // Minimum value is 0
    }
    decimalToBinary(decimalValue);
    updateDisplay();
}

// Convert decimal number to binary array
function decimalToBinary(decimal) {
    let binaryString = decimal.toString(2).padStart(numBits, '0');
    binaryArray = Array.from(binaryString).map(Number); // Update the binary array with new values
}

// Initialize the calculator
initializeBinaryButtons();
updateDisplay();
