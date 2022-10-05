title = "incognito";

description = 
`
  PRESS AND HOLD
    TO GAIN SCORE
`;

characters = [];

const G = {
	WIDTH: 201,
	HEIGHT: 204,
	RC: 32
};

/**
 * @typedef {{
 * pos: Vector,
 * co: String
 * }} Box
 */

/**
 * @type { Box [] }
 */
let boxes 

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "dark",
	seed: rndi(1,88)
};

function update() {
	if (!ticks) {
		this.c = [
			"red",
			"light_cyan",
			"green",
			"light_red",
			"blue",
			"light_green",
			"yellow",
			"light_blue",
			"purple",
			"light_yellow",
			"cyan",
			"light_purple",
			"black"
		];
		boxes = times(G.RC*G.RC,(x) =>{
			return {
				pos: vec(8+(6*(x%G.RC)),11+6*(Math.floor(x/G.RC))),
				co: this.c[rndi(0,11)]
			}
		});	
		this.time = 0;
	}
	for (let i = 0; i < G.RC; i++) {
		for (let j = 0; j < G.RC; j++){
			if(score>(i*G.RC+j)){
				color(this.c[12]);
				box(boxes[i*G.RC+j].pos,5);
			}else{
				color(boxes[i*G.RC+j].co);
				box(boxes[i*G.RC+j].pos.x+rndi(-1,1),
					boxes[i*G.RC+j].pos.y+rndi(-1,1),
					5);
			}	
		}
	}
	
	if(input.isPressed){
		if(!(this.time%60)&& ticks>10){
			score++;
			play("select");
			boxes.forEach(element => {
				element.co = this.c[rndi(0,11)];
			});
			this.time = 0;
		}
		this.time++;
	}else{
		this.time = 0;
	}
	if(input.isJustReleased && ticks>10){
		end();
	}
}
