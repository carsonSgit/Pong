/**
 * PONG Game
 * Carson Spriggs-Audet
 * 
 * Done as Game Programming assignment for
 * John Abbott College's Computer Science Program
 * 
 * Some code is 
 */


// Import Ball and Paddle classes
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";

// Initialize a canvas and define its properties
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex',1);  // Enable keyboard functionality
// Add canvas to document and set background colour
document.body.appendChild(canvas);
canvas.style.backgroundColor = 'black';

// Custom font...
const myFont = new FontFace('PublicPixel', 'url(./font/public_pixel.ttf)');
myFont.load().then(font => {
    document.fonts.add(font);
})

// Define game variables
let lastTime = 0;
let player1Score = 0;
let player2Score = 0;
const VICTORY_SCORE = 3;
let servingPlayer = 1;
let winningPlayer = 1;

// Initialize Paddles and Ball for game
const player1 = new Paddle(30,30,20,200,CANVAS_HEIGHT);
const player2 = new Paddle(CANVAS_WIDTH- 30,CANVAS_HEIGHT -230, 20, 200, CANVAS_HEIGHT);
const ball = new Ball(CANVAS_WIDTH/2-10, CANVAS_HEIGHT/2-10, 20, 20, CANVAS_HEIGHT);

// Define sound effects
const sounds = {
    score: new Audio('./sounds/score.wav'),
    victory: new Audio('./sounds/victory.wav'),
};

// Set game state
let gameState = "start"; 

// Initialize keys
const keys = {};

// Event listeners to track keypresses
canvas.addEventListener('keydown', event => {
    keys[event.key] = true;
});
canvas.addEventListener('keyup', event => {
    keys[event.key] = false;
});

/**
 * Game loop function.
 * @param {number} [currentTime=0] Time in milliseconds.
 */
function gameLoop(currentTime = 0){
    const dt = (currentTime - lastTime) / 1000;

    update(dt);
    lastTime = currentTime;
    requestAnimationFrame(gameLoop); // built in func for animations
}

/**
 * Update function. Game logic and changes between game states
 * @param {number} dt Time since last frame.
 */
function update(dt) {
    // console.log(keys);
    if(keys.Enter){
        keys.Enter = false;
        // Game state transfers...
        if(gameState === "start"){
            gameState = "serve";
        }
        else if(gameState === "serve"){
            gameState = "play";
        }
        // If someone wins, reset game values
        else if(gameState === "victory"){
            gameState = "serve";
            player1Score = 0;
            player2Score = 0;
            servingPlayer = winningPlayer;

            ball.reset(CANVAS_WIDTH/2-10, CANVAS_HEIGHT/2-10, servingPlayer);
        }
    }
    // ball movement
    if(gameState === "play"){
        ball.update(dt,player1,player2);
        // PONG "AI"
        player2.trackBall(ball.y);

        // player 2 scores
        if(ball.x + ball.width < 0){
            sounds.score.play();
            player2Score++;
            servingPlayer = 2;
            // If player 2 reaches victory score, play sound and set winner
            if(player2Score == VICTORY_SCORE){
                setTimeout(function(){sounds.victory.play()}, 300);
                winningPlayer = 2;
                gameState = "victory";
            }
            // Reset ball to center
            else{
                ball.reset(CANVAS_WIDTH/2-10, CANVAS_HEIGHT/2-10, servingPlayer);
                gameState = "serve";
            }
        }
        // player 1 scores
        else if(ball.x > CANVAS_WIDTH){
            sounds.score.play();
            player1Score++;
            servingPlayer = 1;

            // If player 1 reaches victory score, play sound and set winner
            if(player1Score == VICTORY_SCORE){
                setTimeout(function(){sounds.victory.play()}, 300);
                winningPlayer = 1;
                gameState = "victory";
            }
            // Reset ball to center
            else{
                ball.reset(CANVAS_WIDTH/2-10, CANVAS_HEIGHT/2-10, servingPlayer);
                gameState = "serve";
            }
            
        }
    }
    // Update players position
    player1.update(dt);
    player2.update(dt);

    // p1 movement
    if(keys.w) {
        player1.moveUp();
    }
    else if(keys.s) {
        player1.moveDown();
    }
    else{
        player1.stop();
    }

    // p2 movement
    if(keys.ArrowUp) {
        player2.moveUp();
    }
    else if(keys.ArrowDown) {
        player2.moveDown();
    }
    else{
        player2.stop();
    }

    // Render updated info
    render();
}

/**
 * Render function. Draw game data on canvas.
 */
function render() {
    context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    // Text settings
    context.font = '40px PublicPixel';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    
    // Scores
    context.fillText(player1Score, CANVAS_WIDTH * 0.25, 75);
    context.fillText(player2Score, CANVAS_WIDTH * 0.75, 75);

    // Paddles
    player1.render(context);
    player2.render(context);

    // Ball
    ball.render(context);

    context.font = '35px PublicPixel';

    // Game state texts
    if(gameState == "start"){
        context.fillText(`PONG`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
        context.fillText(`Enter to begin`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4 + 40);
    }
    else if (gameState == "serve") {
		context.fillText(`Player ${servingPlayer}'s serve...`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
		context.fillText(`Hit Enter to serve`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4 + 40);
	}
    else if (gameState == "victory") {
		context.fillText(`Player ${winningPlayer} won!`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4);
		context.fillText(`Press Enter to restart`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 4 + 40);
	}
}

// Starts game loop
gameLoop();

canvas.focus();



