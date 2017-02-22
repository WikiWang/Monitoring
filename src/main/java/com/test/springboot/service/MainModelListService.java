/**
 * @Title: MainModelListService.java 
 * @Package: com.test.springboot.service 
 * @Description: TODO
 * @date: 2017年1月5日
 * @author:  wangkui
 */
package com.test.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.test.springboot.bean.MainModel;


/**
 * @ClassName: MainModelListService 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月5日
 */
@Service
public class MainModelListService {

	@Value("${queryAllMainModel_url}")
	private String queryAllMainModel_url;
	
	public List<MainModel> getAllMainModels(){
		Gson gson = new Gson();
		RestTemplate restTemplate = new RestTemplate();
		String allMainModels = restTemplate.getForObject(queryAllMainModel_url, String.class);
//		List<MainModel> list = (List) JSONArray.toCollection(allMainModels, MainModel.class);
		
		List<MainModel> list = gson.fromJson(allMainModels,  
                new TypeToken<List<MainModel>>() {  
                }.getType());  
		return list;
	}
}
