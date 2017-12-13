var width3 = 1200;
var height3 = 700;
var margin3 = {top: 30, right: 20, bottom: 20, left: 190};
var colorDomain;
var colorScale;
var projection = d3.geoMercator()
                    .scale(120000)
                    .center([11.61,48.160]);

var path = d3.geoPath().projection(projection);

var svg3 = d3.select ("#graph3")
              .append("svg")
              .attr ("width", width3)
              .attr ("height" , height3)
              .attr("transform", "translate(" + margin3.left + "," + 0 + ")")
              .append ("g")
              .attr("transform", "translate(" + 75 + "," + 30 + ")");

var rateTable = d3.csv("data/ratemap2015.csv");
  console.log(rateTable);
var colorDomain = d3.extent(rateTable, function(d){return d.rate;});

            console.log("colordomain is: " + colorDomain);


var colorScale = d3.scaleLinear().domain(colorDomain).range(["lightblue","blue"]);

d3.json("data/munich.geojson", function(error, mapData){
    console.log(mapData);
    var features = mapData.features;

      svg3.selectAll("path")
			.data(features).enter()
			.append("path")
				.attr("class", "district")
				.attr("data-name",function(munich_district){return munich_district.properties.name;})
				.attr("data-munich_r_1",function(munich_district){return munich_district.properties.munich_r_1;})
				.attr("data-munich_r_2",function(munich_district){return munich_district.properties.munich_r_2;})
				.attr("id",function(munich_district){return munich_district.properties.cartodb_id;})
				.attr("title",function(munich_district){return munich_district.properties.name;})
				.attr("d",path)
       .style("fill", function(d) {return colorScale(d.rate);});

		svg3.selectAll("area-center")
			.data(features).enter()
			.append("circle")
			.attr("r", 3.5)
			.attr("cx", function(d){return path.centroid(d)[0];})
			.attr("cy", function(d){return path.centroid(d)[1];})
			.style("fill", "#4a4a4a");





		svg3.selectAll("text")
			.data(features).enter()
			.append("text")
			.attr("x", function(d){return path.centroid(d)[0]-20;})
			.attr("y", function(d){return path.centroid(d)[1]-10;})
			.text(function(d){return d.properties.name.slice(0,12);})
			.style("fill", "#4a4a4a")
			.style("font-size", "9px");

});

//  .defer(d3.csv, "data/area-rate-2015.csv")
  //.defer(d3.json, "data/munich.geojson")
  //.await(analyze);

//function analyze(error, myCsv, myGeo) {
  //if(error) { console.log(error); }

//console.log (d3.csv, "data/area-rate-2015.csv");
//console.log (d3.json, "data/munich.geojson");
//}

/*function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

//var csvTable= d3.csv("data/area-rate-2015.csv");
//var jsonTable= d3.json("data/munich.geojson");
*/
function mapColor(d) {
        colorScale
        console.log("colorscale is: " + colorScale);
  }
