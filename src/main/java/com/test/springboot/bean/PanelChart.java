/**
 * @Title: PanelChart.java 
 * @Package: com.test.springboot.bean 
 * @Description: TODO
 * @date: 2017年1月16日
 * @author:  wangkui
 */
package com.test.springboot.bean;

import org.springframework.data.annotation.Id;

/**
 * @ClassName: PanelChart 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月16日
 */
public class PanelChart {

	@Id
	private String id;
	private String panelId;
	private String url;
	private int left;
	private int top;
	private int width;
	private int height;
	
	
	public PanelChart(String id, String panelId, String url, int left, int top, int width, int height) {
		this.id = id;
		this.panelId = panelId;
		this.url = url;
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
	}
	
	
	public PanelChart() {
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPanelId() {
		return panelId;
	}


	public void setPanelId(String panelId) {
		this.panelId = panelId;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

	public int getLeft() {
		return left;
	}

	public void setLeft(int left) {
		this.left = left;
	}

	public int getTop() {
		return top;
	}

	public void setTop(int top) {
		this.top = top;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

}
