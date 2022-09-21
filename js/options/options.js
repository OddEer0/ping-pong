import { Overlay } from "./overlay.js";
import { keyMap, defaultOptions } from "../const.js";

const keyArray = Object.keys(keyMap)

export class Options {
    constructor(optionsMenu) {
        this.optionsModal = optionsMenu

        this.keyBind = new Map([
            ['up1', this.optionsModal.querySelector('[data-bind="up1"]')],
            ['down1', this.optionsModal.querySelector('[data-bind="down1"]')],
            ['left1', this.optionsModal.querySelector('[data-bind="left1"]')],
            ['right1', this.optionsModal.querySelector('[data-bind="right1"]')],
            ['up2', this.optionsModal.querySelector('[data-bind="up2"]')],
            ['down2', this.optionsModal.querySelector('[data-bind="down2"]')],
            ['left2', this.optionsModal.querySelector('[data-bind="left2"]')],
            ['right2', this.optionsModal.querySelector('[data-bind="right2"]')],
        ])

        this.defaultOptions = defaultOptions
        this.currentOption = {...this.defaultOptions}
        this.operativeOption = {...this.defaultOptions}

        this.overlay = new Overlay()

        this.init();
    }

    init() {
        this.currentOption = {...this.defaultOptions}
        this.operativeOption = {...this.defaultOptions}
        this.setOperativeOption()
        this.handler()
    }

    setNewOptions() {
        this.currentOption = {...this.operativeOption}
        this.setOperativeOption()
        this.setOptions()
    }

    setOldOptions() {
        this.operativeOption = {...this.currentOption}
        this.setOperativeOption()
    }

    setDefaultOptions() {
        this.currentOption = {...this.defaultOptions}
        this.operativeOption = {...this.defaultOptions}
        this.setOperativeOption()
        this.setOptions()
    }

    handler() {
        this.optionsModal.addEventListener('click', this.rebind.bind(this))
    }

    rebind(event) {
        this.target = event.target
        if (this.target.dataset.bind) {

            this.target.classList.add('active')
            this.overlay.showOverlay('Нажмите на клавишу')

            window.addEventListener('keydown', (event) => {

                for (let bind in this.operativeOption) {
                    if (event.keyCode === this.operativeOption[bind]) {
                        this.operativeOption[bind] = null
                    }
                }

                this.overlay.hideOverlay()
                this.target.classList.remove('active')

                if (keyArray.includes(String(event.keyCode))) {
                    this.operativeOption[this.target.dataset.bind] = event.keyCode
                } else this.operativeOption[this.target.dataset.bind] = null

                this.setOperativeOption()

            }, { once: true })
        }
    }

    setOperativeOption() {
        this.keyBind.get("up1").innerHTML = keyMap[this.operativeOption.up1] || " "
        this.keyBind.get("down1").innerHTML = keyMap[this.operativeOption.down1] || " "
        this.keyBind.get("left1").innerHTML = keyMap[this.operativeOption.left1] || " "
        this.keyBind.get("right1").innerHTML = keyMap[this.operativeOption.right1] || " "
        this.keyBind.get("up2").innerHTML = keyMap[this.operativeOption.up2] || " "
        this.keyBind.get("down2").innerHTML = keyMap[this.operativeOption.down2] || " "
        this.keyBind.get("left2").innerHTML = keyMap[this.operativeOption.left2] || " "
        this.keyBind.get("right2").innerHTML = keyMap[this.operativeOption.right2] || " "
    }

    setOptions() {
        this.game.setNewOptions([ [this.operativeOption.up1, "up"], [this.operativeOption.down1, "down"], [this.operativeOption.left1, "left"], [this.operativeOption.right1, "right"] ], 
        [ [this.operativeOption.up2, "up"], [this.operativeOption.down2, "down"], [this.operativeOption.left2, "left"], [this.operativeOption.right2, "right"] ]);
    }

    setGame(game) {
        this.game = game
    }
}