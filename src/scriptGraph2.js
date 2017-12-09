var width2 = 1200;
var height2 = 420;
var margin2 = {top: 20, right: 20, bottom: 20, left: 150};

var svg2 = d3.select("#graph2")
				.append("svg")
					.attr("width", width2)
					.attr("height", height2)
					.attr("transform", "translate(" + margin2.left + "," + margin2.top + ")")
						
d3.csv("data/area-rate-2015.csv", function(data) {

	svg2.selectAll("rect")
		.data(data)
		.enter()
			.append("rect")
				.attr("height", function (d) { return d.rate * 50 ; })
				.attr("width", 20)
				.attr("x", function(d, i) { return i*40; })
				.attr("y", function (d) { return height2 - (d.rate * 50) - 150; })
				.attr("fill", "#4a4a4a")
					
	svg2.selectAll("text")
		.data(data)
		.enter()
			.append("text")
				.attr("fill", "black")
				.attr("x", function (d, i) { return i*40 +10; })
				.attr("y", height2 - 140)
				.style("writing-mode", "tb")
				.style("font-size", "9")
				.text(function (d) { return d.area})	
		});