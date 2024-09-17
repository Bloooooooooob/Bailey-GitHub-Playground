// Function to append a value to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

// Function to clear the display
function clearDisplay() {
    document.getElementById('display').value = '';
}

// Function to delete the last character from the display
function deleteLast() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// Function to append square root and manage parentheses
function appendSquareRoot() {
    const display = document.getElementById('display');
    let currentValue = display.value;

    // Ensure any existing unclosed Math.sqrt( is closed properly
    if (currentValue.endsWith('sqrt(')) {
        display.value += ')';
        return;
    }

    // Use a regular expression to capture the last number or expression
    const match = currentValue.match(/(\d+\.?\d*)$/);

    if (match) {
        // If there's a number, wrap it in Math.sqrt()
        const number = match[0];
        display.value = currentValue.replace(number, `Math.sqrt(${number})`);
    } else {
        // If no number, just append Math.sqrt(
        display.value += 'Math.sqrt(';
    }
}

// Function to calculate the result
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;

    try {
        // Evaluate the expression
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}
