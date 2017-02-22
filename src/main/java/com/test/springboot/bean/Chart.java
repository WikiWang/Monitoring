/**
 * @Title: Chart.java 
 * @Package: com.test.springboot.bean 
 * @Description: TODO
 * @date: 2017年1月7日
 * @author:  wangkui
 */
package com.test.springboot.bean;

import org.springframework.data.annotation.Id;

/**
 * @ClassName: Chart 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
public class Chart {

	@Id
	private String id;
	private String name;
	private String url;
	
	
	public Chart(String id, String name, String url) {
		this.id = id;
		this.name = name;
		this.url = url;
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
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}

}
