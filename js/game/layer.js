export class Layer {
    constructor(selector, zIndex = 1) {
        this.selector = document.querySelector(selector)
        this.zIndex = zIndex

        this.init()
    }

    init() {
        this.layer = this.createLayer(this.selector)
    }

    createLayer(selector) {
        const layer = document.createElement('div')
        layer.classList.add('game__layer')
        selector.prepend(layer)
        layer.style.zIndex = this.zIndex
        return layer
    }

    createRocket(w, h, color, y, x) {
        const rocket = document.createElement('div')
        rocket.classList.add('game__rocket')
        rocket.style.cssText = `
            width: ${w}px; height: ${h}px; background-color: ${color}; left: ${x}px; top: ${y}px
        `
        this.layer.appendChild(rocket)
        return rocket
    }

    createElem(y, x, w = 50, h = 60, className = 'NaC', bg = "gray") {
        const el = document.createElement('div')
        el.classList.add(className)
        el.style.cssText = `
            position: absolute; width: ${w}px; height: ${h}px; background: ${bg}; left: ${x}px; top: ${y}px
        `
        this.layer.appendChild(el)
        return el
    }

    setContent(content) {
        this.layer.insertAdjacentHTML("afterbegin", content)
    }

    setBackground(background, selector = this.layer) {
        selector.style.background = background
    }

    setText(selector, value = "player") {
        selector.textContent = value
    }
}