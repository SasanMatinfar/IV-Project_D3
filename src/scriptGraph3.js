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
				.attr("d",path);
        //.style("fill", function (d) { return mapColor(d);});



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

d3.queue()
  .defer(d3.csv, "data/area-rate-2015.csv")
  .defer(d3.json, "data/munich.geojson")
  .await(analyze);

function analyze(error, myCsv, myGeo) {
  if(error) { console.log(error); }

  
}


/*function mapColor(d) {
  d3.csv("data/area-rate-2015.csv", function(error, csvData) {
          d3.json("data/munich.geojson", function(error, mapData){
                colorDomain = d3.extent(csvData, function(mapData) {
                  if (csvData.area == mapData.features.name){
                    return csvData.rate;
                    }
                  });

                       colorScale = d3.scaleLinear().domain(colorDomain).range(["white","black"]);

            });


    })
  return colorScale(csvData.rate);}
*/
