app.directive("d3chart",function(){
	return{
		restrict:"E",
		link:function(){
			console.log("inside directive")
			var diameter = 600,
		    format = d3.format(",d");

			var pack = d3.layout.pack()
			    .size([diameter - 4, diameter - 4])
			    .value(function(d) { return d.size; });

			var svg = d3.select(".profile-chart").append("svg")
			    .attr("width", diameter+20)
			    .attr("height", diameter+20)
			  	.append("g")
			    .attr("transform", "translate(20,20)");

			d3.json("lib/profile.json", function(error, root) {
			  var node = svg.datum(root).selectAll(".node")
			      .data(pack.nodes)
			    .enter().append("g")
			      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			  node.append("title")
			      .text(function(d) { return d.name + (d.children ? "" : ": " + format(d.size)); });

			  var circle = node.append("circle").attr("r", function(d) { return d.r/2; })
			  				.style("fill",function(d){console.log(d);
			  					if(d.parent && d.parent.name=='styling'){
			  						return 'pink';
			  					}
			  					else if(d.parent && d.parent.name=='basics'){
			  						return 'orange';
			  					}
			  					else if(d.parent && d.parent.name=='frameworks'){
			  						return 'cornflowerblue';
			  					}
			  					else if(d.parent && d.parent.name=='libraries'){
			  						return 'yellow';
			  					}

			  				})

			  circle.transition().duration(2000)
			      .attr("r", function(d) { return d.r; });

			  node.filter(function(d) { return !d.children; }).append("text")
			      .attr("dy", ".3em")
			      .style("text-anchor", "middle")
			      .text(function(d) { return d.name.substring(0, d.r / 3); });

   			//circle.transition().duration(200).attr("r", function(d) { return d.r*2; });

			});

			d3.select(self.frameElement).style("height", diameter + "px");
			
	}
	}
})