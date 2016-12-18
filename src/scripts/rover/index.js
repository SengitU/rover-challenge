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
