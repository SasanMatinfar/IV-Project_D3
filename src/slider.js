var width4 = 500;
var height4 = 50;
var margin4 = {top: 20, right: 0, bottom: 20, left: 150};

var pType = ["men", "women", "foreigner", "german", "total"];

var csvData = "data/area-rate-2015.csv";

var svg4 = d3.select("#slider")
              .append("svg")
              .attr("width", width4)
              .attr("height", height4)
              .attr("transform", "translate(" + margin4.left + "," + 0 + ")");

var x = d3.scaleLinear()
          .domain([0, 4])
          .range([0, (width4-margin4.left)])
          .clamp(true);

var slider = svg4.append("g")
                  .attr("class", "slider")
                  .attr("transform", "translate(" + 85 + "," + margin4.top + ")");

slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
      .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function() { overYear(x.invert(d3.event.x)); }));

slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 20 + ")")
      .selectAll("text")
        .data(pType)
        .enter().append("text")
          .attr("x", function (d, i) { return i*70; })
          .attr("text-anchor", "bottom")
        .text(function(d) { return d ; });

var handle = slider.insert("circle", ".track-overlay")
                    .attr("class", "handle")
                    .attr("r", 8);


function overYear(h) {
  handle.attr("cx", x(h));
  csvData = "data/area-rate-" + h + ".csv";
  
}


