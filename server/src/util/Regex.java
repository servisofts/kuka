package util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;



public class Regex {
    public static String findOU(String input) {
        Pattern pattern1 = Pattern.compile(".*?OU=(.*?),.*");
        Matcher matcher1 = pattern1.matcher(input);
        while (matcher1.find()) {
            return matcher1.group(1);
        }
        return "";
    }
}