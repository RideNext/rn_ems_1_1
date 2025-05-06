package org.opendaylight.yang.gen.v1.urn.ietf.params.xml.ns.yang.iana.crypt.hash.rev140806;
import javax.annotation.processing.Generated;
import org.opendaylight.yangtools.yang.binding.DataRoot;

/**
 * This YANG module defines a type for storing passwords using a hash function and 
 * features to indicate which hash functions are supported by an implementation. 
 * The latest revision of this YANG module can be obtained from the IANA web site. 
 * Requests for new values should be made to IANA via email (iana&#64;iana.org). 
 * Copyright (c) 2014 IETF Trust and the persons identified as authors of the 
 * All rights reserved. Redistribution and use in source and binary forms, with or 
 * without modification, is permitted pursuant to, and subject to the license 
 * contained in, the Simplified BSD License set forth in Section 4.c of the IETF 
 * Trust's Legal Provisions Relating to IETF Documents 
 * (http://trustee.ietf.org/license-info). The initial version of this YANG module 
 * is part of RFC 7317; see the RFC itself for full legal notices.
 * 
 * <p>
 * This class represents the following YANG schema fragment defined in module <b>iana-crypt-hash</b>
 * <pre>
 * module iana-crypt-hash {
 *   namespace urn:ietf:params:xml:ns:yang:iana-crypt-hash;
 *   prefix ianach;
 *   revision 2014-08-06 {
 *   }
 *   typedef crypt-hash {
 *     type string {
 *       pattern "$0$.*|$1$[a-zA-Z0-9./]{1,8}$[a-zA-Z0-9./]{22}|$5$(rounds=\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{43}|$6$(rounds=\d+$)?[a-zA-Z0-9./]{1,16}$[a-zA-Z0-9./]{86}";
 *     }
 *   }
 *   feature crypt-hash-md5 {
 *   }
 *   feature crypt-hash-sha-256 {
 *   }
 *   feature crypt-hash-sha-512 {
 *   }
 * }
 * </pre>
 *
 */
@Generated("mdsal-binding-generator")
public interface IanaCryptHashData
    extends
    DataRoot
{





}

