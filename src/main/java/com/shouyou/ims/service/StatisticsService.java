package com.shouyou.ims.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shouyou.ims.bo.StatisticsBo;
import com.shouyou.ims.commons.UserUtils;
import com.shouyou.ims.dao.StatisticsDao;
import com.shouyou.ims.entity.Statistics;
import com.shouyou.ims.entity.StatisticsAll;
import com.shouyou.ims.entity.StatisticsResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2016/10/16.
 */
@Service
public class StatisticsService {

    @Autowired
    private StatisticsDao statisticsDao;

    public PageInfo<StatisticsResult> statistics(StatisticsBo statisticsBo){
        Statistics statistics = new Statistics(statisticsBo);
        statistics.setUserId(UserUtils.getUser().getId());
        switch (statisticsBo.getKey()){
            case "account" : statistics.setTableId("account_id");statistics.setTableName("accounts");break;
            case "client" : statistics.setTableId("client_id");statistics.setTableName("clients");break;
            case "game" : statistics.setTableId("game_id");statistics.setTableName("game");break;
            case "game_platform" : statistics.setTableId("platform_id");statistics.setTableName("game_platform");break;
            case "user" : statistics.setTableId("director_id");statistics.setTableName("users");break;
            case "user-account" : {
                PageHelper.startPage(statisticsBo.getPageNum(),statisticsBo.getPageSize());
                return new PageInfo<>(statisticsDao.queryBelongStatistics(statistics));
            }
            default:break;
        }
        PageHelper.startPage(statisticsBo.getPageNum(),statisticsBo.getPageSize());
        return new PageInfo<>(statisticsDao.queryStatistics(statistics));
    }

    public StatisticsAll statisticsAll(StatisticsBo statisticsBo){
        StatisticsAll statisticsAll = new StatisticsAll();
        Statistics statistics = new Statistics(statisticsBo);
        statistics.setName(null);
        statistics.setUserId(UserUtils.getUser().getId());
        List<StatisticsResult> list = statisticsDao.queryStatistics(statistics);
        if(list.size() > 0){
            StatisticsResult statisticsResult = list.get(0);
            statisticsAll.setProfit(statisticsResult.getProfit());
            statisticsAll.setCost(statisticsResult.getCost());
            statisticsAll.setTrading(statisticsResult.getTrading());
            statisticsAll.setDenomination(statisticsResult.getDenomination());
            statisticsAll.setOrderCount(statisticsResult.getNum());
            statisticsAll.setClientCount(statisticsDao.getCountWithClient(statistics));
            statisticsAll.setAccountCount(statisticsDao.getCountWithAccount(statistics));
        }
        return statisticsAll;
    }
}
