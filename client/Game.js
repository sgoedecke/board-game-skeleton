import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.syncState();
  }


  render() {
    const { gameState, gameAction } = this.props;
    console.log('state', gameState);
    // display something based on the game state, handle user actions with gameAction
    return (
      <div className="game" />
    );
  }
}

export default Game;
