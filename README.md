# PTCGO Parser

![npm](https://img.shields.io/npm/v/ptcgo-parser.svg?style=plastic)

Javascript library to transform Pokemon TCG Online decklist exports into Javascript objects with [PokemonTCG.io API](https://pokemontcg.io) compatible ids to help you building tools that PTCGO players can use.

### Installing

Install from npm with

`npm install ptcgo-parser`

### Usage

After installing, you can import it to your Javascript file

```js
const PTCGOParser = require('ptcgo-parser')
```

and use it like this

```js
const ptcgoExportedDecklist = `
****** Pokémon Trading Card Game Deck List ******

##Pokémon - 13

* 1 Oranguru SUM 113
* 3 Darkrai-EX BKP 74
* 4 Dratini SUM 94
* 3 Dragonair SUM 95
* 1 Dragonite ROS 51
* 1 Mew FAC 29
`

const decklist = PTCGOParser.parse(ptcgoExportedDecklist)

console.log(decklist)

/*
  {
    cards: [
        {
            name: 'Oranguru',
            amount: 1,
            set: 'SUM',
            code: 113,
            ptcgoio: {
                id: 'sm1-113'
            }
        },
        ...
    ]
  }
*/
```

**Note!**

Since basic energies sometimes come with a set code and sometimes not, the parser defaults basic energy cards to ptcgo.io ids from Sun & Moon Base Set.

## Development

### Running the tests

This library comes with unit tests that live in `spec/` folder. To add a new file to be run, simply add a file into `spec/` and name it with `.spec.js` suffix.

To run all the tests, run

`npm test`

in terminal.

### Code style

This repository uses [Prettier](https://prettier.io/) with `.prettierrc` for maintaining style.

## Deployment

To publish a new version in npm, run

`npm publish [version_bump]`

where `[version_bump]` is either

| Version | Description                                                                                   |
| ------- | --------------------------------------------------------------------------------------------- |
| Patch   | For updates in documentation or PTCGO/ptcgo.io content updates (new sets, new exceptions etc) |
| Minor   | For small functionality updates and bug fixes                                                 |
| Major   | For major new functionality and any backward-breaking changes to API                          |

## Contributing

All forms of contributions are welcomed!

- Did you notice a bug? Open an issue!
- Is there a mistake in PTCGO -> PokemonTCG.io id mapping? Open an issue (functionality to fix these directly upcoming!).
- New functionality? Feel free to open an issue (and optionally start developing the solution and create a PR).

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- [https://pokemontcg.io/](https://pokemontcg.io/) is a wonderful API that I use daily to build small tools for myself to improve as a player
