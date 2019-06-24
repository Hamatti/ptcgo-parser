const setcodes = require("./sets");

const SET_PATTERN = /(?:\* )?(\d+) (.*) ([A-Z]{2,3}|[A-Z]{2}-[A-Z]{2}|[A-Z0-9]{3})? (\d+|XY\d+|BW\d+)/;
const BASIC_ENERGY_PATTERN = /(?:\* )?(\d+) (Darkness|Fairy|Fighting|Fire|Grass|Lightning|Metal|Psychic|Water) Energy.*/;

const BASIC_ENERGY_TYPES = [
  "Darkness",
  "Fairy",
  "Fighting",
  "Fire",
  "Grass",
  "Lightning",
  "Metal",
  "Psychic",
  "Water"
];

const BASIC_ENERGY_IDS = {
  Darkness: "sm1-170",
  Fairy: "sm1-172",
  Fighting: "sm1-169",
  Fire: "sm1-165",
  Grass: "sm1-164",
  Lightning: "sm1-167",
  Metal: "sm1-171",
  Psychic: "sm1-168",
  Water: "sm1-166"
};

const isBasicEnergy = row => {
  return (
    BASIC_ENERGY_TYPES.map(energy => row.includes(`${energy} Energy`)).filter(
      c => c
    ).length > 0
  );
};

const parseRow = row => {
  let result = null;
  if (isBasicEnergy(row)) {
    result = row.match(BASIC_ENERGY_PATTERN);
  } else {
    result = row.match(SET_PATTERN);
  }
  return result && result.slice(1);
};

const parse = decklist => {
  const parsed = {
    cards: decklist
      .split("\n")
      .map(row => {
        const card = parseRow(row);
        if (card) {
          const [amount, name, set, code] = card;
          let promoSet = null;
          let isEnergy = false;

          if (set && set.startsWith("PR")) {
            promoSet = set.split("-")[1];
          }

          if (BASIC_ENERGY_TYPES.indexOf(name) >= 0) {
            isEnergy = true;
          }

          return {
            amount,
            name,
            set,
            code,
            ptcgoio: {
              id: promoSet
                ? `${setcodes[set]}-${promoSet}${code}`
                : isEnergy
                ? `${BASIC_ENERGY_IDS[name]}`
                : `${setcodes[set]}-${code}`
            }
          };
        }
      })
      .filter(c => c)
  };

  return parsed;
};

module.exports = { parse };
