import React from 'react';
import { v4 as uuid } from 'uuid';
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import styled from 'styled-components';
import ChatPanel from './ChatPanel';
import Game from './Game';
import TeamDisplay from './TeamDisplay';
import AppHeader from './AppHeader';
import TurnDisplay from './TurnDisplay';

const theme = {
  ...DEFAULT_THEME,
  colors: {
    ...DEFAULT_THEME.colors,
    primaryHue: '#D79922',
  },
  borderRadii: {
    sm: '0',
    md: '0',
  },
};

const StyledRow = styled(Row)`
  margin-bottom: 30px;
`;


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      usernames: {},
      gameState: {},
    };
  }

  componentDidMount() {
    if (!this.props.roomName) { return; }

    window.socket.on('chat message', (msg, color) => {
      this.setState({ messages: [...this.state.messages, { message: msg, color }] });
    });

    window.socket.on('usernames', (msg) => {
      this.setState({ usernames: msg });
    });

    window.socket.on('game state update', (gameState) => {
      console.log('got update', gameState);
      this.setState({ gameState });
    });
  }

  sendMessage(msg) {
    window.socket.emit('chat message', msg);
  }

  // request a new copy of the state from the server. called after the
  // component loads
  syncState() {
    window.socket.emit('sync');
  }

  gameAction(player, action) {
    console.log('taking action', player, action);
    window.socket.emit('gameAction', action);
  }

  endTurn(player) {
    console.log('ending turn', player);
    this.gameAction(player, { action: 'end_turn' });
  }

  chooseLeader(player) {
    console.log('choosing leader', player);
    window.socket.emit('chooseLeader', player);
  }

  render() {
    const { roomName, socketId } = this.props;
    const { messages, gameState } = this.state;
    const id = uuid();

    if (!roomName) {
      // TODO: extract to landing page component
      return (
        <div>
          <h1>Welcome!</h1>

          <p>To invite others to your game, just share the URL of your game with them</p>
          <a href={`#${id}`}>Start a new game!</a>
          <br />
        </div>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <Grid gutters="md">
          <StyledRow justifyContent="center">
            <AppHeader gameState={gameState} socketId={socketId} roomName={roomName} usernames={this.state.usernames} />
          </StyledRow>
          <StyledRow alignItems="center" justifyContentMd="center">
            <Col md="auto">
              <Game gameState={gameState} syncState={this.syncState.bind(this)} gameAction={this.gameAction.bind(this)} />
            </Col>
            <Col md="auto">
              <TurnDisplay gameState={gameState} endTurn={this.endTurn.bind(this)} />
            </Col>
          </StyledRow>
          <StyledRow justifyContent="center">
            <TeamDisplay gameState={gameState} chooseLeader={this.chooseLeader.bind(this)} usernames={this.state.usernames} />
          </StyledRow>
          <Row justifyContent="center">
            <ChatPanel messages={messages} sendMessage={this.sendMessage.bind(this)} gameState={gameState} />
          </Row>
        </Grid>
      </ThemeProvider>
    );
  }
}

export default App;
