/**
 * 2016-11-21 北航
 */
package com.test.springboot;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.ConfigurableEmbeddedServletContainer;
import org.springframework.boot.context.embedded.EmbeddedServletContainerCustomizer;
import org.springframework.boot.context.embedded.EmbeddedWebApplicationContext;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;

import com.test.springboot.bean.Panel;
import com.test.springboot.repo.PanelRepository;

/**
 * spring-boot 应用
 * @author wk
 *
 */
@SpringBootApplication
@EnableCaching
public class MonitoringApplication extends SpringBootServletInitializer implements EmbeddedServletContainerCustomizer{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(MonitoringApplication.class);
	
	@Value("${port}")
	private int port;
	
	@Override
    public void onStartup(ServletContext container) throws ServletException {
        
        super.onStartup(container);

        Dynamic registration = (Dynamic) container
                .getServletRegistration(EmbeddedWebApplicationContext.DISPATCHER_SERVLET_NAME);
        registration.setLoadOnStartup(1);
        registration.addMapping("/*");
    }
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MonitoringApplication.class);
    }

	public static void main(String[] args){
		
		LOGGER.info("Starting.");
		SpringApplication springApplication = new SpringApplication (MonitoringApplication.class);
		ApplicationContext ctx = springApplication.run (args);
		LOGGER.info("Start success."+ctx.getBeanDefinitionCount()+"beans start.");
	}

	@Override
	public void customize(ConfigurableEmbeddedServletContainer container) {
		container.setPort(port);  
	}
}