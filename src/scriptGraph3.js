var width3 = 1200;
var height3 = 700;
var margin3 = {top: 30, right: 20, bottom: 20, left: 190};

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
				.attr("d",path)
				.attr("fill", "#000000");

		svg3.selectAll("area-center")
			.data(features).enter()
			.append("circle")
			.attr("r", 3.5)
			.attr("cx", function(d){return path.centroid(d)[0];})
			.attr("cy", function(d){return path.centroid(d)[1];})
			.style("fill", "4a4a4a");

		svg3.selectAll("text")
			.data(features).enter()
			.append("text")
			.attr("x", function(d){return path.centroid(d)[0]-20;})
			.attr("y", function(d){return path.centroid(d)[1]-10;})
			.text(function(d){return d.properties.name.slice(0,12);})
			.style("fill", "4a4a4a")
			.style("font-size", "9px");

      var zoomsetting= {
        duration: 1000,
        ease: d3.easeCubicOut,
        zoomLevel:5
      };
      function clicked (d){
        var x;
        var y;
        var zoomLevel;
        if (d & centered !==d ) {
          var centroid = path.centroid (d);
          x=centroid[0];
          y=centroid[1];
          zoomLevel=zoomsetting.zoomLevel;
          centered = d;
        }
        else {
          x= width/2;
          y=height/2;
          zoomLevel=1;
          centered=null;
        }
        g.transition()
        .duration(zoomsetting.duration)
        .ease(zoomsetting.ease)
      }
});
