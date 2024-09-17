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

// Function to calculate the result
function calculate() {
    const display = document.getElementById('display');
    let expression = display.value;

    // Replace sqrt( with Math.sqrt( for proper evaluation
    expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');

    try {
        // Evaluate the modified expression
        display.value = eval(expression);
    } catch (error) {
        display.value = 'Error';
    }
}
