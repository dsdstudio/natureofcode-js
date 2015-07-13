function rand(min, max) { return min + (Math.random() * (max - min)); }
function vec2(x,y) {
	this.x = x;
	this.y = y;
}
vec2.prototype.add = function(v) {
	this.y += v.y;
	this.x += v.x;
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
