/**
 * @Title: PanelRepository.java 
 * @Package: com.test.springboot.repo 
 * @Description: TODO
 * @date: 2017年2月12日
 * @author:  wangkui
 */
package com.test.springboot.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.test.springboot.bean.Panel;

/**
 * @ClassName: PanelRepository 
 * @Description: 
 * @author: Administrator
 * @date: 2017年2月12日
 */
public interface PanelRepository extends MongoRepository<Panel, String>{

	Panel findById(String id);
	


}
