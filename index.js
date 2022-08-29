// Restart at 1:03:30 min
// https://www.youtube.com/watch?v=vyqbNFMDRGQ
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

// fillRect(x, y, width, height)
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({ position, velocity, color = "red" }) {
      this.position = position;
      this.velocity = velocity;
      this.width = 50;
      this.height = 150;
      this.lastKey;
      this.attackBox = {
        position: this.position,
        width: 100,
        height: 50,
      }
      this.color = color;
      this.isAttacking;
    }

    draw() {
      // player
      c.fillStyle = this.color;
      c.fillRect(this.position.x, this.position.y, this.width, this.height)

      // attack box
      if (this.isAttacking) {
        c.fillStyle = "green";
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
      }
    }

    update() {
      this.draw();

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        this.velocity.y = 0;
      } else {
        this.velocity.y += gravity;
      }
    }

    attack() {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, 100);
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: "blue"
})

console.log(player);

const keys = {
  q: {
    pressed: false
  },
  d: {
    pressed: false
  },
  z: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowUp: {
    pressed: false
  }
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Player movement
    if (keys.q.pressed && player.lastKey === "q") {
      player.velocity.x = -5;
    } else if (keys.d.pressed && player.lastKey === "d") {
      player.velocity.x = 5;
    }

    // Enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
      enemy.velocity.x = 5;
    }

    // Detect for collision
    if (
        player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
        player.attackBox.position.x <= enemy.position.x + enemy.width &&
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
        player.attackBox.position.y <= enemy.position.y + enemy.height &&
        player.isAttacking
      ) {
        player.isAttacking = false;
      console.log("Touch the enemy");
    } else {

    }
}

animate();

// Moving player and enemy with the keyboard
window.addEventListener("keydown", (event) => {
  console.log(event.key);
  switch (event.key) {
    // Player keys
    case "d":
      keys.d.pressed = true;
      player.lastKey = "d";
      break;
    case "q":
      keys.q.pressed = true;
      player.lastKey = "q";
      break;
    case "z":
      player.velocity.y = -20;
      break;
    case " ":
      player.attack();
      break;
    // Enemy keys
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight"
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
      enemy.velocity.y = -20;
      break;
  }
})

window.addEventListener("keyup", (event) => {
  // Player keys
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "q":
      keys.q.pressed = false;
      break;
    case "z":
      keys.z.pressed = false;
      break;
  }

  // Enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowuUp":
      keys.ArrowUp.pressed = false;
      break;
  }
})
