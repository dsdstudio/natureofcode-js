function rand(min, max) { return min + (Math.random() * (max - min)); }
function vec2(x,y) {
	this.x = x;
	this.y = y;
}
vec2.prototype.add = function(v) {
	this.y += v.y;
	this.x += v.x;
};
