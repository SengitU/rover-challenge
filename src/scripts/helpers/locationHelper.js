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
