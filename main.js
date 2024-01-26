import { Pokemon } from "./Pokemon.js";
import { random, logAction, createClickCounter } from "./utils.js";
import { pokemons } from "./pokemons.js";

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
let character, enemy;

const init = () => {
  console.log("Start Game!");

  populatePokemonSelection();

  const playerPokemonSelect = document.getElementById("player-pokemon");
  const enemyPokemonSelect = document.getElementById("enemy-pokemon");

  const updatePokemons = () => {
    const playerPokemon = pokemons.find(
      (p) => p.name === playerPokemonSelect.value
    );
    const enemyPokemon = pokemons.find(
      (p) => p.name === enemyPokemonSelect.value
    );

    character = new Pokemon({
      ...playerPokemon,
      healthId: "health-character",
      progressBarId: "progressbar-character",
    });
    enemy = new Pokemon({
      ...enemyPokemon,
      healthId: "health-enemy",
      progressBarId: "progressbar-enemy",
    });

    character.updatePokemonInfo();
    enemy.updatePokemonInfo();

    updateAttackButtons(character.attacks);
  };

  playerPokemonSelect.addEventListener("change", updatePokemons);
  enemyPokemonSelect.addEventListener("change", updatePokemons);

  updatePokemons();
};

const updateAttackButtons = (attacks) => {
  const buttonsContainer = document.getElementById("attack-buttons");
  buttonsContainer.innerHTML = "";

  attacks.forEach((attack) => {
    const button = document.createElement("button");
    button.textContent = `${attack.name} (Damage: ${attack.minDamage}-${attack.maxDamage})`;
    button.classList.add("button");
    button.onclick = createAttackHandler(attack);
    buttonsContainer.appendChild(button);
  });
};

const createAttackHandler = (attack) => {
  let counter = attack.maxCount;
  return () => {
    if (counter > 0) {
      const damage = random(attack.minDamage, attack.maxDamage);
      console.log(
        `${character.name} использует ${attack.name}, нанося урон ${damage}`
      );
      enemy.changeHP(damage, logAction, character.name, logs);
      counter--;
    } else {
      console.log(`Атака ${attack.name} больше не доступна`);
    }
  };
};

const populatePokemonSelection = () => {
  const playerPokemonSelect = document.getElementById("player-pokemon");
  const enemyPokemonSelect = document.getElementById("enemy-pokemon");

  pokemons.forEach((pokemon) => {
    playerPokemonSelect.add(new Option(pokemon.name, pokemon.name));
    enemyPokemonSelect.add(new Option(pokemon.name, pokemon.name));
  });
};

document.addEventListener("DOMContentLoaded", init);
