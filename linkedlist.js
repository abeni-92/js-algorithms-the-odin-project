class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

class LinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
	}

	append(data) {
		const newNode = new Node(data);
		// for Empty List
		if(!this.head){
			this.head = newNode;
			this.tail = newNode;
		} else {
			// for non Empty List
			this.tail.next = newNode;
			this.tail = newNode;
		}
	}	

	prepend(data) {
		const newNode = new Node(data);
		if (!this.head){
			this.head = newNode;
			this.tail = newNode;
		} else {
			newNode.next = this.head;
			this.head = newNode;
		}
	}

	size () {
		let count = 1;
		if(!this.head) return 0;

		let temp = this.head;
		while(temp.next != null) {
			count += 1;
			temp = temp.next;
		}
		return count;
	}

	headNode () {
		return this.head;
	}

	tailNode () {
		return this.tail;
	}

	at (index) {
		if (index < 0) {
			return "Invalid Input!"
		} 
		if (index == 0) {
			return this.head;
		} 

		let i = 0;
		let temp = this.head;
		while( i < index) {
			if (temp.next != null){
				temp = temp.next;
				i += 1;
			} else {
				return "Index out of List";
			}
		}

		return temp
	}

	pop () {
		if (!this.head) {
			throw new Error("List is Empty");
		}

		let poppedNode;
		if (this.head === this.tail) {
			poppedNode = this.head;
			this.head = null;
			this.tail = null;

			return poppedNode;
		}

		let current = this.head;
		while (current.next != this.tail) {
			current = current.next;
		}
		
		poppedNode = this.tail;
		current.next = null;
		this.tail = current;

		return poppedNode;
	}

	contains (value) {
		if (!this.head) {
			return "Empty List!";
		} 

		if (this.head == this.tail) {
			if (this.head.data === value) {
				return 'Found!';
			} else {
				return 'Not Found!';
			}
		}
		
		let current = this.head;
		while (current != null){
			if (current.data === value) {
				return "Found!";
			}
			current = current.next;
		}

		return "Not Found!";
	}

	find (value) {
		if (!this.head) {
			return "Empty List";
		}
		if (this.head == this.tail) {
			if (this.head.data == value) {
				return "Index of: 0";
			}
		}

		let index = 0;
		let current = this.head;
		while (current != null) {
			if (current.data == value) {
				return "Found at index of:", index;
			}
			current = current.next;
			index += 1;	
		}

		return "Not Found!";
	}

	toString () {
		let current = this.head;
		let s = "";
		while (current) {
		  s += `(${current.data}) -> `;
		  current = current.next;
		}
		s += 'null'
		return s;
	  }

	insertAt (value, index) {
		let size = this.size();
		if (index < 0 || index > size) {
			return "out of range";
		}

		if (index == size) {
			return this.append(value);
		}
		
		let newNode = new Node(value);
		let nextNode = this.at(index);
		let prevNode = this.at(index - 1);

		prevNode.next = newNode;
		newNode.next = nextNode;

		return newNode;
	}

	removeAt (index) {
		let size = this.size();
		if (index < 0 || index >= size) {
			return "Out of Bound!";
		}
		
		if (index == 0) {
			let current = this.head;
			let temp = current.next;
			return this.head = temp;
		}

		if (index == this.size() - 1) {
			return this.pop();
		}
		
		let currentNode = this.at(index);
		let prevNode = this.at(index - 1);
		let nextNode = this.at(index + 1);
		prevNode.next = nextNode;

		return currentNode;
	}
}

const linkedList = new LinkedList();

linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(4);

console.log(linkedList.toString());
linkedList.removeAt(2);

console.log(linkedList.at(2));
console.log(linkedList.toString());
// linkedList.pop();
