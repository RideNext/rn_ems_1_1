package org.opendaylight.yang.gen.v1.http.org.openroadm.pm.types.rev191129;
import javax.annotation.processing.Generated;
import org.opendaylight.yangtools.yang.binding.DataRoot;

/**
 * YANG definitions of performance management types. Copyright of the Members of 
 * the Open ROADM MSA Agreement dated (c) 2016, All other rights reserved. 
 * Redistribution and use in source and binary forms, with or without 
 * are permitted provided that the following conditions are met: * Redistributions 
 * of source code must retain the above copyright notice, this list of conditions 
 * and the following disclaimer. * Redistributions in binary form must reproduce 
 * the above copyright notice, this list of conditions and the following 
 * in the documentation and/or other materials provided with the distribution. * 
 * Neither the Members of the Open ROADM MSA Agreement nor the names of its 
 * contributors may be used to endorse or promote products derived from this 
 * software without specific prior written permission. THIS SOFTWARE IS PROVIDED 
 * THE MEMBERS OF THE OPEN ROADM MSA AGREEMENT ''AS IS'' AND ANY EXPRESS OR 
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO 
 * THE MEMBERS OF THE OPEN ROADM MSA AGREEMENT BE LIABLE FOR ANY DIRECT, INDIRECT, 
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT 
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR 
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF 
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>org-openroadm-pm-types</b>
 * <pre>
 * module org-openroadm-pm-types {
 *   namespace "http://org/openroadm/pm-types";
 *   prefix org-openroadm-pm-types;
 *   revision 2019-11-29 {
 *   }
 *   revision 2019-03-29 {
 *   }
 *   revision 2018-11-30 {
 *   }
 *   revision 2017-12-15 {
 *   }
 *   revision 2017-09-29 {
 *   }
 *   revision 2017-06-26 {
 *   }
 *   revision 2016-10-14 {
 *   }
 *   typedef pm-granularity {
 *     type enumeration {
 *       enum notApplicable {
 *         value 1;
 *       }
 *       enum 15min {
 *         value 2;
 *       }
 *       enum 24Hour {
 *         value 3;
 *       }
 *     }
 *   }
 *   typedef pm-data-type {
 *     type union {
 *       type uint64;
 *       type int64;
 *       type decimal64 {
 *         fraction-digits 2;
 *       }
 *       type decimal64 {
 *         fraction-digits 17;
 *       }
 *     }
 *   }
 *   typedef validity {
 *     type enumeration {
 *       enum complete {
 *         value 1;
 *       }
 *       enum partial {
 *         value 2;
 *       }
 *       enum suspect {
 *         value 3;
 *       }
 *     }
 *   }
 *   typedef pm-names-enum {
 *     type enumeration {
 *       enum vendorExtension {
 *         value 1;
 *       }
 *       enum bitErrorRate {
 *         value 2;
 *       }
 *       enum opticalPowerOutput {
 *         value 3;
 *       }
 *       enum opticalReturnLoss {
 *         value 4;
 *       }
 *       enum opticalPowerInput {
 *         value 5;
 *       }
 *       enum codeViolations {
 *         value 8;
 *       }
 *       enum erroredSeconds {
 *         value 9;
 *       }
 *       enum severelyErroredSeconds {
 *         value 10;
 *       }
 *       enum unavailableSeconds {
 *         value 11;
 *       }
 *       enum inFrames {
 *         value 12;
 *       }
 *       enum inFramesErrored {
 *         value 13;
 *       }
 *       enum outFrames {
 *         value 14;
 *       }
 *       enum erroredSecondsEthernet {
 *         value 15;
 *       }
 *       enum severelyErroredSecondsEthernet {
 *         value 16;
 *       }
 *       enum unavailableSecondsEthernet {
 *         value 17;
 *       }
 *       enum erroredBlockCount {
 *         value 18;
 *       }
 *       enum delay {
 *         value 19;
 *       }
 *       enum defectSeconds {
 *         value 20;
 *       }
 *       enum backwardIncomingAlignmentError {
 *         value 21;
 *       }
 *       enum incomingAlignmentError {
 *         value 22;
 *       }
 *       enum opticalPowerOutputMin {
 *         value 23;
 *       }
 *       enum opticalPowerOutputMax {
 *         value 24;
 *       }
 *       enum opticalPowerOutputAvg {
 *         value 25;
 *       }
 *       enum opticalPowerInputMin {
 *         value 26;
 *       }
 *       enum opticalPowerInputMax {
 *         value 27;
 *       }
 *       enum opticalPowerInputAvg {
 *         value 28;
 *       }
 *       enum opticalPowerOutputOSC {
 *         value 29;
 *       }
 *       enum opticalPowerOutputOSCMin {
 *         value 30;
 *       }
 *       enum opticalPowerOutputOSCMax {
 *         value 31;
 *       }
 *       enum opticalPowerOutputOSCAvg {
 *         value 32;
 *       }
 *       enum opticalPowerInputOSC {
 *         value 33;
 *       }
 *       enum opticalPowerInputOSCMin {
 *         value 34;
 *       }
 *       enum opticalPowerInputOSCMax {
 *         value 35;
 *       }
 *       enum opticalPowerInputOSCAvg {
 *         value 36;
 *       }
 *       enum preFECCorrectedErrors {
 *         value 37;
 *       }
 *       enum totalOpticalPowerInput {
 *         value 38;
 *       }
 *       enum totalOpticalPowerInputMin {
 *         value 39;
 *       }
 *       enum totalOpticalPowerInputMax {
 *         value 40;
 *       }
 *       enum totalOpticalPowerInputAvg {
 *         value 41;
 *       }
 *       enum FECCorrectableBlocks {
 *         value 42;
 *       }
 *       enum FECUncorrectableBlocks {
 *         value 43;
 *       }
 *       enum BIPErrorCounter {
 *         value 56;
 *       }
 *       enum protectionSwitchingCount {
 *         value 57;
 *       }
 *       enum protectionSwitchingDuration {
 *         value 58;
 *       }
 *       enum erroredBlockCountTCM1-up {
 *         value 59;
 *       }
 *       enum erroredBlockCountTCM2-up {
 *         value 60;
 *       }
 *       enum erroredBlockCountTCM3-up {
 *         value 61;
 *       }
 *       enum erroredBlockCountTCM4-up {
 *         value 62;
 *       }
 *       enum erroredBlockCountTCM5-up {
 *         value 63;
 *       }
 *       enum erroredBlockCountTCM6-up {
 *         value 64;
 *       }
 *       enum delayTCM1-up {
 *         value 65;
 *       }
 *       enum delayTCM2-up {
 *         value 66;
 *       }
 *       enum delayTCM3-up {
 *         value 67;
 *       }
 *       enum delayTCM4-up {
 *         value 68;
 *       }
 *       enum delayTCM5-up {
 *         value 69;
 *       }
 *       enum delayTCM6-up {
 *         value 70;
 *       }
 *       enum erroredBlockCountTCM1-down {
 *         value 71;
 *       }
 *       enum erroredBlockCountTCM2-down {
 *         value 72;
 *       }
 *       enum erroredBlockCountTCM3-down {
 *         value 73;
 *       }
 *       enum erroredBlockCountTCM4-down {
 *         value 74;
 *       }
 *       enum erroredBlockCountTCM5-down {
 *         value 75;
 *       }
 *       enum erroredBlockCountTCM6-down {
 *         value 76;
 *       }
 *       enum delayTCM1-down {
 *         value 77;
 *       }
 *       enum delayTCM2-down {
 *         value 78;
 *       }
 *       enum delayTCM3-down {
 *         value 79;
 *       }
 *       enum delayTCM4-down {
 *         value 80;
 *       }
 *       enum delayTCM5-down {
 *         value 81;
 *       }
 *       enum delayTCM6-down {
 *         value 82;
 *       }
 *       enum partialRateDiscard {
 *         value 83;
 *       }
 *       enum erroredSecondsTCM1-up {
 *         value 84;
 *       }
 *       enum erroredSecondsTCM2-up {
 *         value 85;
 *       }
 *       enum erroredSecondsTCM3-up {
 *         value 86;
 *       }
 *       enum erroredSecondsTCM4-up {
 *         value 87;
 *       }
 *       enum erroredSecondsTCM5-up {
 *         value 88;
 *       }
 *       enum erroredSecondsTCM6-up {
 *         value 89;
 *       }
 *       enum severelyErroredSecondsTCM1-up {
 *         value 90;
 *       }
 *       enum severelyErroredSecondsTCM2-up {
 *         value 91;
 *       }
 *       enum severelyErroredSecondsTCM3-up {
 *         value 92;
 *       }
 *       enum severelyErroredSecondsTCM4-up {
 *         value 93;
 *       }
 *       enum severelyErroredSecondsTCM5-up {
 *         value 94;
 *       }
 *       enum severelyErroredSecondsTCM6-up {
 *         value 95;
 *       }
 *       enum unavailableSecondsTCM1-up {
 *         value 96;
 *       }
 *       enum unavailableSecondsTCM2-up {
 *         value 97;
 *       }
 *       enum unavailableSecondsTCM3-up {
 *         value 98;
 *       }
 *       enum unavailableSecondsTCM4-up {
 *         value 99;
 *       }
 *       enum unavailableSecondsTCM5-up {
 *         value 100;
 *       }
 *       enum unavailableSecondsTCM6-up {
 *         value 101;
 *       }
 *       enum erroredSecondsTCM1-down {
 *         value 102;
 *       }
 *       enum erroredSecondsTCM2-down {
 *         value 103;
 *       }
 *       enum erroredSecondsTCM3-down {
 *         value 104;
 *       }
 *       enum erroredSecondsTCM4-down {
 *         value 105;
 *       }
 *       enum erroredSecondsTCM5-down {
 *         value 106;
 *       }
 *       enum erroredSecondsTCM6-down {
 *         value 107;
 *       }
 *       enum severelyErroredSecondsTCM1-down {
 *         value 108;
 *       }
 *       enum severelyErroredSecondsTCM2-down {
 *         value 109;
 *       }
 *       enum severelyErroredSecondsTCM3-down {
 *         value 110;
 *       }
 *       enum severelyErroredSecondsTCM4-down {
 *         value 111;
 *       }
 *       enum severelyErroredSecondsTCM5-down {
 *         value 112;
 *       }
 *       enum severelyErroredSecondsTCM6-down {
 *         value 113;
 *       }
 *       enum unavailableSecondsTCM1-down {
 *         value 114;
 *       }
 *       enum unavailableSecondsTCM2-down {
 *         value 115;
 *       }
 *       enum unavailableSecondsTCM3-down {
 *         value 116;
 *       }
 *       enum unavailableSecondsTCM4-down {
 *         value 117;
 *       }
 *       enum unavailableSecondsTCM5-down {
 *         value 118;
 *       }
 *       enum unavailableSecondsTCM6-down {
 *         value 119;
 *       }
 *     }
 *   }
 *   grouping pm-measurement {
 *     leaf pmParameterValue {
 *       type pm-data-type;
 *       config false;
 *     }
 *     leaf pmParameterUnit {
 *       type string;
 *       mandatory false;
 *     }
 *     leaf validity {
 *       type validity;
 *       mandatory false;
 *     }
 *   }
 *   grouping pm-names {
 *     leaf type {
 *       type pm-names-enum;
 *     }
 *     leaf extension {
 *       type string;
 *     }
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public interface OrgOpenroadmPmTypesData
    extends
    DataRoot
{





}

