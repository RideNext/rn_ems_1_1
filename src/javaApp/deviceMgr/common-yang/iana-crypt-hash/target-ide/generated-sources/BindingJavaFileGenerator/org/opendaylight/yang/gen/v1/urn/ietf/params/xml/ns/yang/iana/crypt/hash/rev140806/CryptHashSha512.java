package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;
import java.lang.Class;
import java.lang.Override;
import javax.annotation.processing.Generated;
import org.eclipse.jdt.annotation.NonNull;
import org.eclipse.jdt.annotation.NonNullByDefault;
import org.opendaylight.yangtools.yang.binding.YangFeature;
import org.opendaylight.yangtools.yang.common.QName;

/**
 * Indicates that the device supports the SHA-512 hash function in 'crypt-hash' 
 * values.
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>iana-crypt-hash</b>
 * <pre>
 * feature crypt-hash-sha-512 {
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
@NonNullByDefault
public final class CryptHashSha512 extends YangFeature<CryptHashSha512, IanaCryptHashData> {
    /**
     * YANG identifier of the statement represented by this class.
     */
    public static final @NonNull QName QNAME = $YangModuleInfoImpl.qnameOf("crypt-hash-sha-512");
    /**
     * {@link CryptHashSha512} singleton instance.
     */
    public static final CryptHashSha512 VALUE = new CryptHashSha512();


    private CryptHashSha512() {
        // Hidden on purpose
    }


    @Override
    public Class<CryptHashSha512> implementedInterface() {
        return CryptHashSha512.class;
    }
    
    @Override
    public QName qname() {
        return QNAME;
    }
    
    @Override
    public Class<IanaCryptHashData> definingModule() {
        return IanaCryptHashData.class;
    }




}

