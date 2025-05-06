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
 * typedef pm-granularity {
 *   type enumeration {
 *     enum notApplicable {
 *       value 1;
 *     }
 *     enum 15min {
 *       value 2;
 *     }
 *     enum 24Hour {
 *       value 3;
 *     }
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public enum PmGranularity implements Enumeration {
    /**
     * This is for total statistic counters on devices that support
     *    them.
     */
    NotApplicable(1, "notApplicable"),
    
    _15min(2, "15min"),
    
    _24Hour(3, "24Hour")
    ;

    private final @NonNull String name;
    private final int value;

    private PmGranularity(int value, @NonNull String name) {
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
     * @return corresponding PmGranularity item, or {@code null} if no such item exists
     * @throws NullPointerException if {@code name} is null
     */
    public static @Nullable PmGranularity forName(String name) {
        return switch (name) {
            case "notApplicable" -> NotApplicable;
            case "15min" -> _15min;
            case "24Hour" -> _24Hour;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding PmGranularity item, or {@code null} if no such item exists
     */
    public static @Nullable PmGranularity forValue(int intValue) {
        return switch (intValue) {
            case 1 -> NotApplicable;
            case 2 -> _15min;
            case 3 -> _24Hour;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getName()} matches specified assigned name.
     *
     * @param name YANG assigned name
     * @return corresponding PmGranularity item
     * @throws NullPointerException if {@code name} is null
     * @throws IllegalArgumentException if {@code name} does not match any item
     */
    public static @NonNull PmGranularity ofName(String name) {
        return CodeHelpers.checkEnum(forName(name), name);
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding PmGranularity item
     * @throws IllegalArgumentException if {@code intValue} does not match any item
     */
    public static @NonNull PmGranularity ofValue(int intValue) {
        return CodeHelpers.checkEnum(forValue(intValue), intValue);
    }
}
