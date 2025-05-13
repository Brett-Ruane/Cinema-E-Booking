package backend.com.code.cinemaebooking.Utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.security.SecureRandom;
import java.util.Base64;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.security.spec.KeySpec;
import java.util.Base64;

public class MyCipher {

    // private Key generateKey(String keyString) throws Exception {
    // KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
    // keyGenerator.init(128, new
    // SecureRandom(keyString.getBytes(StandardCharsets.UTF_8)));
    // return keyGenerator.generateKey();
    // }

    private Key generateKey(String keyString) throws Exception {
        // You can adjust these parameters as needed
        int keyLength = 128; // 128 bits for AES
        int iterations = 1000; // Number of iterations for key derivation
        byte[] salt = "YourSaltValue".getBytes(StandardCharsets.UTF_8); // Salt value

        KeySpec keySpec = new PBEKeySpec(keyString.toCharArray(), salt, iterations, keyLength);
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
        byte[] keyBytes = keyFactory.generateSecret(keySpec).getEncoded();

        return new SecretKeySpec(keyBytes, "AES");
    }

    private byte[] encryptData(byte[] plaintext, String keyString) throws Exception {
        Key key = generateKey(keyString);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[16]; // Initialization Vector
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
        return cipher.doFinal(plaintext);
    }

    public String encrypt(String plaintext, String keyString) throws Exception {
        byte[] encryptedData = encryptData(plaintext.getBytes(StandardCharsets.UTF_8), keyString);
        return Base64.getEncoder().encodeToString(encryptedData);
    }

    private byte[] decryptData(byte[] ciphertext, String keyString) throws Exception {
        Key key = generateKey(keyString);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] iv = new byte[16]; // Initialization Vector
        IvParameterSpec ivSpec = new IvParameterSpec(iv);
        cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);
        return cipher.doFinal(ciphertext);
    }

    public String decrypt(String ciphertext, String keyString) throws Exception {
        byte[] decryptedData = decryptData(Base64.getDecoder().decode(ciphertext), keyString);
        return new String(decryptedData, StandardCharsets.UTF_8);
    }
}
