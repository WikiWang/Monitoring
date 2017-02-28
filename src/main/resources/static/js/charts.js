$("#chart").css("height", 420);
//window.onresize = function(){
//myChart.resize();
//};

var myChart = echarts.init(document.getElementById('chart'));  

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

var barChart = {
		tooltip : {
			trigger: 'axis'
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
//				magicType : {show: true, type: ['line', 'bar']},
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

var gaugeChart = {
		tooltip : {
	        formatter: "{a} <br/>{b} : {c}"
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    series : [
	        {
	            name:'仪表盘',
	            type:'gauge',
	            splitNumber: 10,       // 分割段数，默认为5
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: [[0.2, '#228b22'],[0.8, '#48b'],[1, '#ff4500']], 
	                    width: 8
	                }
	            },
	            axisTick: {            // 坐标轴小标记
	                splitNumber: 10,   // 每份split细分多少段
	                length :12,        // 属性length控制线长
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    color: 'auto'
	                }
	            },
	            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto'
	                }
	            },
	            splitLine: {           // 分隔线
	                show: true,        // 默认显示，属性show控制显示与否
	                length :30,         // 属性length控制线长
	                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
	                    color: 'auto'
	                }
	            },
	            pointer : {
	                width : 5
	            },
	            title : {
	                show : true,
	                offsetCenter: [0, '-40%'],       // x, y，单位px
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontWeight: 'bolder'
	                }
	            },
	            detail : {
	                formatter:'{value}',
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: 'auto',
	                    fontWeight: 'bolder'
	                }
	            },
	            data:[{value: 50, name: '完成率'}]
	        }
	    ]
};

var chartType = 'line';
var RealTimeType = "timeRange";
var $active = $("#lineChart");
var interval = null;
var len;//获取span标签的个数
var ids=[];
var timeType;
var timeRange;
var min = 0;
var max = 100;

function showLine() {
	$("#timeRange").show();
	$("#timeMetric").show();
	$("#minp").hide();
	$("#maxp").hide();
	RealTimeType = "timeRange";
	if(chartType != 'line'){
		chartType='line';
		clearInterval(interval);
		myChart.clear();
	}
}

function showBar() {
	$("#timeRange").hide();
	$("#timeMetric").hide();
	$("#minp").hide();
	$("#maxp").hide();
	RealTimeType = "realTime";
	if(chartType != 'bar'){
		chartType='bar';
		clearInterval(interval);
		myChart.clear();
	}
}

function showPie() {
	$("#timeRange").hide();
	$("#timeMetric").hide();
	$("#minp").hide();
	$("#maxp").hide();
	RealTimeType = "realTime";
	if(chartType != 'pie'){
		chartType='pie';
		clearInterval(interval);
		myChart.clear();
	}

}

function showGauge() {
	$("#timeRange").hide();
	$("#timeMetric").hide();
	$("#minp").show();
	$("#maxp").show();
	RealTimeType = "realTime";
	if(chartType != 'gauge'){
		chartType='gauge';
		$("#min").val("0");
		$("#max").val("100");
		clearInterval(interval);
		myChart.clear();
	}

}

function refresh() {

	len = $("#dom_1 span").size();//获取span标签的个数
	timeType = $("#metric").val();
	timeRange =  $("#range").val();
	if(len == 0){
		alert("请从主模型树拖入数据项！");
	}else if(RealTimeType == "timeRange" && timeRange == ""){
		alert("请输入时间区间！");
	}else if(RealTimeType == "timeRange" && isNaN(timeRange)){
		alert("时间区间必须为数字！");
	}else{
		if(len > 1 && chartType == 'gauge'){
			alert("仪表盘只能拖入一个参数！");
			return;
		}
		myChart.showLoading({
			text : '数据获取中',
			effect: 'whirling'
		});
		if(interval != null){
			clearInterval(interval);
		}
		if(RealTimeType == "timeRange"){
			interval = setInterval(setSeriexData_Range, 5000);
		}else{
			min = parseInt($("#min").val());
			max = parseInt($("#max").val());
			interval = setInterval(setSeriexData_RealTime, 5000);
		}

	}
}

function setSeriexData_Range(){
	var arr = [];
	for(var index = 0; index < len; index++){//创建一个数字数组
		arr[index] = index;
	}
	var series=[];
	ids=[];
	$.each(arr, function(i){//循环得到不同的id的值
		var idValue = $("#dom_1 span").eq(i).attr("domid");
		var name = $("#dom_1 span").eq(i).attr("name");
		if(idValue != ''){
			ids.push(idValue);
			$.ajax({
				type: 'GET',
				url: "/Monitoring/queryData",
				async: false,
				data: {id:idValue, timeType:timeType, timeRange:timeRange},
				dataType: 'json',
				success:function(data){
					var dataValue = [];
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
							name:name,
							type: 'line',
							data:dataValue,
					};
					series.push(item);
				}
			});
		}
	});
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
//	myChart.setOption({
//	series:[]
//	});
	myChart.setOption(lineChart,true);
	myChart.hideLoading();
	myChart.setOption({
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

function setSeriexData_RealTime(){
	var arr = [];
	for(var index = 0; index < len; index++){//创建一个数字数组
		arr[index] = index;
	}
	var seriesData = [];
	var paramArray = [];
	ids=[];
	var series=[];
	var dataValue = [];
	$.each(arr, function(i){//循环得到不同的id的值
		var idValue = $("#dom_1 span").eq(i).attr("domid");
		var name = $("#dom_1 span").eq(i).attr("name");
		if(idValue != ''){
			ids.push(idValue);
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
	});

	if(chartType == 'bar'){
		var item={
				name:"柱形图",
				type: chartType,
				data:dataValue,
		};
		myChart.setOption(barChart,true);
		myChart.hideLoading();
		seriesData.push(item);
		myChart.setOption({
			xAxis : [
			         {
			        	 type : 'category',
			        	 data : paramArray
			         }
			         ],
			         series:seriesData
		}); 
	} else if(chartType == 'pie'){
		var item={
				name:"饼图",
				type: chartType,
				radius : '55%',
				center: ['50%', '60%'],
				data:dataValue
		};
		myChart.setOption(pieChart,true);
		myChart.hideLoading();
		seriesData.push(item);
		myChart.setOption({
			series:seriesData
		}); 
	} else if(chartType == 'gauge'){
		myChart.setOption(gaugeChart,true);
		gaugeChart.series[0].data[0] = dataValue[0];
		gaugeChart.series[0].min = min;
		gaugeChart.series[0].max = max;
		myChart.hideLoading();
	}
//	myChart.hideLoading();
//	myChart.setOption({
//	legend: {
//	data:paramArray
//	},
//	series:{
//	type:chartType,
//	data:seriesData
//	}
//	}); 
}

function saveToPanelModal() {
	if(len == 0){
		alert("请从主模型树拖入数据项！");
	}else if(timeRange == undefined){
		alert("请输入时间区间！");
	}else if(isNaN(timeRange)){
		alert("时间区间必须为数字！");
	}else{
		$('#addToPanelModal').modal('show');
	}
}


function saveToPanel() {
	var idsString=ids.toString();
	var panelId = $("#panelList").val();
	var name = $("#chartName").val();
	if(name == ""){
		alert("请输入名称！");
	}else if(chartType == "line"){
		$.ajax({
			type: 'GET',
			url: "/Monitoring/saveLineChart",
			async: false,
			data: {ids:idsString, name:name, timeType:timeType, timeRange:timeRange, panelId:panelId},
			dataType: 'json',
			success:function(data){
				$('#addToPanelModal').modal('hide');
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$('#addToPanelModal').modal('hide');
				alert("保存失败！");
			}
		});
	}else if(chartType == "gauge"){
		$.ajax({
			type: 'GET',
			url: "/Monitoring/saveGaugeChart",
			async: false,
			data: {ids:idsString, name:name, chartType:chartType, min:min, max:max, panelId:panelId},
			dataType: 'json',
			success:function(data){
				$('#addToPanelModal').modal('hide');
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$('#addToPanelModal').modal('hide');
				alert("保存失败！");
			}
		});
	}else {
		$.ajax({
			type: 'GET',
			url: "/Monitoring/saveChart",
			async: false,
			data: {ids:idsString, name:name, chartType:chartType, panelId:panelId},
			dataType: 'json',
			success:function(data){
				$('#addToPanelModal').modal('hide');
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$('#addToPanelModal').modal('hide');
				alert("保存失败！");
			}
		});
	}
}

$(".main-menu li").click(function () {
	$("li[class='active']").removeAttr("class");
	$(this).addClass("active");

});
