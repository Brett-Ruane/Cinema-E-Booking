package backend.com.code.cinemaebooking.bean;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "movie")
public class Movie {
    @Id
    private int m_id;
    private String m_isbn;
    private String m_title;
    private String m_director;
    private String m_producer;
    private String m_poster;
    private String m_image1;
    private String m_image2;
    private int mt_id;
    private int m_reviews;
    private String m_category;
    private String m_cast;
    private String m_synopsis;
    private int m_showing;
    private String m_trailer;
    private String m_mark;

    // Getter and Setter methods for m_id
    public int getM_id() {
        return m_id;
    }

    public void setM_id(int m_id) {
        this.m_id = m_id;
    }

    // Getter and Setter methods for m_isbn
    public String getM_isbn() {
        return m_isbn;
    }

    public void setM_isbn(String m_isbn) {
        this.m_isbn = m_isbn;
    }

    // Getter and Setter methods for m_title
    public String getM_title() {
        return m_title;
    }

    public void setM_title(String m_title) {
        this.m_title = m_title;
    }

    // Getter and Setter methods for m_director
    public String getM_director() {
        return m_director;
    }

    public void setM_director(String m_director) {
        this.m_director = m_director;
    }

    // Getter and Setter methods for m_producer
    public String getM_producer() {
        return m_producer;
    }

    public void setM_producer(String m_producer) {
        this.m_producer = m_producer;
    }

    // Getter and Setter methods for m_poster
    public String getM_poster() {
        return m_poster;
    }

    public void setM_poster(String m_poster) {
        this.m_poster = m_poster;
    }

    // Getter and Setter methods for m_image1
    public String getM_image1() {
        return m_image1;
    }

    public void setM_image1(String m_image1) {
        this.m_image1 = m_image1;
    }

    // Getter and Setter methods for m_image2
    public String getM_image2() {
        return m_image2;
    }

    public void setM_image2(String m_image2) {
        this.m_image2 = m_image2;
    }

    // Getter and Setter methods for mt_id
    public int getMt_id() {
        return mt_id;
    }

    public void setMt_id(int mt_id) {
        this.mt_id = mt_id;
    }

    public int getM_reviews() {
        return m_reviews;
    }

    public void setM_reviews(int m_reviews) {
        this.m_reviews = m_reviews;
    }

    public String getM_category() {
        return m_category;
    }

    public void setM_category(String m_category) {
        this.m_category = m_category;
    }

    public String getM_cast() {
        return m_cast;
    }

    public void setM_cast(String m_cast) {
        this.m_cast = m_cast;
    }

    public String getM_synopsis() {
        return m_synopsis;
    }

    public void setM_synopsis(String m_synopsis) {
        this.m_synopsis = m_synopsis;
    }

    public int getM_showing() {
        return m_showing;
    }

    public void setM_showing(int m_showing) {
        this.m_showing = m_showing;
    }

    public String getM_trailer() {
        return m_trailer;
    }

    public void setM_trailer(String m_trailer) {
        this.m_trailer = m_trailer;
    }

    public String getM_mark() {
        return m_mark;
    }

    public void setM_mark(String m_mark) {
        this.m_mark = m_mark;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "m_id=" + m_id +
                ", m_isbn='" + m_isbn + '\'' +
                ", m_title='" + m_title + '\'' +
                ", m_director='" + m_director + '\'' +
                ", m_producer='" + m_producer + '\'' +
                ", m_poster='" + m_poster + '\'' +
                ", m_image1='" + m_image1 + '\'' +
                ", m_image2='" + m_image2 + '\'' +
                ", mt_id=" + mt_id +
                '}';
    }
}
