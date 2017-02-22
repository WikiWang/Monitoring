$("#chart").css("height", $(window).height());
$("#chart").css("width", $(window).width());

$(window).resize(function() {
	$("#chart").css("height", $(window).height());
	$("#chart").css("width", $(window).width());
	myChart.resize();
});

var myChart = echarts.init(document.getElementById('chart')); 
var name;
var idString;
var ids;
var timeType;
var timeRange;
var series = [];

$(document).ready(function(){
	name = getUrlParam('name');
	idString = getUrlParam('ids');
	ids = idString.split(',');
	timeType = getUrlParam('timeType');
	timeRange = getUrlParam('timeRange');
	myChart.setOption(lineChart,true);
	myChart.showLoading({
        text : '数据获取中',
        effect: 'whirling'
    });
	interval = setInterval(setSeriexData, 5000);
});

window.onresize = myChart.resize;      

var lineChart = {
		tooltip : {
			trigger: 'axis'
		},
		toolbox: {
			show : false,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis :{
			type:'time',
			splitLine:{
				show:false
			}
		},
		yAxis:{
			type:'value',
			splitLine:{
				show:false
			}
		}
};

function setSeriexData(){

	series = [];
	for(var i=0; i<ids.length; i++){
		var idValue = ids[i];
		if(idValue != ''){
			$.ajax({
				type: 'GET',
				url: "/Monitoring/queryData",
				async: false,
				data: {id:idValue, timeType:timeType, timeRange:timeRange},
				dataType: 'json',
				success:function(data){
					if(data.length != 0){
						dataValue = [];
						for(var i=0; i<data.length; i++){
							dataValue.push({
								name:data[i].createTime,
								value:[
								       data[i].createTime,
								       data[i].value
								       ]
							});
						}
						var item={
								name:data[0].name,
								type: 'line',
								data:dataValue,
						};
						series.push(item);
					}
				}
			});
		}
	}
	var now = new Date();
	var secondRange;
	var history;
	var timeTypeInt = parseInt(timeType);
	var timeRangeInt = parseInt(timeRange);
	switch (timeTypeInt) {
	case 1:
		history = new Date(now.getTime() - timeRangeInt*3600*1000);
		break;
	case 2:
		history = new Date(now.getTime() - timeRangeInt*24*3600*1000);
		break;
	case 3:
		history = new Date(now.getTime() - timeRangeInt*7*24*3600*1000);
		break;
	case 4:
		history = new Date(now.getTime());
		history.setMonth(now.getMonth()-timeRangeInt);
		break;
	case 5:
		history = new Date(now.getTime());
		history.setFullYear(now.getFullYear()-timeRangeInt);
		break;
	default:
		break;
	}
	myChart.setOption({
		series:[]
	});
	myChart.hideLoading();
	myChart.setOption({
		title : {
	        text: name,
	    },
		xAxis :{
			type:'time',
			splitLine:{
				show:false
			},
			min:history,
			max:now
		},
		series:series
	}); 
}

