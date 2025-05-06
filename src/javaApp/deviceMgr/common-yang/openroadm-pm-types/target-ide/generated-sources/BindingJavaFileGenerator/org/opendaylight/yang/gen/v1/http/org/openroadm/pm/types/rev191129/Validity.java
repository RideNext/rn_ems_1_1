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
 * typedef validity {
 *   type enumeration {
 *     enum complete {
 *       value 1;
 *     }
 *     enum partial {
 *       value 2;
 *     }
 *     enum suspect {
 *       value 3;
 *     }
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public enum Validity implements Enumeration {
    Complete(1, "complete"),
    
    Partial(2, "partial"),
    
    Suspect(3, "suspect")
    ;

    private final @NonNull String name;
    private final int value;

    private Validity(int value, @NonNull String name) {
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
     * @return corresponding Validity item, or {@code null} if no such item exists
     * @throws NullPointerException if {@code name} is null
     */
    public static @Nullable Validity forName(String name) {
        return switch (name) {
            case "complete" -> Complete;
            case "partial" -> Partial;
            case "suspect" -> Suspect;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding Validity item, or {@code null} if no such item exists
     */
    public static @Nullable Validity forValue(int intValue) {
        return switch (intValue) {
            case 1 -> Complete;
            case 2 -> Partial;
            case 3 -> Suspect;
            default -> null;
        };
    }

    /**
     * Return the enumeration member whose {@link #getName()} matches specified assigned name.
     *
     * @param name YANG assigned name
     * @return corresponding Validity item
     * @throws NullPointerException if {@code name} is null
     * @throws IllegalArgumentException if {@code name} does not match any item
     */
    public static @NonNull Validity ofName(String name) {
        return CodeHelpers.checkEnum(forName(name), name);
    }

    /**
     * Return the enumeration member whose {@link #getIntValue()} matches specified value.
     *
     * @param intValue integer value
     * @return corresponding Validity item
     * @throws IllegalArgumentException if {@code intValue} does not match any item
     */
    public static @NonNull Validity ofValue(int intValue) {
        return CodeHelpers.checkEnum(forValue(intValue), intValue);
    }
}
