const Walker = ( _ => {
    return class {
        constructor(canvasId){
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d'),
                  width = window.innerWidth,
                  height = window.innerHeight;
            this.ctx = ctx;
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            this.x = width / 2;
            this.y = height / 2;
            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.moveTo(this.x, this.y);
            this.mouse = {x:0,y:0};
            canvas.addEventListener('mousemove', e => {
                this.mouse.x = e.pageX;
                this.mouse.y = e.pageY;
            });
        }
        walk() {
            const r = Math.random();
            const t = rand(0,5);
            if ( r < 0.5 ) {
                if ( r < 0.05 ) this.x+=t;
                else if ( r < 0.10 ) this.x+=t, this.y+=t;
                else if ( r < 0.15 ) this.x+=t, this.y-=t;
                else if ( r < 0.2 ) this.x-=t;
                else if ( r < 0.25 ) this.x-=t, this.y+=t;
                else if ( r < 0.3 ) this.x-=t, this.y-=t;
                else if ( r < 0.35 ) this.y+=t;
                else if ( r < 0.4 ) this.y-=t;
            } else { 
                if ( this.x < this.mouse.x ) this.x+=t;
                else if ( this.x > this.mouse.x ) this.x-=t;
                if ( this.y < this.mouse.y ) this.y+=t;
                else if ( this.y > this.mouse.y ) this.y-=t;
            }
        }
        render() {
            this.walk();
            this.ctx.lineTo(this.x, this.y);
            this.ctx.stroke();
            this.$loopId = window.requestAnimationFrame(_ => this.render());
        }
        toggle() {
            if ( this.$loopId ) window.cancelAnimationFrame(this.$loopId), delete this.$loopId;
            else this.render();
        }
        clear() {
            const ctx = this.ctx;
            console.log(ctx.canvas.width, ctx.canvas.height);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.beginPath();
        }
    };
})();
const walker = new Walker('stage');
walker.render();

const kbdMap = { 83:'s', 67:'c' };
const actionMap = {
    s:() => walker.toggle(),
    c:() => walker.clear()
};
window.addEventListener('keydown', e => {
    const kbdKey = kbdMap[e.keyCode];
    const action = actionMap[kbdKey];
    if (!action) return;
    action();
});
