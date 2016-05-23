app.factory('AnalyticsFactory', ($http) => {
	const parseData = res => res.data;


	const pieChartOptions = {
	    chart: {
	        type: 'pieChart',
	        height: 500,
	        x: function(d){return d.key},
	        y: function(d){return d.y},
	        showLabels: true,
	        duration: 500,
	        labelThreshold: 0.01,
	        labelSunbeamLayout: true,
	        legend: {
	            margin: {
	                top: 5,
	                right: 35,
	                bottom: 5,
	                left: 0
	            }
	        }
	    }
	};

	const donutChartOptions = {
	    chart: {
	        type: 'pieChart',
	        height: 450,
	        donut: true,
	        x: function(d){return d.key},
	        y: function(d){return d.y},
	        showLabels: true,
	        pie: {
	            startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
	            endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
	        },
	        duration: 500,
	        legend: {
	            margin: {
	                top: 5,
	                right: 140,
	                bottom: 5,
	                left: 0
	            }
	        }
	    }
	};

	const lineChartOptions = {
		chart: {
	        type: 'lineChart',
	        height: 450,
	        margin : {
	            top: 20,
	            right: 20,
	            bottom: 40,
	            left: 55
	        },
	        x: function(d){ return d.x; },
	        y: function(d){ return d.y; },
	        useInteractiveGuideline: false,
	        tooltip: {
	        	contentGenerator: function (e) {
	        		var series = e.series[0];
                  	if (series.value === null) return;
	        		var rows = 
                    "<tr>" +
                      "<td >" + 'Positive: ' + "</td>" +
                      "<td >" + e.point.sentiment.positive + "</td>" + 
                    "</tr><tr>" +
                      "<td>" + 'Negative: ' + "</td>" +
                      "<td>" + e.point.sentiment.negative + "</td>" +
                    "</tr>";

                  var header = 
                    "<thead style='background-color: " + series.color + ";'>" + 
	                    "<tr>" +
	                    	"<td><strong>" + series.key + "</strong></td>" +
	                    "</tr>" + 
	                    "<tr>" +
                        	"<td><strong>Scene: "+e.value+"</strong></td>" +
                        	"<td><strong>Total Words: "+e.point.sentiment.tokens.length+"</strong></td>" +
                      	"</tr>" + 
                    "</thead>";
                    
                  return "<table>" +
                      header +
                      "<tbody>" + 
                        rows + 
                      "</tbody>" +
                    "</table>";
                }
            },
	        lines: {
	            forceY: [-0.5,0.5],
	        },
	        xAxis: {
	            axisLabel: 'Scene'
	        },
	        yAxis: {
	            axisLabel: 'Sentiment',
	            tickFormat: function(d){
	                return d3.format('.04f')(d);
	            },
	            axisLabelDistance: -10
	        },
		    title: {
		        enable: true,
		        text: 'Sentiment over Time'
		    }
		}
	};
	


	return {
		getScreenPlays: () => $http.get('/api/analytics/public/').then(parseData),
		getSentiment: (id) => $http.get('/api/analytics/public/' + id + '/emotion').then(parseData),
		getCharacters: (id) => $http.get('/api/analytics/public/' + id + '/wordcount').then(parseData),
		getWords: (id) => $http.get('/api/analytics/public/' + id + '/wordweight').then(parseData),
		getUserSentiment: (id) => $http.get('/api/analytics/user/' + id + '/emotion').then(parseData),
		getUserCharacters: (id) => $http.get('/api/analytics/user/' + id + '/wordcount').then(parseData),
		lineChartOptions: lineChartOptions,
		donutChartOptions: donutChartOptions,
		pieChartOptions: pieChartOptions
	};
});
