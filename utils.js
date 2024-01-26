export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const logAction = (
  characterName,
  enemyName,
  damage,
  characterHP,
  logs
) => {
  const logIndex = random(0, logs.length - 1);
  const logText = logs[logIndex]
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

export const createClickCounter = (limit) => {
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
