var width1 = 700;
var height1 = 220;
var margin1 = {top: 0, right: 0, bottom: 20, left: 150};

var parseDate = d3.timeParse("y");

var xScale = d3.scaleLinear().domain([2000,2016]).range([20,500]);
var yScale = d3.scaleLinear().domain([9,0]).range([20,180]);

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

var valueline = d3.line()
                    .x(function(d) { return xScale(d.year); })
                    .y(function(d) { return yScale(d.rate); });

var pType = ["men", "women", "foreigner", "german", "total"];
var pTypeColor = ["#333399", "#cc0099", "#00cc00", "#ffcc00", "#595959"];

//drawTrendLine(pType[0], pTypeColor[0]);
//drawTrendLine(pType[1], pTypeColor[1]);
//drawTrendLine(pType[2], pTypeColor[2]);
//drawTrendLine(pType[3], pTypeColor[3]);
//drawTrendLine(pType[4], pTypeColor[4]);

var svg1 = d3.select("#graph1")
                .append("svg")
                    .attr("width", width1 - margin1.left - margin1.right)
                    .attr("height", height1 - margin1.top - margin1.bottom)
                    .attr("transform", "translate(" + margin1.left + "," + 0 + ")");  
    
    d3.csv("data/year-gesamt-rate-total.csv", function(error, data) {

        svg1.append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .style("stroke", "#595959");
            

        svg1.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,180)")
            .call(xAxis.tickFormat(d3.format("0000")))

        svg1.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(20,0)")
            .call(yAxis)

        svg1.selectAll(".line")
            .attr("id", "totalID");
    }); 


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
            .attr("width", 20)
            .attr("height", 20)
            .attr("x", function(d, i) {return i * 50 + 20;})
            .attr("y",  10)
            .attr("id", function(d) {return ""+d;})
            .attr("fill", function(d, i){return pTypeColor[i];})
            .on("click", handleMouseClick);
            
            //.on("mouseover", handleMouseOver)
            //.on("mouseout", handleMouseOut)
    svgBox.selectAll("text")
            .data(pType)
            .enter()
            .append("text")
            .attr("fill", "black")
            .attr("x", function (d, i) {return i * 50 + 20;})
            .attr("y", 40)
            .style("font-size", "9")
            .text(function (d) {return ""+d})
            
function drawTrendLine(d, color){

    d3.csv("data/year-gesamt-rate-" + d + ".csv", function(error, data) {

        svg1.append("path")
            .attr("class", "line")
            .attr("d", valueline(data))
            .style("stroke", ""+color);

        svg1.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0,180)")
            .call(xAxis.tickFormat(d3.format("0000")));

        svg1.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(20,0)")
            .call(yAxis);
        svg1.selectAll(".line")
            .attr("id", ""+d+"ID");
    }); 
}             
/*
function handleMouseClick(d) {
    
    var active  = this.active ? false : true,
     newOpacity = active ? 0 : 1;

        console.log(newOpacity);
        d3.select(d).style("opacity", newOpacity);
        d.active = active;
        
        console.log(d);
}
*/
function handleMouseClick(d) {
    
    if (!d3.select("#"+d+"ID").empty()) {
        
         console.log("object is active!!!");
        d3.selectAll("#"+d+"ID").remove(); 
        } else {
            var lineColor = d3.select(this).attr("fill");
            console.log(lineColor);
            drawTrendLine(d, lineColor);
           
}
}
function handleMouseOver(d, i) {  
    // Use D3 to select element, change color
    d3.select(this).style("fill", "orange");
}

//function handleMouseOut(d, i) {
    // Use D3 to select element, change color back to normal
    //d3.select(this).style("fill", "black");
//}
