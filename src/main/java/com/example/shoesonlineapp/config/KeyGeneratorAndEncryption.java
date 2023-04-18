package com.example.shoesonlineapp.config;
import com.example.shoesonlineapp.entity.EncryptedPrivateKey;
import com.example.shoesonlineapp.repository.EncryptedPrivateKeyRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.bouncycastle.util.io.pem.PemObject;
import org.bouncycastle.util.io.pem.PemWriter;
import org.springframework.context.annotation.Configuration;
import javax.crypto.*;
import java.io.*;
import java.security.*;


@Configuration
@RequiredArgsConstructor
public class KeyGeneratorAndEncryption {
    private static final String ENCRYPTION_KEY_FILE = "encryption_aes_key.dat";
    private static final String RSA_PUBLIC_KEY_PEM_FORMAT = "rsa_public_key_pem_format.txt";
    private static SecretKey encryptionKey;
    private PrivateKey privateKey;
    private PublicKey publicKey;

    private final EncryptedPrivateKeyRepository encryptedPrivateKeyRepository;
    private final EncryptedPrivateKey encryptedPrivateKey;




    // method to generate RSA key and save it into database.
    @PostConstruct
    public void generateKey() throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, IOException, ClassNotFoundException {


        // generate private RSA key.
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        this.privateKey = keyPair.getPrivate();
        this.publicKey = keyPair.getPublic();


        // To verify signature  in jwt webpage.
        getPublicKeyInPemFormat(publicKey);
//        savePublicKeyToFile(publicKey, "rsa_public_key.txt");


        // Now encrypt the private key and store in Mongo
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, getEncryptionKey()); // e merr qelsin sekret per enkriptim simetrik (AES)

        byte[] encryptedRsaKey = cipher.doFinal(this.privateKey.getEncoded()); // enkriptohet me qels sekret, qelsi privat i RSA.

        this.encryptedPrivateKey.setEncryptedPrivateKey(encryptedRsaKey);
        encryptedPrivateKeyRepository.save(this.encryptedPrivateKey);

    }


    // method to encrypt RSA private key with AES algorithm
    public SecretKey getEncryptionKey() throws NoSuchAlgorithmException, IOException {

        if(encryptionKey == null) {
            KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
            keyGenerator.init(256); // specify key size, e.g., 128, 192, or 256 bits
            encryptionKey = keyGenerator.generateKey();

            FileOutputStream fileOut = new FileOutputStream(ENCRYPTION_KEY_FILE);
            ObjectOutputStream objectOut = new ObjectOutputStream(fileOut);
            objectOut.writeObject(encryptionKey);
            objectOut.close();
            fileOut.close();
        }
        return encryptionKey;
    }






    public static void getPublicKeyInPemFormat(PublicKey publicKey) throws IOException {

        PemObject pemObject = new PemObject("PUBLIC KEY", publicKey.getEncoded());
        StringWriter stringWriter = new StringWriter();
        PemWriter pemWriter = new PemWriter(stringWriter);
        pemWriter.writeObject(pemObject);
        pemWriter.flush();
        pemWriter.close();
        String publicKeyPem = stringWriter.toString();
        System.out.println("Public Key in PEM format: \n" + publicKeyPem);

       FileOutputStream fileOutputStream = new FileOutputStream(RSA_PUBLIC_KEY_PEM_FORMAT);
       ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
       objectOutputStream.writeObject(publicKeyPem);
       objectOutputStream.close();
       fileOutputStream.close();

    }


    public PrivateKey getPrivateKey() {
      return this.privateKey;
    }

    public PublicKey getPublicKey()  {
        return this.publicKey;
    }

}
