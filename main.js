const createCharacter = ({ name, healthId, progressBarId }) => {
  const elHP = document.getElementById(healthId);
  const elProgressBar = document.getElementById(progressBarId);

  return {
    name,
    defaultHP: 100,
    damageHP: 100,
    elHP,
    elProgressBar,
    isFighting: true,
    changeHP(count) {
      const { isFighting, name, damageHP } = this;
      if (!isFighting) return;

      this.damageHP = Math.max(damageHP - count, 0);
      this.renderHP();
      logAction(name, "Противник", count, this.damageHP);

      if (this.damageHP === 0) {
        alert(`Бедный ${name} проиграл бой!`);
        this.isFighting = false;
        Array.from(document.querySelectorAll(".button")).forEach(
          (btn) => (btn.disabled = true)
        );
      }
    },
    renderHPLife() {
      this.elHP.textContent = `${this.damageHP} / ${this.defaultHP}`;
    },
    renderProgressBarHP() {
      this.elProgressBar.style.width = `${this.damageHP}%`;
    },
    renderHP() {
      this.renderHPLife();
      this.renderProgressBarHP();
    },
  };
};

const random = (num) => Math.ceil(Math.random() * num);

const logAction = (characterName, enemyName, damage, characterHP) => {
  const logText = logs[random(logs.length) - 1]
    .replace("[ПЕРСОНАЖ №1]", characterName)
    .replace("[ПЕРСОНАЖ №2]", enemyName);
  const logDamage = `Нанесен урон: ${damage}. Осталось здоровья: ${characterHP}`;

  const logElement = document.getElementById("logs");
  const logItem = document.createElement("div");
  logItem.textContent = `${logText} ${logDamage}`;

  if (logElement.firstChild) {
    logElement.insertBefore(logItem, logElement.firstChild);
  } else {
    logElement.appendChild(logItem);
  }
};

const createClickCounter = (limit) => {
  let count = 0;

  return () => {
    count++;
    if (count > limit) {
      console.log(`Кнопка была нажата максимальное количество раз (${limit})`);
      return false;
    }
    console.log(
      `Кнопка нажата ${count} раз(а). Осталось нажатий: ${limit - count}`
    );
    return true;
  };
};

const init = () => {
  console.log("Start Game!");

  const characterConfig = {
    name: "Pikachu",
    healthId: "health-character",
    progressBarId: "progressbar-character",
  };
  const character = createCharacter(characterConfig);

  const enemyConfig = {
    name: "Charmander",
    healthId: "health-enemy",
    progressBarId: "progressbar-enemy",
  };
  const enemy = createCharacter(enemyConfig);

  const btnKick = document.getElementById("btn-kick");
  const btnFire = document.getElementById("btn-fire");

  const btnKickCounter = createClickCounter(6);
  const btnFireCounter = createClickCounter(6);

  btnKick.addEventListener("click", () => {
    if (btnKickCounter()) {
      console.log("Kick");
      character.changeHP(random(20));
      enemy.changeHP(random(20));
    }
  });

  btnFire.addEventListener("click", () => {
    if (btnFireCounter()) {
      console.log("Fire Blast");
      enemy.changeHP(random(30));
    }
  });

  character.renderHP();
  enemy.renderHP();
};

document.addEventListener("DOMContentLoaded", init);

const logs = [
  "[ПЕРСОНАЖ №1] вспомнил что-то важное, но неожиданно [ПЕРСОНАЖ №2], не помня себя от испуга, ударил в предплечье врага.",
  "[ПЕРСОНАЖ №1] поперхнулся, и за это [ПЕРСОНАЖ №2] с испугу приложил прямой удар коленом в лоб врага.",
  "[ПЕРСОНАЖ №1] забылся, но в это время наглый [ПЕРСОНАЖ №2], приняв волевое решение, неслышно подойдя сзади, ударил.",
  "[ПЕРСОНАЖ №1] пришел в себя, но неожиданно [ПЕРСОНАЖ №2] случайно нанес мощнейший удар.",
  "[ПЕРСОНАЖ №1] поперхнулся, но в это время [ПЕРСОНАЖ №2] нехотя раздробил кулаком <вырезанно цензурой> противника.",
  "[ПЕРСОНАЖ №1] удивился, а [ПЕРСОНАЖ №2] пошатнувшись влепил подлый удар.",
  "[ПЕРСОНАЖ №1] высморкался, но неожиданно [ПЕРСОНАЖ №2] провел дробящий удар.",
  "[ПЕРСОНАЖ №1] пошатнулся, и внезапно наглый [ПЕРСОНАЖ №2] беспричинно ударил в ногу противника",
  "[ПЕРСОНАЖ №1] расстроился, как вдруг, неожиданно [ПЕРСОНАЖ №2] случайно влепил стопой в живот соперника.",
  "[ПЕРСОНАЖ №1] пытался что-то сказать, но вдруг, неожиданно [ПЕРСОНАЖ №2] со скуки, разбил бровь сопернику.",
];
