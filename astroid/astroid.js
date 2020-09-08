
class Astroid {
    constructor(pos, r) {
        if (pos) {
            this.pos = pos.copy();
        } else {
            this.pos = createVector(random(width), random(height));

        }
        if (r) {
            this.r = r * 0.5;
        } else {
            this.r = random(20, 80);
        }
        this.total = floor(random(5, 15));
        this.offset = [];
        for (let i = 0; i < this.total; i++) {
            this.offset[i] = random(-this.r*0.5, this.r*0.5);
            
        }
        this.vel = p5.Vector.random2D();
        this.ship = new Ship();
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        noFill();
        stroke(255);
        // ellipse(0, 0, this.r * 2);
        beginShape();
        for (let i = 0; i < this.total; i ++) {
            let angle = map(i, 0, this.total, 0, TWO_PI);
            let r = this.r + this.offset[i];
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }
    update() {
        this.pos.add(this.vel);
        this.ship.edges();
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
    breakUp() {
        let newA = [];
        newA[0] = new Astroid(this.pos, this.r);
        newA[1] = new Astroid(this.pos, this.r);
        return newA;

    }
}