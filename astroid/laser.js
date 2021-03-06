class Laser {
    constructor(spos, angle) {
        this.pos = createVector(spos.x, spos.y);
        this.vel = p5.Vector.fromAngle(angle);
        this.vel.mult(10);
    }

    update() {
        this.pos.add(this.vel);
    }
    render() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();

    }

    hits(astroids){
        let d = dist(this.pos.x, this.pos.y, astroids.pos.x, astroids.pos.y);
        if (d < astroids.r){
            return true;
        } else {
            return false;
        }
    }
    offScreen() {
        if (this.pos.x > width || this.pos.x < 0){
            return true;
        } else if (this.pos.y > height || this.pos.y < 0){
            return true;
        }
        return false;
    }
}