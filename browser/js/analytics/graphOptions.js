

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
            //staggerLabels: true,
            duration: 500,
            stacked: true,
            xAxis: {
                axisLabel: 'Time (ms)',
                showMaxMin: false,
                tickFormat: function(d){
                    return d3.format(',f')(d);
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

// module.exports = {
// 	pieChartOptions: pieChartOptions,
// 	donutChartOptions: donutChartOptions,
// 	horizontalChartOptions: horizontalChartOptions,
// 	barChartOptions: barChartOptions
// }

