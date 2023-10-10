
function mergesort (arr) {
	if (arr.length <= 1){
		return arr
	}
	let n = arr.length;
	let left = [], right = [];
	for (let i = 0; i < n; i++){
		if (i < Math.floor(n/2)) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	
	left = mergesort(left);
	right = mergesort(right);
	
	return merge(left, right);
	
}

function merge(left, right) {
	let result = [];

	while (left.length > 0 && right.length > 0) {
		if (left[0] <= right[0]) {
			result.push(left[0]);
			left.shift();
		} else {
			result.push(right[0]);
			right.shift();
		}
	}
	
	while (left.length > 0) {
		result.push(left[0]);
		left.shift();
	}
	
	while (right.length > 0) {
		result.push(right[0]);
		right.shift();
	}
	
	return result;
}

const x = [1,3,5,4,6,2,.5];
console.log(mergesort(x));