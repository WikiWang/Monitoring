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
	myChart.setOption(barChart,true);
	myChart.showLoading({
        text : '数据获取中',
        effect: 'whirling'
    });
	interval = setInterval(setSeriexData, 5000);
});

window.onresize = myChart.resize;      

var barChart = {
	    tooltip : {
	        trigger: 'axis'
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
//	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : []
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'柱形图',
	            type:'bar',
	            data:[],
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
			name:"柱形图",
			type: "bar",
			data:dataValue,
	};
	myChart.setOption(barChart,true);
	myChart.hideLoading();
	seriesData.push(item);
	myChart.setOption({
		title : {
	        text: name,
	    },
		xAxis : [
		         {
		        	 type : 'category',
		        	 data : paramArray
		         }
		         ],
		series:seriesData
	}); 

}

