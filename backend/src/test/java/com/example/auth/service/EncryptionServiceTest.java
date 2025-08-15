package com.example.auth.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.*;

public class EncryptionServiceTest {

    private EncryptionService encryptionService;

    @BeforeEach
    void setUp() throws Exception {
        encryptionService = new EncryptionService("test-secret-key-that-is-long-enough");
    }

    @Test
    void testEncryptDecrypt_Success() throws Exception {
        String originalText = "This is a secret message.";
        String encryptedText = encryptionService.encrypt(originalText);
        String decryptedText = encryptionService.decrypt(encryptedText);

        assertNotNull(encryptedText);
        assertNotEquals(originalText, encryptedText);
        assertEquals(originalText, decryptedText);
    }

    @Test
    void testEncryptDecrypt_EmptyString() throws Exception {
        String originalText = "";
        String encryptedText = encryptionService.encrypt(originalText);
        String decryptedText = encryptionService.decrypt(encryptedText);

        assertNotNull(encryptedText);
        assertEquals(originalText, decryptedText);
    }

    @Test
    void testEncryptDecrypt_Null() throws Exception {
        assertNull(encryptionService.encrypt(null));
        assertNull(encryptionService.decrypt(null));
    }

    @Test
    void testDecrypt_InvalidCiphertext() {
        assertThrows(Exception.class, () -> {
            encryptionService.decrypt("this is not valid base64 ciphertext");
        });
    }

    @Test
    void testDecrypt_TamperedCiphertext() throws Exception {
        String originalText = "This is a secret message.";
        String encryptedText = encryptionService.encrypt(originalText);

        // Tamper with the ciphertext
        byte[] tamperedBytes = Base64.getDecoder().decode(encryptedText);
        tamperedBytes[tamperedBytes.length - 1] ^= 1; // Flip a bit in the auth tag
        String tamperedCiphertext = Base64.getEncoder().encodeToString(tamperedBytes);

        // Decryption should fail because the GCM authentication tag will not match
        assertThrows(Exception.class, () -> {
            encryptionService.decrypt(tamperedCiphertext);
        });
    }
}
