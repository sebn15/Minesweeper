import React, { Component } from 'react';
import './Box.css';

class Box extends Component { // class in charge of rendering a box

  render() {
    var style = {}
    var value = ""
    if (this.props.value === "") { // if the bos is unclicked, then display grey background
      style ={ "backgroundColor": "rgb(204, 204, 204)" } ;
      value = "";
    }
    else { // if the box is clicked
      if (this.props.value > 8) { // if it's a bomb display '๏' and red background
        value = "๏";
        style ={ "backgroundColor": "rgb(175, 45, 45)" } ;
      }
      else if (this.props.value === "flagged") { // if it's a flag display '⚐' and blue background
        style = { "backgroundColor": "rgb(152, 183, 209)" };
        value = "⚐"
      }
      else if (this.props.value !== 0) { // if it's a number display the number a redder background for higher number
        value = this.props.value
        var color = "rgb(234," + (-this.props.value * 20 + 177) + "," + (-this.props.value * 20 + 177) + ")"
        style = { "backgroundColor": color }
      }
      else{ // if it's 0 then display white background
        style ={ "backgroundColor": "rgb(234, 234, 234)" }
      }
    }
    return (
      <button className="box" style={style} onClick={() => this.props.onClick(this.props.index)} onContextMenu={(e) => this.props.onRightClick(e, this.props.index)}>{value}</button>
    );
  }
}

export default Box;