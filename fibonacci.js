//  recursive way of fibonacci
function fibsRec(n, arr = [0, 1]) {
	if (arr.length >= n) {
		return arr.slice(0, n);
	  }
	  
	const newNumber = arr.at(-1) + arr.at(-2);
	arr.push(newNumber);
	return fibsRec(n, arr);

}

// iterative implementation of fibonacci
function fibs(n) {
	const arr = [0,1];
	if (n < 0) return "Error";
	if (n == 0) return [0];
	if (n == 1) return arr;
	
	for (let i = 2; i<n; i++) {
		arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
	}

	return arr;
}

console.log(fibs(7));
console.log(fibsRec(7));