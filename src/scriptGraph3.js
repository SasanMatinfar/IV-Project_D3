var width3 = 1200;
var height3 = 700;
var margin3 = {top: 30, right: 20, bottom: 20, left: 200};
// to draw shape and lines
var projection = d3.geoMercator()
                    .scale(120000)
                    .center([11.61,48.160]);

var path = d3.geoPath().projection(projection);

var svg3 = d3.select ("#graph3")
              .append("svg")
              .attr ("width", width3)
              .attr ("height" , height3)
              .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")")
              .append ("g")
              .attr("transform", "translate(" + 70 + "," + margin3.top + ")");

d3.json("data/munich.geojson", function(error, mapData){
    console.log(mapData);

// code
    //var m_n=munich.geojson.features(mapData, mapData.features.properties.name).features
    //console.console.log(m_n);


    var features = mapData.features;

        svg3.selectAll ("path")
        .data(features).enter()
        // add a path for each district
        .append("path")
        .attr("class", "district")

        //



        .attr("data-name",function(munich_district){
          return munich_district.properties.name;
        })
        .attr("data-munich_r_1",function(munich_district){
          return munich_district.properties.munich_r_1;
        })
        .attr("data-munich_r_2",function(munich_district){
          return munich_district.properties.munich_r_2;
        })
        .attr("id",function(munich_district){
          return munich_district.properties.cartodb_id;
        })
        .attr("title",function(munich_district){
          return munich_district.properties.name;
        })
        // d a list of cordinates , in orther to draw a shape
        .attr("d",path)
// text

svg3.append("text")
.attr("data-munich_r_1",function(munich_district){return path.centroid(munich_district) [0];})
.attr("data-munich_r_2",function(munich_district){return path.centroid(munich_district) [1];})
//.text(function ()){return .properties.name;})

});

//click

//mouseover
