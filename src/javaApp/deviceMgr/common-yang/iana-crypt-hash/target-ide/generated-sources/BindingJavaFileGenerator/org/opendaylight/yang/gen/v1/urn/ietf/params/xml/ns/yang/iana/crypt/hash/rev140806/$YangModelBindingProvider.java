package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;

import java.lang.Override;
import java.util.ServiceLoader;
import org.opendaylight.yangtools.yang.binding.YangModelBindingProvider;
import org.opendaylight.yangtools.yang.binding.YangModuleInfo;

/**
 * The {@link YangModelBindingProvider} for {@code iana-crypt-hash} module. This class should not be used
 * directly, but rather through {@link ServiceLoader}.
 */
@javax.annotation.processing.Generated("mdsal-binding-generator")
public final class $YangModelBindingProvider implements YangModelBindingProvider {
    /**
     * Construct a new provider.
     */
    public $YangModelBindingProvider() {
        // No-op
    }

    @Override
    public YangModuleInfo getModuleInfo() {
        return $YangModuleInfoImpl.getInstance();
    }
}
