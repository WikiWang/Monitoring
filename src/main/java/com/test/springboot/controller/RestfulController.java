package com.test.springboot.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.test.springboot.bean.Chart;
import com.test.springboot.bean.Panel;
import com.test.springboot.bean.PanelChart;
import com.test.springboot.repo.ChartRepository;
import com.test.springboot.repo.PanelChartRepository;
import com.test.springboot.repo.PanelRepository;
import com.test.springboot.service.QueryDataService;
import com.test.springboot.service.TreeNodeParamService;
import com.test.springboot.util.GenerateSequenceUtil;

@RestController
public class RestfulController {

	@Autowired
	public TreeNodeParamService treeNodeParamService;
	
	@Autowired
	public QueryDataService queryDataService;
	
	@Autowired
	private ChartRepository chartRepository;
	
	@Autowired
	private PanelChartRepository panelChartRepository;
	
	@Autowired
	private PanelRepository panelRepository;
	
	@Value("${chart_url_pre}")
	private String chart_url_pre;
	
	@RequestMapping(value="/Monitoring/TreeNodeParam")
	public String treeNodeParam(@RequestParam(value="type") String type, 
			@RequestParam(value="id") String id, 
			@RequestParam(value="parentId") String parentId){
		
		return treeNodeParamService.getTreeNode(type, id, parentId);
	}
	
	@RequestMapping(value="/Monitoring/queryData", method = RequestMethod.GET)
	public String queryData(@RequestParam(value="id") String id, 
			@RequestParam(value="timeType") String timeType, 
			@RequestParam(value="timeRange") String timeRange){
		
		return queryDataService.queryData(id, timeType, timeRange);
	}
	
	@RequestMapping(value="/Monitoring/queryRealTimeData", method = RequestMethod.GET)
	public String queryRealTimeData(@RequestParam(value="id") String id){
		
		return queryDataService.queryData(id);
	}
	
	@RequestMapping(value="/Monitoring/saveLineChart", method = RequestMethod.GET)
	public String saveLineChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="name") String name, 
			@RequestParam(value="timeType") String timeType, 
			@RequestParam(value="timeRange") String timeRange,
			@RequestParam(value="panelId") String panelId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + "linechart?name=" + name + "&ids=" + ids + "&timeType=" + timeType + "&timeRange=" + timeRange;
		
		Chart lineChart = new Chart(id, name, url);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
	
	@RequestMapping(value="/Monitoring/saveChart", method = RequestMethod.GET)
	public String saveChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="chartType") String chartType,
			@RequestParam(value="name") String name, 
			@RequestParam(value="panelId") String panelId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + chartType + "chart?name=" + name + "&ids=" + ids;
		
		Chart lineChart = new Chart(id, name, url);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
	
	@RequestMapping(value="/Monitoring/saveGaugeChart", method = RequestMethod.GET)
	public String saveGaugeChart(@RequestParam(value="ids") String ids,
			@RequestParam(value="name") String name, 
			@RequestParam(value="min") String min, 
			@RequestParam(value="max") String max,
			@RequestParam(value="panelId") String panelId){

		String id = GenerateSequenceUtil.generateSequenceNo();
		String url = chart_url_pre + "gaugechart?name=" + name + "&ids=" + ids + "&min=" + min + "&max=" + max;
		
		Chart lineChart = new Chart(id, name, url);
		PanelChart panelLineChart = new PanelChart(id, panelId, url, 0, 0, 0, 0);
		Panel panel = panelRepository.findById(panelId);
		panel.getCharts().add(id);
		
		chartRepository.save(lineChart);
		panelChartRepository.save(panelLineChart);
		panelRepository.save(panel);
 		return "{\"status\" : \"success!\"}";
	}
}
