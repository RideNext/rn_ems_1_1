package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;
import java.lang.Class;
import java.lang.Override;
import javax.annotation.processing.Generated;
import org.eclipse.jdt.annotation.NonNull;
import org.eclipse.jdt.annotation.NonNullByDefault;
import org.opendaylight.yangtools.yang.binding.YangFeature;
import org.opendaylight.yangtools.yang.common.QName;

/**
 * Indicates that the device supports the SHA-256 hash function in 'crypt-hash' 
 * values.
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>iana-crypt-hash</b>
 * <pre>
 * feature crypt-hash-sha-256 {
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
@NonNullByDefault
public final class CryptHashSha256 extends YangFeature<CryptHashSha256, IanaCryptHashData> {
    /**
     * YANG identifier of the statement represented by this class.
     */
    public static final @NonNull QName QNAME = $YangModuleInfoImpl.qnameOf("crypt-hash-sha-256");
    /**
     * {@link CryptHashSha256} singleton instance.
     */
    public static final CryptHashSha256 VALUE = new CryptHashSha256();


    private CryptHashSha256() {
        // Hidden on purpose
    }


    @Override
    public Class<CryptHashSha256> implementedInterface() {
        return CryptHashSha256.class;
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

