package backend.com.code.cinemaebooking.bean;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int o_id;
    private float o_total;
    private int u_id;
    private String o_datetime;

    // Getter and Setter methods for o_id
    public int getO_id() {
        return o_id;
    }

    public void setO_id(int o_id) {
        this.o_id = o_id;
    }

    // Getter and Setter methods for o_total
    public float getO_total() {
        return o_total;
    }

    public void setO_total(float o_total) {
        this.o_total = o_total;
    }

    // Getter and Setter methods for u_id
    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    // Getter and Setter methods for o_datetime
    public String getO_datetime() {
        return o_datetime;
    }

    public void setO_datetime(String o_datetime) {
        this.o_datetime = o_datetime;
    }
}
