export class Canvas {
  constructor(target) {
    this.canvas = document.createElement('canvas')
    target.appendChild(this.canvas)
    this.ctx = this.canvas.getContext('2d')
    
    // handler
    this.proc = false
    // 
    this.frame = this.frame.bind(this)
  }

  resize({width = undefined, height = undefined}) {
    if (width) {
      this.canvas.width = width
    }
    if (height) {
      this.canvas.height = height
    }
  }

  frame() {
    // single rendering frame
    if (typeof this.proc === 'function') {
      this.proc(this)
    }
  }

  start(ms) {
    // starting render cycle with cpecified interval
    if (this.timer) {
      this.stop()
    }

    this.timer = setInterval(
      this.frame,
      ms
    )
  }

  stop() {
    clearInterval(this.timer)
    this.timer = false
  }

  set render(proc) {
    this.proc = proc
  }

  draw(spt, x, y) {
    // spt is a sprite object obtained by calling Atlas.sprite()
    this.ctx.drawImage(
      spt.img,
      
      spt.x,
      spt.y,
      spt.w, 
      spt.h,

      x,
      y,
      spt.w,
      spt.h
    )
  }

  clear() {
    this.ctx.clearRect(
      0, 
      0, 
      this.canvas.width,
      this.canvas.height
    )
  }
}