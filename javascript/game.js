// ELEMENTOS QUE AFECTAN AL JUEGO

class Game {
  constructor() {
    this.goku = new Goku();
    this.bg = new Image();
    this.bg.src = "./images/Scene1.jpg";

    this.enemyArr = [];
    this.enemyArr2 = [];
    this.enemyPlusArr = [];

    this.gokuProjectile = [];
    this.gokuKiProjectile = [];

    this.particles = [];

    this.isGameOn = true;
  }

  gameLoop = () => {
    //* 1. Limpiamos el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //* 2. MOVIMIENTO Y ACCIONES
    this.removeProjectile();
    this.removeKiProjectile();
    // Add Enemies
    setInterval(() => {
      this.addNewEnemiesLeft();
      this.addNewEnemiesRight();
      this.addNewEnemiesPlus();
    }, 5000);

    // Remove Enemies
    this.removeEnemyArr();
    this.removeEnemyArr2();
    this.removeEnemyPlusArr();
    // Projectile collision enemies
    this.projectileCollisionEnemyLeft();
    this.projectileCollisionEnemyRight();
    this.projectileCollisionEnemyPlus();
    // Projectile KI collision enemies
    this.KiCollisionEnemyLeft();
    this.KiCollisionEnemyRight();
    this.KiCollisionEnemyPlus();
    // Character collision enemies
    this.gokuEnemyLeftCollision();
    this.gokuEnemyRightCollision();
    this.gokuEnemyPlusCollision();
    // Recover HP
    this.recoverHp();
    // GAME OVER!!!
    this.gameOver();
    scorePoints = score.innerHTML;
    // * 3. DIBUJAR ELEMENTOS
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);
    this.goku.updatePlayer();
    // forEach PROJECTILE
    this.gokuProjectile.forEach((projectile) => {
      projectile.updateProjectile();
    });
    // KI PROJECTILE
    this.gokuKiProjectile.forEach((projectile) => {
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
    // forEach enemyPlus
    this.enemyPlusArr.forEach((enemy) => {
      enemy.updateEnemyPlus();
    });
    // forEach particles
    this.particles.forEach((particle, i) => {
      if (particle.opacity <= 0) {
        this.particles.splice(i, 1);
      }
      particle.updateParticle();
    });

    //* 4. EFECTO RECURSION
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };

  // REMOVE PROJECTILES
  removeProjectile = () => {
    if (this.gokuProjectile.length > 15) {
      this.gokuProjectile.shift();
    }
  };

  removeKiProjectile = () => {
    if (this.gokuKiProjectile.length > 1) {
      this.gokuKiProjectile.shift();
    }
  };
  // REMOVE ENEMIES
  removeEnemyArr = () => {
    if (this.enemyArr.length > 20) {
      this.enemyArr.shift();
    }
  };

  removeEnemyArr2 = () => {
    if (this.enemyArr2.length > 20) {
      this.enemyArr2.shift();
    }
  };

  removeEnemyPlusArr = () => {
    if (this.enemyPlusArr.length > 20) {
      this.enemyPlusArr.shift();
    }
  };

  // ADD NEW ENEMIES
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
    let newEnemieRight = new Enemy(
      canvas.width,
      newRandomPosY,
      -2,
      "./images/freezervolt.png"
    );

    if (
      this.enemyArr2.length < 3 ||
      this.enemyArr2[this.enemyArr2.length - 3].x < canvas.width * 0.7
    ) {
      this.enemyArr2.push(newEnemieRight);
    }
  };

  addNewEnemiesPlus = () => {
    let newRandomPosX = Math.random() * 600;
    let newEnemiePlus = new EnemyPlus(
      newRandomPosX,
      0,
      2,
      "./images/cooler.png"
    );
    setInterval(() => {
      if (
        this.enemyPlusArr.length < 2 ||
        this.enemyPlusArr[this.enemyPlusArr.length - 2].y > canvas.height
      ) {
        this.enemyPlusArr.push(newEnemiePlus);
      }
    }, 4000);
  };
  // PROJECTILE COLLISION
  projectileCollisionEnemyLeft = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.gokuProjectile.splice(i, 1);
          this.enemyArr.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  projectileCollisionEnemyRight = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyArr2.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.gokuProjectile.splice(i, 1);
          this.enemyArr2.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  projectileCollisionEnemyPlus = () => {
    this.gokuProjectile.forEach((projectile, i) => {
      this.enemyPlusArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          enemy.hp--;
          this.gokuProjectile.splice(i, 1);
          if (enemy.hp === 0) {
            this.enemyPlusArr.splice(j, 1);
          }
        }
      });
    });
  };
  // KI PROJECTILE COLLISION
  KiCollisionEnemyLeft = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.enemyArr.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  KiCollisionEnemyRight = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyArr2.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          this.enemyArr2.splice(j, 1);
          score.innerHTML++;
        }
      });
    });
  };

  KiCollisionEnemyPlus = () => {
    this.gokuKiProjectile.forEach((projectile) => {
      this.enemyPlusArr.forEach((enemy, j) => {
        if (
          enemy.x < projectile.x + projectile.w &&
          enemy.x + enemy.w > projectile.x &&
          enemy.y < projectile.y + projectile.h &&
          enemy.h + enemy.y > projectile.y
        ) {
          this.popParticles(enemy, "#730797");
          enemy.hp--;
          if (enemy.hp === 0) {
            this.enemyPlusArr.splice(j, 1);
            score.innerHTML = Number(score.innerHTML) + 10;
          }
        }
      });
    });
  };
  // Goku enemy collisions
  gokuEnemyLeftCollision = () => {
    this.enemyArr.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyArr.splice(i, 1);
      }
    });
  };

  gokuEnemyRightCollision = () => {
    this.enemyArr2.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyArr2.splice(i, 1);
      }
    });
  };

  gokuEnemyPlusCollision = () => {
    this.enemyPlusArr.forEach((enemy, i) => {
      if (
        enemy.x < this.goku.x + this.goku.w &&
        enemy.x + enemy.w > this.goku.x &&
        enemy.y < this.goku.y + this.goku.h &&
        enemy.h + enemy.y > this.goku.y
      ) {
        this.popParticles(this.goku, "#830707");
        this.goku.hp -= 34;
        gokuHp.style.width = this.goku.hp + "%";
        this.goku.image.src = "./images/gokureceivedmg.png";
        this.enemyPlusArr.splice(i, 1);
      }
    });
  };
  // RECOVER HP
  recoverHp = () => {
    if (
      this.goku.hp < 85 &&
      Number(score.innerHTML) % 50 === 0 &&
      Number(score.innerHTML) > 0
    ) {
      this.goku.hp += 10;
      gokuHp.style.width = this.goku.hp + "%";
    }
  };
  // GAMEOVER
  gameOver = () => {
    if (this.goku.hp < 0) {
      gokuHp.style.width = 0 + "%";
      this.goku.vx = 0;
      this.goku.vy = 0;
      this.goku.image.src = "./images/gokudeath.png";
      setInterval(() => {
        this.goku.image.src = "./images/gokudeath.png";
        this.isGameOn = false;
      }, 500);
      combatAudio.pause();
      gameOverAudio.play();
      gameOverScreen.style.display = "flex";
      printScore();
    }
  };
  // Bucle particulas
  popParticles = (character, color) => {
    for (let i = 0; i < 15; i++) {
      this.particles.push(
        new Particle(
          character.x + character.w / 2,
          character.y + character.h / 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          Math.random() * 5,
          color
        )
      );
    }
  };
}
