export class Player {
    constructor(game, x, y, control, color, width = 20, height = 70) {
        this.game = game
        this.color = color
        this.control = control
        this.width = width
        this.height = height
        this.x = x
        this.y = y - height / 2
        this.spawnPointX = this.x
        this.spawnPointY = this.y
        this.score = 0

      this.init()
    }

    init() {
        this.rocket = this.game.screen.get("gamelayer").createRocket(this.width, this.height, this.color, this.y, this.x)
    }

    spawn() {
        this.x = this.spawnPointX
        this.y = this.spawnPointY
        this.rocket.style.top = `${this.y}px`
        this.rocket.style.left = `${this.x}px`
    }

    update() {
        if (this.control.up) {
            if (this.y > 5) {
                this.y -= 3
                this.rocket.style.top = `${this.y}px`
            }
        } else if (this.control.down) {
            if (this.y < this.game.screen.get("board").layer.offsetHeight - 75) {
                this.y += 3
                this.rocket.style.top = `${this.y}px`
            }
        }

        if (this.control.left) {
            if (this.x > 9) {
                this.x -= 3
                this.rocket.style.left = `${this.x}px`
            }
        } else if (this.control.right) {
            if (this.x < this.game.screen.get("board").layer.offsetWidth - 31) {
                this.x += 3
                this.rocket.style.left = `${this.x}px`
            }
        }
    }

    setBackground(bg) {
        this.rocket.style.background = bg
    }

    scorePlus() {
        this.score++
    }
}