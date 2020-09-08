let ship;
let astroids = [];
let lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (let i = 0; i < 5; i++) { 
        astroids.push(new Astroid());
    }
}

function draw() {
    background(0);
    if (keyIsDown(RIGHT_ARROW)) ship.setRotation(0.1);
    if (keyIsDown(LEFT_ARROW)) ship.setRotation(-0.1);
    if (keyIsDown(UP_ARROW)) ship.boosting(true);
    for (let i = 0; i < astroids.length; i++) {
        if (ship.hits(astroids[i])){
            console.log("oops");
        }
        astroids[i].render();
        astroids[i].update();
        astroids[i].edges();
        
    }
    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        if (lasers[i].offScreen()){
            lasers.splice(i, 1);
        } else {
            for (let j = astroids.length - 1; j >= 0; j--){
                if (lasers[i].hits(astroids[j])){
                    if (astroids[j].r > 14){
                        let newAstroids = astroids[j].breakUp();
                        astroids = astroids.concat(newAstroids);
                    } 
                    // console.log(newAstroids);
                    astroids.splice(j, 1);
                    lasers.splice(i, 1);
                    break;
                }
            }
        }
        
        
        
    }
    console.log(lasers.length);
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

}
function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}
function keyPressed(){
    
    // if (keyCode === 68){
    //     ship.setRotation(0.1);
    // } else if (keyCode === 65){
    //     ship.setRotation(-0.1);
    // } else if (keyCode === 87) {
    //     ship.boosting(true);
    // } else 
    if (keyCode === 32){
        lasers.push(new Laser(ship.pos, ship.heading));
    }
}



