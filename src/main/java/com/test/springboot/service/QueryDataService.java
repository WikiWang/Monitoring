/**
 * @Title: QueryDataService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2017年1月7日
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
 * @ClassName: QueryDataService 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
@Service
public class QueryDataService {

	@Value("${queryData_url}")
	private String queryData_url_pre;
	
	@Value("${queryDataById_url}")
	private String queryDataById_url_pre;

	public String queryData(String id, String timeType, String timeRange){
		String queryData_url;
		queryData_url = queryData_url_pre + "?" + "id=" + id + "&timeType=" + timeType + "&timeRange=" + timeRange;
		RestTemplate restTemplate = new RestTemplate();
		String dataJsonString = restTemplate.getForObject(queryData_url, String.class);
		return dataJsonString;
	}
	
	public String queryData(String id){
		String queryData_url;
		queryData_url = queryDataById_url_pre + "?" + "id=" + id;
		RestTemplate restTemplate = new RestTemplate();
		String dataJsonString = restTemplate.getForObject(queryData_url, String.class);
		return dataJsonString;
	}
}
