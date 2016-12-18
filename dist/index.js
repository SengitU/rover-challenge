/**
 * Author: Sengitu
 */

let locationHelper = (function() {
  const compass = ['N', 'E', 'S', 'W'];
  const movementMatrix = {
    N: {y: 1},
    S: {y: -1},
    W: {x: -1},
    E: {x: 1},
  };

  this.rotate = function(facingDirection, turnDirection) {
    let currentIndex = compass.indexOf(facingDirection);

    if (currentIndex === -1) {
      return facingDirection;
    }

    if (turnDirection === 'R') {
      return compass[++currentIndex % compass.length];
    } else if(turnDirection === 'L') {
      return compass[(--currentIndex + compass.length) % compass.length];
    }
  };

  this.getMovementMatrix = function(facingDirection) {
    return Object.assign({x: 0, y: 0}, movementMatrix[facingDirection]);
  };

  return this;
})();

/**
 * Author: Sengitu
 */

function Rover(x, y, facingDirection) {
  let position = {
    x: x,
    y: y,
    facingDirection: facingDirection
  },
    commandString = '';

  this.getPosition = function() {
    return position;
  }

  this.getCommand = function() {
    return commandString;
  }

  this.setCommand = function(commandStr){
    commandString = commandStr;
  };

  this.move = function() {
    const movementMatrix = locationHelper.getMovementMatrix(position.facingDirection);

    position.x += movementMatrix.x;
    position.y += movementMatrix.y;
  };

  this.rotate = function(rotateDirection) {
    position.facingDirection = locationHelper.rotate(position.facingDirection, rotateDirection);
  };

  this.getPrintText = function() {
    return position.x + ' ' + position.y + ' ' + position.facingDirection
  }
};

/**
 * Author: Sengitu
 */

function MarsRover(maxX, maxY) {
  let area = {
    x: maxX,
    y: maxY
  },
  rovers = [],
  currentRover;

  this.addRover = function(x, y, facingDirection) {
    // Since lower left will always be (0,0) x and y just points the distance from (0,0)
    let rover = new Rover(Math.abs(x), Math.abs(y), facingDirection);
    currentRover = rover;
    rovers.push(rover);
    validateSignal(rover);
  };

  this.sendCommand = function(commandStr) {
    if (currentRover) {
      currentRover.setCommand(commandStr);
    } else {
      console.warn('No rover initialized');
    }
  };

  this.getFinalPositions = function() {
    for(let rover of rovers) {
      executeCommands(rover);
      if (rover.lostSignal) {
        console.log(rover.getPrintText() + ' Lost signal connection with this rover, these are last known coordinates');
      } else {
        console.log(rover.getPrintText());
      }
    }
  };

  let validateSignal = function(rover) {
    const roverPos = rover.getPosition();
    if (roverPos.x > area.x || roverPos.x < 0 || roverPos.y > area.y || roverPos.y < 0) {
      rover.lostSignal = true;
      return false;
    } else {
      return true;
    }
  };

  let executeCommands = function(rover) {
    const commandStr = rover.getCommand();
    for(let i = 0; i < commandStr.length; i++) {
      const command = commandStr.charAt(i);
      if (rover.lostSignal) {
        break;
      }

      if (command === 'L' || command === 'R') {
        rover.rotate(command);
      } else if (command === 'M') {
        rover.move();
        validateSignal(rover);
      } else {
        console.warn('Unrecognized command:' + command);
      }
    }
    rover.setCommand = '';
  };
};
