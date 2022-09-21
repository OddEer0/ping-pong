export class Ball {
   constructor(game, x, y, color, width = 30, height = 30) {
      this.game = game
      this.color = color
      this.width = width
      this.height = height
      this.x = x
      this.y = y
      this.dx = x
      this.dy = y
      this.collisionShape = {x: this.x, y: this.y, widht: this.width, height: this.height}
      this.CD = false

      this.init()
   }

   init() {
      this.draw()
   }

   draw() {
      this.ball = this.game.screen.get("gamelayer").createElem(this.y, this.x, this.width, this.height, "game__ball", this.color)
   }

   move() {
      this.x += this.dx / 100
      this.ball.style.left = `${this.x}px`
      this.y += this.dy / 100
      this.ball.style.top = `${this.y}px`
   }

   spawn() {
      this.x = this.game.screen.get("gamelayer").layer.offsetWidth / 2 - 15
      this.ball.style.left = `${this.x}px`
   }

   update() {
      if (this.y <= 0 || this.y + this.height >= this.game.screen.get("gamelayer").layer.offsetHeight) {
         this.dy *= -1
      }

      if (this.x <= 0) {
         this.game.player2.scorePlus()
         this.spawn()
         this.game.updateScore()
         this.dx *= -1
      }

      if (this.x + this.width >= this.game.screen.get("gamelayer").layer.offsetWidth) {
         this.game.player1.scorePlus()
         this.spawn()
         this.game.updateScore()
         this.dx *= -1
      }

      if (this.game.collider.collides(this, this.game.player1) || this.game.collider.collides(this, this.game.player2)) {
         if (!this.CD) {
            this.dx *= -1
            this.CD = true

            setTimeout(() => {
               this.CD = false
            }, 500)
         }
      }

      this.move()
   }
}