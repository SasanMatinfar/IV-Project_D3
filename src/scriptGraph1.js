var width1 = 700;
var height1 = 220;
var margin1 = {top: 0, right: 0, bottom: 20, left: 150};


var parseDate = d3.timeParse("y");

var xScale = d3.scaleLinear().domain([2000,2016]).range([20,500]);
var yScale = d3.scaleLinear().domain([9,1]).range([20,180]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var valueline = d3.line()
                    .x(function(d) { return xScale(d.year); })
                    .y(function(d) { return yScale(d.rate); });
                       
var svg1 = d3.select("#graph1")
    			.append("svg")
        			.attr("width", width1 - margin1.left - margin1.right)
        			.attr("height", height1 - margin1.top - margin1.bottom)
        			.attr("transform", "translate(" + margin1.left + "," + 0 + ")");  
	
d3.csv("data/year-gesamt-rate.csv", function(error, data) {

	svg1.append("path")
            .attr("class", "line")
        	.attr("d", valueline(data))

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(0,180)")
            .call(xAxis.tickFormat(d3.format("0000")))

    svg1.append("g")
        	.attr("class", "axis")
            .attr("transform", "translate(20,0)")
            .call(yAxis)
});
var pType = ["men", "women", "foreigner", "german", "total"];
var pTypeColor = ["#333399", "#cc0099", "#00cc00", "#ffcc00", "#595959"];

var svgBox = d3.select("#container")
                .append("svg")
                    .attr("width", 250)
                    .attr("height", 50)
                    .attr("transform", "translate(" + 300 + "," + 0 + ")");
                    

    svgBox.selectAll("rect")
            .data(pType)
            .enter()
            .append("rect")
            .attr("class", "clickBox")
            .attr("width", 25)
            .attr("height", 25)
            .attr("id", function(d) { return ""+d;})
            .attr("x", function(d, i) {return i * 50 + 25;})
            .attr("y",  10)
            .attr("fill", function(d, i){ return pTypeColor[i];})
            .on("click", handleMouseClick);
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
           

function handleMouseOver(d, i) {  
            // Use D3 to select element, change color
            d3.select(this)
            .style("fill", "orange");
          }

function handleMouseOut(d, i) {
            // Use D3 to select element, change color back to normal
            d3.select(this).style("fill", "black");
        }

function handleMouseClick(event) {
          
    var mouse = d3.mouse(this);
    
    console.log("clicked: " + event.target.mouse, event.target);

}







