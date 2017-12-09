var width1 = 1200;
var height1 = 500;
var margin1 = {top: 20, right: 20, bottom: 20, left: 150};


var parseDate = d3.timeParse("y");

var xScale = d3.scaleLinear().domain([2000,2016]).range([20,1000]);
var yScale = d3.scaleLinear().domain([10,0]).range([20,400]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var valueline = d3.line()
                    .x(function(d) { return xScale(d.year); })
                    .y(function(d) { return yScale(d.rate); });
                       
var svg1 = d3.select("#graph1")
    			.append("svg")
        			.attr("width", width1 - margin1.left - margin1.right)
        			.attr("height", height1 - margin1.top - margin1.bottom)
        			.attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
	
d3.csv("data/year-gesamt-rate.csv", function(error, data) {

	svg1.append("path")
            .attr("class", "line")
        	.attr("d", valueline(data))

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(0,400)")
            .call(xAxis.tickFormat(d3.format("0000")))

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(20,0)")
            .call(yAxis)
});