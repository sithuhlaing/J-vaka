package com.example.auth.service;

import de.taimos.totp.TOTP;
import org.apache.commons.codec.binary.Base32;
import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.security.SecureRandom;

@Service
public class TwoFactorAuthService {

    public String generateNewSecret() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        Base32 base32 = new Base32();
        return base32.encodeToString(bytes);
    }

    public String getQRCodeUrl(String secret, String email, String issuer) {
        try {
            return "otpauth://totp/"
                    + URLEncoder.encode(issuer + ":" + email, "UTF-8").replace("+", "%20")
                    + "?secret=" + URLEncoder.encode(secret, "UTF-8").replace("+", "%20")
                    + "&issuer=" + URLEncoder.encode(issuer, "UTF-8").replace("+", "%20");
        } catch (UnsupportedEncodingException e) {
            throw new IllegalStateException(e);
        }
    }

    public boolean validateCode(String secret, String code) {
        try {
            Base32 base32 = new Base32();
            byte[] bytes = base32.decode(secret);
            String hexKey = Hex.encodeHexString(bytes);
            return TOTP.getOTP(hexKey).equals(code);
        } catch (Exception e) {
            // Log the exception
            return false;
        }
    }
}
