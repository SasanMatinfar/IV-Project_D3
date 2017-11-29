var width = 1200;
var height = 500;
var margin = {top: 20, right: 20, bottom: 20, left: 150};

var xScale = d3.scaleLinear().domain([2000,2016]).range([20,1000]);
var yScale = d3.scaleLinear().domain([10,0]).range([20,400]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var valueline = d3.line()
    					.x(function(d) { return xScale(d.year); })
    					.y(function(d) { return yScale(d.rate); });

var svg1 = d3.select("#graph1")
    			.append("svg")
        			.attr("width", width -margin.left - margin.right)
        			.attr("height", height - margin.top - margin.bottom)
        			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
						
d3.csv("year-gesamt-rate.csv")
	.row(function(d) {return {year:Number(d.year), type:String(d.type), rate:Number(d.rate)};})
			
d3.csv("year-gesamt-rate.csv", function(data) {

	svg1.append("path")
        	.attr("class", "line")
        	.attr("d", valueline(data))

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(0,400)")
        .call(xAxis)

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(20,0)")
        .call(yAxis)

})