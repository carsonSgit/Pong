/**
 * Paddle in Pong game
 */
export default class Paddle{
    /**
     * Constructs a new Paddle instance.
     * @param {number} x The x-coordinate of the paddle.
     * @param {number} y The y-coordinate of the paddle.
     * @param {number} width The width of paddle.
     * @param {number} height The height of paddle.
     * @param {number} canvasHeight The height of canvas.
     */
    constructor(x,y, width, height, canvasHeight){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasHeight = canvasHeight;
        this.dy = 0;
        this.maxSpeed = 1000;
    }

    // Move paddle up.
    moveUp(){
        // moving UP is moving negative
        this.dy = -this.maxSpeed;
    }

    // Move paddle down.
    moveDown(){
        this.dy = this.maxSpeed;
    }

    // Stop paddle.
    stop(){
        this.dy = 0;
    }
    
    /**
     * "AI" paddle movement for Single player functionality.
     * Tracks ball position and moves paddle to follow.
     * 
     * Paddle max speed set to low number to allow for it to miss.
     * @param {number} ballY The y-coordinate of the ball.
     */
    trackBall(ballY){
        const paddlePos = this.y + this.height / 2;
        this.maxSpeed = 370;
        
        if (ballY < paddlePos) {
            this.moveUp();
        } else if (ballY > paddlePos) {
            this.moveDown();
        } else {
            this.stop();
        }
    }

    /**
     * Updates paddle according to the DY of the paddle.
     * @param {number} dt Time since last frame.
     */
    update(dt) {
        if(this.dy < 0){
            this.y = Math.max(0, this.y + this.dy * dt);
        }
        else{
            this.y = Math.min(this.canvasHeight - this.height,
                 this.y + this.dy * dt);
        }
    }

    /**
     * Draw the paddle.
     * @param {object} context 
     */
    render(context){
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}