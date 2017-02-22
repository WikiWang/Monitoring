/**
 * @Title: ChartRepository.java 
 * @Package: com.test.springboot.repo 
 * @Description: TODO
 * @date: 2017年1月7日
 * @author:  wangkui
 */
package com.test.springboot.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.test.springboot.bean.PanelChart;

/**
 * @ClassName: ChartRepository 
 * @Description: 
 * @author: Administrator
 * @date: 2017年1月7日
 */
public interface PanelChartRepository extends MongoRepository<PanelChart, String>{

}
