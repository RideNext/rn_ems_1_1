package com.nbi.test;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.eq;

import org.apache.http.ProtocolVersion;
import org.apache.http.StatusLine;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicStatusLine;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.client.HttpClientErrorException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nbi.controllers.ConfigurationController;
import com.nbi.entity.DeviceData;
import com.nbi.entity.Inventory;
import com.nbi.repository.*;
import com.nbi.services.*;
import com.nbi.entity.*;
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ConfigurationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BasicRepository basicRepository;
    @MockBean
    private CellRepository cellRepository;
    @MockBean
    private CUCPRepository cucpRepository;
    @MockBean
    private CUUPRepository cuupRepository;
    @MockBean
    private DURepository duRepository;
    @MockBean
    private InventoryRepository inventoryRepository;

    @InjectMocks
    private InventoryService inventoryService;

    @InjectMocks
    private ConfigurationController configurationController;

    @MockBean
    private CloseableHttpClient CloseableHttpClient;
    
    private String devicejson = "{\r\n"
    		+ "    \"_3gpp-common-managed-element:ManagedElement\": [\r\n"
    		+ "        {\r\n"
    		+ "            \"id\": \"1\",\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbcucpfunction:GNBCUCPFunction\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"o-ran-cu-security-handling:SecurityHandling\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"3\"\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrcellcu:NRCellCU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 3,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3335,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 1,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3333,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 2,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3334,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"gNBIdLength\": 22,\r\n"
    		+ "                        \"gNBId\": \"1\",\r\n"
    		+ "                        \"pLMNId\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"peeParametersList\": {\r\n"
    		+ "                            \"siteIdentification\": \"00256D\",\r\n"
    		+ "                            \"equipmentType\": \"1\",\r\n"
    		+ "                            \"powerInterface\": \"1\",\r\n"
    		+ "                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                            \"environmentType\": \"1\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"priorityLabel\": 1,\r\n"
    		+ "                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                        \"resourceType\": \"RRC\",\r\n"
    		+ "                        \"gNBCUName\": \"22\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"0\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_XnC\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"7\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_NgC\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"6\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"10.0.1.34\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_X2C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"4\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbdufunction:GNBDUFunction\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"_3gpp-nr-nrm-bwp:BWP\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cyclicPrefix\": \"NORMAL\",\r\n"
    		+ "                                \"priorityLabel\": 1,\r\n"
    		+ "                                \"subCarrierSpacing\": 15,\r\n"
    		+ "                                \"numberOfRBs\": 52,\r\n"
    		+ "                                \"isInitialBwp\": \"INITIAL\",\r\n"
    		+ "                                \"bwpContext\": \"DL\",\r\n"
    		+ "                                \"startRB\": 0\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"txDirection\": \"DL\",\r\n"
    		+ "                                \"configuredMaxTxPower\": 1,\r\n"
    		+ "                                \"bSChannelBwDL\": 5,\r\n"
    		+ "                                \"arfcnDL\": 1,\r\n"
    		+ "                                \"arfcnUL\": 1,\r\n"
    		+ "                                \"bSChannelBwUL\": 5,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"o-ran-odu-fh-management:odu-fh-management\": {\r\n"
    		+ "                        \"du-sync-state\": {\r\n"
    		+ "                            \"du-index\": \"1\",\r\n"
    		+ "                            \"gNBDUId\": \"1\",\r\n"
    		+ "                            \"sync-state\": \"FREERUN\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"window-determine-method\": {\r\n"
    		+ "                            \"method\": \"HARDCODED\",\r\n"
    		+ "                            \"configuration-status\": \"NOT_CONFIGURED\",\r\n"
    		+ "                            \"ru-num\": 2,\r\n"
    		+ "                            \"pre-configured-ru-profile\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 1,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_456\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 2,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_345\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 0,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_123\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 3,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_678\"\r\n"
    		+ "                                }\r\n"
    		+ "                            ],\r\n"
    		+ "                            \"pre-configured-delay-profile\": {\r\n"
    		+ "                                \"ta4-max\": 360,\r\n"
    		+ "                                \"t12-min\": 100,\r\n"
    		+ "                                \"t1a-max-up\": 400,\r\n"
    		+ "                                \"t2a-max-cp-ul\": 356,\r\n"
    		+ "                                \"t2a-min-cp-ul\": 80,\r\n"
    		+ "                                \"t1a-max-cp-dl\": 711,\r\n"
    		+ "                                \"t2a-min-up\": 124,\r\n"
    		+ "                                \"t2a-max-up\": 624,\r\n"
    		+ "                                \"t1a-min-cp-dl\": 251,\r\n"
    		+ "                                \"t12-max\": 112,\r\n"
    		+ "                                \"t1a-max-cp-ul\": 560,\r\n"
    		+ "                                \"t2a-min-cp-dl\": 250,\r\n"
    		+ "                                \"ta4-min\": 0,\r\n"
    		+ "                                \"t2a-max-cp-dl\": 710,\r\n"
    		+ "                                \"t1a-min-cp-ul\": 480,\r\n"
    		+ "                                \"t34-max\": 134,\r\n"
    		+ "                                \"ta3-max\": 220,\r\n"
    		+ "                                \"t34-min\": 100,\r\n"
    		+ "                                \"ta3-min\": 84,\r\n"
    		+ "                                \"t1a-min-up\": 280\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    },\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"userLabel\": \"5G gNB-DU\",\r\n"
    		+ "                        \"gNBDUId\": \"1\",\r\n"
    		+ "                        \"peeParametersList\": {\r\n"
    		+ "                            \"siteIdentification\": \"00256D\",\r\n"
    		+ "                            \"equipmentType\": \"1\",\r\n"
    		+ "                            \"powerInterface\": \"1\",\r\n"
    		+ "                            \"environmentType\": \"1\",\r\n"
    		+ "                            \"siteDescription\": \"Home gNodeB DU\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"priorityLabel\": 2,\r\n"
    		+ "                        \"resourceType\": \"RRC\",\r\n"
    		+ "                        \"gNBIdLength\": 22,\r\n"
    		+ "                        \"o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration\": {\r\n"
    		+ "                            \"mac-configuration\": {\r\n"
    		+ "                                \"srb-config\": {\r\n"
    		+ "                                    \"common-configuration-mac-parameter-list\": {\r\n"
    		+ "                                        \"allowed-serv-cells\": \"spcell_largescell_mediumscell_smallscell_7\",\r\n"
    		+ "                                        \"priority\": 2\r\n"
    		+ "                                    },\r\n"
    		+ "                                    \"ul-specific-parameters-list\": {\r\n"
    		+ "                                        \"logical-channel-sr-delay-timer-applied\": false\r\n"
    		+ "                                    }\r\n"
    		+ "                                },\r\n"
    		+ "                                \"phr-config\": {\r\n"
    		+ "                                    \"phr-periodic-timer\": \"sf500\",\r\n"
    		+ "                                    \"phr-type2-othercell\": false,\r\n"
    		+ "                                    \"phr-mode-other-cg\": \"real\",\r\n"
    		+ "                                    \"phr-prohibit-timer\": \"sf200\",\r\n"
    		+ "                                    \"phr-tx-power-factor-change\": \"db3\"\r\n"
    		+ "                                },\r\n"
    		+ "                                \"drx-config\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"drx-profile-id\": 1,\r\n"
    		+ "                                        \"scheduling-request-config\": [\r\n"
    		+ "                                            {\r\n"
    		+ "                                                \"scheduling-request-id\": 1,\r\n"
    		+ "                                                \"sr-prohibit-timer\": \"ms16\",\r\n"
    		+ "                                                \"sr-trans-max\": \"n16\"\r\n"
    		+ "                                            }\r\n"
    		+ "                                        ],\r\n"
    		+ "                                        \"drx-inactivity-timer\": \"ms2\",\r\n"
    		+ "                                        \"drx-harq-rtt-timer-dl\": 0,\r\n"
    		+ "                                        \"drx-retransmission-timer-ul\": \"sl0\",\r\n"
    		+ "                                        \"drx-long-cycle\": \"ms160\",\r\n"
    		+ "                                        \"drx-retransmission-timer-dl\": \"sl0\",\r\n"
    		+ "                                        \"drx-harq-rtt-timer-ul\": 0\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bsr-config\": {\r\n"
    		+ "                                    \"periodicity-bsr-timer\": \"sf10\",\r\n"
    		+ "                                    \"retx-bsr-timer\": \"sf80\",\r\n"
    		+ "                                    \"logical-channel-sr-delay-timer\": \"sf20\"\r\n"
    		+ "                                },\r\n"
    		+ "                                \"scell-deactivation-timer-list\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"id\": 1,\r\n"
    		+ "                                        \"scell-deactivation-timer\": \"infinity\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"qos-group-config-list\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"qos-group-index\": 1,\r\n"
    		+ "                                        \"common-configuration-mac-parameter-list\": {\r\n"
    		+ "                                            \"dl-specific-parameters-list\": {\r\n"
    		+ "                                                \"max-dl-harq\": 4\r\n"
    		+ "                                            },\r\n"
    		+ "                                            \"ul-specific-parameters-list\": {\r\n"
    		+ "                                                \"prioritised-bitrate\": \"kBps8\",\r\n"
    		+ "                                                \"logical-channel-sr-delay-timer-applied\": false,\r\n"
    		+ "                                                \"logical-channel-sr-mask\": false,\r\n"
    		+ "                                                \"max-ul-harq-tx\": 4,\r\n"
    		+ "                                                \"bucket-size-duration\": \"ms100\",\r\n"
    		+ "                                                \"logical-channnel-group\": 1\r\n"
    		+ "                                            }\r\n"
    		+ "                                        }\r\n"
    		+ "                                    }\r\n"
    		+ "                                ]\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    },\r\n"
    		+ "                    \"ManagedNFService\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"sAP\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"host\": \"1\",\r\n"
    		+ "                                        \"port\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"operations\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"name\": \"1\",\r\n"
    		+ "                                        \"allowedNFTypes\": [\r\n"
    		+ "                                            \"1\"\r\n"
    		+ "                                        ]\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"administrativeState\": \"UNLOCKED\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrcelldu:NRCellDU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 1,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3333,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 50,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 2,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3334,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 51,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 3,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3335,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 50,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"38472\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.202\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"2152\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.202\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"192.168.12.203\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-common-subscription-control:NtfSubscriptionControl\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"notificationRecipientAddress\": \"http://1.1.1.1:7547\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"HeartbeatControl\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"heartbeatNtfPeriod\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"priorityLabel\": 1,\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"gNBId\": 22,\r\n"
    		+ "                        \"resourceType\": \"RRC\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_S1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_NgU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.109\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_X2U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"5\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"3\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"MeasurementControl\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"13\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"defaultFileBasedGP\": 3000,\r\n"
    		+ "                        \"defaultFileLocation\": \"http://1.1.1.1:7547\",\r\n"
    		+ "                        \"pMAdministrativeState\": \"UNLOCKED\",\r\n"
    		+ "                        \"defaultFileReportingPeriod\": 3010\r\n"
    		+ "                    }\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"proprietary_gNodeB_RRH_Data_Model:RRHList\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 1,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 3,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": false\r\n"
    		+ "                    }\r\n"
    		+ "                },\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 2,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 0,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": true\r\n"
    		+ "                    }\r\n"
    		+ "                },\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 3,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 0,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": false\r\n"
    		+ "                    }\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"attributes\": {\r\n"
    		+ "                \"priorityLabel\": 1,\r\n"
    		+ "                \"dnPrefix\": \"00256D\"\r\n"
    		+ "            }\r\n"
    		+ "        }\r\n"
    		+ "    ]\r\n"
    		+ "}";
    
    private String devicejson1 = "{\r\n"
    		+ "    \"_3gpp-common-managed-element:ManagedElement\": [\r\n"
    		+ "        {\r\n"
    		+ "            \"id\": \"1\",\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbcucpfunction:GNBCUCP\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"o-ran-cu-security-handling:SecurityHandling\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"3\"\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrcellcu:NRCellCU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 3,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3335,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 1,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3333,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 2,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cellLocalId\": 3334,\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            },\r\n"
    		+ "                            \"_3gpp-nr-nrm-nrfreqrelation:NRFreqRelation\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"id\": \"1\",\r\n"
    		+ "                                    \"attributes\": {\r\n"
    		+ "                                        \"peeParametersList\": {\r\n"
    		+ "                                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                                            \"environmentType\": \"1\",\r\n"
    		+ "                                            \"equipmentType\": \"1\",\r\n"
    		+ "                                            \"powerInterface\": \"1\",\r\n"
    		+ "                                            \"siteIdentification\": \"00256D\"\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"threshXLowP\": 3,\r\n"
    		+ "                                        \"threshXLowQ\": 3,\r\n"
    		+ "                                        \"qQualMin\": -12,\r\n"
    		+ "                                        \"cellReselectionPriority\": 3,\r\n"
    		+ "                                        \"offsetMO\": {\r\n"
    		+ "                                            \"sinrOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetSsb\": 24,\r\n"
    		+ "                                            \"sinrOffsetSsb\": 24,\r\n"
    		+ "                                            \"rsrqOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrpOffsetCsiRs\": 24,\r\n"
    		+ "                                            \"rsrqOffsetSsb\": 24\r\n"
    		+ "                                        },\r\n"
    		+ "                                        \"cellReselectionSubPriority\": 8,\r\n"
    		+ "                                        \"qRxLevMin\": -44,\r\n"
    		+ "                                        \"pMax\": -30,\r\n"
    		+ "                                        \"priorityLabel\": 1,\r\n"
    		+ "                                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                                        \"threshXHighQ\": 3,\r\n"
    		+ "                                        \"qOffsetFreq\": -24,\r\n"
    		+ "                                        \"threshXHighP\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfMedium\": 75,\r\n"
    		+ "                                        \"tReselectionNR\": 3,\r\n"
    		+ "                                        \"tReselectionNRSfHigh\": 75,\r\n"
    		+ "                                        \"nRFrequencyRef\": \"1\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                }\r\n"
    		+ "                            ]\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"gNBIdLength\": 22,\r\n"
    		+ "                        \"gNBId\": \"1\",\r\n"
    		+ "                        \"pLMNId\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"peeParametersList\": {\r\n"
    		+ "                            \"siteIdentification\": \"00256D\",\r\n"
    		+ "                            \"equipmentType\": \"1\",\r\n"
    		+ "                            \"powerInterface\": \"1\",\r\n"
    		+ "                            \"siteDescription\": \"Home gNodeB\",\r\n"
    		+ "                            \"environmentType\": \"1\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"priorityLabel\": 1,\r\n"
    		+ "                        \"userLabel\": \"5G gNB-CU\",\r\n"
    		+ "                        \"resourceType\": \"RRC\",\r\n"
    		+ "                        \"gNBCUName\": \"22\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"0\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_XnC\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"7\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_NgC\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"6\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"10.0.1.34\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_X2C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"4\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbdufunction:GNBDUFunction\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"_3gpp-nr-nrm-bwp:BWP\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"cyclicPrefix\": \"NORMAL\",\r\n"
    		+ "                                \"priorityLabel\": 1,\r\n"
    		+ "                                \"subCarrierSpacing\": 15,\r\n"
    		+ "                                \"numberOfRBs\": 52,\r\n"
    		+ "                                \"isInitialBwp\": \"INITIAL\",\r\n"
    		+ "                                \"bwpContext\": \"DL\",\r\n"
    		+ "                                \"startRB\": 0\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrsectorcarrier:NRSectorCarrier\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"txDirection\": \"DL\",\r\n"
    		+ "                                \"configuredMaxTxPower\": 1,\r\n"
    		+ "                                \"bSChannelBwDL\": 5,\r\n"
    		+ "                                \"arfcnDL\": 1,\r\n"
    		+ "                                \"arfcnUL\": 1,\r\n"
    		+ "                                \"bSChannelBwUL\": 5,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"o-ran-odu-fh-management:odu-fh-management\": {\r\n"
    		+ "                        \"du-sync-state\": {\r\n"
    		+ "                            \"du-index\": \"1\",\r\n"
    		+ "                            \"gNBDUId\": \"1\",\r\n"
    		+ "                            \"sync-state\": \"FREERUN\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"window-determine-method\": {\r\n"
    		+ "                            \"method\": \"HARDCODED\",\r\n"
    		+ "                            \"configuration-status\": \"NOT_CONFIGURED\",\r\n"
    		+ "                            \"ru-num\": 2,\r\n"
    		+ "                            \"pre-configured-ru-profile\": [\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 1,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_456\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 2,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_345\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 0,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_123\"\r\n"
    		+ "                                },\r\n"
    		+ "                                {\r\n"
    		+ "                                    \"ru-index\": 3,\r\n"
    		+ "                                    \"ru-instance-id\": \"TEJAS_gNB_678\"\r\n"
    		+ "                                }\r\n"
    		+ "                            ],\r\n"
    		+ "                            \"pre-configured-delay-profile\": {\r\n"
    		+ "                                \"ta4-max\": 360,\r\n"
    		+ "                                \"t12-min\": 100,\r\n"
    		+ "                                \"t1a-max-up\": 400,\r\n"
    		+ "                                \"t2a-max-cp-ul\": 356,\r\n"
    		+ "                                \"t2a-min-cp-ul\": 80,\r\n"
    		+ "                                \"t1a-max-cp-dl\": 711,\r\n"
    		+ "                                \"t2a-min-up\": 124,\r\n"
    		+ "                                \"t2a-max-up\": 624,\r\n"
    		+ "                                \"t1a-min-cp-dl\": 251,\r\n"
    		+ "                                \"t12-max\": 112,\r\n"
    		+ "                                \"t1a-max-cp-ul\": 560,\r\n"
    		+ "                                \"t2a-min-cp-dl\": 250,\r\n"
    		+ "                                \"ta4-min\": 0,\r\n"
    		+ "                                \"t2a-max-cp-dl\": 710,\r\n"
    		+ "                                \"t1a-min-cp-ul\": 480,\r\n"
    		+ "                                \"t34-max\": 134,\r\n"
    		+ "                                \"ta3-max\": 220,\r\n"
    		+ "                                \"t34-min\": 100,\r\n"
    		+ "                                \"ta3-min\": 84,\r\n"
    		+ "                                \"t1a-min-up\": 280\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    },\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"userLabel\": \"5G gNB-DU\",\r\n"
    		+ "                        \"gNBDUId\": \"1\",\r\n"
    		+ "                        \"peeParametersList\": {\r\n"
    		+ "                            \"siteIdentification\": \"00256D\",\r\n"
    		+ "                            \"equipmentType\": \"1\",\r\n"
    		+ "                            \"powerInterface\": \"1\",\r\n"
    		+ "                            \"environmentType\": \"1\",\r\n"
    		+ "                            \"siteDescription\": \"Home gNodeB DU\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"priorityLabel\": 2,\r\n"
    		+ "                        \"resourceType\": \"RRC\",\r\n"
    		+ "                        \"gNBIdLength\": 22,\r\n"
    		+ "                        \"o-ran_3gpp-nr-nrm-gnbdufunction:o-ran-configuration\": {\r\n"
    		+ "                            \"mac-configuration\": {\r\n"
    		+ "                                \"srb-config\": {\r\n"
    		+ "                                    \"common-configuration-mac-parameter-list\": {\r\n"
    		+ "                                        \"allowed-serv-cells\": \"spcell_largescell_mediumscell_smallscell_7\",\r\n"
    		+ "                                        \"priority\": 2\r\n"
    		+ "                                    },\r\n"
    		+ "                                    \"ul-specific-parameters-list\": {\r\n"
    		+ "                                        \"logical-channel-sr-delay-timer-applied\": false\r\n"
    		+ "                                    }\r\n"
    		+ "                                },\r\n"
    		+ "                                \"phr-config\": {\r\n"
    		+ "                                    \"phr-periodic-timer\": \"sf500\",\r\n"
    		+ "                                    \"phr-type2-othercell\": false,\r\n"
    		+ "                                    \"phr-mode-other-cg\": \"real\",\r\n"
    		+ "                                    \"phr-prohibit-timer\": \"sf200\",\r\n"
    		+ "                                    \"phr-tx-power-factor-change\": \"db3\"\r\n"
    		+ "                                },\r\n"
    		+ "                                \"drx-config\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"drx-profile-id\": 1,\r\n"
    		+ "                                        \"scheduling-request-config\": [\r\n"
    		+ "                                            {\r\n"
    		+ "                                                \"scheduling-request-id\": 1,\r\n"
    		+ "                                                \"sr-prohibit-timer\": \"ms16\",\r\n"
    		+ "                                                \"sr-trans-max\": \"n16\"\r\n"
    		+ "                                            }\r\n"
    		+ "                                        ],\r\n"
    		+ "                                        \"drx-inactivity-timer\": \"ms2\",\r\n"
    		+ "                                        \"drx-harq-rtt-timer-dl\": 0,\r\n"
    		+ "                                        \"drx-retransmission-timer-ul\": \"sl0\",\r\n"
    		+ "                                        \"drx-long-cycle\": \"ms160\",\r\n"
    		+ "                                        \"drx-retransmission-timer-dl\": \"sl0\",\r\n"
    		+ "                                        \"drx-harq-rtt-timer-ul\": 0\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bsr-config\": {\r\n"
    		+ "                                    \"periodicity-bsr-timer\": \"sf10\",\r\n"
    		+ "                                    \"retx-bsr-timer\": \"sf80\",\r\n"
    		+ "                                    \"logical-channel-sr-delay-timer\": \"sf20\"\r\n"
    		+ "                                },\r\n"
    		+ "                                \"scell-deactivation-timer-list\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"id\": 1,\r\n"
    		+ "                                        \"scell-deactivation-timer\": \"infinity\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"qos-group-config-list\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"qos-group-index\": 1,\r\n"
    		+ "                                        \"common-configuration-mac-parameter-list\": {\r\n"
    		+ "                                            \"dl-specific-parameters-list\": {\r\n"
    		+ "                                                \"max-dl-harq\": 4\r\n"
    		+ "                                            },\r\n"
    		+ "                                            \"ul-specific-parameters-list\": {\r\n"
    		+ "                                                \"prioritised-bitrate\": \"kBps8\",\r\n"
    		+ "                                                \"logical-channel-sr-delay-timer-applied\": false,\r\n"
    		+ "                                                \"logical-channel-sr-mask\": false,\r\n"
    		+ "                                                \"max-ul-harq-tx\": 4,\r\n"
    		+ "                                                \"bucket-size-duration\": \"ms100\",\r\n"
    		+ "                                                \"logical-channnel-group\": 1\r\n"
    		+ "                                            }\r\n"
    		+ "                                        }\r\n"
    		+ "                                    }\r\n"
    		+ "                                ]\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    },\r\n"
    		+ "                    \"ManagedNFService\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"sAP\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"host\": \"1\",\r\n"
    		+ "                                        \"port\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"operations\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"name\": \"1\",\r\n"
    		+ "                                        \"allowedNFTypes\": [\r\n"
    		+ "                                            \"1\"\r\n"
    		+ "                                        ]\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"administrativeState\": \"UNLOCKED\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-nrcelldu:NRCellDU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 1,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3333,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 50,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 2,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3334,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 51,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        },\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": 3,\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"bSChannelBwUL\": 8,\r\n"
    		+ "                                \"ssbSubCarrierSpacing\": 15,\r\n"
    		+ "                                \"cellLocalId\": 3335,\r\n"
    		+ "                                \"arfcnDL\": 432054,\r\n"
    		+ "                                \"arfcnSUL\": 620000,\r\n"
    		+ "                                \"resourceType\": \"RRC\",\r\n"
    		+ "                                \"ssbOffset\": 0,\r\n"
    		+ "                                \"rRMPolicyMemberList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"idx\": 1,\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"sNSSAI\": 4,\r\n"
    		+ "                                        \"mnc\": \"01\"\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"bSChannelBwDL\": 8,\r\n"
    		+ "                                \"administrativeState\": \"LOCKED\",\r\n"
    		+ "                                \"pLMNInfoList\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"mcc\": \"001\",\r\n"
    		+ "                                        \"mnc\": \"01\",\r\n"
    		+ "                                        \"sNssai\": 4\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"ssbDuration\": 5,\r\n"
    		+ "                                \"arfcnUL\": 394054,\r\n"
    		+ "                                \"nRSectorCarrierRef\": [\r\n"
    		+ "                                    \"1\"\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"nRPCI\": 50,\r\n"
    		+ "                                \"nRTAC\": 2,\r\n"
    		+ "                                \"ssbFrequency\": 432990,\r\n"
    		+ "                                \"ssbPeriodicity\": 20,\r\n"
    		+ "                                \"priorityLabel\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1C\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"38472\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.202\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"2152\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.202\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"192.168.12.203\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-common-subscription-control:NtfSubscriptionControl\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"notificationRecipientAddress\": \"http://1.1.1.1:7547\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"HeartbeatControl\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"heartbeatNtfPeriod\": 1\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"_3gpp-nr-nrm-gnbcuupfunction:GNBCUUPFunction\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"1\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"priorityLabel\": 1,\r\n"
    		+ "                        \"rRMPolicyMemberList\": [\r\n"
    		+ "                            {\r\n"
    		+ "                                \"idx\": 1,\r\n"
    		+ "                                \"mcc\": \"001\",\r\n"
    		+ "                                \"sNSSAI\": 4,\r\n"
    		+ "                                \"mnc\": \"01\"\r\n"
    		+ "                            }\r\n"
    		+ "                        ],\r\n"
    		+ "                        \"gNBId\": 22,\r\n"
    		+ "                        \"resourceType\": \"RRC\"\r\n"
    		+ "                    },\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_S1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_NgU\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"1\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.109\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_X2U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"5\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"192.168.12.203\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ],\r\n"
    		+ "                    \"_3gpp-nr-nrm-ep:EP_F1U\": [\r\n"
    		+ "                        {\r\n"
    		+ "                            \"id\": \"3\",\r\n"
    		+ "                            \"attributes\": {\r\n"
    		+ "                                \"localAddress\": [\r\n"
    		+ "                                    {\r\n"
    		+ "                                        \"ipAddress\": \"10.0.1.108\",\r\n"
    		+ "                                        \"vlanId\": 1\r\n"
    		+ "                                    }\r\n"
    		+ "                                ],\r\n"
    		+ "                                \"remoteAddress\": \"172.16.255.255\"\r\n"
    		+ "                            }\r\n"
    		+ "                        }\r\n"
    		+ "                    ]\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"MeasurementControl\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": \"13\",\r\n"
    		+ "                    \"attributes\": {\r\n"
    		+ "                        \"defaultFileBasedGP\": 3000,\r\n"
    		+ "                        \"defaultFileLocation\": \"http://1.1.1.1:7547\",\r\n"
    		+ "                        \"pMAdministrativeState\": \"UNLOCKED\",\r\n"
    		+ "                        \"defaultFileReportingPeriod\": 3010\r\n"
    		+ "                    }\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"proprietary_gNodeB_RRH_Data_Model:RRHList\": [\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 1,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 3,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": false\r\n"
    		+ "                    }\r\n"
    		+ "                },\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 2,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 0,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": true\r\n"
    		+ "                    }\r\n"
    		+ "                },\r\n"
    		+ "                {\r\n"
    		+ "                    \"id\": 3,\r\n"
    		+ "                    \"AllRRHInfo\": {\r\n"
    		+ "                        \"dlEarfcn\": 9560,\r\n"
    		+ "                        \"antennaConfig\": {\r\n"
    		+ "                            \"txPower\": \"42.0\",\r\n"
    		+ "                            \"antennaGain\": 0,\r\n"
    		+ "                            \"antennaId\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"bandWidth\": 0,\r\n"
    		+ "                        \"ulEarfcn\": 27560,\r\n"
    		+ "                        \"antennaType\": \"2\",\r\n"
    		+ "                        \"cpriLoopback\": {\r\n"
    		+ "                            \"isLoopBackEnabled\": false,\r\n"
    		+ "                            \"testTime\": 0,\r\n"
    		+ "                            \"mode\": 0\r\n"
    		+ "                        },\r\n"
    		+ "                        \"cpriRate\": 0,\r\n"
    		+ "                        \"frequencyBand\": 0,\r\n"
    		+ "                        \"delayParam\": {\r\n"
    		+ "                            \"rxDelay\": \"0.0\",\r\n"
    		+ "                            \"txDelay\": \"0.0\"\r\n"
    		+ "                        },\r\n"
    		+ "                        \"mimoMode\": \"0\",\r\n"
    		+ "                        \"rrhModel\": \"DEFAULT_RRH_MODEL\",\r\n"
    		+ "                        \"setRRHDate\": true,\r\n"
    		+ "                        \"duplexMode\": \"1\",\r\n"
    		+ "                        \"isRetEnabled\": false\r\n"
    		+ "                    }\r\n"
    		+ "                }\r\n"
    		+ "            ],\r\n"
    		+ "            \"attributes\": {\r\n"
    		+ "                \"priorityLabel\": 1,\r\n"
    		+ "                \"dnPrefix\": \"00256D\"\r\n"
    		+ "            }\r\n"
    		+ "        }\r\n"
    		+ "    ]\r\n"
    		+ "}";
    
    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
		
    }

    @Test
    @Order(1)
    public void shouldReturnNoOkWhenDeviceConfigIsProcessedSuccessfully() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()); 
    }
    
    @Test
    @Order(2)
    public void shouldReturnNotFoundWhenInventoryNotFound() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(Optional.empty());
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()); 
    }
    
    @Test
    @Order(3)
    public void shouldReturnInternalServerError() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        when(CloseableHttpClient.execute(any(HttpPut.class)))
        .thenThrow(new RuntimeException("Database connection error"));

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError()); 
    }
    
    @Test
    @Order(4)
    public void shouldReturnNoOkWhenDeviceConfigWhenBadRequest() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content("")
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()); 
    }
    
    @Test
    @Order(5)
    public void shouldReturnNoOkWhenDeviceConfigWhenNotFound() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson1)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError()); 
    }

	@Test
    @Order(6)
    public void shouldReturnNoOkWhenDeviceConfigWhenNotFound_2() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()); 
    }

	@Test
    @Order(7)
    public void shouldReturnNoOkWhenDeviceConfigWhenBadRequest_2() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST));
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest()); 
    }

	@Test
    @Order(8)
    public void shouldReturnNoOkWhenDeviceConfigWhenRequestTimeOut() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenThrow(new ResponseStatusException(HttpStatus.REQUEST_TIMEOUT, "Request Timeout"));
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isRequestTimeout()); 
    }

	@Test
    @Order(9)
    public void shouldReturnNoOkWhenDeviceConfigWhenUnauthorized() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenThrow(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized access"));
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized()); 
    }


	 @Test
    @Order(10)
    public void shouldReturnNoOkWhenDeviceConfigIsFailed() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connected");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(404); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError()); 
    }

	 @Test
    @Order(11)
    public void shouldReturnNoOkWhenDeviceConfigNotFound_3() throws Exception {

        when(basicRepository.save(any(ESBASIC.class))).thenReturn(new ESBASIC());
        when(cellRepository.save(any(ESCellConfig.class))).thenReturn(new ESCellConfig());
        when(cucpRepository.save(any(ESCUCP.class))).thenReturn(new ESCUCP());
        when(cuupRepository.save(any(ESCUUP.class))).thenReturn(new ESCUUP());
        when(duRepository.save(any(ESDU.class))).thenReturn(new ESDU());

        Inventory inventory = new Inventory();
        inventory.setId("123");
        inventory.setHost("host");
        inventory.setModelNumber("123");
        inventory.setPort(123);
        inventory.setSerialNumber("123");
        inventory.setSoftwareVersion("1.0");
        inventory.setStatus("Connecting");
        inventory.setType("gnb");
        inventory.setVendorDetails("test");
        when(inventoryRepository.findById("123")).thenReturn(java.util.Optional.of(inventory));
         
        CloseableHttpResponse mockResponse = mock(CloseableHttpResponse.class);
        StatusLine mockStatusLine = mock(StatusLine.class);

        when(mockResponse.getStatusLine()).thenReturn(mockStatusLine);
        when(mockStatusLine.getStatusCode()).thenReturn(204); // HTTP 204 No Content

        when(CloseableHttpClient.execute(any(HttpPut.class))).thenReturn(mockResponse);

        mockMvc.perform(post("/nbi/v1/configuration/123")
                .contentType(MediaType.APPLICATION_JSON)
                .content(devicejson)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound()); 
    }

}
