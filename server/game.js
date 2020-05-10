class Game {
  constructor() {
    this.redPlayers = [];
    this.bluePlayers = [];
    this.redLeader = undefined;
    this.blueLeader = undefined;
    this.playing = false;
    this.winner = undefined;
    this.currentTurn = 'red'; // red goes first
  }

  // add a new player to the team with the fewest players
  addPlayer(player) {
    if (this.redPlayers.length < this.bluePlayers.length) {
      this.redPlayers = this.redPlayers.concat(player);
    } else {
      this.bluePlayers = this.bluePlayers.concat(player);
    }

    if (!this.winner && this.redLeader && this.blueLeader && this.redPlayers.length > 1 && this.bluePlayers.length > 1) {
      this.playing = true;
    }
  }

  removePlayer(player) {
    this.redPlayers = this.redPlayers.filter((p) => p !== player);
    this.bluePlayers = this.bluePlayers.filter((p) => p !== player);
    if (this.redLeader === player) { this.redLeader = undefined; }
    if (this.blueLeader === player) { this.blueLeader = undefined; }
  }

  assignLeader(player) {
    if (this.winner || this.playing) { return; }
    if (this.redPlayers.indexOf(player) >= 0) {
      if (!this.redLeader) {
        this.redLeader = player;
      }
    } else if (this.bluePlayers.indexOf(player) >= 0) {
      if (!this.blueLeader) {
        this.blueLeader = player;
      }
    }

    if (!this.winner && this.redLeader && this.blueLeader && this.redPlayers.length > 1 && this.bluePlayers.length > 1) {
      this.playing = true;
    }
  }

  takeAction(action, player) {
    // update game state, check if a team has won, pass the turn if necessary
    return true;
  }

  endTurn() {
    this.currentTurn = this.currentTurn === 'red' ? 'blue' : 'red';
  }

  getPlayerColor(player) {
    if (this.redPlayers.indexOf(player) >= 0) {
      return 'red';
    }
    if (this.bluePlayers.indexOf(player) >= 0) {
      return 'blue';
    }
  }

  // what the client needs to render the game
  serialize(player) {
    const output = {
      currentTurn: this.currentTurn,
      redPlayers: this.redPlayers,
      bluePlayers: this.bluePlayers,
      redLeader: this.redLeader,
      blueLeader: this.blueLeader,
      playing: this.playing,
      winner: this.winner,
    };

    // leaders see all tiles revealed; everyone else only sees picked ones
    if (player === this.redLeader || player === this.blueLeader) {
      // augment output with secret information
    }

    return output;
  }
}

exports.default = Game;
