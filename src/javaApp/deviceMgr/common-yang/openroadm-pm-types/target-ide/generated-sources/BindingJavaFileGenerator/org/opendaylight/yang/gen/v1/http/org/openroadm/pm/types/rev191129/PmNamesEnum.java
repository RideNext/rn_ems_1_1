package org.opendaylight.yang.gen.v1.http.org.openroadm.pm.types.rev191129;
import java.lang.IllegalArgumentException;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;
import javax.annotation.processing.Generated;
import org.eclipse.jdt.annotation.NonNull;
import org.eclipse.jdt.annotation.Nullable;
import org.opendaylight.yangtools.yang.binding.CodeHelpers;
import org.opendaylight.yangtools.yang.binding.Enumeration;

/**
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>org-openroadm-pm-types</b>
 * <pre>
 * typedef pm-names-enum {
 *   type enumeration {
 *     enum vendorExtension {
 *       value 1;
 *     }
 *     enum bitErrorRate {
 *       value 2;
 *     }
 *     enum opticalPowerOutput {
 *       value 3;
 *     }
 *     enum opticalReturnLoss {
 *       value 4;
 *     }
 *     enum opticalPowerInput {
 *       value 5;
 *     }
 *     enum codeViolations {
 *       value 8;
 *     }
 *     enum erroredSeconds {
 *       value 9;
 *     }
 *     enum severelyErroredSeconds {
 *       value 10;
 *     }
 *     enum unavailableSeconds {
 *       value 11;
 *     }
 *     enum inFrames {
 *       value 12;
 *     }
 *     enum inFramesErrored {
 *       value 13;
 *     }
 *     enum outFrames {
 *       value 14;
 *     }
 *     enum erroredSecondsEthernet {
 *       value 15;
 *     }
 *     enum severelyErroredSecondsEthernet {
 *       value 16;
 *     }
 *     enum unavailableSecondsEthernet {
 *       value 17;
 *     }
 *     enum erroredBlockCount {
 *       value 18;
 *     }
 *     enum delay {
 *       value 19;
 *     }
 *     enum defectSeconds {
 *       value 20;
 *     }
 *     enum backwardIncomingAlignmentError {
 *       value 21;
 *     }
 *     enum incomingAlignmentError {
 *       value 22;
 *     }
 *     enum opticalPowerOutputMin {
 *       value 23;
 *     }
 *     enum opticalPowerOutputMax {
 *       value 24;
 *     }
 *     enum opticalPowerOutputAvg {
 *       value 25;
 *     }
 *     enum opticalPowerInputMin {
 *       value 26;
 *     }
 *     enum opticalPowerInputMax {
 *       value 27;
 *     }
 *     enum opticalPowerInputAvg {
 *       value 28;
 *     }
 *     enum opticalPowerOutputOSC {
 *       value 29;
 *     }
 *     enum opticalPowerOutputOSCMin {
 *       value 30;
 *     }
 *     enum opticalPowerOutputOSCMax {
 *       value 31;
 *     }
 *     enum opticalPowerOutputOSCAvg {
 *       value 32;
 *     }
 *     enum opticalPowerInputOSC {
 *       value 33;
 *     }
 *     enum opticalPowerInputOSCMin {
 *       value 34;
 *     }
 *     enum opticalPowerInputOSCMax {
 *       value 35;
 *     }
 *     enum opticalPowerInputOSCAvg {
 *       value 36;
 *     }
 *     enum preFECCorrectedErrors {
 *       value 37;
 *     }
 *     enum totalOpticalPowerInput {
 *       value 38;
 *     }
 *     enum totalOpticalPowerInputMin {
 *       value 39;
 *     }
 *     enum totalOpticalPowerInputMax {
 *       value 40;
 *     }
 *     enum totalOpticalPowerInputAvg {
 *       value 41;
 *     }
 *     enum FECCorrectableBlocks {
 *       value 42;
 *     }
 *     enum FECUncorrectableBlocks {
 *       value 43;
 *     }
 *     enum BIPErrorCounter {
 *       value 56;
 *     }
 *     enum protectionSwitchingCount {
 *       value 57;
 *     }
 *     enum protectionSwitchingDuration {
 *       value 58;
 *     }
 *     enum erroredBlockCountTCM1-up {
 *       value 59;
 *     }
 *     enum erroredBlockCountTCM2-up {
 *       value 60;
 *     }
 *     enum erroredBlockCountTCM3-up {
 *       value 61;
 *     }
 *     enum erroredBlockCountTCM4-up {
 *       value 62;
 *     }
 *     enum erroredBlockCountTCM5-up {
 *       value 63;
 *     }
 *     enum erroredBlockCountTCM6-up {
 *       value 64;
 *     }
 *     enum delayTCM1-up {
 *       value 65;
 *     }
 *     enum delayTCM2-up {
 *       value 66;
 *     }
 *     enum delayTCM3-up {
 *       value 67;
 *     }
 *     enum delayTCM4-up {
 *       value 68;
 *     }
 *     enum delayTCM5-up {
 *       value 69;
 *     }
 *     enum delayTCM6-up {
 *       value 70;
 *     }
 *     enum erroredBlockCountTCM1-down {
 *       value 71;
 *     }
 *     enum erroredBlockCountTCM2-down {
 *       value 72;
 *     }
 *     enum erroredBlockCountTCM3-down {
 *       value 73;
 *     }
 *     enum erroredBlockCountTCM4-down {
 *       value 74;
 *     }
 *     enum erroredBlockCountTCM5-down {
 *       value 75;
 *     }
 *     enum erroredBlockCountTCM6-down {
 *       value 76;
 *     }
 *     enum delayTCM1-down {
 *       value 77;
 *     }
 *     enum delayTCM2-down {
 *       value 78;
 *     }
 *     enum delayTCM3-down {
 *       value 79;
 *     }
 *     enum delayTCM4-down {
 *       value 80;
 *     }
 *     enum delayTCM5-down {
 *       value 81;
 *     }
 *     enum delayTCM6-down {
 *       value 82;
 *     }
 *     enum partialRateDiscard {
 *       value 83;
 *     }
 *     enum erroredSecondsTCM1-up {
 *       value 84;
 *     }
 *     enum erroredSecondsTCM2-up {
 *       value 85;
 *     }
 *     enum erroredSecondsTCM3-up {
 *       value 86;
 *     }
 *     enum erroredSecondsTCM4-up {
 *       value 87;
 *     }
 *     enum erroredSecondsTCM5-up {
 *       value 88;
 *     }
 *     enum erroredSecondsTCM6-up {
 *       value 89;
 *     }
 *     enum severelyErroredSecondsTCM1-up {
 *       value 90;
 *     }
 *     enum severelyErroredSecondsTCM2-up {
 *       value 91;
 *     }
 *     enum severelyErroredSecondsTCM3-up {
 *       value 92;
 *     }
 *     enum severelyErroredSecondsTCM4-up {
 *       value 93;
 *     }
 *     enum severelyErroredSecondsTCM5-up {
 *       value 94;
 *     }
 *     enum severelyErroredSecondsTCM6-up {
 *       value 95;
 *     }
 *     enum unavailableSecondsTCM1-up {
 *       value 96;
 *     }
 *     enum unavailableSecondsTCM2-up {
 *       value 97;
 *     }
 *     enum unavailableSecondsTCM3-up {
 *       value 98;
 *     }
 *     enum unavailableSecondsTCM4-up {
 *       value 99;
 *     }
 *     enum unavailableSecondsTCM5-up {
 *       value 100;
 *     }
 *     enum unavailableSecondsTCM6-up {
 *       value 101;
 *     }
 *     enum erroredSecondsTCM1-down {
 *       value 102;
 *     }
 *     enum erroredSecondsTCM2-down {
 *       value 103;
 *     }
 *     enum erroredSecondsTCM3-down {
 *       value 104;
 *     }
 *     enum erroredSecondsTCM4-down {
 *       value 105;
 *     }
 *     enum erroredSecondsTCM5-down {
 *       value 106;
 *     }
 *     enum erroredSecondsTCM6-down {
 *       value 107;
 *     }
 *     enum severelyErroredSecondsTCM1-down {
 *       value 108;
 *     }
 *     enum severelyErroredSecondsTCM2-down {
 *       value 109;
 *     }
 *     enum severelyErroredSecondsTCM3-down {
 *       value 110;
 *     }
 *     enum severelyErroredSecondsTCM4-down {
 *       value 111;
 *     }
 *     enum severelyErroredSecondsTCM5-down {
 *       value 112;
 *     }
 *     enum severelyErroredSecondsTCM6-down {
 *       value 113;
 *     }
 *     enum unavailableSecondsTCM1-down {
 *       value 114;
 *     }
 *     enum unavailableSecondsTCM2-down {
 *       value 115;
 *     }
 *     enum unavailableSecondsTCM3-down {
 *       value 116;
 *     }
 *     enum unavailableSecondsTCM4-down {
 *       value 117;
 *     }
 *     enum unavailableSecondsTCM5-down {
 *       value 118;
 *     }
 *     enum unavailableSecondsTCM6-down {
 *       value 119;
 *     }
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public enum PmNamesEnum implements Enumeration {
    /**
     * vendor extension
     */
    VendorExtension(1, "vendorExtension"),
    
    /**
     * Bit error rate (BER)
     */
    BitErrorRate(2, "bitErrorRate"),
    
    /**
     * Optical Power Output (OPOUT-OTS, OPOUT-OMS, OPT-OCH). Total optical power includes Variable Optical Attenuator (VOA) attenuation
     */
    OpticalPowerOutput(3, "opticalPowerOutput"),
    
    /**
     * Optical Return Loss (ORL-OTS) - at MW port(s) B
     */
    OpticalReturnLoss(4, "opticalReturnLoss"),
    
    /**
     * Optical Power Input (OPIN-OTS, OPIN-OMS, OPR-OCH). Total optical power
     */
    OpticalPowerInput(5, "opticalPowerInput"),
    
    /**
     * Code Violations (CV)
     */
    CodeViolations(8, "codeViolations"),
    
    /**
     * Errored Seconds (ES)
     */
    ErroredSeconds(9, "erroredSeconds"),
    
    /**
     * Severely Errored Seconds (SES)
     */
    SeverelyErroredSeconds(10, "severelyErroredSeconds"),
    
    /**
     * Unavailable Seconds (UAS)
     */
    UnavailableSeconds(11, "unavailableSeconds"),
    
    /**
     * In frames (INFRAMES-E)
     */
    InFrames(12, "inFrames"),
    
    /**
     * In frames errored (INFRAMESERR-E)
     */
    InFramesErrored(13, "inFramesErrored"),
    
    /**
     * Out frames (OUTFRAMES-E)
     */
    OutFrames(14, "outFrames"),
    
    /**
     * Errored Seconds Ethernet (ES-E)
     */
    ErroredSecondsEthernet(15, "erroredSecondsEthernet"),
    
    /**
     * Severely Errored Seconds, Ethernet (SES-E)
     */
    SeverelyErroredSecondsEthernet(16, "severelyErroredSecondsEthernet"),
    
    /**
     * Unavailable Seconds, Ethernet (UAS-E)
     */
    UnavailableSecondsEthernet(17, "unavailableSecondsEthernet"),
    
    /**
     * Errored block count
     */
    ErroredBlockCount(18, "erroredBlockCount"),
    
    /**
     * Number of frames between a DMValue toggle event and the received DMp signal value toggle event
     */
    Delay(19, "delay"),
    
    /**
     * Defect Seconds (DS)
     */
    DefectSeconds(20, "defectSeconds"),
    
    /**
     * Backward Incoming Alignment Error (BIAE)
     */
    BackwardIncomingAlignmentError(21, "backwardIncomingAlignmentError"),
    
    /**
     * Incoming Alignment Error (IAE)
     */
    IncomingAlignmentError(22, "incomingAlignmentError"),
    
    /**
     * Minimum Optical Power Output (OPOUT-OTS). Total optical power includes Variable Optical Attenuator (VOA) attenuation
     */
    OpticalPowerOutputMin(23, "opticalPowerOutputMin"),
    
    /**
     * Maximum Optical Power Output (OPOUT-OTS). Total optical power includes Variable Optical Attenuator (VOA) attenuation
     */
    OpticalPowerOutputMax(24, "opticalPowerOutputMax"),
    
    /**
     * Average Optical Power Output (OPOUT-OTS). Total optical power includes Variable Optical Attenuator (VOA) attenuation
     */
    OpticalPowerOutputAvg(25, "opticalPowerOutputAvg"),
    
    /**
     * Minimum Optical Power Input (OPIN-OTS). Total optical power
     */
    OpticalPowerInputMin(26, "opticalPowerInputMin"),
    
    /**
     * Maximum Optical Power Input (OPIN-OTS). Total optical power
     */
    OpticalPowerInputMax(27, "opticalPowerInputMax"),
    
    /**
     * Average Optical Power Input (OPIN-OTS). Total optical power
     */
    OpticalPowerInputAvg(28, "opticalPowerInputAvg"),
    
    /**
     * OSC Optical Power Output (OPT-OSC). OSC Transmit power on MW port
     */
    OpticalPowerOutputOSC(29, "opticalPowerOutputOSC"),
    
    /**
     * Minimum OSC Optical Power Output (OPT-OSC). OSC Transmit power on MW port
     */
    OpticalPowerOutputOSCMin(30, "opticalPowerOutputOSCMin"),
    
    /**
     * Maximum OSC Optical Power Output (OPT-OSC). OSC Transmit power on MW port
     */
    OpticalPowerOutputOSCMax(31, "opticalPowerOutputOSCMax"),
    
    /**
     * Average OSC Optical Power Output (OPT-OSC). OSC Transmit power on MW port
     */
    OpticalPowerOutputOSCAvg(32, "opticalPowerOutputOSCAvg"),
    
    /**
     * OSC Optical Power Input (OPR-OSC). OSC Receive power on MW port
     */
    OpticalPowerInputOSC(33, "opticalPowerInputOSC"),
    
    /**
     * Minimum OSC Optical Power Input (OPR-OSC). OSC Receive power on MW port
     */
    OpticalPowerInputOSCMin(34, "opticalPowerInputOSCMin"),
    
    /**
     * Maximum OSC Optical Power Input (OPR-OSC). OSC Receive power on MW port
     */
    OpticalPowerInputOSCMax(35, "opticalPowerInputOSCMax"),
    
    /**
     * Average OSC Optical Power Input (OPR-OSC). OSC Receive power on MW port
     */
    OpticalPowerInputOSCAvg(36, "opticalPowerInputOSCAvg"),
    
    /**
     * pFEC corrected Errors
     */
    PreFECCorrectedErrors(37, "preFECCorrectedErrors"),
    
    /**
     * Total Optical Power Input.
     */
    TotalOpticalPowerInput(38, "totalOpticalPowerInput"),
    
    /**
     * Minimum Total Optical Power Input.
     */
    TotalOpticalPowerInputMin(39, "totalOpticalPowerInputMin"),
    
    /**
     * Maximum Total Optical Power Input.
     */
    TotalOpticalPowerInputMax(40, "totalOpticalPowerInputMax"),
    
    /**
     * Average Total Optical Power Input.
     */
    TotalOpticalPowerInputAvg(41, "totalOpticalPowerInputAvg"),
    
    /**
     * FEC Correctable Blocks.
     */
    FECCorrectableBlocks(42, "FECCorrectableBlocks"),
    
    /**
     * FEC Uncorrectable Blocks.
     */
    FECUncorrectableBlocks(43, "FECUncorrectableBlocks"),
    
    /**
     * BIP Error Counter
     */
    BIPErrorCounter(56, "BIPErrorCounter"),
    
    /**
     * Protection Switching Count (PSC)
     */
    ProtectionSwitchingCount(57, "protectionSwitchingCount"),
    
    /**
     * Protection Switching Duration in seconds (PSD)
     */
    ProtectionSwitchingDuration(58, "protectionSwitchingDuration"),
    
    /**
     * errored Blocks Count on TCM1 up direction.
     */
    ErroredBlockCountTCM1Up(59, "erroredBlockCountTCM1-up"),
    
    /**
     * errored Blocks Count on TCM2 up direction.
     */
    ErroredBlockCountTCM2Up(60, "erroredBlockCountTCM2-up"),
    
    /**
     * errored Blocks Count on TCM3 up direction.
     */
    ErroredBlockCountTCM3Up(61, "erroredBlockCountTCM3-up"),
    
    /**
     * errored Blocks Count on TCM4 up direction.
     */
    ErroredBlockCountTCM4Up(62, "erroredBlockCountTCM4-up"),
    
    /**
     * errored Blocks Count on TCM5 up direction.
     */
    ErroredBlockCountTCM5Up(63, "erroredBlockCountTCM5-up"),
    
    /**
     * errored Blocks Count on TCM6 up direction.
     */
    ErroredBlockCountTCM6Up(64, "erroredBlockCountTCM6-up"),
    
    /**
     * Delay on TCM1 up direction.
     */
    DelayTCM1Up(65, "delayTCM1-up"),
    
    /**
     * Delay on TCM2 up direction.
     */
    DelayTCM2Up(66, "delayTCM2-up"),
    
    /**
     * Delay on TCM3 up direction.
     */
    DelayTCM3Up(67, "delayTCM3-up"),
    
    /**
     * Delay on TCM4 up direction.
     */
    DelayTCM4Up(68, "delayTCM4-up"),
    
    /**
     * Delay on TCM5 up direction.
     */
    DelayTCM5Up(69, "delayTCM5-up"),
    
    /**
     * Delay on TCM6 up direction.
     */
    DelayTCM6Up(70, "delayTCM6-up"),
    
    /**
     * errored Blocks Count on TCM1 down direction.
     */
    ErroredBlockCountTCM1Down(71, "erroredBlockCountTCM1-down"),
    
    /**
     * errored Blocks Count on TCM2 down direction.
     */
    ErroredBlockCountTCM2Down(72, "erroredBlockCountTCM2-down"),
    
    /**
     * errored Blocks Count on TCM3 down direction.
     */
    ErroredBlockCountTCM3Down(73, "erroredBlockCountTCM3-down"),
    
    /**
     * errored Blocks Count on TCM4 down direction.
     */
    ErroredBlockCountTCM4Down(74, "erroredBlockCountTCM4-down"),
    
    /**
     * errored Blocks Count on TCM5 down direction.
     */
    ErroredBlockCountTCM5Down(75, "erroredBlockCountTCM5-down"),
    
    /**
     * errored Blocks Count on TCM6 down direction.
     */
    ErroredBlockCountTCM6Down(76, "erroredBlockCountTCM6-down"),
    
    /**
     * Delay on TCM1 down direction.
     */
    DelayTCM1Down(77, "delayTCM1-down"),
    
    /**
     * Delay on TCM2 down direction.
     */
    DelayTCM2Down(78, "delayTCM2-down"),
    
    /**
     * Delay on TCM3 down direction.
     */
    DelayTCM3Down(79, "delayTCM3-down"),
    
    /**
     * Delay on TCM4 down direction.
     */
    DelayTCM4Down(80, "delayTCM4-down"),
    
    /**
     * Delay on TCM5 down direction.
     */
    DelayTCM5Down(81, "delayTCM5-down"),
    
    /**
     * Delay on TCM6 down direction.
     */
    DelayTCM6Down(82, "delayTCM6-down"),
    
    /**
     * Discarded packet as a result of policing or rate limiting for subrate ethernet.
     */
    PartialRateDiscard(83, "partialRateDiscard"),
    
    /**
     * errored Seconds Count on TCM1 up direction.
     */
    ErroredSecondsTCM1Up(84, "erroredSecondsTCM1-up"),
    
    /**
     * errored Seconds Count on TCM2 up direction.
     */
    ErroredSecondsTCM2Up(85, "erroredSecondsTCM2-up"),
    
    /**
     * errored Seconds Count on TCM3 up direction.
     */
    ErroredSecondsTCM3Up(86, "erroredSecondsTCM3-up"),
    
    /**
     * errored Seconds Count on TCM4 up direction.
     */
    ErroredSecondsTCM4Up(87, "erroredSecondsTCM4-up"),
    
    /**
     * errored Seconds Count on TCM5 up direction.
     */
    ErroredSecondsTCM5Up(88, "erroredSecondsTCM5-up"),
    
    /**
     * errored Seconds Count on TCM6 up direction.
     */
    ErroredSecondsTCM6Up(89, "erroredSecondsTCM6-up"),
    
    /**
     * severely Errored Seconds Count on TCM1 up direction.
     */
    SeverelyErroredSecondsTCM1Up(90, "severelyErroredSecondsTCM1-up"),
    
    /**
     * severely Errored Seconds Count on TCM2 up direction.
     */
    SeverelyErroredSecondsTCM2Up(91, "severelyErroredSecondsTCM2-up"),
    
    /**
     * severely Errored Seconds Count on TCM3 up direction.
     */
    SeverelyErroredSecondsTCM3Up(92, "severelyErroredSecondsTCM3-up"),
    
    /**
     * severely Errored Seconds Count on TCM4 up direction.
     */
    SeverelyErroredSecondsTCM4Up(93, "severelyErroredSecondsTCM4-up"),
    
    /**
     * severely Errored Seconds Count on TCM5 up direction.
     */
    SeverelyErroredSecondsTCM5Up(94, "severelyErroredSecondsTCM5-up"),
    
    /**
     * severely Errored Seconds Count on TCM6 up direction.
     */
    SeverelyErroredSecondsTCM6Up(95, "severelyErroredSecondsTCM6-up"),
    
    /**
     * unavailable Seconds Count on TCM1 up direction.
     */
    UnavailableSecondsTCM1Up(96, "unavailableSecondsTCM1-up"),
    
    /**
     * unavailable Seconds Count on TCM2 up direction.
     */
    UnavailableSecondsTCM2Up(97, "unavailableSecondsTCM2-up"),
    
    /**
     * unavailable Seconds Count on TCM3 up direction.
     */
    UnavailableSecondsTCM3Up(98, "unavailableSecondsTCM3-up"),
    
    /**
     * unavailable Seconds Count on TCM4 up direction.
     */
    UnavailableSecondsTCM4Up(99, "unavailableSecondsTCM4-up"),
    
    /**
     * unavailable Seconds Count on TCM5 up direction.
     */
    UnavailableSecondsTCM5Up(100, "unavailableSecondsTCM5-up"),
    
    /**
     * unavailable Seconds Count on TCM6 up direction.
     */
    UnavailableSecondsTCM6Up(101, "unavailableSecondsTCM6-up"),
    
    /**
     * errored Seconds Count on TCM1 down direction.
     */
    ErroredSecondsTCM1Down(102, "erroredSecondsTCM1-down"),
    
    /**
     * errored Seconds Count on TCM2 down direction.
     */
    ErroredSecondsTCM2Down(103, "erroredSecondsTCM2-down"),
    
    /**
     * errored Seconds Count on TCM3 down direction.
     */
    ErroredSecondsTCM3Down(104, "erroredSecondsTCM3-down"),
    
    /**
     * errored Seconds Count on TCM4 down direction.
     */
    ErroredSecondsTCM4Down(105, "erroredSecondsTCM4-down"),
    
    /**
     * errored Seconds Count on TCM5 down direction.
     */
    ErroredSecondsTCM5Down(106, "erroredSecondsTCM5-down"),
    
    /**
     * errored Seconds Count on TCM6 down direction.
     */
    ErroredSecondsTCM6Down(107, "erroredSecondsTCM6-down"),
    
    /**
     * severely Errored Seconds Count on TCM1 down direction.
     */
    SeverelyErroredSecondsTCM1Down(108, "severelyErroredSecondsTCM1-down"),
    
    /**
     * severely Errored Seconds Count on TCM2 down direction.
     */
    SeverelyErroredSecondsTCM2Down(109, "severelyErroredSecondsTCM2-down"),
    
    /**
     * severely Errored Seconds Count on TCM3 down direction.
     */
    SeverelyErroredSecondsTCM3Down(110, "severelyErroredSecondsTCM3-down"),
    
    /**
     * severely Errored Seconds Count on TCM4 down direction.
     */
    SeverelyErroredSecondsTCM4Down(111, "severelyErroredSecondsTCM4-down"),
    
    /**
     * severely Errored Seconds Count on TCM5 down direction.
     */
    SeverelyErroredSecondsTCM5Down(112, "severelyErroredSecondsTCM5-down"),
    
    /**
     * severely Errored Seconds Count on TCM6 down direction.
     */
    SeverelyErroredSecondsTCM6Down(113, "severelyErroredSecondsTCM6-down"),
    
    /**
     * unavailable Seconds Count on TCM1 down direction.
     */
    UnavailableSecondsTCM1Down(114, "unavailableSecondsTCM1-down"),
    
    /**
     * unavailable Seconds Count on TCM2 down direction.
     */
    UnavailableSecondsTCM2Down(115, "unavailableSecondsTCM2-down"),
    
    /**
     * unavailable Seconds Count on TCM3 down direction.
     */
    UnavailableSecondsTCM3Down(116, "unavailableSecondsTCM3-down"),
    
    /**
     * unavailable Seconds Count on TCM4 down direction.
     */
    UnavailableSecondsTCM4Down(117, "unavailableSecondsTCM4-down"),
    
    /**
     * unavailable Seconds Count on TCM5 down direction.
     */
    UnavailableSecondsTCM5Down(118, "unavailableSecondsTCM5-down"),
    
    /**
     * unavailable Seconds Count on TCM6 down direction.
     */
    UnavailableSecondsTCM6Down(119, "unavailableSecondsTCM6-down")
    ;

    private final @NonNull String name;
    private final int value;

    private PmNamesEnum(int value, @NonNull String name) {
        this.value = value;
        this.name = name;
    }

    @Override
    public @NonNull String getName() {
        return name;
    }

    @Override
    public int getIntValue() {
        return value;
    }

    /**
     * Return the enumeration member whose {@link #getName()} matches specified assigned name.
     *
     * @param name YANG assigned name
     * @return corresponding PmNamesEnum item, or {@code null} if no such item exists
     * @throws NullPointerException if {@code name} is null
     */
    public static @Nullable PmNamesEnum forName(String name) {
        return switch (name) {
            case "vendorExtension" -> VendorExtension;
            case "bitErrorRate" -> BitErrorRate;
            case "opticalPowerOutput" -> OpticalPowerOutput;
            case "opticalReturnLoss" -> OpticalReturnLoss;
            case "opticalPowerInput" -> OpticalPowerInput;
            case "codeViolations" -> CodeViolations;
            case "erroredSeconds" -> ErroredSeconds;
            case "severelyErroredSeconds" -> SeverelyErroredSeconds;
            case "unavailableSeconds" -> UnavailableSeconds;
            case "inFrames" -> InFrames;
            case "inFramesErrored" -> InFramesErrored;
            case "outFrames" -> OutFrames;
            case "erroredSecondsEthernet" -> ErroredSecondsEthernet;
            case "severelyErroredSecondsEthernet" -> SeverelyErroredSecondsEthernet;
            case "unavailableSecondsEthernet" -> UnavailableSecondsEthernet;
            case "erroredBlockCount" -> ErroredBlockCount;
            case "delay" -> Delay;
            case "defectSeconds" -> DefectSeconds;
            case "backwardIncomingAlignmentError" -> BackwardIncomingAlignmentError;
            case "incomingAlignmentError" -> IncomingAlignmentError;
            case "opticalPowerOutputMin" -> OpticalPowerOutputMin;
            case "opticalPowerOutputMax" -> OpticalPowerOutputMax;
            case "opticalPowerOutputAvg" -> OpticalPowerOutputAvg;
            case "opticalPowerInputMin" -> OpticalPowerInputMin;
            case "opticalPowerInputMax" -> OpticalPowerInputMax;
            case "opticalPowerInputAvg" -> OpticalPowerInputAvg;
            case "opticalPowerOutputOSC" -> OpticalPowerOutputOSC;
            case "opticalPowerOutputOSCMin" -> OpticalPowerOutputOSCMin;
            case "opticalPowerOutputOSCMax" -> OpticalPowerOutputOSCMax;
            case "opticalPowerOutputOSCAvg" -> OpticalPowerOutputOSCAvg;
            case "opticalPowerInputOSC" -> OpticalPowerInputOSC;
            case "opticalPowerInputOSCMin" -> OpticalPowerInputOSCMin;
            case "opticalPowerInputOSCMax" -> OpticalPowerInputOSCMax;
            case "opticalPowerInputOSCAvg" -> OpticalPowerInputOSCAvg;
            case "preFECCorrectedErrors" -> PreFECCorrectedErrors;
            case "totalOpticalPowerInput" -> TotalOpticalPowerInput;
            case "totalOpticalPowerInputMin" -> TotalOpticalPowerInputMin;
            case "totalOpticalPowerInputMax" -> TotalOpticalPowerInputMax;
            case "totalOpticalPowerInputAvg" -> TotalOpticalPowerInputAvg;
            case "FECCorrectableBlocks" -> FECCorrectableBlocks;
            case "FECUncorrectableBlocks" -> FECUncorrectableBlocks;
            case "BIPErrorCounter" -> BIPErrorCounter;
            case "protectionSwitchingCount" -> ProtectionSwitchingCount;
            case "protectionSwitchingDuration" -> ProtectionSwitchingDuration;
            case "erroredBlockCountTCM1-up" -> ErroredBlockCountTCM1Up;
            case "erroredBlockCountTCM2-up" -> ErroredBlockCountTCM2Up;
            case "erroredBlockCountTCM3-up" -> ErroredBlockCountTCM3Up;
            case "erroredBlockCountTCM4-up" -> ErroredBlockCountTCM4Up;
            case "erroredBlockCountTCM5-up" -> ErroredBlockCountTCM5Up;
            case "erroredBlockCountTCM6-up" -> ErroredBlockCountTCM6Up;
            case "delayTCM1-up" -> DelayTCM1Up;
            case "delayTCM2-up" -> DelayTCM2Up;
            case "delayTCM3-up" -> DelayTCM3Up;
            case "delayTCM4-up" -> DelayTCM4Up;
            case "delayTCM5-up" -> DelayTCM5Up;
            case "delayTCM6-up" -> DelayTCM6Up;
            case "erroredBlockCountTCM1-down" -> ErroredBlockCountTCM1Down;
            case "erroredBlockCountTCM2-down" -> ErroredBlockCountTCM2Down;
            case "erroredBlockCountTCM3-down" -> ErroredBlockCountTCM3Down;
            case "erroredBlockCountTCM4-down" -> ErroredBlockCountTCM4Down;
            case "erroredBlockCountTCM5-down" -> ErroredBlockCountTCM5Down;
            case "erroredBlockCountTCM6-down" -> ErroredBlockCountTCM6Down;
            case "delayTCM1-down" -> DelayTCM1Down;
            case "delayTCM2-down" -> DelayTCM2Down;
            case "delayTCM3-down" -> DelayTCM3Down;
            case "delayTCM4-down" -> DelayTCM4Down;
            case "delayTCM5-down" -> DelayTCM5Down;
            case "delayTCM6-down" -> DelayTCM6Down;
            case "partialRateDiscard" -> PartialRateDiscard;
            case "erroredSecondsTCM1-up" -> ErroredSecondsTCM1Up;
            case "erroredSecondsTCM2-up" -> ErroredSecondsTCM2Up;
            case "erroredSecondsTCM3-up" -> ErroredSecondsTCM3Up;
            case "erroredSecondsTCM4-up" -> ErroredSecondsTCM4Up;
            case "erroredSecondsTCM5-up" -> ErroredSecondsTCM5Up;
            case "erroredSecondsTCM6-up" -> ErroredSecondsTCM6Up;
            case "severelyErroredSecondsTCM1-up" -> SeverelyErroredSecondsTCM1Up;
            case "severelyErroredSecondsTCM2-up" -> SeverelyErroredSecondsTCM2Up;
            case "severelyErroredSecondsTCM3-up" -> SeverelyErroredSecondsTCM3Up;
            case "severelyErroredSecondsTCM4-up" -> SeverelyErroredSecondsTCM4Up;
            case "severelyErroredSecondsTCM5-up" -> SeverelyErroredSecondsTCM5Up;
            case "severelyErroredSecondsTCM6-up" -> SeverelyErroredSecondsTCM6Up;
            case "unavailableSecondsTCM1-up" -> UnavailableSecondsTCM1Up;
            case "unavailableSecondsTCM2-up" -> UnavailableSecondsTCM2Up;
            case "unavailableSecondsTCM3-up" -> UnavailableSecondsTCM3Up;
            case "unavailableSecondsTCM4-up" -> UnavailableSecondsTCM4Up;
            case "unavailableSecondsTCM5-up" -> UnavailableSecondsTCM5Up;
            case "unavailableSecondsTCM6-up" -> UnavailableSecondsTCM6Up;
            case "erroredSecondsTCM1-down" -> ErroredSecondsTCM1Down;
            case "erroredSecondsTCM2-down" -> ErroredSecondsTCM2Down;
            case "erroredSecondsTCM3-down" -> ErroredSecondsTCM3Down;
            case "erroredSecondsTCM4-down" -> ErroredSecondsTCM4Down;
            case "erroredSecondsTCM5-down" -> ErroredSecondsTCM5Down;
            case "erroredSecondsTCM6-down" -> ErroredSecondsTCM6Down;
            case "severelyErroredSecondsTCM1-down" -> SeverelyErroredSecondsTCM1Down;
            case "severelyErroredSecondsTCM2-down" -> SeverelyErroredSecondsTCM2Down;
            case "severelyErroredSecondsTCM3-down" -> SeverelyErroredSecondsTCM3Down;
            case "severelyErroredSecondsTCM4-down" -> SeverelyErroredSecondsTCM4Down;
            case "severelyErroredSecondsTCM5-down" -> SeverelyErroredSecondsTCM5Down;
            case "severelyErroredSecondsTCM6-down" -> SeverelyErroredSecondsTCM6Down;
            case "unavailableSecondsTCM1-down" -> UnavailableSecondsTCM1Down;
            case "unavailableSecondsTCM2-down" -> UnavailableSecondsTCM2Down;
            case "unavailableSecondsTCM3-down" -> UnavailableSecondsTCM3Down;
            case "unavailableSecondsTCM4-down" -> UnavailableSecondsTCM4Down;
            case "unavailableSecondsTCM5-down" -> UnavailableSecondsTCM5Down;
            case "unavailableSecondsTCM6-down" -> UnavailableSecondsTCM6Down;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding PmNamesEnum item, or {@code null} if no such item exists
     */
    public static @Nullable PmNamesEnum forValue(int intValue) {
        return switch (intValue) {
            case 1 -> VendorExtension;
            case 2 -> BitErrorRate;
            case 3 -> OpticalPowerOutput;
            case 4 -> OpticalReturnLoss;
            case 5 -> OpticalPowerInput;
            case 8 -> CodeViolations;
            case 9 -> ErroredSeconds;
            case 10 -> SeverelyErroredSeconds;
            case 11 -> UnavailableSeconds;
            case 12 -> InFrames;
            case 13 -> InFramesErrored;
            case 14 -> OutFrames;
            case 15 -> ErroredSecondsEthernet;
            case 16 -> SeverelyErroredSecondsEthernet;
            case 17 -> UnavailableSecondsEthernet;
            case 18 -> ErroredBlockCount;
            case 19 -> Delay;
            case 20 -> DefectSeconds;
            case 21 -> BackwardIncomingAlignmentError;
            case 22 -> IncomingAlignmentError;
            case 23 -> OpticalPowerOutputMin;
            case 24 -> OpticalPowerOutputMax;
            case 25 -> OpticalPowerOutputAvg;
            case 26 -> OpticalPowerInputMin;
            case 27 -> OpticalPowerInputMax;
            case 28 -> OpticalPowerInputAvg;
            case 29 -> OpticalPowerOutputOSC;
            case 30 -> OpticalPowerOutputOSCMin;
            case 31 -> OpticalPowerOutputOSCMax;
            case 32 -> OpticalPowerOutputOSCAvg;
            case 33 -> OpticalPowerInputOSC;
            case 34 -> OpticalPowerInputOSCMin;
            case 35 -> OpticalPowerInputOSCMax;
            case 36 -> OpticalPowerInputOSCAvg;
            case 37 -> PreFECCorrectedErrors;
            case 38 -> TotalOpticalPowerInput;
            case 39 -> TotalOpticalPowerInputMin;
            case 40 -> TotalOpticalPowerInputMax;
            case 41 -> TotalOpticalPowerInputAvg;
            case 42 -> FECCorrectableBlocks;
            case 43 -> FECUncorrectableBlocks;
            case 56 -> BIPErrorCounter;
            case 57 -> ProtectionSwitchingCount;
            case 58 -> ProtectionSwitchingDuration;
            case 59 -> ErroredBlockCountTCM1Up;
            case 60 -> ErroredBlockCountTCM2Up;
            case 61 -> ErroredBlockCountTCM3Up;
            case 62 -> ErroredBlockCountTCM4Up;
            case 63 -> ErroredBlockCountTCM5Up;
            case 64 -> ErroredBlockCountTCM6Up;
            case 65 -> DelayTCM1Up;
            case 66 -> DelayTCM2Up;
            case 67 -> DelayTCM3Up;
            case 68 -> DelayTCM4Up;
            case 69 -> DelayTCM5Up;
            case 70 -> DelayTCM6Up;
            case 71 -> ErroredBlockCountTCM1Down;
            case 72 -> ErroredBlockCountTCM2Down;
            case 73 -> ErroredBlockCountTCM3Down;
            case 74 -> ErroredBlockCountTCM4Down;
            case 75 -> ErroredBlockCountTCM5Down;
            case 76 -> ErroredBlockCountTCM6Down;
            case 77 -> DelayTCM1Down;
            case 78 -> DelayTCM2Down;
            case 79 -> DelayTCM3Down;
            case 80 -> DelayTCM4Down;
            case 81 -> DelayTCM5Down;
            case 82 -> DelayTCM6Down;
            case 83 -> PartialRateDiscard;
            case 84 -> ErroredSecondsTCM1Up;
            case 85 -> ErroredSecondsTCM2Up;
            case 86 -> ErroredSecondsTCM3Up;
            case 87 -> ErroredSecondsTCM4Up;
            case 88 -> ErroredSecondsTCM5Up;
            case 89 -> ErroredSecondsTCM6Up;
            case 90 -> SeverelyErroredSecondsTCM1Up;
            case 91 -> SeverelyErroredSecondsTCM2Up;
            case 92 -> SeverelyErroredSecondsTCM3Up;
            case 93 -> SeverelyErroredSecondsTCM4Up;
            case 94 -> SeverelyErroredSecondsTCM5Up;
            case 95 -> SeverelyErroredSecondsTCM6Up;
            case 96 -> UnavailableSecondsTCM1Up;
            case 97 -> UnavailableSecondsTCM2Up;
            case 98 -> UnavailableSecondsTCM3Up;
            case 99 -> UnavailableSecondsTCM4Up;
            case 100 -> UnavailableSecondsTCM5Up;
            case 101 -> UnavailableSecondsTCM6Up;
            case 102 -> ErroredSecondsTCM1Down;
            case 103 -> ErroredSecondsTCM2Down;
            case 104 -> ErroredSecondsTCM3Down;
            case 105 -> ErroredSecondsTCM4Down;
            case 106 -> ErroredSecondsTCM5Down;
            case 107 -> ErroredSecondsTCM6Down;
            case 108 -> SeverelyErroredSecondsTCM1Down;
            case 109 -> SeverelyErroredSecondsTCM2Down;
            case 110 -> SeverelyErroredSecondsTCM3Down;
            case 111 -> SeverelyErroredSecondsTCM4Down;
            case 112 -> SeverelyErroredSecondsTCM5Down;
            case 113 -> SeverelyErroredSecondsTCM6Down;
            case 114 -> UnavailableSecondsTCM1Down;
            case 115 -> UnavailableSecondsTCM2Down;
            case 116 -> UnavailableSecondsTCM3Down;
            case 117 -> UnavailableSecondsTCM4Down;
            case 118 -> UnavailableSecondsTCM5Down;
            case 119 -> UnavailableSecondsTCM6Down;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getName()} matches specified assigned name.
     *
     * @param name YANG assigned name
     * @return corresponding PmNamesEnum item
     * @throws NullPointerException if {@code name} is null
     * @throws IllegalArgumentException if {@code name} does not match any item
     */
    public static @NonNull PmNamesEnum ofName(String name) {
        return CodeHelpers.checkEnum(forName(name), name);
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding PmNamesEnum item
     * @throws IllegalArgumentException if {@code intValue} does not match any item
     */
    public static @NonNull PmNamesEnum ofValue(int intValue) {
        return CodeHelpers.checkEnum(forValue(intValue), intValue);
    }
}
