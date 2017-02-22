/**
 * @Title: TreeNodeParamService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2016年12月11日
 * @author:  wangkui
 */
package com.test.springboot.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

/**
 * @ClassName: TreeNodeParamService 
 * @Description: 
 * @author: Administrator
 * @date: 2016年12月11日
 */
@Service
public class TreeNodeParamService {
	
	@Value("${fileData_url}")
	private String tree_url;
//	private String tree_url = "http://202.112.140.210:8380/mdc/web/fileDataByMainModel";

	public String getTreeNode(String type, String id, String parentId){
		String fileData_url;
		if(parentId == null){
			fileData_url = tree_url + "?" + type + "Id=" + id + "&pid=";
		}else{
			fileData_url = tree_url + "?" + type + "Id=" + id + "&pid=" + parentId;
		}
		RestTemplate restTemplate = new RestTemplate();
		String treeJsonString = restTemplate.getForObject(fileData_url, String.class);
		return PareserJson(treeJsonString);
	}
	
	/**格式化json数据为tree所需结构**/
	public String PareserJson(String treeJsonString){
		JsonObject node;
		JsonArray nodes = new JsonParser().parse(treeJsonString).getAsJsonArray();
		int size = nodes.size();
		for(int i=0; i<size; i++){
			node = (JsonObject) nodes.get(i);
			node.addProperty("isParent", true);
		}
		return nodes.toString();
	}
}
