package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;
import com.google.common.base.MoreObjects;
import com.google.common.collect.ImmutableList;
import java.io.Serializable;
import java.lang.Override;
import java.lang.String;
import java.util.List;
import java.util.Objects;
import java.util.regex.Pattern;
import javax.annotation.processing.Generated;
import javax.management.ConstructorParameters;
import org.opendaylight.yangtools.yang.binding.CodeHelpers;
import org.opendaylight.yangtools.yang.binding.ScalarTypeObject;

/**
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>iana-crypt-hash</b>
 * <pre>
 * typedef crypt-hash {
 *   type string {
 *     pattern "$0$.*|$1$[a-zA-Z0-9./]{1,8}$[a-zA-Z0-9./]{22}|$5$(rounds=\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{43}|$6$(rounds=\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{86}";
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public class CryptHash
 implements ScalarTypeObject<String>, Serializable {
    private static final long serialVersionUID = -6274047097619467914L;
    public static final List<String> PATTERN_CONSTANTS = ImmutableList.of("^(?:\\$0\\$.*|\\$1\\$[a-zA-Z0-9./]{1,8}\\$[a-zA-Z0-9./]{22}|\\$5\\$(rounds=\\d+\\$)?[a-zA-Z0-9./]{1,16}\\$[a-zA-Z0-9./]{43}|\\$6\\$(rounds=\\d+\\$)?[a-zA-Z0-9./]{1,16}\\$[a-zA-Z0-9./]{86})$");
    private static final Pattern patterns = Pattern.compile(PATTERN_CONSTANTS.get(0));
    private static final String regexes = "$0$.*|$1$[a-zA-Z0-9./]{1,8}$[a-zA-Z0-9./]{22}|$5$(rounds=\\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{43}|$6$(rounds=\\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{86}";
    private final String _value;

    private static void check_valueLength(final String value) {
    }

    @ConstructorParameters("value")
    public CryptHash(String _value) {
        if (_value != null) {
            check_valueLength(_value);
        }
        
        CodeHelpers.requireValue(_value);
        CodeHelpers.checkPattern(_value, patterns, regexes);
    
        this._value = _value;
    }
    
    /**
     * Creates a copy from Source Object.
     *
     * @param source Source object
     */
    public CryptHash(CryptHash source) {
        this._value = source._value;
    }

    public static CryptHash getDefaultInstance(final String defaultValue) {
        return new CryptHash(defaultValue);
    }

    @Override
    public String getValue() {
        return _value;
    }


    @Override
    public int hashCode() {
        return CodeHelpers.wrapperHashCode(_value);
    }

    @Override
    public final boolean equals(java.lang.Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof CryptHash)) {
            return false;
        }
        final CryptHash other = (CryptHash) obj;
        if (!Objects.equals(_value, other._value)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        final var helper = MoreObjects.toStringHelper(CryptHash.class);
        CodeHelpers.appendValue(helper, "value", _value);
        return helper.toString();
    }
}

