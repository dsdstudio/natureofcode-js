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
	if (this.x > max) this.x = 10;
	if (this.y > max) this.y = 10;
};
