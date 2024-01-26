export class Pokemon {
  constructor({ name, type, hp, img, attacks, healthId, progressBarId }) {
    this.name = name;
    this.type = type;
    this.maxHP = hp;
    this.damageHP = hp;
    this.img = img;
    this.attacks = attacks;
    this.elHP = document.getElementById(healthId);
    this.elProgressBar = document.getElementById(progressBarId);
    this.isFighting = true;
    this.nameElement = document.getElementById(
      "name-" + healthId.split("-")[1]
    );
    this.imgElement = document.querySelector(
      `.${healthId.split("-")[1]} .sprite`
    );
  }

  updatePokemonInfo() {
    this.nameElement.textContent = this.name;
    this.imgElement.src = this.img;
    this.renderHP();
  }

  changeHP(count, logAction, enemyName, logs) {
    if (!this.isFighting) return;

    this.damageHP = Math.max(this.damageHP - count, 0);
    this.renderHP();
    logAction(this.name, enemyName, count, this.damageHP, logs);

    if (this.damageHP === 0) {
      alert(`Бедный ${this.name} проиграл бой!`);
      this.isFighting = false;
      Array.from(document.querySelectorAll(".button")).forEach(
        (btn) => (btn.disabled = true)
      );
    }
  }

  renderHPLife() {
    this.elHP.textContent = `${this.damageHP} / ${this.maxHP}`;
  }

  renderProgressBarHP() {
    const hpPercentage = (this.damageHP / this.maxHP) * 100;
    this.elProgressBar.style.width = `${hpPercentage}%`;
  }

  renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
  }
}
