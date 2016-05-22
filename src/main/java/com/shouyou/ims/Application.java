package com.shouyou.ims;

import com.shouyou.ims.filter.LoginFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

import javax.servlet.MultipartConfigElement;

/**
 * Created by makun on 2016/3/17.
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer{
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class);
    }
    @Bean
    public FilterRegistrationBean filterRegistrationBean() {


        FilterRegistrationBean registrationBean = new FilterRegistrationBean();
        registrationBean.setFilter(new LoginFilter());  //要注册的过滤器
        registrationBean.addUrlPatterns("/okr/*");  //要过滤的URL
        return registrationBean;

    }

    @Bean
    public StandardServletMultipartResolver multipartResolver() {
        StandardServletMultipartResolver multipartResolver
                = new StandardServletMultipartResolver();
        return multipartResolver;
    }
    @Bean  // 文件上传大小限制【如果文件大小超过了规定大小，那么后台不会走到controller层，也不会返回任何信息，所以前台也没有任何反应】
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize("10MB");
        factory.setMaxRequestSize("10MB");
        return factory.createMultipartConfig();
    }



    public static void main(String [] args){
        SpringApplication.run(Application.class, args);
    }
}
