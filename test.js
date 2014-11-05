function A(x) {
	this.Y = x;

	this.print = function () {
		console.log(this.Y);
	}

}

var B = new A(1);

B.print();