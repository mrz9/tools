var time = 2;
function dot(x,y,vx,vy){
    //接收粒子点的坐标与方向速度量
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    //随机粒子大小
    this.size=Math.ceil(Math.random()*3+2);
    this.ctx={};
  }
    //粒子渲染
  dot.prototype.render = function(ctx) {
    ctx.save();
    this.ctx=ctx;
    this.ctx.beginPath();
    this.ctx.fillStyle='lightgray';
    this.ctx.arc(this.x-this.size/2,this.y-this.size/2,this.size,0,Math.PI*2);
    this.ctx.closePath();
    this.ctx.fill();
    ctx.restore();
  };
    //对当前粒子属性做逻辑计算
  dot.prototype.update = function() {
    this.ctx.clearRect(0,0,canvas.width,canvas.heihgt);
    this.x=this.x+this.vx*time;
    this.y=this.y+this.vy*time;
    this.vx = (this.x < canvas.width && this.x > 0) ? this.vx : (-this.vx);
    this.vy = (this.y < canvas.height && this.y > 0) ? this.vy : (-this.vy);
    this.render(this.ctx);
  };
  