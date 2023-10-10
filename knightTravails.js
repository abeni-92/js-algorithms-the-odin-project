class Chessboard {
	constructor(size) {
	  this.size = size;
	  this.board = Array.from({ length: size }, () => Array(size).fill(0));
	}
  
	isInside(x, y) {
	  return x >= 0 && x < this.size && y >= 0 && y < this.size;
	}
  
	findShortestPath(start, end) {
	  const queue = [{ x: start[0], y: start[1], distance: 0 }];
	  const visited = new Set();
	  const parent = {};
  
	  while (queue.length > 0) {
		const { x, y, distance } = queue.shift();
  
		if (x === end[0] && y === end[1]) {
		  const path = this.reconstructPath(parent, start, end);
		  return { distance, path };
		}
  
		for (const [dx, dy] of knightMoves) {
		  const newX = x + dx;
		  const newY = y + dy;
  
		  if (this.isInside(newX, newY) && !visited.has(`${newX},${newY}`)) {
			visited.add(`${newX},${newY}`);
			parent[`${newX},${newY}`] = { x, y };
			queue.push({ x: newX, y: newY, distance: distance + 1 });
		  }
		}
	  }
  
	  return { distance: -1, path: [] }; // No path found
	}
  
	reconstructPath(parent, start, end) {
	  const path = [];
      let current = { x: end[0], y: end[1] };
	  while (current.x !== start[0] || current.y !== start[1]) {
		path.push([current.x, current.y]);
		current = parent[`${current.x},${current.y}`];
	  }
	  path.push(start);
	  return path.reverse();
	}
  }
  
  const knightMoves = [
	[-2, -1],
	[-2, 1],
	[-1, -2],
	[-1, 2],
	[1, -2],
	[1, 2],
	[2, -1],
	[2, 1],
  ];
  
  const chessboard = new Chessboard(8);
  const start = [0, 0]; // Starting position
  const end = [4, 6]; // Destination
  const result = chessboard.findShortestPath(start, end);
  
  if (result.distance !== -1) {
	console.log(`Shortest path from ${start} to ${end} is ${result.distance} moves.`);
	console.log(`Path: ${result.path.map(coord => `(${coord[0]},${coord[1]})`).join(' -> ')}`);
  } else {
	console.log(`No path found from ${start} to ${end}.`);
  }
  