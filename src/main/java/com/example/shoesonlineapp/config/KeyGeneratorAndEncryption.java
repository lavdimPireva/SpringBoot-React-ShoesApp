package com.example.shoesonlineapp.config;
import com.example.shoesonlineapp.entity.EncryptedPrivateKey;
import com.example.shoesonlineapp.repository.EncryptedPrivateKeyRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import javax.crypto.*;
import java.io.*;
import java.security.*;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;


@Configuration
@RequiredArgsConstructor
public class KeyGeneratorAndEncryption {

    private static final String ENCRYPTION_KEY_FILE = "encryption_key.dat"; // file to save the AES key.
    private static SecretKey encryptionKey; // AES key to encrypt the RSA private key.
    private PrivateKey privateKey; // private RSA key
    private final EncryptedPrivateKeyRepository encryptedPrivateKeyRepository;
    private EncryptedPrivateKey encryptedPrivateKey;



    // method to generate RSA key and save it into database.
    @PostConstruct
    public void generateKey() throws NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException,IOException {

        this.encryptedPrivateKey = encryptedPrivateKeyRepository.findFirstByOrderByIdDesc();

        if(encryptedPrivateKey != null) {
            return;
        }

        // generate private RSA key.
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA");
        keyGen.initialize(2048);
        KeyPair keyPair = keyGen.generateKeyPair();
        this.privateKey = keyPair.getPrivate();

        // Now encrypt the private key and store in mongo
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.ENCRYPT_MODE, getEncryptionKey());

        byte[] encryptedRsaKey = cipher.doFinal(privateKey.getEncoded());

        this.encryptedPrivateKey = new EncryptedPrivateKey();
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


    // method to decrypt RSA private key
    public PrivateKey getDecryptionKey(EncryptedPrivateKey encryptedPrivateKey) throws NoSuchPaddingException, NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException, InvalidKeySpecException, IOException, ClassNotFoundException {

        FileInputStream fileIn = new FileInputStream(ENCRYPTION_KEY_FILE);
        ObjectInputStream objectIn = new ObjectInputStream(fileIn);
        SecretKey secretKey = (SecretKey) objectIn.readObject();
        objectIn.close();
        fileIn.close();

        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedRsaKey = cipher.doFinal(encryptedPrivateKey.getEncryptedPrivateKey());
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(new PKCS8EncodedKeySpec(decryptedRsaKey));

    }



    // method to get the RSA private key.
    public PrivateKey getPrivateKey() throws NoSuchPaddingException, IllegalBlockSizeException, NoSuchAlgorithmException, BadPaddingException, InvalidKeySpecException, InvalidKeyException, IOException, ClassNotFoundException {
        this.encryptedPrivateKey = encryptedPrivateKeyRepository.findFirstByOrderByIdDesc();

        if (encryptedPrivateKey != null) {
            return getDecryptionKey(encryptedPrivateKey);
        } else {
            return this.privateKey;
        }

    }

}
