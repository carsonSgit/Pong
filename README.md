# Pong Game Readme
## Contributors
 - Vikram Singh: My teacher who created the base of this game
 - Carson Spriggs-Audet: Accomplished the instructions given to me and added extra functionality.
## Overview

This is a simple implementation of the classic Pong game using HTML, CSS, and JavaScript. The game features two paddles, a ball, and basic game mechanics such as scoring, serving, and victory conditions. 
The code structure includes separate classes for the paddles and the ball, promoting modularity and maintainability.

## How to Play

- **Controls:**
  - Player 1 (Left Paddle): W (Up), S (Down)
  - Player 2 (Right Paddle): Arrow Up (Up), Arrow Down (Down)
  - Start/Serve/Restart: Enter

- **Objective:**
  - Score points by making the ball pass the opponent's paddle.
  - The first player to reach the victory score (default is 3) wins.

## Code Structure

### HTML

- The HTML file (`index.html`) defines the basic structure of the webpage, including the canvas element where the game is rendered.

### JavaScript

#### Main Game Logic (`main.js`)

- **Game Initialization:**
  - Creates a canvas element and sets its properties.
  - Initializes paddles, ball, and game variables.

- **Event Listeners:**
  - Listens for keydown and keyup events to track player input.

- **Game Loop:**
  - The `gameLoop` function serves as the main loop, calling the `update` and `render` functions.

- **Update Function:**
  - Handles game logic, including state transitions, paddle and ball movement, scoring, and victory conditions.

- **Render Function:**
  - Draws the current game state on the canvas, including scores, paddles, ball, and state-specific messages.

- **Paddle Class (`Paddle.js`):**
  - Represents a paddle in the game.
  - Handles paddle movement, AI for single-player mode, and rendering.

- **Ball Class (`Ball.js`):**
  - Represents the game ball.
  - Manages ball movement, collisions with paddles and walls, and rendering.

#### Utilities (`utilities.js`)

- Contains utility functions for generating random numbers used in the ball's initial velocity.

## Additional Features

- **Single Player Mode:**
  - Can be toggled on/off by setting the `singleplayer` variable in `main.js` to `true` or `false`.

- **Custom Font:**
  - Utilizes a custom font ('PublicPixel') for a retro-style aesthetic.

- **Sound Effects:**
  - Plays sound effects for scoring, victory, wall hits, and paddle hits.

## How to Run

1. Download all files.
2. Open the `index.html` file in a modern web browser.

## Acknowledgments

- **Author:** Carson Spriggs-Audet
- **Teacher:** Vikram Singh

This Pong game was developed as a Game Programming assignment based on my teacher Vikram Singh's code.
