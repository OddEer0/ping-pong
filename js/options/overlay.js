export class Overlay {
    constructor() {
        this.overlay = document.createElement("div")
        this.init()
    }

    init() {
        this.overlay.classList.add('overlay')
        document.body.prepend(this.overlay)
    }

    showOverlay (text) {
        this.overlay.classList.add('show')
        this.overlay.textContent = text
    }

    hideOverlay () {
        this.overlay.classList.remove('show')
    }
}