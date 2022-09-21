import { Layer } from "./layer.js";
import { Control } from "./control.js";
import { Player } from "./player.js";
import { Collider } from "./collider.js";
import { Ball } from "./ball.js";


export class PingPong {
    constructor(selector, options, width = 100, height = 100) {
        this.selector = selector
        this.options = options
        this.width = width
        this.height = height
        this.start = false
        this.pause = false

        this.screen = new Map([
            ['board', new Layer(this.selector, 1)],
            ['gamelayer', new Layer(this.selector, 2)],
            ['interface', new Layer(this.selector, 3)],
        ])

        this.control1 = new Control([ [this.options.currentOption.up1, "up"], [this.options.currentOption.down1, "down"], [this.options.currentOption.left1, "left"], [this.options.currentOption.right1, "right"] ])
        this.control2 = new Control([ [this.options.currentOption.up2, "up"], [this.options.currentOption.down2, "down"], [this.options.currentOption.left2, "left"], [this.options.currentOption.right2, "right"] ])

        this.player1 = new Player(this, 10, this.screen.get("gamelayer").layer.offsetHeight / 2, this.control1, 'rgb(241, 71, 71)')
        this.player2 = new Player(this, this.screen.get("gamelayer").layer.offsetWidth - 30, this.screen.get("gamelayer").layer.offsetHeight / 2, this.control2, 'rgb(65, 96, 231)')

        this.collider = new Collider()

        this.ball = new Ball(this, this.screen.get("gamelayer").layer.offsetWidth / 2, this.screen.get("gamelayer").layer.offsetHeight / 2, "white", 30, 30)


        this.init()
    }

    init() {
        this.screen.get("board").setBackground("rgb(43, 43, 43)")
        this.screen.get("board").setContent(`<div class="game__board" style="width: ${this.width}%; height: ${this.height}%"></div>`)

        this.nickname1 = this.screen.get("interface").createElem(-35, 5, 150, 30, "game__player-nickname", 'rgb(46, 41, 41)')
        this.nickname2 = this.screen.get("interface").createElem(-35, this.screen.get("interface").layer.offsetWidth - 155, 150, 30, "game__player-nickname", 'rgb(46, 41, 41)')

        this.scoreBoard1 = this.screen.get("interface").createElem(-110, 50, 60, 70, "game__player-score", '#3d3e3f')
        this.scoreBoard2 = this.screen.get("interface").createElem(-110, this.screen.get("interface").layer.offsetWidth - 60 - 50, 60, 70, "game__player-score", '#3d3e3f')

        requestAnimationFrame(time => this.loop(time))
    }

    renderGame() {
        this.player1.score = 0
        this.player2.score = 0
        this.updateScore()
        this.screen.forEach(i => i.layer.classList.add("active"))
        this.screen.get("interface").setText(this.nickname1, this.getNicknameValue('#first-player'))
        this.screen.get("interface").setText(this.nickname2, this.getNicknameValue('#second-player'))
        this.ball.spawn()
        this.player1.spawn()
        this.player2.spawn()

        setTimeout(() => this.start = true, 2000)
    }

    getNicknameValue(selector) {
        const input = document.querySelector(selector)
        if (!input.value) {
            return "player"
        }
        return input.value
    }

    destroyGame() {
        this.start = false
        this.screen.forEach(i => i.layer.classList.remove("active"))
    }

    loop() {
        this.update()

        requestAnimationFrame(time => this.loop(time))
    }

    update() {
        if (this.start && !this.pause) {
            this.player1.update()
            this.player2.update()
            this.ball.update()
        }
    }

    setNewOptions(options1, options2) {
        this.control1.setNewControl(options1)
        this.control2.setNewControl(options2)
    }

    updateScore() {
        this.screen.get("interface").setText(this.scoreBoard1, this.player1.score)
        this.screen.get("interface").setText(this.scoreBoard2, this.player2.score)
    }
}
