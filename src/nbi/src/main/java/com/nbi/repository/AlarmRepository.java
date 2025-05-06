
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nbi.entity.Alarm;

public interface AlarmRepository extends ElasticsearchRepository<Alarm, String> {
	
	 @Query("{\"bool\": {\"must\": [{\"range\": {\"alarmRaisedTime\": {\"gte\": \"?0\", \"lte\": \"?1\"}}}]}}")
	    Page<Alarm> findByAlarmRaisedTimeBetween(String starttime, String endtime, Pageable pageable);
	 
	 @Query("{\"match_all\": {}}")
	 List<Alarm> findAllAlarms();
	 
	 @Query("{\"bool\": {\"must\": [{\"range\": {\"alarmRaisedTime\": {\"gte\": \"?0\"}}}]}}")
	 List<Alarm> findByTimestampGreaterThan(long time);


}