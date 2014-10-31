var input = process.argv[2];

function Square3 (d) {
	if (d.length != 9)
		return false;
	this.data = d;

	this.solved = function () {
		return this.data.join("") == "012345678";
	}

	function _swap(a) {
		c = this.data[a[0]];
		this.data[a[0]] = this.data[a[1]];
		this.data[a[1]] = this.data[a[2]];
		this.data[a[2]] = c;
	}

	this.R = function(i) {
		i = i||1;
		_swap(i > 0 ? [2,5,8] : [8,5,2]);
	}

	this.M = function(i) {
		i = i||1;
		_swap(i > 0 ? [1,4,7] : [7,4,1]);
	}

	this.L = function(i) {
		i = i||1;
		_swap(i > 0 ? [0,3,6] : [6,3,0]);

	}

	this.U = function(i) {
		i = i||1;
		_swap(i > 0 ? [0,1,2] : [2,1,0]);
	}

	this.D = function(i) {
		i = i||1;
		_swap(i > 0 ? [6,7,8] : [8,7,6]);
	}

	this.E = function(i) {
		i = i||1;
		_swap(i > 0 ? [3,4,5] : [5,4,3]);
	}
}

var a;
if (input) {
	input = input.split(' ').map(Number);
	a = new Square3(input);
}
else {
	a = new Square3([0,1,2,3,4,5,6,7,8]);
}

console.log(a.data);

moves = [['L', 1], ['M', 1], ['R', 1], ['U', 1], ['D', 1], ['E', 1], 
		 ['L', -1], ['M', -1], ['R', -1], ['U', -1], ['D', -1], ['E', -1]];

var total = 0;
for (var i = 0; i < moves.length; i++) {
	if (i == j + 6)
			continue;
	for (var j = 0; j < moves.length; j++) {
		if (j == k + 6)
			continue;
		for (var k = 0; k < moves.length; k++) {
			a = new Square3([0,1,2,3,4,5,6,7,8]);
			a[moves[i][0]](moves[i][1]);
			a[moves[j][0]](moves[j][1]);
			a[moves[k][0]](moves[k][1]);
			total += a.solved() ? 0:1;
		}
	}
}

console.log(total);