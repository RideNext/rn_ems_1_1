package org.opendaylight.yang.gen.v1.http.org.openroadm.pm.types.rev191129;
import java.lang.Class;
import java.lang.Override;
import java.lang.String;
import java.util.NoSuchElementException;
import javax.annotation.processing.Generated;
import org.eclipse.jdt.annotation.NonNull;
import org.opendaylight.yangtools.yang.binding.CodeHelpers;
import org.opendaylight.yangtools.yang.binding.DataObject;
import org.opendaylight.yangtools.yang.common.QName;

/**
 * Set of parameters related to a PM Measurement
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>org-openroadm-pm-types</b>
 * <pre>
 * grouping pm-measurement {
 *   leaf pmParameterValue {
 *     type pm-data-type;
 *     config false;
 *   }
 *   leaf pmParameterUnit {
 *     type string;
 *     mandatory false;
 *   }
 *   leaf validity {
 *     type validity;
 *     mandatory false;
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public interface PmMeasurement
    extends
    DataObject
{



    /**
     * YANG identifier of the statement represented by this class.
     */
    public static final @NonNull QName QNAME = $YangModuleInfoImpl.qnameOf("pm-measurement");

    @Override
    Class<? extends PmMeasurement> implementedInterface();
    
    /**
     * Return pmParameterValue, or {@code null} if it is not present.
     * 
     * @return {@code PmDataType} pmParameterValue, or {@code null} if it is not present.
     *
     */
    PmDataType getPmParameterValue();
    
    /**
     * Return pmParameterValue, guaranteed to be non-null.
     * 
     * @return {@code PmDataType} pmParameterValue, guaranteed to be non-null.
     * @throws NoSuchElementException if pmParameterValue is not present
     *
     */
    default @NonNull PmDataType requirePmParameterValue() {
        return CodeHelpers.require(getPmParameterValue(), "pmparametervalue");
    }
    
    /**
     * Return pmParameterUnit, or {@code null} if it is not present.
     * 
     * <pre>
     *     <code>
     *         Unit PM parameter has been measured - frames, packets, u, etc
     *     </code>
     * </pre>
     * 
     * @return {@code String} pmParameterUnit, or {@code null} if it is not present.
     *
     */
    String getPmParameterUnit();
    
    /**
     * Return pmParameterUnit, guaranteed to be non-null.
     * 
     * <pre>
     *     <code>
     *         Unit PM parameter has been measured - frames, packets, u, etc
     *     </code>
     * </pre>
     * 
     * @return {@code String} pmParameterUnit, guaranteed to be non-null.
     * @throws NoSuchElementException if pmParameterUnit is not present
     *
     */
    default @NonNull String requirePmParameterUnit() {
        return CodeHelpers.require(getPmParameterUnit(), "pmparameterunit");
    }
    
    /**
     * Return validity, or {@code null} if it is not present.
     * 
     * @return {@code Validity} validity, or {@code null} if it is not present.
     *
     */
    Validity getValidity();
    
    /**
     * Return validity, guaranteed to be non-null.
     * 
     * @return {@code Validity} validity, guaranteed to be non-null.
     * @throws NoSuchElementException if validity is not present
     *
     */
    default @NonNull Validity requireValidity() {
        return CodeHelpers.require(getValidity(), "validity");
    }

}

