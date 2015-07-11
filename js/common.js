function rand(min, max) { return min + (Math.random() * (max - min)); }
function PVector(x,y) {
	this.x = x;
	this.y = y;
}
PVector.prototype.add = function(v) {
	this.y = this.y + v.y;
	this.x = this.x + v.x;
};
