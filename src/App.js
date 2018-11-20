import React, { Component } from 'react';
import './App.css';
import Board from './Board/Board';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
      width: 10,
    }
  }

  render() {
    return (
      <div>
        <div className="header">
          <div className="header_title">Minesweeper</div>
          <div className="header_info">Left click to reveal<br/>Right click to flag</div>
        </div>
        <div className="game">
          <div className="settings_box">
            <div className="title"><h1>Choose minesweeper size</h1></div>
            <div className="slider_box">
              <h2>Height : {this.state.height}</h2>
              <input className="slide_container" defaultValue={10} onChange={(e) => this.setState({ height: e.target.value })} type="range" min="5" max="25" />
            </div>
            <div className="slider_box">
              <h2>Width : {this.state.width}</h2>
              <input className="slide_container" defaultValue={10} onChange={(e) => this.setState({ width: e.target.value })} type="range" min="5" max="25" />
            </div>
            <button className="button" onClick={() => this.setState({ height: this.state.height })}>Restart</button>
          </div>
          <div className="board_box">
            <Board bombNumber={10} height={this.state.height} width={this.state.width} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
