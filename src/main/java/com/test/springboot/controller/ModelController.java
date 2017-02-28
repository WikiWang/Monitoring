/**
 * @Title: HelloController.java 
 * @Package: com.test.springboot.controller 
 * @Description: TODO
 * @date: Nov 23, 2016
 * @author:  wangkui
 */
package com.test.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.test.springboot.bean.MainModel;
import com.test.springboot.bean.Panel;
import com.test.springboot.repo.PanelRepository;
import com.test.springboot.service.MainModelListService;


/**
 * @ClassName: HelloController 
 * @Description: 
 * @author: wk
 * @date: Nov 23, 2016
 */
@Controller
public class ModelController {
	
	@Autowired
	public MainModelListService mainModelListService;
	
	@Autowired
	private PanelRepository panelRepository;
	
	@RequestMapping(value="/index", method = RequestMethod.GET)
	public String index(Model model){
		List<MainModel> allMainModels = mainModelListService.getAllMainModels();
		List<Panel> panels = panelRepository.findAll();
		model.addAttribute("allMainModels", allMainModels);
		model.addAttribute("panels", panels);
		return "index";
	}
	
	@RequestMapping(value="/linechart", method = RequestMethod.GET)
	public String lineChart(Model model){
		return "linechart";
	}
	
	@RequestMapping(value="/barchart", method = RequestMethod.GET)
	public String barChart(Model model){
		return "barchart";
	}
	
	@RequestMapping(value="/piechart", method = RequestMethod.GET)
	public String pieChart(Model model){
		return "piechart";
	}
	
	@RequestMapping(value="/gaugechart", method = RequestMethod.GET)
	public String guageChart(Model model){
		return "gaugechart";
	}
}
