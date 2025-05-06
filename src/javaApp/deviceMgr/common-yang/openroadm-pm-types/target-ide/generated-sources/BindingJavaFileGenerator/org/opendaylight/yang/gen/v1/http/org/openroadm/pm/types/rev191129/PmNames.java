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
 * Name of PM parameter. Consists of a set list of parameters, plus an extension 
 * field to support addition parameters.
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>org-openroadm-pm-types</b>
 * <pre>
 * grouping pm-names {
 *   leaf type {
 *     type pm-names-enum;
 *   }
 *   leaf extension {
 *     type string;
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public interface PmNames
    extends
    DataObject
{



    /**
     * YANG identifier of the statement represented by this class.
     */
    public static final @NonNull QName QNAME = $YangModuleInfoImpl.qnameOf("pm-names");

    @Override
    Class<? extends PmNames> implementedInterface();
    
    /**
     * Return type, or {@code null} if it is not present.
     * 
     * @return {@code PmNamesEnum} type, or {@code null} if it is not present.
     *
     */
    PmNamesEnum getType();
    
    /**
     * Return type, guaranteed to be non-null.
     * 
     * @return {@code PmNamesEnum} type, guaranteed to be non-null.
     * @throws NoSuchElementException if type is not present
     *
     */
    default @NonNull PmNamesEnum requireType() {
        return CodeHelpers.require(getType(), "type");
    }
    
    /**
     * Return extension, or {@code null} if it is not present.
     * 
     * <pre>
     *     <code>
     *         name of parameter, when enum value set to vendorExtension because name not found
     *         in pm-names-enum
     *     </code>
     * </pre>
     * 
     * @return {@code String} extension, or {@code null} if it is not present.
     *
     */
    String getExtension();
    
    /**
     * Return extension, guaranteed to be non-null.
     * 
     * <pre>
     *     <code>
     *         name of parameter, when enum value set to vendorExtension because name not found
     *         in pm-names-enum
     *     </code>
     * </pre>
     * 
     * @return {@code String} extension, guaranteed to be non-null.
     * @throws NoSuchElementException if extension is not present
     *
     */
    default @NonNull String requireExtension() {
        return CodeHelpers.require(getExtension(), "extension");
    }

}

