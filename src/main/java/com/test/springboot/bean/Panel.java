/**
 * @Title: Panel.java 
 * @Package: com.test.springboot.bean 
 * @Description: TODO
 * @date: 2017年2月12日
 * @author:  wangkui
 */
package com.test.springboot.bean;

import java.util.List;

import org.springframework.data.annotation.Id;

/**
 * @ClassName: Panel 
 * @Description: 
 * @author: Administrator
 * @date: 2017年2月12日
 */
public class Panel {

	@Id
	private String id;
	private String name;
	private String userId;
	private List<String> charts;
	
	public Panel(String id, String name, String userId, List<String> charts) {
		this.id = id;
		this.name = name;
		this.userId = userId;
		this.charts = charts;
	}
	
	public Panel() {
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public List<String> getCharts() {
		return charts;
	}
	public void setCharts(List<String> charts) {
		this.charts = charts;
	}
	
	
}
