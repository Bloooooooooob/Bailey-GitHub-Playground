const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of each block
const canvasSize = 20; // 20x20 grid

canvas.width = canvasSize * box;
canvas.height = canvasSize * box;

// Snake variables
let snake = [];
let direction = null;
let food;
let specialFood;
let score = 0;
let lives = 3;

// Grace period variables
let inGracePeriod = false;
const gracePeriodDuration = 3000; // milliseconds (3 seconds)
let gracePeriodEndTime;

// Initialize the game
function initializeGame() {
    snake = [{ x: Math.floor(canvasSize / 2) * box, y: Math.floor(canvasSize / 2) * box }];
    direction = null;
    food = {
        x: Math.floor(Math.random() * canvasSize) * box,
        y: Math.floor(Math.random() * canvasSize) * box
    };
    specialFood = {
        x: -box, // Start off-screen
        y: -box, // Start off-screen
        active: false
    };
    document.getElementById("score").textContent = `Score: ${score} | Lives: ${lives}`;
    placeSpecialFood(); // Schedule the special food to appear
}

// Control snake with keyboard arrows
document.addEventListener("keydown", controlSnake);

function controlSnake(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

// Detect collision with the snake itself or walls
function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return (
        newHead.x < 0 || newHead.x >= canvasSize * box || newHead.y < 0 || newHead.y >= canvasSize * box
    );
}

// Function to draw the grid
function drawGrid() {
    ctx.strokeStyle = "#444"; // Color for the grid lines
    for (let i = 0; i < canvasSize; i++) {
        for (let j = 0; j < canvasSize; j++) {
            ctx.strokeRect(i * box, j * box, box, box);
        }
    }
}

// Draw the snake, food, and special food on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the grid first
    drawGrid();

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw regular food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Draw special food
    if (specialFood.active) {
        ctx.fillStyle = "blue";
        ctx.fillRect(specialFood.x, specialFood.y, box, box);
    }

    if (!inGracePeriod) {
        // Snake movement
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        // Create new head
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        // Check if snake collides with itself or walls
        if (collision(newHead, snake)) {
            lives--;
            if (lives <= 0) {
                clearInterval(game);
                alert("Game Over!");
                location.reload();
                return; // Exit the draw function
            } else {
                inGracePeriod = true;
                gracePeriodEndTime = Date.now() + gracePeriodDuration;
                initializeGame(); // Reset game state and restart at center
                return; // Exit the draw function during grace period
            }
        }

        // Check if snake eats the food
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            document.getElementById("score").textContent = `Score: ${score} | Lives: ${lives}`;
            food = {
                x: Math.floor(Math.random() * canvasSize) * box,
                y: Math.floor(Math.random() * canvasSize) * box
            };
        } else {
            snake.pop(); // Remove the tail
        }

        // Check if snake eats the special food
        if (specialFood.active && snakeX === specialFood.x && snakeY === specialFood.y) {
            score += 2; // Special food is worth 2 points
            document.getElementById("score").textContent = `Score: ${score} | Lives: ${lives}`;
            specialFood.active = false; // Deactivate special food
            placeSpecialFood(); // Schedule the next appearance of special food
        }

        snake.unshift(newHead); // Add the new head to the snake
    }

    // Check if grace period has ended
    if (inGracePeriod && Date.now() > gracePeriodEndTime) {
        inGracePeriod = false;
    }
}

// Function to place special food randomly
function placeSpecialFood() {
    if (Math.random() < 0.1) { // 10% chance to place special food each time
        specialFood.x = Math.floor(Math.random() * canvasSize) * box;
        specialFood.y = Math.floor(Math.random() * canvasSize) * box;
        specialFood.active = true;
    }
}

// Speed and game loop
initializeGame(); // Initialize game state before starting the game loop
let game = setInterval(draw, 100);
