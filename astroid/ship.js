class Ship {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.r = 20;
        this.heading = 0;
        this.rotation = 0;
        this.vel = createVector(0, 0);
        this.isBoosting = false;

    }
    boosting(b){
        this.isBoosting = b;
    }
    render() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.heading + PI/2);
        fill(0);
        // noFill();
        stroke(255);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
        
    }
    hits(astroids) {
        let d = dist(this.pos.x, this.pos.y, astroids.pos.x, astroids.pos.y);
        if (d < this.r + astroids.r){
            return true;
        } else {
            return false;
        }
    }
    turn() {
        this.heading += this.rotation;
        
    }
    setRotation(a) {
        this.rotation = a;
    }
    update() {
        if (this.isBoosting){
            this.boost();
        }
        this.pos.add(this.vel);
        this.vel.mult(0.99);
    }
    boost() {
        let force = p5.Vector.fromAngle(this.heading);
        force.mult(0.1);
        this.vel.add(force);
    }
    edges() {
        if (this.pos.x > width + this.r){
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r){
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r){
            this.pos.y = -this.r;

        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
}