# Board Game Skeleton

Build an online board game to play with your friends.

This is not a framework or a library. It is all the code I needed to build a couple of online board games except for the game itself. The idea is that throwing together a new online board game is as simple as cloning this repo and filling out the `Game` React component and `Game` class on the server. The rest of the code here handles server setup, creating and joining game rooms, switching teams, choosing a leader for each team (e.g. a Codenames clue-giver, or a Taboo guesser, etc), waiting until a game has enough players and leaders to start, chat, and so on.

The code here is intended to be as simple as possible to edit, not to be fully production-ready or polished. Assumptions:

* The game has two teams, with at least two players on each team
* One player on each team is the 'leader' or has some similar special role
* Only the leader can end turns

See [Codenames](https://github.com/sgoedecke/custom-codenames) and [Taboo](https://github.com/mtsolakiszen/custom-taboo) for some rough working examples.

## Deployment

You should be able to auto-deploy your game on Heroku directly from the git repo. If you want to use your own infra, it's just a node.js process - go nuts.

## Development

`yarn install`

Run `yarn start` to start the backend server.

To develop on the frontend client, run `yarn build --mode=development` to build the frontend bundle. Webpack will watch for changes but you will have to refresh.

Run `yarn lint` to autofix linting errors.

