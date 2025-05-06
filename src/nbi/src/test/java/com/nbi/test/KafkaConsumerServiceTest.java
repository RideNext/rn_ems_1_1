package com.nbi.test;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.Spy;
import org.springframework.test.util.ReflectionTestUtils;
import com.nbi.services.KafkaConsumerService;

import static org.junit.jupiter.api.Assertions.*;

public class KafkaConsumerServiceTest {

    @Spy
    private ObjectMapper objectMapper;

    @InjectMocks
    private KafkaConsumerService kafkaConsumerService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);

        // Injecting values into entity and systemId
        ReflectionTestUtils.setField(kafkaConsumerService, "entity", "TestEntity");
        ReflectionTestUtils.setField(kafkaConsumerService, "id", "TestSystemId");
    }

    @Test
    public void testModifyMessage_ModifiesMessageCorrectly() throws Exception {
        // Sample input message (JSON)
        String sampleMessage = "{\r\n"
                + "    \"event\": {\r\n"
                + "        \"commonEventHeader\": {\r\n"
                + "            \"domain\": \"fault\",\r\n"
                + "            \"version\": \"4.1\",\r\n"
                + "            \"eventId\": \"Fault11001\",\r\n"
                + "            \"eventName\": \"Fault_Communication Alarm\",\r\n"
                + "            \"sequence\": 3,\r\n"
                + "            \"priority\": \"High\",\r\n"
                + "            \"sourceId\": \"11001\",\r\n"
                + "            \"reportingEntityName\": \"OAM_vendorA_ORUAA100_FR1918010111\",\r\n"
                + "            \"timeZoneOffset\": \"UTC+05:30\",\r\n"
                + "            \"vesEventListenerVersion\": \"7.1.1\",\r\n"
                + "            \"sourceName\": \"Tejas-gNB-12301\",\r\n"
                + "            \"startEpochMicrosec\": 1705641634909741,\r\n"
                + "            \"lastEpochMicrosec\": 1705641634909741\r\n"
                + "        },\r\n"
                + "        \"faultFields\": {\r\n"
                + "            \"faultFieldsVersion\": \"4.0\",\r\n"
                + "            \"eventSourceType\": \"CellID : 2\",\r\n"
                + "            \"alarmInterfaceA\": \"OAM_vendorA_ORUAA100_FR1918010111\",\r\n"
                + "            \"eventSeverity\": \"MAJOR\",\r\n"
                + "            \"alarmAdditionalInformation\": {\r\n"
                + "                \"alarmId\": \"11001\",\r\n"
                + "                \"AlarmAction\": \"RAISE\"\r\n"
                + "            },\r\n"
                + "            \"vfStatus\": \"Active\",\r\n"
                + "            \"alarmCondition\": \"11001\",\r\n"
                + "            \"specificProblem\": \"EventType:Communication Alarm,ProbableCause:Connection Establishment Error,SpecificProblem:NGAP SCTP CONNECTION BREAK,\"\r\n"
                + "        }\r\n"
                + "    }\r\n"
                + "}";

        // Call the modifyMessage method
        String modifiedMessage = kafkaConsumerService.listen(sampleMessage);

        // Deserialize the modified message to check updates
        JsonNode jsonNode = objectMapper.readTree(modifiedMessage);
        JsonNode commonEventHeader = jsonNode.get("event").get("commonEventHeader");
        JsonNode additional = jsonNode.get("event").get("faultFields").get("alarmAdditionalInformation");

        // Assertions to check if fields were updated
        assertNotNull(commonEventHeader);
        assertEquals("TestEntity", commonEventHeader.get("reportingEntityName").asText());
        assertEquals("TestEntity", commonEventHeader.get("sourceName").asText());

        assertNotNull(additional);
        assertEquals("TestEntity", additional.get("forwardingSystemName").asText());
        assertEquals("TestSystemId", additional.get("forwardingSystemId").asText());
        assertTrue(additional.has("forwardingEpochMicrosec")); // Check epoch microseconds were added
    }
}
