var randomsx = [];
var randomsy = [];
var dirs = [];
var maxSpeed = 0.7;
const points = 90;
const maxDist = 250;
function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.parent('container');
	frameRate(60);
	for(var i = 0; i < points; i++) {
		randomsx[i] = random(width);
		randomsy[i] = random(height);
		dirs[i] = floor(random(0, 4));
	}
}

function draw() {
	background(15);
	translate(mouseX*0.01, mouseY*0.01)
	for (var i = 0; i < points; i++) {
		switch (dirs[i]) {
			case 0:
				randomsx[i] += random(maxSpeed);
				randomsy[i] += random(maxSpeed);
				break;
			case 1:
				randomsx[i] += random(maxSpeed);
				randomsy[i] -= random(maxSpeed);
				break;
			case 2:
				randomsx[i] -= random(maxSpeed);
				randomsy[i] += random(maxSpeed);
				break;
			case 3:
				randomsx[i] -= random(maxSpeed);
				randomsy[i] -= random(maxSpeed);
				break;
		}
	}
	for (var i=0; i < points; i++) {
		for (var j=i+1; j < points; j++) {
			var dis = getDist(randomsx[i], randomsy[i], randomsx[j], randomsy[j]);
			if(dis < maxDist) {
				strokeWeight(1);
				stroke(80, 255*(1-dis/maxDist));
				line(randomsx[i], randomsy[i], randomsx[j], randomsy[j]);
			}
		}
	}
	stroke(130);
	strokeWeight(3);
	for (var i = 0; i < points; i++) {
		point(randomsx[i], randomsy[i]);
		if(randomsx[i] > width || randomsx[i] < 0 || randomsy[i] > height || randomsy[i] < 0) {
			var r = floor(random(4));
			if(r == 0) { // il viendra du haut
				randomsx[i] = random(width);
				randomsy[i] = 0;
				dirs[i] = floor(random(2)) == 1 ? 0 : 2; // 1 ou 3
			}
			else if(r == 1) { // il viendra de la gauche
				randomsx[i] = 0
				randomsy[i] = random(height);
				dirs[i] = floor(random(2)) == 1 ? 0 : 1;; // 0 ou 1
			}
			else if(r == 2) { // il viendra de la droite
				randomsx[i] = width;
				randomsy[i] = random(width);
				dirs[i] = floor(random(2)) == 1 ? 2 : 3; // 2 ou 3
			}
			else if(r == 3) { // il viendra du bas
				randomsx[i] = random(width);
				randomsy[i] = height;
				dirs[i] = floor(random(2)) == 1 ? 1 : 3; // 0 ou 2
			}
		}
	}
}

function mouseDragged() {
	strokeWeight(3);
	stroke(250, 250, 250);
	line(mouseX, mouseY, pmouseX, pmouseY);
}

function getDist(x, y, x2, y2) {
	// On récupère la différence entre le plus grand x et le plus petit x pour être sur de ne pas avoir un chiffre négatif
	// on fait pareil pour y
	// Theoreme de pythagore
	var a, b;
	if(x > x2) a = x - x2;
	else a = x2 - x;
	if(y > y2) b = y - y2;
	else b = y2 - y;
	return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}