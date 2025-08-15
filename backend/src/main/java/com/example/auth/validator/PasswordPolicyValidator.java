package com.example.auth.validator;

import org.springframework.stereotype.Component;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class PasswordPolicyValidator {

    private static final String PASSWORD_PATTERN =
        "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$";

    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);

    public boolean validate(final String password) {
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }

    public String getPolicyDescription() {
        return "Password must be between 8 and 20 characters long, contain at least one digit, one lowercase letter, one uppercase letter, and one special character.";
    }
}
