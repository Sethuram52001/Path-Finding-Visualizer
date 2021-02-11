let walls;

export function recursiveDivisionMaze(grid, startNode, finishNode) {
  // if start or finish node skip it
  if (!startNode || !finishNode)
    return;
  // arrays with values of grid dimensions
  let vertical = Array(grid[0].length).fill().map((_, i) => i);
  let horizontal = Array(grid.length).fill().map((_, i) => i);
  // initializing the walls global variable to an empty array
  walls = [];
  // main func
  getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode);
  return walls;
}

function getRecursiveWalls(vertical, horizontal, grid, startNode, finishNode) {
  if (vertical.length < 2 || horizontal.length < 2)
    return;
  let dir;
  let num;
  if (vertical.length > horizontal.length) {
    dir = 0;
    num = generateOddRandomNumber(vertical);
  }
  if (vertical.length <= horizontal.length) {
    dir = 1;
    num = generateOddRandomNumber(horizontal);
  }

  // recursive part where the approach to 
  // start horizontal or vertical is dependent on dir variable
  if (dir === 0) {
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    getRecursiveWalls(vertical.slice(0, vertical.indexOf(num)), horizontal, grid, startNode, finishNode);
    getRecursiveWalls(vertical.slice(vertical.indexOf(num) + 1), horizontal, grid, startNode, finishNode);
  }
  else {
    addWall(dir, num, vertical, horizontal, startNode, finishNode);
    getRecursiveWalls(vertical, horizontal.slice(0, horizontal.indexOf(num)), grid, startNode, finishNode);
    getRecursiveWalls(vertical, horizontal.slice(horizontal.indexOf(num) + 1), grid, startNode, finishNode);
  }
}

// generates a random number which is odd
function generateOddRandomNumber(arr) {
  let max = arr.length - 1;
  let randomNum = Math.floor(Math.random() * (max / 2)); 
  if (randomNum % 2 === 0) {
    if (randomNum === max)
      randomNum -= 1;
    else
      randomNum += 1;
  }
  return arr[randomNum];
} 

// func to push the coordinates of nodes into wall array
function addWall(dir, num, vertical, horizontal, startNode, finishNode) {
  let isStartFinish = false;
  let tempWalls = [];
  if (dir === 0) {
    if (horizontal.length === 2)
      return;
    for (let temp of horizontal) {
      if ((temp === startNode.row && num === startNode.col) ||(temp === finishNode.row && num === finishNode.col)) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([temp, num]);
    }
  }
  else {
    if (vertical.length === 2)
      return;
    for (let temp of vertical) {
      if ((num === startNode.row && temp === startNode.col) ||(num === finishNode.row && temp === finishNode.col)) {
        isStartFinish = true;
        continue;
      }
      tempWalls.push([num, temp]);
    }
  }
  if (!isStartFinish) {
    tempWalls.splice(generateRandomNumber(tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
}

// func to generate a random number
function generateRandomNumber(max) {
  let randomNum = Math.floor(Math.random() * (max / 2));
  if (randomNum % 2 !== 0) {
    if (randomNum === max) {
      randomNum -= 1;
    }
    else {
      randomNum += 1;
    }
  }
  return randomNum;
}