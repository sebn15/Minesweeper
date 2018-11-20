# Minesweeper

This is a Minesweeper App made with React.js

https://github.com/sebn15/Minesweeper

## Setup
```
$ npm install
```
This will install all the node modules needed for the app. Make sure you installed Node to run npm commands.

## Start 

```
$ npm start
```
Runs the mineswweper app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Build
```
$ npm run build
```
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Structure

The app has 3 components : App, Board and Box. The App conatains one Board wich contains several Boxes

### Box

This component's role is only to display a clickbox. It has no state and no method except render(). All it's propoerties are passed through props by the Board.<br/>
The box displays an empty grey box if the box is not clicked yet, a flagged blue box if the box is flagged. If the box is clicked, it displays the number of neighbouring bombs, the higher is this number the redder is the box. If the box is a bomb, it displays a red box with a bomb icon.

### Board

This component displays the board of boxes and manage interractions between them. Is state contains an array containing the state of every box. the state of a box is an object containing a value and a number. The value corresponds to what is displayed on the box : "" => the box is unclikecd, 3 => the box has three neighbouring bombs, number>8 corresponds to a bomb (8 is the number of neighbours so you can't be not a bomb if the number is higher than 8). The value corresponds to what is "inside" the box : the value becomes equal to the box when the box is clicked.<br/>
Many methods manage the board's behaviour : onClick to reveal a box, onRightClick to flag a box, etc...<br/>
The size of the board are passed through props by the App.

### App

The App has a Board, two sliders and a restart button. Its state contains the size of the board, which is triggered by the sliders.
