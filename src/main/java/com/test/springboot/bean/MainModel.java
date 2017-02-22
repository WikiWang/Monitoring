/**
 * @Title: MainModel.java 
 * @Package: com.test.springboot.bean 
 * @Description: TODO
 * @date: 2017年1月5日
 * @author:  wangkui
 */
package com.test.springboot.bean;

/**
 * @ClassName: MainModel 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月5日
 */
public class MainModel {
	
	private int mmId;
	private String mmName;
	private int mmVersion;
	private int rootId;
	private String id;
	
	public MainModel() {

	}
	
	public int getMmId() {
		return mmId;
	}
	public void setMmId(int mmId) {
		this.mmId = mmId;
	}
	public String getMmName() {
		return mmName;
	}
	public void setMmName(String mmName) {
		this.mmName = mmName;
	}
	public int getMmVersion() {
		return mmVersion;
	}
	public void setMmVersion(int mmVersion) {
		this.mmVersion = mmVersion;
	}
	public int getRootId() {
		return rootId;
	}
	public void setRootId(int rootId) {
		this.rootId = rootId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
}
