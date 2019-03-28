import { GFX } from './libCanvas/index.js'

const PIX_SCALE = 3
let f = 0
const noice = ''
  .padStart(256,'0')
  .split('')
  .map((item, index) => index)
  .sort(() => Math.random() - 0.5)
console.log(noice)

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

gfx.load({
  src: './img/floors.png',
  name: 'floors',
  gridW: 4,
  gridH: 4
})

// setting up a render function
gfx.render = () => {
  f =  f + 1
  gfx.clear()
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      gfx.draw(
        gfx.frame['floors'][
          noice[y * 10 + x] % 4
        ],
        x * 32, 
        y * 32
      )
    }
  }
  /* gfx.draw(
    gfx.frame['char'][f % 3], 
    10, 
    10
  ) */
}

// starting a render cycle with 100ms frame interval
gfx.start(100)