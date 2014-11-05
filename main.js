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
}

function apply(moves, s) {
	var s3 = s || new Square3();
	moves.forEach(function (i) {
		s3[i[0]](i[1]);
	});
	return s3;
}

moves = [['R', 1], ['M', 1], ['L', 1], ['U', 1], ['D', 1], ['E', 1],
		 ['R', -1], ['M', -1], ['L', -1], ['U', -1], ['D', -1], ['E', -1]];

var positions = [];

var total = 0;

// function count(n, mvs) {
// 	if (n < 1) {
// 		var s = apply(mvs);

// 		total += s.solved() ? 0 : 1;

// 		if (positions.indexOf(s.get()) < 0) {
// 			positions.push(s.get());
// 		}
// 		return;
// 	}
// 	if (!mvs && n == 1) {
// 		for (var i = 0; i < moves.length; i++) {
// 			var s = apply([moves[i]]);
// 			total += s.solved() ? 0 : 1;
// 			if (positions.indexOf(s.get()) < 0) {
// 				positions.push(s.get());
// 			}
// 		}
// 	} else if (!mvs) { //bottom most
// 		for (var i = 0; i < moves.length; i++) {
// 			process.stdout.write(i + " ");
// 			count(n-1, [moves[i]]);
// 		}
// 	} else if(mvs) {
// 		for (var i = 0; i < moves.length; i++) {
// 			if (moves[i][0] == mvs[mvs.length-1][0] && 
// 				moves[i][1] + mvs[mvs.length-1][1] == 0){
// 				continue;
// 			}
// 			count(n-1, mvs.concat([moves[i]]));
// 		}
// 	}
// }

function count(n, mvs) {
	if (n < 1) {
		var s = apply(mvs);

		total += s.solved() ? 0 : 1;

		if (positions.indexOf(s.get()) < 0) {
			positions.push(s.get());
		}
		return;
	} if (!mvs) { //bottom most
		moves.forEach(function (i) {
			process.stdout.write(i + " ");
			count(n-1, [i]);
		});
	} else if(mvs) {
		moves.forEach(function (i) {
			if (i[0] == mvs[mvs.length-1][0] && i[1] + mvs[mvs.length-1][1] == 0) {
				return;
			}
			count(n-1, mvs.concat([i]));
		});
	}
}

function main (n) {
	total = 0;
	positions = [];
	count(n);
	process.stdout.write('\n');
	console.log('After ', n, 'moves: ');
	console.log('total unsolved: ', total);
	console.log('total: unique: ', positions.length);
}
console.time("time");
for (var i = 1; i < (Number(process.argv[2] || 1))+1; i++) {
	main(i);
}
console.timeEnd("time");