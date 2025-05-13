package backend.com.code.cinemaebooking.bean;

import java.sql.Date;
import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "showtime")
public class Showtime {
    @Id
    private int show_id;
    private Date date;
    private String time;
    private int theater;
    private int m_id;

    public int getShow_id() {
        return show_id;
    }

    public void setShow_id(int show_id) {
        this.show_id = show_id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getTheater() {
        return theater;
    }

    public void setTheater(int theater) {
        this.theater = theater;
    }

    public int getM_id() {
        return m_id;
    }

    public void setM_id(int m_id) {
        this.m_id = m_id;
    }

    @Override
    public String toString() {
        return "Show{" +
                "showId=" + show_id +
                ", date=" + date +
                ", time='" + time + '\'' +
                ", theater=" + theater +
                ", m_id=" + m_id +
                '}';
    }
}