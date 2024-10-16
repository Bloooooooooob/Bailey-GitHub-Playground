function binaryToDecimal(binaryString) {
    return parseInt(binaryString, 2);
}

function decimalToBinary(decimal) {
    return decimal.toString(2);
}

function updateOutputs() {
    const binaryInput = document.getElementById('binaryInput').value;
    const decimalValue = binaryToDecimal(binaryInput);
    const binaryValue = decimalToBinary(decimalValue);
    
    document.getElementById('decimalOutput').textContent = decimalValue;
    document.getElementById('binaryOutput').textContent = binaryValue;
}

function incrementBinary() {
    const binaryInput = document.getElementById('binaryInput').value;
    let decimalValue = binaryToDecimal(binaryInput);
    decimalValue += 1; // Increment by 1
    document.getElementById('binaryInput').value = decimalToBinary(decimalValue);
    updateOutputs();
}

function decrementBinary() {
    const binaryInput = document.getElementById('binaryInput').value;
    let decimalValue = binaryToDecimal(binaryInput);
    decimalValue -= 1; // Decrement by 1
    document.getElementById('binaryInput').value = decimalToBinary(decimalValue);
    updateOutputs();
}

// Initial setup
document.getElementById('binaryInput').addEventListener('input', updateOutputs);
