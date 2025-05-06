package org.opendaylight.yang.gen.v1.http.org.openroadm.pm.types.rev191129;
import com.google.common.base.MoreObjects;
import java.io.Serializable;
import java.lang.Long;
import java.lang.Override;
import java.lang.String;
import java.util.Objects;
import javax.annotation.processing.Generated;
import org.opendaylight.yangtools.yang.binding.CodeHelpers;
import org.opendaylight.yangtools.yang.binding.TypeObject;
import org.opendaylight.yangtools.yang.common.Decimal64;
import org.opendaylight.yangtools.yang.common.Uint64;

/**
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>org-openroadm-pm-types</b>
 * <pre>
 * typedef pm-data-type {
 *   type union {
 *     type uint64;
 *     type int64;
 *     type decimal64 {
 *       fraction-digits 2;
 *     }
 *     type decimal64 {
 *       fraction-digits 17;
 *     }
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public class PmDataType
 implements TypeObject, Serializable {
    private static final long serialVersionUID = 3718738912347966750L;
    private final Uint64 _uint64;
    private final Long _int64;
    private final Decimal64 _decimal64;


    public PmDataType(Uint64 _uint64) {
        super();
        this._uint64 = Objects.requireNonNull(_uint64);
        this._int64 = null;
        this._decimal64 = null;
    }
    
    public PmDataType(Long _int64) {
        super();
        this._int64 = Objects.requireNonNull(_int64);
        this._uint64 = null;
        this._decimal64 = null;
    }
    
    public PmDataType(Decimal64 _decimal64) {
        super();
        this._decimal64 = Objects.requireNonNull(_decimal64);
        this._uint64 = null;
        this._int64 = null;
    }
    /**
     * Creates a copy from Source Object.
     *
     * @param source Source object
     */
    public PmDataType(PmDataType source) {
        this._uint64 = source._uint64;
        this._int64 = source._int64;
        this._decimal64 = source._decimal64;
    }
    
    /**
     * Return a String representing the value of this union.
     *
     * @return String representation of this union's value.
     */
    public String stringValue() {
        if (_uint64 != null) {
            return _uint64.toCanonicalString();
        }
        if (_int64 != null) {
            return _int64.toString();
        }
        if (_decimal64 != null) {
            return _decimal64.toCanonicalString();
        }
        throw new IllegalStateException("No value assigned");
    }


    public Uint64 getUint64() {
        return _uint64;
    }
    
    public Long getInt64() {
        return _int64;
    }
    
    public Decimal64 getDecimal64() {
        return _decimal64;
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + Objects.hashCode(_uint64);
        result = prime * result + Objects.hashCode(_int64);
        result = prime * result + Objects.hashCode(_decimal64);
        return result;
    }

    @Override
    public final boolean equals(java.lang.Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof PmDataType)) {
            return false;
        }
        final PmDataType other = (PmDataType) obj;
        if (!Objects.equals(_uint64, other._uint64)) {
            return false;
        }
        if (!Objects.equals(_int64, other._int64)) {
            return false;
        }
        if (!Objects.equals(_decimal64, other._decimal64)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        final var helper = MoreObjects.toStringHelper(PmDataType.class);
        CodeHelpers.appendValue(helper, "uint64", _uint64);
        CodeHelpers.appendValue(helper, "int64", _int64);
        CodeHelpers.appendValue(helper, "decimal64", _decimal64);
        return helper.toString();
    }
}

