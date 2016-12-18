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
