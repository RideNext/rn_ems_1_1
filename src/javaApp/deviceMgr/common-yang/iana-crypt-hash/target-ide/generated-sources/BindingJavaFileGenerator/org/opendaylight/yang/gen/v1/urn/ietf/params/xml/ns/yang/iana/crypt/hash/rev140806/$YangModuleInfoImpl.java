package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;

import com.google.common.collect.ImmutableSet;
import java.lang.Override;
import java.lang.String;
import org.eclipse.jdt.annotation.NonNull;
import org.opendaylight.yangtools.yang.binding.ResourceYangModuleInfo;
import org.opendaylight.yangtools.yang.binding.YangModuleInfo;
import org.opendaylight.yangtools.yang.common.QName;

/**
 * The {@link ResourceYangModuleInfo} for {@code iana-crypt-hash} module.
 */
@javax.annotation.processing.Generated("mdsal-binding-generator")
public final class $YangModuleInfoImpl extends ResourceYangModuleInfo {
    private static final @NonNull QName NAME = QName.create("urn:ietf:params:xml:ns:yang:iana-crypt-hash", "2014-08-06", "iana-crypt-hash").intern();
    private static final @NonNull YangModuleInfo INSTANCE = new $YangModuleInfoImpl();

    private final @NonNull ImmutableSet<YangModuleInfo> importedModules;

    /**
     * Return the singleton instance of this class.
     *
     * @return The singleton instance
     */
    public static @NonNull YangModuleInfo getInstance() {
        return INSTANCE;
    }

    /**
     * Create an interned {@link QName} with specified {@code localName} and namespace/revision of this
     * module.
     *
     * @param localName local name
     * @return A QName
     * @throws NullPointerException if {@code localName} is null
     * @throws IllegalArgumentException if localName is not a valid YANG identifier
     */
    public static @NonNull QName qnameOf(final String localName) {
        return QName.create(NAME, localName).intern();
    }

    private $YangModuleInfoImpl() {
        importedModules = ImmutableSet.of();
    }
    
    @Override
    public QName getName() {
        return NAME;
    }
    
    @Override
    protected String resourceName() {
        return "/META-INF/yang/iana-crypt-hash@2014-08-06.yang";
    }
    
    @Override
    public ImmutableSet<YangModuleInfo> getImportedModules() {
        return importedModules;
    }
}
