var async = require('async'), 
	_ 	  = require('underscore');
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
moves = [['R', 1], ['M', 1], ['L', 1], ['U', 1], ['E', 1], ['D', 1],
		['R', -1], ['M', -1], ['L', -1], ['U', -1], ['E', -1], ['D', -1]];

// R L R' L' == ""
function simplify(mvs) {
	// console.log(mvs);
	if (mvs.length < 3)
		return mvs;
	a = [moves[0], moves[1], moves[2], moves[6], moves[7], moves[8]];
	b = [moves[3], moves[4], moves[5], moves[9], moves[10], moves[11]]
	var flag;
	for (var i = 0; i < mvs.length-1; i++) {
		for (var j = i+1; j < mvs.length; j++) {
			if (mvs[i][0] == mvs[j][0] && mvs[i][1] + mvs[j][1] == 0 && j - i > 2) {
				flag = true;
				var s = mvs.slice(i+1, j-1);
				
				s.forEach(function(i) {
					if (a.indexOf(mvs[i]) != -1) {
						if (b.indexOf(mvs[i]) != -1) {
							flag = false;
						}
					} else {
						if (a.indexOf(mvs[i]) != -1) {
							flag = false;
						}
					}
				});
				if (flag) {
					mvs.splice(j,1);
					mvs.splice(i,1);
					i = 0;
					j = 0;
				}
			}
		}
	}
	// console.log(mvs);
	return mvs;
}


var positions = {0: [], 1: [], 2: [], 
				 3: [], 4: [], 5: [], 
				 6: [], 7: [], 8: []}, 
	total = 0;

function count(n, mvs) {
	if (n < 1) {
		sMvs = simplify(mvs);
		var s = apply(sMvs);

		if (!s.solved()) {
			total += 1;
			master.push(s.get());
			if (positions[s.get()[0]].indexOf(s.get()) == -1)
				positions[s.get()[0]].push(s.get());
		}
	} else if (!mvs) { //bottom most
		moves.forEach(function (i) {
			console.time(String(i));
			process.stdout.write(i[0] + " ");
			count(n-1, [i]);

				// positions = _.uniq(positions);
				console.log('total: unique: ', unique());
			console.timeEnd(String(i));
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

function unique() {
	return positions[0].length + positions[1].length + positions[2].length + 
		   positions[3].length + positions[4].length + positions[5].length + 
		   positions[6].length + positions[7].length + positions[8].length;
}

function main (n) {
	console.time(String(n));
	console.log(n, 'moves: ');
	count(n);
	process.stdout.write('\n');
	console.timeEnd(String(n));
	console.log('total unsolved: ', total);
	console.log('total: unique: ', unique());
	console.log("\n");
}
console.time("time");
for (var i = 1; i < (Number(process.argv[2] || 1))+1; i++) {
	main(i);
}
console.timeEnd("time");