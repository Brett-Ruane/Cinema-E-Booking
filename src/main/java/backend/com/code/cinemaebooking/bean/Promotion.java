package backend.com.code.cinemaebooking.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "promotion")
public class Promotion {
    @Id
    private int p_id;
    private String code;
    private String date;
    private double discount;
    private int t_id;
    private int p_sent;

    public int getP_id() {
        return p_id;
    }

    public void setP_id(int p_id) {
        this.p_id = p_id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getT_id() {
        return t_id;
    }

    public void setT_id(int t_id) {
        this.t_id = t_id;
    }

    public int getP_sent() {
        return p_sent;
    }

    public void setP_sent(int p_sent) {
        this.p_sent = p_sent;
    }
}