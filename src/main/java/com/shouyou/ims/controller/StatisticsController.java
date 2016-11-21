package com.shouyou.ims.controller;

import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.StatisticsBo;
import com.shouyou.ims.entity.StatisticsAll;
import com.shouyou.ims.entity.StatisticsResult;
import com.shouyou.ims.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Created by Administrator on 2016/10/16.
 */
@RestController
@RequestMapping("/ims/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @RequestMapping("/statistics")
    public PageInfo<StatisticsResult> statistics(StatisticsBo statisticsBo){
        return statisticsService.statistics(statisticsBo);
    }
    @RequestMapping("/statisticsAll")
    public StatisticsAll statisticsAll(StatisticsBo statisticsBo){
        return statisticsService.statisticsAll(statisticsBo);
    }

}
