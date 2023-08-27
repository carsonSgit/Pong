import {
	generateRandomNumber,
	generateRandomNegativeNumber,
	generateRandomPositiveNumber
} from './utilities.js';

/**
 * Ball in Pong game.
 */
export default class Ball{
    /**
     * Constructs a pong ball that will collide between paddles and barriers
     * until a point is made.
     * @param {number} x The x-coordinate.
     * @param {number} y The y-coordinate.
     * @param {number} width The ball's width.
     * @param {number} height The ball's height.
     */
    constructor(x, y, width, height, canvasHeight){
        this.x = x;
        this.y = y;
        this.height = width;
        this.width = height;
        this.canvasHeight = canvasHeight;
        this.dx = generateRandomNumber(400,800);
        this.dy = generateRandomNumber(400,800);
        this.sounds = {
			paddleHit: new Audio('./sounds/paddle_hit.wav'),
			wallHit: new Audio('./sounds/wall_hit.wav'),
		};
    }
    /**
     * Resets ball position and velocity.
     * @param {number} x The x-coordinate.
     * @param {number} y The y-coordinate.
     * @param {number} servingPlayer The player who is serving.
     */
    reset(x,y, servingPlayer = 1) {
        this.x = x;
        this.y = y;
        this.dy = generateRandomNumber(400,800);

        if(servingPlayer == 1) {
            this.dx = generateRandomPositiveNumber(400,800);
        }
        else{
            this.dx = generateRandomNegativeNumber(400,800);
        }
    }
    /**
     * Updates ball position and manages ball collisions.
     * @param {number} dt Time since last frame.
     * @param {object} player1 The first player's paddle.
     * @param {object} player2 The second player's paddle.
     */
    update(dt, player1, player2){
        if(this.didCollide(player1) || this.didCollide(player2)){
            this.dx = -this.dx * 1.03;

            // Keep velocity going in the same direction, but randomize it.
			if (this.dy < 0) {
				this.dy = generateRandomNegativeNumber(400, 800);
			}
			else {
				this.dy = generateRandomPositiveNumber(400, 800);
			}
        }
        // ceiling detection
        if(this.y < 0){
            this.dy *= -1;
			this.sounds.wallHit.play();
        }
        // floor detection
        if(this.y > this.canvasHeight-this.height){
            this.dy *=-1;
			this.sounds.wallHit.play();
        }
        // Update position based on velocity.
        this.x += this.dx * dt;
        this.y += this.dy * dt;
    }
    /**
     * Checks if the ball collides with parameter paddle.
     * @param {object} paddle The paddle to check for's collision.
     * @returns {boolean} True if collision happens, otherwise false.
     */
    didCollide(paddle){
        // 1st check: left edge ball right edge paddle
        // 2nd check: right edge ball left edge paddle
        // 3rd check: top edge ball bottom edge paddle
        // 4th check: bottom edge ball top edge paddle
        if (this.x < paddle.x + paddle.width && 
            paddle.x <this.x + this.width &&
            this.y < paddle.y + paddle.height &&
            paddle.y < this.y + this.height){
                this.sounds.paddleHit.play();
                return true;
            }
        return false;
    }

    /**
     * Draw ball
     * @param {object} context 
     */
    render(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }

}