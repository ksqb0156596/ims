package com.shouyou.ims.dao;

import com.shouyou.ims.entity.Statistics;
import com.shouyou.ims.entity.StatisticsResult;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * Created by Administrator on 2016/10/16.
 */
@Mapper
public interface StatisticsDao {
    List<StatisticsResult> queryStatistics(Statistics statistics);
    List<StatisticsResult> queryBelongStatistics(Statistics statistics);
    int getCountWithClient(Statistics statistics);
    int getCountWithAccount(Statistics statistics);
}
