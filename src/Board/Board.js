import React, { Component } from 'react';
import './Board.css';
import Box from "../Box/Box"
import Modal from 'react-responsive-modal';


/* 
Class in charge of : 
 - rendering the board
 - manage interraction between boxes
 - manage victory/defeat condition
*/

class Board extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onRightClick = this.onRightClick.bind(this);
    this.state = {
      boxes: [], // array that represents the state of the board
      clickedBoxes: 0, // number of clicked boxes (for victory conditions)
      bombNumber: Math.ceil(this.props.width * this.props.height / 10), // number of bombs in the board
      text: "Congrats, you won the game !", // text to display in case of victory/defeat
    }
  }

  componentDidMount() { // creates the board when component did mount
    this.setState({ boxes: Array.from(Array(this.props.height), () => Array.from(Array(this.props.width), () => ({ value: "", number: 0 }))), clickedBoxes: 0 }, () => this.initBoard());
  }

  componentWillReceiveProps(newProps) { // creates a new board when board size changed or when restart
    this.setState({ bombNumber: Math.ceil(newProps.width * newProps.height / 10), boxes: Array.from(Array(parseInt(newProps.height)), () => Array.from(Array(parseInt(newProps.width)), () => ({ value: "", number: 0 }))), clickedBoxes: 0 }, () => this.initBoard());

  }

  /*
   - initBoard() goal is to fill the empty state.boxes array with bombs and neighbouring numbers
   - firt, random coordinates are picked
   - if the correspondig box is not a bomb the box is switched to a bomb
   - the neighbouring boxes number are incremented
  */

  initBoard() {
    var i = 0;
    while (i < this.state.bombNumber) { // while we dont' have the right number of bombs
      var bombLine = Math.floor(Math.random() * this.props.height); // random coodinates
      var bombRow = Math.floor(Math.random() * this.props.width);
      var boxes = this.state.boxes;
      if (boxes[bombLine][bombRow].number < 9) { //if this box is not a bomb
        i++;
        boxes[bombLine][bombRow].number = 9; //set the box to bomb
        if (bombLine + 1 < this.props.height) {
          boxes[bombLine + 1][bombRow].number++; // increase the number of neighbouring boxes
          if (bombRow + 1 < this.props.width) {
            boxes[bombLine + 1][bombRow + 1].number++;
          }
          if (bombRow - 1 > -1) {
            boxes[bombLine + 1][bombRow - 1].number++;
          }
        }
        if (bombLine - 1 > -1) {
          boxes[bombLine - 1][bombRow].number++;
          if (bombRow + 1 < this.props.width) {
            boxes[bombLine - 1][bombRow + 1].number++;
          }
          if (bombRow - 1 > -1) {
            boxes[bombLine - 1][bombRow - 1].number++;
          }
        }
        if (bombRow - 1 > -1) {
          boxes[bombLine][bombRow - 1].number++;
        }
        if (bombRow + 1 < this.props.width) {
          boxes[bombLine][bombRow + 1].number++;
        }
      }
      this.setState({ boxes: boxes });
    }

  }

  onClick(index) { // function called to reveal a box
    if (this.state.boxes[index[0]][index[1]].value === "") { // if the box is not clicked yet
      if (this.state.boxes[index[0]][index[1]].number > 8) { // if the clicked box is a bomb
        this.revealBoard(); // call the explode function
      }
      var boxes = this.state.boxes.slice()
      var clickedBox = boxes[index[0]][index[1]];
      clickedBox.value = clickedBox.number // reveals the box
      boxes[index[0]][index[1]] = clickedBox
      this.setState({ boxes: boxes }, this.clickOnNeighbours(index)); // call the clickOnNeigbours function
      this.setState((prevState, props) => ({ clickedBoxes: prevState.clickedBoxes + 1 })); // increase the number of clicked box
    }
  }

  onRightClick(e, index) { // function called to flag a box
    e.preventDefault(); // disable contex menu
    var boxes = this.state.boxes.slice()
    var clickedBox = boxes[index[0]][index[1]];
    if (clickedBox.value === "") { //if the box is not clicked yet
      clickedBox.value = "flagged" //set the box flagged
      boxes[index[0]][index[1]] = clickedBox
      this.setState({ boxes: boxes });
    }
    else if (clickedBox.value === "flagged") { // if the box is flagged
      clickedBox.value = "" // unflag the box
      boxes[index[0]][index[1]] = clickedBox
      this.setState({ boxes: boxes });
    }
  }

  /*
  clickOnNeighbours is called each time we reveal a box. It's goal is to : 
   - if the box value is 0 (no neighbouring bomb) it click on every neighbouring box
  */
  clickOnNeighbours(index) { 
    if (this.state.boxes[index[0]][index[1]].number === 0) { // if box value is 0 (no neighbouring bomb)
      if (index[0] + 1 < this.props.height) { // neighbour exists
          this.onClick([index[0] + 1, index[1]]); // click on the neighbouring box
        if (index[1] + 1 < this.props.width) {
          this.onClick([index[0] + 1, index[1] + 1]);
        }
        if (index[1] - 1 > - 1) {
          this.onClick([index[0] + 1, index[1] - 1]);
        }
      }
      if (index[0] - 1 > - 1) {
          this.onClick([index[0] - 1, index[1]]);
        if (index[1] + 1 < this.props.width) {
          this.onClick([index[0] - 1, index[1] + 1]);
        }
        if (index[1] - 1 > - 1) {
          this.onClick([index[0] - 1, index[1] - 1]);
        }
      }
      if (index[1] + 1 < this.props.width) {
        this.onClick([index[0], index[1] + 1]);
      }
      if (index[1] - 1 > - 1) {
        this.onClick([index[0], index[1] - 1]);
      }
    }
  }

  revealBoard(youLoose = true) { //function called each time you loose :(
    var boxes = this.state.boxes.slice()
    for (var i = 0; i < this.props.height; i++) { // run through all the boxes
      for (var j = 0; j < this.props.width; j++) {
        var clickedBox = boxes[i][j];
        clickedBox.value = clickedBox.number // reveal the box
        boxes[i][j] = clickedBox
      }
    }
    if (youLoose){
      this.setState({ boxes: boxes, text:"Oh no! You lost..." , clickedBoxes:this.props.width * this.props.height - this.state.bombNumber - 1}); // init the loose modal
    }
  }


  displayBox(lineNumer, rowNumber) { // display a box
    return (
      <Box value={this.state.boxes[lineNumer][rowNumber].value} index={[lineNumer, rowNumber]} onClick={this.onClick} onRightClick={this.onRightClick} />
    )
  }


  render() {
    var open=false;
    if (this.state.clickedBoxes === this.props.width * this.props.height - this.state.bombNumber) {
      open = true;
    }
    return (
      <div>
        <table className="board">
          <tbody>
            {this.state.boxes.map((boxLine, lineNumber) =>
              <tr key={lineNumber}>{boxLine.map((box, rowNumber) =>
                <td key={rowNumber}>{this.displayBox(lineNumber, rowNumber)}</td>)}</tr>
            )}
          </tbody>
        </table>
        <Modal open={open} onClose={() => {this.setState({clickedBoxes:0, text:"Congrats, you won the game !"}); this.revealBoard(false)}} center>
          <h2>{this.state.text}</h2>
        </Modal>
      </div>
    );
  }
}

export default Board;