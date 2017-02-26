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

$(document).ready(function(){
	name = getUrlParam('name');
	idString = getUrlParam('ids');
	ids = idString.split(',');
	myChart.setOption(pieChart,true);
	myChart.showLoading({
		text : '数据获取中',
		effect: 'whirling'
	});
	interval = setInterval(setSeriexData, 5000);
});

window.onresize = myChart.resize;      

var pieChart = {
		tooltip : {
			trigger: 'item',
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				magicType : {
					show: true, 
					type: ['pie', 'funnel'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'left',
							max: 1548
						}
					}
				},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		series : [
		          {
		        	  type:'pie',
		        	  radius : '55%',
		        	  center: ['50%', '60%'],
		        	  data:[
		        	        ]
		          }
		          ]
};

function setSeriexData(){

	var seriesData = [];
	var dataValue=[];
	var paramArray = [];
	for(var i=0; i<ids.length; i++){
		var idValue = ids[i];
		if(idValue != ''){
			$.ajax({
				type: 'GET',
				url: "/Monitoring/queryRealTimeData",
				async: false,
				data: {id:idValue},
				dataType: 'json',
				success:function(data){
					dataValue.push({
						name:data.name,
						value:data.value
					});
					paramArray.push(data.name);
				}
			});
		}
	}
	var item={
			name:"饼图",
			type: "pie",
			radius : '55%',
			center: ['50%', '60%'],
			data:dataValue
	};
	myChart.setOption(pieChart,true);
	myChart.hideLoading();
	seriesData.push(item);
	myChart.setOption({
		title : {
			text: name,
		},
		series:seriesData
	}); 

}

