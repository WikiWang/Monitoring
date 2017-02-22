$("#chart").css("height", 420);
//window.onresize = function(){
//	myChart.resize();
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
	    title : {
//	        text: '饼图',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	    },
	    toolbox: {
	        show : false,
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
	    series : [
	              {
	                  type:'pie',
	                  radius : '55%',
	                  center: ['50%', '60%'],
	                  data:[]
	              }
	          ],
	    calculable : true,
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

var chartType = 'line';
var RealTimeType = "timeRange";
var $active = $("#lineChart");
var interval = null;
var len;//获取span标签的个数
var ids=[];
var timeType;
var timeRange;

function shouLine() {
	$("#timeRange").show();
	$("#timeMetric").show();
	RealTimeType = "timeRange";
	chartType='line';
}

function shouBar() {
	$("#timeRange").hide();
	$("#timeMetric").hide();
	RealTimeType = "realTime";
	chartType='bar';
}

function shouPie() {
	$("#timeRange").hide();
	$("#timeMetric").hide();
	RealTimeType = "realTime";
	chartType='pie';
}

function refresh() {
//	var params = $("dom_1").children("span");
//	var ids=[];
//	if(params.length == 0){
//	alert("请从主模型树拖入数据项！")
//	}
//	for(var i=0; i<params.length; i++){
//	var id = $("dom_1").eq(i).attr("id");
//	ids.push(id);
//	}

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
//		series:[]
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
						value:[
						       data.name,
						       data.value
						       ]
					});
					paramArray.push(data.name);
				}
			});
		}
	});
	var item={
			name:"柱形图",
			type: 'bar',
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
//	myChart.hideLoading();
//	myChart.setOption({
//		legend: {
//			data:paramArray
//		},
//		series:{
//            type:chartType,
//            data:seriesData
//        }
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
	}else {
		$.ajax({
			type: 'GET',
			url: "/Monitoring/saveChart",
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
	}
}



