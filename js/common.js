function rand(min, max) { return min + (Math.random() * (max - min)); }
function vec2(x,y) {
	this.x = x;
	this.y = y;
}
function constrain(n, min, max) {
	if ( n < min ) n = min;
	else if ( n > max ) n = max;
	return n;
}
vec2.prototype.add = function(v) {
	this.y += v.y;
	this.x += v.x;
};
vec2.prototype.get = function() {
	return new vec2(this.x, this.y);
};
vec2.prototype.limit = function(max) {
	var mSq = this.magSq();
	if ( mSq > max*max ) {
		this.div(Math.sqrt(mSq));
		this.mult(max);
	}
	return this;
};
vec2.prototype.mult = function(mult) {
	this.x *= mult;
	this.y *= mult;
};
vec2.prototype.sub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
};
vec2.prototype.normalize = function(n) {
	return this.div(this.mag());
};
vec2.prototype.div = function(n) {
	if ( n == 0 ) return;
	this.x /= n;
	this.y /= n;
}
vec2.prototype.mag = function() { return Math.sqrt(this.magSq()); };
vec2.prototype.magSq = function() {
	var x = this.x, y = this.y;
	return (x*x+y*y);
};
Vector = {};
Vector.sub = function(v1, v2) {
	return new vec2(v1.x - v2.x, v1.y - v2.y);
};
Vector.div = function(v, m) {
	var v = new vec2(v.x, v.y);
	v.div(m);
	return v;
};

function Liquid(x,y,w,h,c) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.c = c;
}

Liquid.prototype.render = function(ctx) {
	ctx.fillStyle = '#0dd0fd';
	ctx.fillRect(this.x, this.y, this.w, this.y);
};

function Attractor(loc, mass) {
	this.loc = loc;
	this.mass = mass;
	this.G = 1;
}

Attractor.prototype.attract = function(m) {
	var force = Vector.sub(this.loc, m.pos);

	var distance = force.mag();
	if ( distance < 5 ) distance = 5;
	else if ( distance > 25 ) distance = 25;
	force.normalize();

	var strength = (this.G * this.mass * m.mass) / (distance*distance);
	force.mult(strength);

	return force;
};
Attractor.prototype.render = function(ctx) {
	ctx.beginPath();
	ctx.fillStyle = '#f0f0f0';
	ctx.arc(this.loc.x, this.loc.y, this.mass*2, 0, 2*Math.PI);
	ctx.fill();
};
