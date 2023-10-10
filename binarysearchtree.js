class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		this.arr = null;
		this.root = null;
	}
	
	buildTree (arr, start, end) {
		if (start > end) return null;

		let mid = parseInt((start + end) / 2);
		let root = new Node(arr[mid]);
		
		root.left = this.buildTree(arr, start, mid - 1);
		root.right = this.buildTree(arr, mid + 1, end);

		return root;
	}
	
	preOrder (root) {
		if (root == null) return;
		
		console.log(root.data , " ");
		this.preOrder(root.left);
		this.preOrder(root.right);
	}

	inOrder(root) {
		if (root != null) {
			this.inOrder(root.left);
			console.log(root.data, " ")
			this.inOrder(root.right);
		}
	}

	postOrder(root) {
		if (root != null) {
			this.postOrder(root.left);
			this.postOrder(root.right);
			console.log(root.data, " ");
		}
	}

	insert(root, val) {
		if(root == null) {
			root = new Node(val);
			return root;
		}

		if (val < root.data) {
			root.left = this.insert(root.left, val);
		} else if (val > root.data) {
			root.right = this.insert(root.right, val);
		}

		return root;
	}	

	delete(value, root = this.root) {
		// Base case
		if (root === null) {
		  return root;
		}
  
		// Traverse down the tree
		if (value < root.data) {
		  root.left = this.delete(value, root.left);
		} else if (value > root.data) {
		  root.right = this.delete(value, root.right);
		} 
  
		// Value matches -> delete node and update pointers
		else {
		  // option 1: root(child) has only one child
		  if (root.left === null) {
			// return the child's right so new parent can point to it
			return root.right;
		  } else if (root.right === null) {
			// return child's left so new parent can point to it
			return root.left;
		  }
		  // option 2: Node has two children
		  else {
			// Replace node with next smallest value
			const minData = function findNextSmallestRightData(root) {
			  let min = root.data;
			  let newRoot = root;
  
			  // Search for a left node with no left children. 
			  while (newRoot.left !== null) {
				min = root.left.data;
				newRoot = root.left;
			  }
  
			  return min;
			}
  
			root.data = minData(root.right);
  
			// Delete the copied node from minData()
			root.right = this.delete(root.data, root.right)
		  }
		}
  
		return root;
	  }
	
	find(val, root = this.root) {
		if ( root == null || val == root.data) return root;

		if(val < root.data) {
			return this.find(val, root.left);
		} 
		if(val > root.data) {
			return this.find(val, root.right);
		} 

		return false;
	}

	leverTraversal(root) {
		let queue = [];
		let ans = [];
		if(root == null) return;

		queue.push(root);
		while(queue.length) {
			let current = queue[0];
			ans.push(current.data);
			if(current.left != null) {
				queue.push(current.left);
			}
			if (current.right != null) {
				queue.push(current.right);
			}
			queue.shift();	
		}

		return ans;
	}

	height(root = this.root) {
		if(root == null) return 0;

		let lHeight = this.height(root.left);
		let rHeight = this.height(root.right);
  
		if (lHeight > rHeight) {
		  return lHeight + 1;
		} else {
		  return rHeight + 1;
		} 
	}

	depth(node, root, d = 0) {
		if(root === null || node === null) return;

		if(node === root) return d;

		if(node.data < root.data) {
			return this.depth(node, root.left, d += 1);
		}
		else {
			return this.depth(node, root.right, d += 1);
		}
	}	

	isBalanced(root = this.root) {
		const lHeight = this.height(root.left);
		const rHeight = this.height(root.right);
		const diff = Math.abs(lHeight - rHeight);
		return diff < 2 ? 'true' : 'false';
	}

	rebalance(root = this.root) {
		arr.sort((a, b) => a - b);
		let n = arr.length - 1;
		return this.buildTree(arr, 0, n);
	}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) return;
	
	if (node.right !== null) {
	  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
	  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

function randomNumbers() {
	let arr = [];
	for (let i = 0; i < 20; i++) {
		arr.push((Math.random() * 10).toFixed(2));
	}

	return arr;
}

let arr = randomNumbers();
let n = arr.length;
const tree = new Tree(arr);
root = tree.buildTree(arr, 0, n - 1);

prettyPrint(root);

tree.insert(root, -4);
tree.insert(root, 3);
prettyPrint(root);

// tree.delete(-4, root);
// prettyPrint(root);

console.log(tree.leverTraversal(root));

console.log(tree.height(root));

// // console.log(tree.find(2, root));

console.log(tree.depth(tree.find(3, root), root));

// console.log(tree.isBalanced(root));

// console.log(tree.rebalance(root));

// console.log(root);
// tree.inOrder(root);
// tree.preOrder(root);
// tree.postOrder(root);