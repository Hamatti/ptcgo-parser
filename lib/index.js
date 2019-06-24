const parse = decklist => {
  return decklist.split("\n").filter(row => !row.startsWith("##"));
};

module.exports = { parse };
