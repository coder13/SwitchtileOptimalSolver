class Square: 
	def __init__(self): 
		self.data = [0,1,2,3,4,5,6,7,8]

	def swap(self, p): 
		c = self.data[p[0]]
		self.data[p[0]] = self.data[p[1]]
		self.data[p[1]] = self.data[p[2]]
		self.data[p[2]] = c


	moves = {"R": [2,5,8], "R'": [8,5,2],
			 "M": [1,4,7], "M'": [7,4,1],
			 "L": [0,3,6], "L'": [6,3,0],
			 "U": [0,1,2], "U'": [2,1,0],
			 "E": [6,7,8], "E'": [8,7,6],
			 "D": [3,4,5], "D'": [5,4,3]}

	def R(self, i): 
		self._swap([2,5,8] if i > 1 else [8,5,2])

	def M(self, i): 
		self._swap([1,4,7] if i > 1 else [7,4,1])

	def L(self, i): 
		self._swap([0,3,6] if i > 1 else [6,3,0])

	def U(self, i): 
		self._swap([0,1,2] if i > 1 else [2,1,0])

	def E(self, i): 
		self._swap([6,7,8] if i > 1 else [8,7,6])

	def D(self, i): 
		self._swap([3,4,5] if i > 1 else [5,4,3])
	
	def solved(self): 
		return self.data == [0,1,2,3,4,5,6,7,8]

m = ["R", "R'", "M", "M'", "L", "L'", "U", "U'", "E", "E'", "D", "D'"]

def apply(moves): 
	s = Square()
	for m in moves: 
		s.swap(Square.moves[m])
	return s

positions = []

total = 0

def count(n, moves):
	if n<1: 
		global total
		global positions
		s = apply(moves)
		if not s.solved():
			total += 1
		if not (s.data in positions):
			positions += [s.data];
	elif len(moves) == 0:
		for i in m:
			print(i)
			count(n-1, [i])
	else:
		for i in m: 
			if i[0] == moves[len(moves)-1][0] and len(i + moves[len(moves)-1]) == 3: 
				continue
			else:
				count(n-1, moves + [i])


# for i in m:
# 	for j in m: 
# 		for k in m: 
# 			for l in m: 
# 				s = apply([i, j, k, l])
# 				if not s.solved(): 
# 					total += 1

if __name__ == '__main__':
	# total = sum([count(i+1, []) for i in range(5)])
	count(1, [])
	print('2: ')
	count(2, [])
	print('3: ')
	count(3, [])
	print('4: ')
	count(4, [])

	count(5, [])
	print('5: ')
	print(total)
	print(len(positions))
	
	count(6, [])
	print('6: ')
	print(total)
	print(len(positions))

	count(7, [])
	print('7: ')
	print(total)
	print(len(positions))