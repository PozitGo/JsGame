function createCharacter(name, healthId, progressBarId) {
  const elHP = document.getElementById(healthId);
  const elProgressBar = document.getElementById(progressBarId);

  return {
    name,
    defaultHP: 100,
    damageHP: 100,
    elHP,
    elProgressBar,
    changeHP: function (count) {
      this.damageHP = Math.max(this.damageHP - count, 0);
      this.renderHP();

      if (this.damageHP === 0) {
        alert(`Бедный ${this.name} проиграл бой!`);
        this.elHP.parentNode.parentNode.querySelector(
          ".button"
        ).disabled = true;
      }
    },
    renderHPLife: function () {
      this.elHP.textContent = `${this.damageHP} / ${this.defaultHP}`;
    },
    renderProgressBarHP: function () {
      this.elProgressBar.style.width = `${this.damageHP}%`;
    },
    renderHP: function () {
      this.renderHPLife();
      this.renderProgressBarHP();
    },
  };
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

function init() {
  console.log("Start Game!");

  const character = createCharacter(
    "Pikachu",
    "health-character",
    "progressbar-character"
  );
  const enemy = createCharacter(
    "Charmander",
    "health-enemy",
    "progressbar-enemy"
  );

  const btn = document.getElementById("btn-kick");
  btn.addEventListener("click", () => {
    console.log("Kick");
    character.changeHP(random(20));
    enemy.changeHP(random(20));
  });

  character.renderHP();
  enemy.renderHP();
}

document.addEventListener("DOMContentLoaded", init);
