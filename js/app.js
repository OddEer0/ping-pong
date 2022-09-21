import { Modal } from "./plugin/modal.js";
import { modalStartContent, modalOptionsContent } from "./template.js";
import { Options } from "./options/options.js";
import { PingPong } from "./game/game.js";
import { selector } from "./selector.js";



const modalOptions = new Modal({
    title: 'Game Options',
    content: modalOptionsContent(),
    className: 'game-options',
    closeble() {
        toggleSettings()
        options.setOldOptions()
    },
    buttons: [
        {   text: 'OK',
            type: 'prismary',
            handler() {
                toggleSettings()
                options.setNewOptions()
            }},
        {   text: 'Close',
            type: 'danger',
            handler() {
                toggleSettings()
                options.setOldOptions()
            }},
        {   text: 'Default Options',
            type: 'danger',
            handler() {
                toggleSettings()
                options.setDefaultOptions()
            }},
    ]
})



function toggleSettings() {
    if (modalOptions.modal.classList.contains("open")) {
        modalOptions.close()
        pingpong.pause = false
        gsap.to(selector.settingsIcon, {rotate: 0, duration: 1})
    } else {
        modalOptions.open()
        pingpong.pause = true
        gsap.to(selector.settingsIcon, {rotate: 360, duration: 1})
    }
}


selector.settingsIcon.onclick = toggleSettings



const options = new Options(modalOptions.modal)



const pingpong = new PingPong('body', options)



options.setGame(pingpong)



selector.closeIcon.onclick = closeGame

function closeGame() {
    if (pingpong.start) {
        pingpong.destroyGame()
        gsap.to(selector.closeIcon, {top: -100, scale: 0.5, opacity: 0, duration: 1, zIndex: -1})
    }
}

function showClose() {
    gsap.to(selector.closeIcon, {top: 0, scale: 1, opacity: 1, duration: 1, zIndex: 200})
}



const modalStart = new Modal({
    title: '',
    content: modalStartContent(),
    className: 'game-start',
    buttons: [
        {   text: 'Start',
            type: 'prismary',
            handler() {
                modalStart.close()
                pingpong.renderGame()
                showClose()
        }},
        {   text: 'Close',
            type: 'danger',
            handler() {
                modalStart.close()
        }},
    ]
})



selector.start.addEventListener('click', () => modalStart.open())



window.addEventListener("keydown", (e) => {
    if (e.keyCode === 192) {
        toggleSettings()
    } else if (e.keyCode === 27) {
        if (!pingpong.pause) {
            closeGame()
        }
    }
})