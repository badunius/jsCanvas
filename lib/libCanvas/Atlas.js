export class Atlas {
  constructor() {
    this.list = {}
  }

  load({
    src = '', 
    callback = undefined,
    name = ''
  }) {
    // loading an image from specified url calling a callback afterwards
    // name defaults to a filename (without extension) unless specified explicitly
    
    // failsafe
    if (!src.length) {
      return false
    }

    // defaulting name
    name = name.length > 0
      ? name
      : src.split('/').slice(-1)[0].split('.')[0]

    // creating an instance
    const res = new Image()
    // storing
    this.img[name] = res
    // attaching callback
    if (callback) {
      res.onload = () => { callback(name, res) }
    }
    // fetching
    res.src = src

    // here, have it
    return res
  }

  sprite({
    img = '',
    x = 0, 
    y = 0, 
    w = 1, 
    h = 1
  }) {
    // returns a sprite object

    // retrieving img object by name
    const res = {
      img: this.list[img]
    }

    // de-normalizing x, y, w, h, if they are normalized
    res.x = (x <= 1)
    ? x * res.img.width
    : x
    res.y = (y <= 1)
      ? y * res.img.height
      : y
    
    res.w = (w <= 1)
      ? w * res.img.width
      : w
    res.h = (h <= 1)
      ? h * res.img.height
      : h
    
    return res
  }

  slice({
    img = '',
    gridW = 1,
    gridH = 1
  }) {
    // generates an array of sprite objects by dividing an image
    // resulting sprites are arranged in row->col order
    const res = []
    for (let y = 0; y < gridH; y++) {
      for (let x = 0; x < gridW; x++) {
        res[res.length] = this.sprite({
          img,
          x: x / gridW,
          y: y / gridH,
          w: 1 / gridW,
          h: 1 / gridH
        })
      }
    }
    return res
  }
}