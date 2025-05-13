package backend.com.code.cinemaebooking.Utils;

import java.math.BigDecimal;

public class PriceUtil {

    public static float add(float a, float b) {
        return calculate(a, b, Operation.ADD).floatValue();
    }

    public static double add(double a, double b) {
        return calculate(a, b, Operation.ADD).doubleValue();
    }

    public static float subtract(float a, float b) {
        return calculate(a, b, Operation.SUBTRACT).floatValue();
    }

    public static double subtract(double a, double b) {
        return calculate(a, b, Operation.SUBTRACT).doubleValue();
    }

    private enum Operation {
        ADD, SUBTRACT
    }

    private static BigDecimal calculate(float a, float b, Operation operation) {
        BigDecimal bigA = new BigDecimal(Float.toString(a));
        BigDecimal bigB = new BigDecimal(Float.toString(b));
        return performOperation(bigA, bigB, operation);
    }

    private static BigDecimal calculate(double a, double b, Operation operation) {
        BigDecimal bigA = new BigDecimal(Double.toString(a));
        BigDecimal bigB = new BigDecimal(Double.toString(b));
        return performOperation(bigA, bigB, operation);
    }

    private static BigDecimal performOperation(BigDecimal a, BigDecimal b, Operation operation) {
        switch (operation) {
            case ADD:
                return a.add(b);
            case SUBTRACT:
                return a.subtract(b);
            default:
                throw new IllegalArgumentException("Unsupported operation: " + operation);
        }
    }
}
