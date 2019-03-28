// Combining Canvas and Atlas into single object
import { Canvas } from './Canvas.js'
import { Atlas } from './Atlas.js'

export class GFX {
  constructor({
    dest,      // DOM destination node
    scale = 1, // pixelation level
  }) {
    // creating canvas
    this.cvs = new Canvas(dest)
    if (scale > 1) {
      this.cvs.canvas.classList.add('crisp')
    }
    // initial resizing
    this.cvs.canvas.width  = window.innerWidth  / scale
    this.cvs.canvas.height = window.innerHeight / scale
    // adding window resize handler
    window.onresize = () => {
      this.cvs.resize({
        width:  window.innerWidth  / scale,
        height: window.innerHeight / scale
      })
    }

    // creating sprite DB
    this.spt = new Atlas()

    // collection of sliced atlases
    this.frame = {}

    console.log('New GFX: %o', this)
  }

  // wrapping canvas start/stop, render
  start(ms = 1) {
    this.cvs.start(ms)
  }

  stop() {
    this.cvs.stop()
  }

  set render(func) {
    this.cvs.render = func
  }

  // wrapping canvas drawing routines
  clear() {
    this.cvs.clear()
  }

  draw(spt, x, y) {
    this.cvs.draw(spt, x, y)
  }

  // wrapping atlas loading routine combined with slice routine
  load({
    name = '',
    src = '',
    gridW = 1,
    gridH = 1,
  }) {
    this.spt.load({
      src,
      name,
      callback: (sptName) => {
        this.frame[sptName] = this.spt.slice({
          img: sptName,
          gridW,
          gridH
        })
      }
    })
  }
}