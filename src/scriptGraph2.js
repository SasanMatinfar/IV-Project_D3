var width2 = 1000;
var height2 = 480;
var margin2 = {top: 0, right: 20, bottom: 20, left: 75};

var svg2 = d3.select("#graph2")
				.append("svg")
					.attr("width", width2)
					.attr("height", height2)
					.attr("transform", "translate(" + margin2.left + "," + 0 + ")")
d3.csv("data/area-rate-2015.csv", function(data) {

	svg2.selectAll("rect")
		.data(data)
		.enter()
			.append("rect")
				.attr("width", function (d) { return d.rate * 50 ; })
				.attr("height", 13)
				.attr("y", function(d, i) { return i*18; })
				.attr("x", function (d) { return height2 - (d.rate * 50) - 150; })
				.attr("fill", "#4a4a4a")
					
	svg2.selectAll("text")
		.data(data)
		.enter()
			.append("text")
				.attr("fill", "black")
				.attr("y", function (d, i) { return i*18 +10; })
				.attr("x", height2 - 140)
				.style("writing-mode", "lr")
				.style("font-size", "9")
				.text(function (d) { return d.area})	
		});

svg2.transition() // Gratuitous intro!
        .duration(750)
        .tween("overYear", function() {
            var i = d3.interpolate(0, 70);
            return function(t) { overYear(i(t)); };
        });