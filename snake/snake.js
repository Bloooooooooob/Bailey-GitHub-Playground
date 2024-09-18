// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20; // size of each block
const canvasSize = 20; // 20x20 grid

canvas.width = canvasSize * box;
canvas.height = canvasSize * box;

// Snake variables
let snake = [];
snake[0] = { x: 9 * box, y: 9 * box };

// Initial direction
let direction;

// Food variables
let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box
};

// Score
let score = 0;

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

// Draw snake and food on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lime" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Snake movement
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Check if snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box
        };
    } else {
        snake.pop(); // Remove the tail
    }

    // Create new head
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Game over
    if (collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over!");
        location.reload();
    }

    snake.unshift(newHead); // Add the new head to the snake
}

// Speed and game loop
let game = setInterval(draw, 100);
