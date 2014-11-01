var input = process.argv[2];

function Square3 (d) {
	if (!d || d.length != 9)
		this.data = [0,1,2,3,4,5,6,7,8];
	else 
		this.data = d;

	function _swap(data, a) {
		c = data[a[0]];
		data[a[0]] = data[a[1]];
		data[a[1]] = data[a[2]];
		data[a[2]] = c;
	}

	this.solved = function() {
		return this.data.join('') == "012345678";
	};

	this.R = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [2,5,8] : [8,5,2]);
	};

	this.M = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [1,4,7] : [7,4,1]);
	};

	this.L = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [0,3,6] : [6,3,0]);
	};

	this.U = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [0,1,2] : [2,1,0]);
	};

	this.D = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [6,7,8] : [8,7,6]);
	};

	this.E = function(i) {
		i = i||1;
		_swap(this.data, i > 0 ? [3,4,5] : [5,4,3]);
	};

	this.get = function() {
		return this.data.join('');
	};

	this.apply = function(moves) {
		moves.forEach(function (i) {
			this[i[0]](i[1]);
		});
	};
}

moves = [['R', 1], ['M', 1], ['L', 1], ['U', 1], ['D', 1], ['E', 1], 
		 ['R', -1], ['M', -1], ['L', -1], ['U', -1], ['D', -1], ['E', -1]];

var positions = [];

var total = 0;

function a(s, moves) {

}

function c(n, mvs) {
	if (n < 1)
		return;
	if (!mvs && n == 1) { // Bottom most.
		for (var i = 0; i < moves.length; i++) {
			var s = new Square3();
			s[moves[i][0]](moves[i][1]);
			total += s.solved() ? 0 : 1;
			if (positions.indexOf(s.get()) < 0) {
				positions.push(s.get());
			}
		}
	} else if (!mvs) { //bottom most
		for (var i = 0; i < moves.length; i++) {
			console.log(n);
			console.log(typeof c)
			c(n-1, s, [moves[i]]);

		}
	} if (mvs && n == 1) { // topmost
		for (var i = 0; i < moves.length; i++) {
			var s = new Square3().apply(moves);

			total += s.solved() ? 0 : 1;

			if (positions.indexOf(s.get()) < 0) {
				positions.push(s.get());
			}
		}
	} else if(mvs) {
		for (var i = 0; i < moves.length; i++) {
			c(n-1, s, mvs.concat(moves[i]));
		}
	}
}

// for (var i = 0; i < moves.length; i++) {
// 	if (i == j + 6)
// 			continue;
// 	for (var j = 0; j < moves.length; j++) {
// 		if (j == k + 6)
// 			continue;
// 		for (var k = 0; k < moves.length; k++) {
// 			var s = new Square3();
// 			s[moves[i][0]](moves[i][1]);
// 			s[moves[j][0]](moves[j][1]);
// 			s[moves[k][0]](moves[k][1]);
			
// 			total += s.solved() ? 0:1;

// 			if (positions.indexOf(s.get()) < 0) {
// 				positions.push(s.get());
// 			}

// 		}
// 	}
// }

c(3);

console.log(total);
console.log(positions.length);