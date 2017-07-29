const vec2 = _ => {
    return class {
        constructor(x,y) {
	        this.x = x;
	        this.y = y;
        }
        add(v) {
	        this.y += v.y;
	        this.x += v.x;
        }
        get() {
	        return new vec2(this.x, this.y);
        }
        limit (max) {
	        const mSq = this.magSq();
	        if ( mSq > max*max ) {
		        this.div(Math.sqrt(mSq));
		        this.mult(max);
	        }
	        return this;
        }
        mult(mult) {
	        this.x *= mult;
	        this.y *= mult;
        }
        sub(v) {
	        this.x -= v.x;
	        this.y -= v.y;
        }
        normalize (n) {
	        return this.div(this.mag());
        }
        div (n) {
	        if ( n == 0 ) return;
	        this.x /= n;
	        this.y /= n;
        }
        mag() { return Math.sqrt(this.magSq()); }
        magSq () {
	        const x = this.x, y = this.y;
	        return (x*x+y*y);
        }
    };
};
function rand(min, max) { return min + (Math.random() * (max - min)); }
function constrain(n, min, max) {
	if ( n < min ) n = min;
	else if ( n > max ) n = max;
	return n;
}
const Vector = {};
Vector.sub = function(v1, v2) {
	return new vec2(v1.x - v2.x, v1.y - v2.y);
};
Vector.div = function(v, m) {
	var v = new vec2(v.x, v.y);
	v.div(m);
	return v;
};

const Liquid = _ => {
    return class {
        constructor(x,y,w,h,c) {
	        this.x = x;
	        this.y = y;
	        this.w = w;
	        this.h = h;
	        this.c = c;
        }
        render (ctx) {
	        ctx.fillStyle = '#0dd0fd';
	        ctx.fillRect(this.x, this.y, this.w, this.y);
        }
    };
};

const Attractor = _ => {
    return class {
        constructor (loc, mass) {
	        this.loc = loc;
	        this.mass = mass;
	        this.G = 1;
        }

        attract (m) {
	        const force = Vector.sub(this.loc, m.pos);
	        const distance = force.mag();
	        if ( distance < 5 ) distance = 5;
	        else if ( distance > 25 ) distance = 25;
	        force.normalize();

	        const strength = (this.G * this.mass * m.mass) / (distance*distance);
	        force.mult(strength);

	        return force;
        }
        render(ctx) {
	        ctx.beginPath();
	        ctx.fillStyle = '#f0f0f0';
	        ctx.arc(this.loc.x, this.loc.y, this.mass*2, 0, 2*Math.PI);
	        ctx.fill();
        }
    };
};
