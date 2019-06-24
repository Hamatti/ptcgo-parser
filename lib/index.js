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
          return {
            amount,
            name,
            set,
            code
          };
        }
      })
      .filter(c => c)
  };

  return parsed;
};

module.exports = { parse };
