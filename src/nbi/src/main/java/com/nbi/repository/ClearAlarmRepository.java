
 /***
  * ################################################################################################
  * #                                                                                              #
  * #   Copyright (C)  [2019]  [RideNext Software Solutions Pvt Ltd]. All rights  reserved         #
  * #                                                                                              #
  * ################################################################################################
 ****/

package com.nbi.repository;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import com.nbi.entity.ClearAlarm;

public interface ClearAlarmRepository extends ElasticsearchRepository<ClearAlarm, String> {
	
	 @Query("{\"bool\": {\"must\": [{\"range\": {\"alarmClearedTime\": {\"gte\": \"?0\", \"lte\": \"?1\"}}}]}}")
	 Page<ClearAlarm> findByAlarmRaisedTimeBetween(String starttime, String endtime, Pageable pageable);

}
