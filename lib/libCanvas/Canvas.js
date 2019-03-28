export class Canvas {
  constructor(target) {
    this.canvas = document.createElement('canvas')
    target.appendChild(this.canvas)
    this.__ctx = this.canvas.getContext('2d')
    
    // handler
    this.__proc = false

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
    if (typeof this.__proc === 'function') {
      this.__proc(this)
    }
  }

  start(ms) {
    // starting render cycle with cpecified interval
    if (this.__timer) {
      this.stop()
    }

    this.__timer = setInterval(
      this.frame,
      ms
    )
  }

  stop() {
    clearInterval(this.__timer)
    this.__timer = false
  }

  set render(proc) {
    this.__proc = proc
  }

  draw(spt, x, y) {
    // spt is a sprite object obtained by calling Atlas.sprite()
    this.__ctx.drawImage(
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
    this.__ctx.clearRect(
      0, 
      0, 
      this.canvas.width,
      this.canvas.height
    )
  }
}