import { GFX } from './libCanvas/index.js'

const PIX_SCALE = 4
let f = 0

const gfx = new GFX({
  dest: document.body,
  scale: PIX_SCALE,
})

// loading sprites
gfx.load({
  src: 'https://vxresource.files.wordpress.com/2010/03/vx_chara01_a.png',
  name: 'char',
  gridW: 12,
  gridH: 8
})

// setting up a render function
gfx.render = () => {
  f =  (f + 1) % 3
  gfx.clear()
  gfx.draw(
    gfx.frame['char'][f], 
    10, 
    10
  )
}

// starting a render cycle with 100ms frame interval
gfx.start(100)