export const  modalStartContent = () => `
    <div class="modal__wrapper">
    <h2 class="modal__main-title">first player nickname</h2>
    <input type="text" class="nickname-input" id="first-player" placeholder="nickname">
    <h2 class="modal__main-title">second player nickname</h2>
    <input type="text" class="nickname-input" id="second-player" placeholder="nickname">
    </div>
`

export const modalOptionsContent = () => `
    <div class="game-options__wrapper">
        <div class="game-options__player">
            <div class="game-options__player-title">Player 1</div>
            <div class="game-options__item-wrapper">
                <div class="game-options__item">
                    <div class="game-options__item-title">Up</div>
                    <div class="game-options__item-input" data-bind="up1"></div>
                </div>
                <div class="game-options__item">
                    <div class="game-options__item-title">Down</div>
                    <div class="game-options__item-input" data-bind="down1"></div>
                </div>
            </div>
                <div class="game-options__item-wrapper">
                <div class="game-options__item">
                    <div class="game-options__item-title">Left</div>
                    <div class="game-options__item-input" data-bind="left1"></div>
                </div>
                <div class="game-options__item">
                    <div class="game-options__item-title">Right</div>
                    <div class="game-options__item-input" data-bind="right1"></div>
                </div>
            </div>
        </div>
            <div class="game-options__player">
            <div class="game-options__player-title">Player 2</div>
            <div class="game-options__item-wrapper">
                <div class="game-options__item">
                    <div class="game-options__item-title">Up</div>
                    <div class="game-options__item-input" data-bind="up2"></div>
                </div>
                <div class="game-options__item">
                    <div class="game-options__item-title">Down</div>
                    <div class="game-options__item-input" data-bind="down2"></div>
                </div>
            </div>
                <div class="game-options__item-wrapper">
                <div class="game-options__item">
                    <div class="game-options__item-title">Left</div>
                    <div class="game-options__item-input" data-bind="left2"></div>
                </div>
                <div class="game-options__item">
                    <div class="game-options__item-title">Right</div>
                    <div class="game-options__item-input" data-bind="right2"></div>
                </div>
            </div>
        </div>
    </div>
`