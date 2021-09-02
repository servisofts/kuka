package qr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Hashtable;

public class QRterminal {
    public static String getQr(String text, String nombre) {
        String s = "";
        try {
            int width = 200;
            int height = 200;
            Hashtable<EncodeHintType, Object> qrParam = new Hashtable<EncodeHintType, Object>();
            qrParam.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
            qrParam.put(EncodeHintType.CHARACTER_SET, "utf-8");

            BitMatrix bitMatrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, width, height, qrParam);
            try {
                FileOutputStream stream = new FileOutputStream(nombre);
                MatrixToImageWriter.writeToStream(bitMatrix, "png", stream);
                
                
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            // s = toAscii(bitMatrix);

        } catch (WriterException e) {
            e.printStackTrace();
            return "";
        }
        return s;
    }

    public static String toAscii(BitMatrix bitMatrix) {
        StringBuilder sb = new StringBuilder();
        for (int rows = 0; rows < bitMatrix.getHeight(); rows++) {
            for (int cols = 0; cols < bitMatrix.getWidth(); cols++) {
                boolean x = bitMatrix.get(rows, cols);
                if (!x) {
                    sb.append("\033[47m  \033[0m");
                } else {
                    sb.append("\033[40m  \033[0m");
                }
            }
            sb.append("\n");
        }
        return sb.toString();
    }

    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_WHITE = "\u001B[37m";

    public static void main(String[] args) throws Exception {
        //String text = "MIICCjCCAbSgAwIBAgIEXy0J4jANBgkqhkiG9w0BAQsFADCBizELMAkGA1UEBhMCQk8xCzAJBgNVBAgMAlNDMRMwEQYDVQQHDApTYW50YSBDcnV6MRgwFgYDVQQKDA9TZXJ2aXNvZnRzIFNybC4xDTALBgNVBAsMBFN2c3MxDTALBgNVBAMMBHJvb3QxIjAgBgkqhkiG9w0BCQEWE3Jvb3RAc2Vydmlzb2Z0cy5jb20wHhcNMjAwODA3MDc1OTMwWhcNMjAwODA3MDgwMDMwWjCBizELMAkGA1UEBhMCQk8xCzAJBgNVBAgMAlNDMRMwEQYDVQQHDApTYW50YSBDcnV6MRgwFgYDVQQKDA9TZXJ2aXNvZnRzIFNybC4xDTALBgNVBAsMBFN2c3MxDTALBgNVBAMMBHJvb3QxIjAgBgkqhkiG9w0BCQEWE3Jvb3RAc2Vydmlzb2Z0cy5jb20wXDANBgkqhkiG9w0BAQEFAANLADBIAkEAmbQre0GgYtvxqkPTCbB5BkxMi+DbyOfDbuh8UElDITcwk94yK+mrfALmvAhZLaqWg7/1r+AJPbviO7rHaXOW+QIDAQABMA0GCSqGSIb3DQEBCwUAA0EAjvFTj/4YAmLu9xvDhZD45XefLnzO0JtXao0LbsaPYoPHHjLQIjd4jIM1zRWKSh/60vhbdIBayEyEEz955rai8A==";
        //System.out.println(getQr(text));
    }
}