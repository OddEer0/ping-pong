export class Modal {
    constructor(options) {
        this.options = options
        this.modal = null

        this.init()
    }

    init() {
        this.modal = _renderModal(this.options)
        this.listener()
    }

    open() {
        this.modal.classList.add('open')
    }

    close() {
        this.modal.classList.add('hide')
        this.modal.classList.remove('open')
        setTimeout(() => this.modal.classList.remove('hide'), 300)
    }

    listener() {
        this.modal.addEventListener('click', this.handler.bind(this))
    }

    handler(event) {
        const target = event.target.dataset

        if (target.close === 'true') {
            this.close()
        }
    }

    destroy() {
        this.modal.parentElement.removeChild(this.modal)
        this.modal.removeEventListener('click', this.handler.bind(this))
    }
}



function _renderModal(options) {
    const modal = document.createElement('div')
    modal.classList.add('modal')
    if (options.className) {
        modal.classList.add(options.className)
    }
    modal.insertAdjacentHTML('afterbegin', `
            <div class="modal__overlay" data-close="true"></div>
             <div class="modal__content">
            <div class="modal__header">
                <h2 class="modal__title">${options.title || ''}</h2>
                <span class="modal__close" data-close="true">X</span>
            </div>
            <div class="modal__main">
               ${options.content || ''}
            </div>
            <div class="modal__footer"></div>
        </div>
        `)
    const modalFooter = modal.querySelector('.modal__footer')
    for (let i = 0; i < options.buttons.length; i++) {
        const button = _createButton(options.buttons[i])
        modalFooter.appendChild(button)
    }
    const closes = modal.querySelectorAll('[data-close]')

    closes.forEach(item => {
        if (options.closeble) {
            return  item.onclick = options.closeble
        }
    })

    document.body.prepend(modal)
    return modal
}

function _createButton(options) {
    const button = document.createElement('button')
    button.classList.add('modal__button')
    button.classList.add(`${options.type || 'prismary'}`)
    if (options.className) {
        button.classList.add(options.className)
    }
    button.textContent = options.text || 'NaT'
    button.onclick = options.handler
    return button
}
