package SSL;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.math.BigInteger;
import java.nio.file.Files;
import java.security.InvalidKeyException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.SecureRandom;
import java.security.Security;
import java.security.SignatureException;
import java.security.cert.CertificateEncodingException;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.interfaces.RSAPrivateCrtKey;
import java.util.Date;
import java.util.Hashtable;
import java.util.Vector;

import javax.net.ssl.KeyManagerFactory;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;

import org.bouncycastle.asn1.ASN1ObjectIdentifier;
import org.bouncycastle.crypto.digests.SHA256Digest;
import org.bouncycastle.jce.X509Principal;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.encoders.Base64;
import org.bouncycastle.util.encoders.Hex;
import org.bouncycastle.x509.X509V3CertificateGenerator;
import org.json.JSONException;
import org.json.JSONObject;

import Config.Config;
import Email.Email;
import qr.QRterminal;
import util.console;

public class SSL {

    public static KeyStore getKeyStore() {
        String path = Config.getJSON("ssl").getString("nombre_jks") + ".jks";
        String pass = Config.getJSON("ssl").getString("pass_jks");
        try {
            File file = new File(path);
            KeyStore keyStore = KeyStore.getInstance("JKS");
            if (!file.exists()) {
                keyStore.load(null, pass.toCharArray());
                keyStore.store(new FileOutputStream(file), pass.toCharArray());
            }

            keyStore.load(new FileInputStream(file), pass.toCharArray());
            return keyStore;
        } catch (Exception e) {
            return null;
        }

    }

    public static String fingerprint(X509Certificate c) throws IOException, CertificateEncodingException {
        byte[] der = c.getEncoded();
        byte[] sha1 = sha256DigestOf(der);
        byte[] hexBytes = Hex.encode(sha1);
        String hex = new String(hexBytes, "ASCII").toUpperCase();
        StringBuffer fp = new StringBuffer();
        int i = 0;
        fp.append(hex.substring(i, i + 2));
        while ((i += 2) < hex.length()) {
            fp.append(':');
            fp.append(hex.substring(i, i + 2));
        }
        return fp.toString();
    }
    
    static byte[] sha256DigestOf(byte[] input) {
        SHA256Digest d = new SHA256Digest();
        d.update(input, 0, input.length);
        byte[] result = new byte[d.getDigestSize()];
        d.doFinal(result, 0);
        return result;
    }

    public static SSLContext getSSLContext() {
        try {
            String pass = Config.getJSON().getJSONObject("ssl").getString("pass_jks");
            KeyStore ks = getKeyStore();
            KeyManagerFactory kmf = KeyManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            kmf.init(ks, pass.toCharArray());
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm());
            tmf.init(ks);
            TrustManager[] trustManagers = tmf.getTrustManagers();
            SSLContext sc = SSLContext.getInstance("TLS");
            sc.init(kmf.getKeyManagers(), trustManagers, null);
            return sc;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }

    public static boolean readPem(String path, String nombre) {
        // before decoding we need to get rod off the prefix and suffix
        try {
            FileReader file;
            file = new FileReader(path);
            int valor = file.read();
            String configJson = "";
            while (valor != -1) {
                configJson = configJson + String.valueOf(((char) valor));
                valor = file.read();
            }
            file.close();
            
            

            //String cert_begin = "-----BEGIN CERTIFICATE-----";
            //String end_cert = "-----END CERTIFICATE-----";


            byte[] prvBlob = Base64.decode(configJson);
            X509Certificate cert = (X509Certificate) CertificateFactory.getInstance("X.509")
                    .generateCertificate(new ByteArrayInputStream(prvBlob));


            // KeyStore keystore = getKeyStore();
            
            // prvBlob = Base64.decode("MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCXikm3UfH3npI6xTA4iRzaygBxzRSSd7d5s+Q69oPWWz+toMLMeYYA2anJXuwy6/mtKPABFMVkAzcea1z7Y0ZTVkEyYiQq8RwrnfL/iNa3lFbp3OIcDx5WfPDXpEnQFxtCUewD5/l4zGeeP0dKysWpIGniUisdEjHq8nAlFIIeLW+5jn4pH9+5Tj8Ki328gboWL1OOCv1muY+J26sN1oLzw3Tydun62d/QCSS3ySDQ9F7Ah50w5DnoFj+be3ZtgkktVG23OlhSZQ1rrLj0havPlJLJY1XcCSJDeCVpfbXAdIjCO5Up+vT6fuvkw2xI9vUo3SjCoxxmkSa9K1YFCtPNAgMBAAECggEAGEkMasFKaH9EWoBG68yHcAWu4A34ZcejQvECGrPuaWAauqHYjgnMoJ7BT7jzW+7GxsoYemfggVhlkS2uC0h72Pep/5/MQYh91fycWHjOxkFS02w3XT1MBJrFwx08Sgml7/EuhGq852/EjE8CRxlrZ2D/Lwqxh5lmoAslzz9z4c9xdsMRjYrsY+BenDIOueLKYlP46iaBVASpBdlHPfDhKjvfEjiZAAwTJQAcyeTJ7ofHmKnmZwnMxxMnJAXynW6P1mje4dcLXf9q5+lkPhgcSrZxIonBduDmpcYr5v9dnzEp2IixQejJoaWXlHBlSzCnVnSUgtRoxpVNyyOJo4u8SQKBgQDUuC65JEuhu3C7ml0sZAXDcjhheCLVEEoW7dBBeTr2/me4MCuWQ+D3/Q/Xwx7b7hNLmyGQ1DzJAXvtzpDzJY86Ai+pxQKayRIld2g73xaTJwtT94lbOzTq9YAzLEDF4rfWSREqb6hujiJTg5AeBzCGBexUup7pwU531kGXpGANuQKBgQC2X31XKPPoBwYXYMjIA71Sx5EzRbnC12Otzowk/cAcsR1hN8/mpz4mJ3ZGL39Rut6JaCLjfk3n0K+IR4e5tNBsKg9Z8S8AzZieo763m39n2wpl01v5gPTXO+lRNFpid8cE1IVIxxTTctJUwG60+bHZYGD7iFHp4B31t7Ww67ogtQKBgE0Y6E5QGl1m+0fzfbueEPyyhD7HdRB2E/RVgzqHvthQgrUeOF4BAiO/g6N249NgaXvooPTGB7XupMUfLigCP/QNYMsOTZBeOgZ8TboNdDgnWZK4T/9R6S8ThcCGVH+kWW8AEomn6IsRVt2f/Hb1sh+RPAPFk90zI8aJUEKu3+V5AoGAMkl8T0dMkgM1y8Z1NqnJT4UV5ZRpV2963dchT6XkjkTMPB1ep1QgT/b7pvi727ZyXGMpk58lLjGd5S8MHsnb2qdyWjOl6UvHtJ6kHQ60f9enM1KnftHvMVYkzK5p6dLrPsq3Ac1bUb7MfnAdVquvPahUtabuJ1YUDMgeQm2Ngi0CgYEAjxitfHhUIUY6cGTVr5w/neuGeVOSWNhzOQULwViOgnldU1p5x7VedkWGq9s1Zfi37mClJaD42J+HFe9RhKoJRCAGx8ciHZL0yg/OxvF8uHSihWK1G/YI3jW06jmXdIFoZv18Uc8TXR0AZ5iLE2IkARO0ZUSKIk5RDu+b8jqpPXA=");
            // KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            // PrivateKey prv2 = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(prvBlob));
            
            
            // keystore.setCertificateEntry(nombre, cert);

            // keystore.setKeyEntry(nombre, prv2, "Servisofts123.".toCharArray(),
                    // new X509Certificate[] { cert });
            // FileOutputStream out = new FileOutputStream("servisofts.jks");
            // keystore.store(out, "Servisofts123.".toCharArray());
            // out.close();
            console.log(console.ANSI_PURPLE,"Nuevo certificado creado.");
            registerPem(nombre, cert);

            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    public static boolean registerPem(String nombre, X509Certificate cert) {
        String path = Config.getJSON().getJSONObject("ssl").getString("nombre_jks") + ".jks";
        String pass = Config.getJSON().getJSONObject("ssl").getString("pass_jks");
        try {

            KeyStore keyStore = getKeyStore();

            keyStore.setCertificateEntry(nombre, cert);
            keyStore.store(new FileOutputStream(path), pass.toCharArray());
            console.log(console.ANSI_PURPLE,"Nuevo certificado creado.");
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public static boolean defaultCert(String nombre, X509Certificate cert) {
        String path = Config.getJSON().getJSONObject("ssl").getString("nombre_jks") + ".jks";
        String pass = Config.getJSON().getJSONObject("ssl").getString("pass_jks");
        try {

            KeyStore keyStore = getKeyStore();
            keyStore.setCertificateEntry(nombre, cert);
            keyStore.store(new FileOutputStream(path), pass.toCharArray());
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public static X509Certificate getCert(String nombre) {
        try {
            KeyStore keystore = getKeyStore();
            X509Certificate cert = (X509Certificate) keystore.getCertificate(nombre);
            if (cert == null) {
                return null;
            }
            return cert;
        } catch (Exception e) {
            return null;
        }
    }
    public static String getFingerPrint(String nombre) {
        try {
            KeyStore keystore = getKeyStore();
            X509Certificate cert = (X509Certificate) keystore.getCertificate(nombre);
            if (cert == null) {
                return null;
            }
            return fingerprint(cert);
        } catch (Exception e) {
            return null;
        }
    }

    public static boolean servicioCert() {
        JSONObject socket_client = Config.getJSON("socket_client");
        JSONObject servicio = socket_client.getJSONObject("servicio");
        JSONObject cert = servicio.getJSONObject("cert");
        if (getCert(cert.getString("OU")) != null) {
            console.log(console.ANSI_GREEN,"Certificado " + cert.getString("OU") + " cargado con exito.");
            return true;
        }

        return readPem(cert.getString("pem"), cert.getString("OU"));
    }

    public static String getPem(X509Certificate certificate) {
        try {
            String cert_begin = "-----BEGIN CERTIFICATE-----";
            String end_cert = "-----END CERTIFICATE-----";
            byte[] derCert = certificate.getEncoded();
            String pemCertPre = new String(Base64.encode(derCert));
            String pemCert = cert_begin + pemCertPre + end_cert;
            return pemCert;
        } catch (Exception e) {
            return null;
        }
    }
    public static String getPemNoHeader(X509Certificate certificate) {
        try {
            byte[] derCert = certificate.getEncoded();
            String pemCertPre = new String(Base64.encode(derCert));
            return pemCertPre;
        } catch (Exception e) {
            return null;
        }
    }

    public static boolean defaultCert() throws KeyStoreException, JSONException, CertificateException, IOException {
        try {

            JSONObject ssl = Config.getJSON("ssl");
            JSONObject certConfig = ssl.getJSONObject("cert");

            if (getCert(certConfig.getString("OU")) != null) {
                console.log(console.ANSI_GREEN,"Certificado " + certConfig.getString("OU") + " cargado con exito.");

                return true;
            }
            addBouncyCastleAsSecurityProvider();
            // generate a key pair
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA", "BC");
            keyPairGenerator.initialize(2048, new SecureRandom());
            KeyPair keyPair = keyPairGenerator.generateKeyPair();

            // build a certificate generator
            X509Certificate cert = null;
            X509V3CertificateGenerator gen = new X509V3CertificateGenerator();
            gen.setPublicKey(keyPair.getPublic());
            gen.setSerialNumber(new BigInteger(Long.toString(System.currentTimeMillis() / 1000)));
            Hashtable<ASN1ObjectIdentifier, String> attrs = new Hashtable<ASN1ObjectIdentifier, String>();
            Vector<ASN1ObjectIdentifier> vOrder = new Vector<ASN1ObjectIdentifier>();
            attrs.put(X509Principal.E, certConfig.getString("E"));
            vOrder.add(0, X509Principal.E);
            attrs.put(X509Principal.CN, certConfig.getString("CN"));
            vOrder.add(0, X509Principal.CN);
            attrs.put(X509Principal.OU, certConfig.getString("OU"));
            vOrder.add(0, X509Principal.OU);
            attrs.put(X509Principal.O, certConfig.getString("O"));
            vOrder.add(0, X509Principal.O);
            attrs.put(X509Principal.L, certConfig.getString("L"));
            vOrder.add(0, X509Principal.L);
            attrs.put(X509Principal.ST, certConfig.getString("ST"));
            vOrder.add(0, X509Principal.ST);
            attrs.put(X509Principal.C, certConfig.getString("C"));
            vOrder.add(0, X509Principal.C);
            gen.setIssuerDN(new X509Principal(vOrder, attrs));
            gen.setSubjectDN(new X509Principal(vOrder, attrs));
            gen.setNotBefore(new Date(System.currentTimeMillis()));
            gen.setNotAfter(new Date(System.currentTimeMillis() + (1000 * 60 * 60 * 24)));
            gen.setSignatureAlgorithm("SHA256WithRSAEncryption");
            cert = gen.generate(keyPair.getPrivate(), "BC");

            RSAPrivateCrtKey k = (RSAPrivateCrtKey) keyPair.getPrivate();
            KeyStore keystore = getKeyStore();
            keystore.setCertificateEntry(certConfig.getString("OU"), cert);

            keystore.setKeyEntry(certConfig.getString("OU"), k, ssl.getString("pass_jks").toCharArray(),
                    new X509Certificate[] { cert });
            FileOutputStream out = new FileOutputStream(ssl.getString("nombre_jks") + ".jks");
            keystore.store(out, ssl.getString("pass_jks").toCharArray());
            out.close();

            String pemCert = "-----SERVISOFTS-"+certConfig.getString("OU")+"-CERTIFICATE-----"+getPemNoHeader(cert);

            QRterminal.getQr(pemCert, "pemCert.png");
            File file = new File("pemCert.png");
            
            byte[] bpemCert = Files.readAllBytes(file.toPath());
                        
            certConfig.put("cert", new String(Base64.encode(bpemCert)));
            
            new Email(Email.TIPO_NUEVO_CERTIFICADO,certConfig);
            return true;
        } catch (CertificateEncodingException | InvalidKeyException | IllegalStateException | NoSuchProviderException
                | NoSuchAlgorithmException | SignatureException e) {
            e.printStackTrace();
            return false;
        }
    }

    public static void addBouncyCastleAsSecurityProvider() {
        Security.addProvider(new BouncyCastleProvider());
    }
}