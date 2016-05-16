

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

const horizontalChartOptions = {
	chart: {
            type: 'multiBarHorizontalChart',
            height: 450,
            x: function(d){return d.label},
            y: function(d){return d.value},
            //yErr: function(d){ return [-Math.abs(d.value * Math.random() * 0.3), Math.abs(d.value * Math.random() * 0.3)] },
            showControls: true,
            showValues: true,
            duration: 500,
            xAxis: {
                showMaxMin: false
            },
            yAxis: {
                axisLabel: 'Values',
                tickFormat: function(d){
                    return d3.format(',.2f')(d);
                }
            }
        }
}

const barChartOptions = {
	chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            clipEdge: true,
            staggerLabels: true,
            duration: 500,
            stacked: true,
            xAxis: {
                axisLabel: 'Character',
                showMaxMin: false,
                tickFormat: function(d){
                    console.log(d);
                    debugger;
                    var label = scope.data[0].values[d].label;
                    return label;
                }
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -20,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }
        }
}

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
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Sentiment',
                    tickFormat: function(d){
                        return d3.format('.04f')(d);
                    },
                    axisLabelDistance: -10
                },
                // callback: function(chart){
                //     console.log("!!! lineChart callback !!!");
                // }
            },
            title: {
                enable: true,
                text: 'Sentiment'
            },
            subtitle: {
                enable: true,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<b>Figure 1.</b> Lorem ipsum',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
}

// This is for comparative Bar Chart
const someData = [{
		    key: "Cumulative Return",
		    values: [
		        { "label" : "A" , "value" : -29.765957771107 },
		        { "label" : "B" , "value" : 0 },
		        { "label" : "C" , "value" : 32.807804682612 },
		        { "label" : "D" , "value" : 196.45946739256 },
		        { "label" : "E" , "value" : 0.19434030906893 },
		        { "label" : "F" , "value" : -98.079782601442 },
		        { "label" : "G" , "value" : -13.925743130903 },
		        { "label" : "H" , "value" : -5.1387322875705 }
		        ]
		    }]


// This is for the line graph
const sinAndCos = () => {
            var sin = [],sin2 = [],
                cos = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: i % 10 == 5 ? null : Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e'  //color - optional: choose your own line color.
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c'
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                }
            ];
        };


 const generateData = () => {
            return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data
                };
            });
        }

        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_waves(n, m) {
            return d3.range(n).map(function(i) {
                return d3.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }
    

