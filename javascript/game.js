// ELEMENTOS QUE AFECTAN AL JUEGO

class Game {
  constructor() {
    this.goku = new Goku();
    this.bg = new Image();
    this.bg.src = "./images/Scene1.jpg";
    this.enemyArr = [];
    this.enemyArr2 = [];
    this.gokuProjectile = [];
    this.isGameOn = true;
  }

  gameLoop = () => {
    //* 1. Limpiamos el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //* 2. MOVIMIENTO Y ACCIONES
    this.removeProjectile();
    this.addNewEnemiesLeft();
    this.addNewEnemiesRight();
    this.removeEnemyArr();
    this.removeEnemyArr2();
    this.projectileCollisionEnemy()
    

    // * 3. DIBUJAR ELEMENTOS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.goku.updatePlayer();
    // forEach PROJECTILE
    this.gokuProjectile.forEach((projectile) => {
      projectile.updateProjectile();
    });

    // forEach enemyLeft
    this.enemyArr.forEach((enemy) => {
      enemy.updateEnemy();
    }); 
    // forEach enemyRight
    this.enemyArr2.forEach((enemy) => {
      enemy.updateEnemy();
    });

    //* 4. EFECTO RECURSION
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };

  removeProjectile = () => {
    if (this.gokuProjectile.length > 15) {
      this.gokuProjectile.shift();
    }
  };

  removeEnemyArr = () => {
    if (this.enemyArr.length > 20) {
      this.enemyArr.shift();
    }
  }
  removeEnemyArr2 = () => {
    if (this.enemyArr2.length > 20) {
      this.enemyArr2.shift();
    }
  }

  addNewEnemiesLeft = () => {
    let randomPosY = Math.random() * 600;
    let newEnemieLeft = new Enemy(0, randomPosY, 2, "./images/freezer.png");

    if (
      this.enemyArr.length < 3 ||
      this.enemyArr[this.enemyArr.length - 3].x > canvas.width * 0.3
    ) {
      this.enemyArr.push(newEnemieLeft);
    }
   };

   addNewEnemiesRight = () => {
    let newRandomPosY = Math.random() * 600;
    let newEnemieRight = new Enemy(canvas.width,newRandomPosY, -2, "./images/freezervolt.png")

    if (this.enemyArr2.length < 3  || this.enemyArr2[this.enemyArr2.length - 3].x < canvas.width * 0.7) {
      this.enemyArr2.push(newEnemieRight)
    }
  }

  projectileCollisionEnemy = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      
      this.enemyArr.forEach((enemy, j) => {
        
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          console.log("Le has dado!")
          this.gokuProjectile.splice(i,1)
          this.enemyArr.splice(j,1)
        }
      })
    })
}
}

