package backend.com.code.cinemaebooking.bean;

import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "user")
public class User {
    @Id
    private int u_id;
    private String u_name;
    private String u_pwd;
    private String u_firstname;
    private Timestamp u_redgt;
    private int u_role;
    private String u_mark;
    private String u_phone;
    private String u_address;
    private String u_lastname;
    private String u_email;
    private String credit_number1;
    private String credit_number2;
    private String credit_number3;
    private String credit_date3;
    private String credit_date2;
    private String credit_date1;
    private String credit_name3;
    private String credit_name2;
    private String credit_name1;
    private String credit_address1;
    private String credit_city1;
    private String credit_state1;
    private int credit_zip1;
    private int credit_sc1;
    private int credit_sc2;
    private int credit_sc3;
    private String u_token;
    private int u_promo;

    // Other getter and setter methods
    // Getter and Setter methods for u_id
    public int getU_id() {
        return u_id;
    }

    public void setU_id(int u_id) {
        this.u_id = u_id;
    }

    // Getter and Setter methods for u_name
    public String getU_name() {
        return u_name;
    }

    public void setU_name(String u_name) {
        this.u_name = u_name;
    }

    // Getter and Setter methods for u_pwd
    public String getU_pwd() {
        return u_pwd;
    }

    public void setU_pwd(String u_pwd) {
        this.u_pwd = u_pwd;
    }

    // Getter and Setter methods for u_firstname
    public String getU_firstname() {
        return u_firstname;
    }

    public void setU_firstname(String u_firstname) {
        this.u_firstname = u_firstname;
    }

    // Getter and Setter methods for u_redgt
    public Timestamp getU_redgt() {
        return u_redgt;
    }

    public void setU_redgt(Timestamp u_redgt) {
        this.u_redgt = u_redgt;
    }

    // Getter and Setter methods for u_mark
    public String getU_mark() {
        return u_mark;
    }

    public void setU_mark(String u_mark) {
        this.u_mark = u_mark;
    }

    // Getter and Setter methods for u_phone
    public String getU_phone() {
        return u_phone;
    }

    public void setU_phone(String u_phone) {
        this.u_phone = u_phone;
    }

    // Getter and Setter methods for u_address
    public String getU_address() {
        return u_address;
    }

    public void setU_address(String u_address) {
        this.u_address = u_address;
    }

    // Getter and Setter methods for u_lastname
    public String getU_lastname() {
        return u_lastname;
    }

    public void setU_lastname(String u_lastname) {
        this.u_lastname = u_lastname;
    }

    // Getter and Setter for u_email
    public String getU_email() {
        return u_email;
    }

    public void setU_email(String u_email) {
        this.u_email = u_email;
    }

    // Getter and Setter for u_email
    public int getU_role() {
        return u_role;
    }

    public void setU_role(int u_role) {
        this.u_role = u_role;
    }

    // Getter and setter for credit_number1
    public String getCredit_number1() {
        return credit_number1;
    }

    public void setCredit_number1(String credit_number1) {
        this.credit_number1 = credit_number1;
    }

    // Getter and setter for credit_number2
    public String getCredit_number2() {
        return credit_number2;
    }

    public void setCredit_number2(String credit_number2) {
        this.credit_number2 = credit_number2;
    }

    // Getter and setter for credit_number3
    public String getCredit_number3() {
        return credit_number3;
    }

    public void setCredit_number3(String credit_number3) {
        this.credit_number3 = credit_number3;
    }

    // Getter and setter for credit_date3
    public String getCredit_date3() {
        return credit_date3;
    }

    public void setCredit_date3(String credit_date3) {
        this.credit_date3 = credit_date3;
    }

    // Getter and setter for credit_date2
    public String getCredit_date2() {
        return credit_date2;
    }

    public void setCredit_date2(String credit_date2) {
        this.credit_date2 = credit_date2;
    }

    // Getter and setter for credit_date1
    public String getCredit_date1() {
        return credit_date1;
    }

    public void setCredit_date1(String credit_date1) {
        this.credit_date1 = credit_date1;
    }

    // Getter and setter for credit_name3
    public String getCredit_name3() {
        return credit_name3;
    }

    public void setCredit_name3(String credit_name3) {
        this.credit_name3 = credit_name3;
    }

    // Getter and setter for credit_name2
    public String getCredit_name2() {
        return credit_name2;
    }

    public void setCredit_name2(String credit_name2) {
        this.credit_name2 = credit_name2;
    }

    // Getter and setter for credit_name1
    public String getCredit_name1() {
        return credit_name1;
    }

    public void setCredit_name1(String credit_name1) {
        this.credit_name1 = credit_name1;
    }

    // Getter and setter for credit_address1
    public String getCredit_address1() {
        return credit_address1;
    }

    public void setCredit_address1(String credit_address1) {
        this.credit_address1 = credit_address1;
    }

    // Getter and setter for credit_city1
    public String getCredit_city1() {
        return credit_city1;
    }

    public void setCredit_city1(String credit_city1) {
        this.credit_city1 = credit_city1;
    }

    // Getter and setter for credit_state1
    public String getCredit_state1() {
        return credit_state1;
    }

    public void setCredit_state1(String credit_state1) {
        this.credit_state1 = credit_state1;
    }

    // Getter and setter for credit_zip1
    public int getCredit_zip1() {
        return credit_zip1;
    }

    public void setCredit_zip1(int credit_zip1) {
        this.credit_zip1 = credit_zip1;
    }

    // Getter and setter for credit_sc1
    public int getCredit_sc1() {
        return credit_sc1;
    }

    public void setCredit_sc1(int credit_sc1) {
        this.credit_sc1 = credit_sc1;
    }

    // Getter and setter for credit_sc2
    public int getCredit_sc2() {
        return credit_sc2;
    }

    public void setCredit_sc2(int credit_sc2) {
        this.credit_sc2 = credit_sc2;
    }

    // Getter and setter for credit_sc3
    public int getCredit_sc3() {
        return credit_sc3;
    }

    public void setCredit_sc3(int credit_sc3) {
        this.credit_sc3 = credit_sc3;
    }

    // Getter and setter for u_token
    public String getU_token() {
        return u_token;
    }

    public void setU_token(String u_token) {
        this.u_token = u_token;
    }

    // Getter and setter for u_promo
    public int getU_promo() {
        return u_promo;
    }

    public void setU_promo(int u_promo) {
        this.u_promo = u_promo;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("User{");
        sb.append("u_id=").append(u_id);
        sb.append(", u_name='").append(u_name).append('\'');
        sb.append(", u_pwd='").append(u_pwd).append('\'');
        sb.append(", u_firstname='").append(u_firstname).append('\'');
        sb.append(", u_lastname='").append(u_lastname).append('\'');
        sb.append(", u_role=").append(u_role);
        sb.append(", u_mark='").append(u_mark).append('\'');
        sb.append(", u_phone='").append(u_phone).append('\'');
        sb.append(", u_address='").append(u_address).append('\'');
        sb.append(", u_email='").append(u_email).append('\'');
        sb.append(", credit_number1=").append(credit_number1);
        sb.append(", credit_number2=").append(credit_number2);
        sb.append(", credit_number3=").append(credit_number3);
        sb.append(", credit_date3='").append(credit_date3).append('\'');
        sb.append(", credit_date2='").append(credit_date2).append('\'');
        sb.append(", credit_date1='").append(credit_date1).append('\'');
        sb.append(", credit_name3='").append(credit_name3).append('\'');
        sb.append(", credit_name2='").append(credit_name2).append('\'');
        sb.append(", credit_name1='").append(credit_name1).append('\'');
        sb.append(", credit_address1='").append(credit_address1).append('\'');
        sb.append(", credit_city1='").append(credit_city1).append('\'');
        sb.append(", credit_state1='").append(credit_state1).append('\'');
        sb.append(", credit_zip1=").append(credit_zip1);
        sb.append(", credit_sc1=").append(credit_sc1);
        sb.append(", credit_sc2=").append(credit_sc2);
        sb.append(", credit_sc3=").append(credit_sc3);
        sb.append(", u_token=").append(u_token);
        sb.append(", u_promo=").append(u_promo);
        sb.append('}');
        return sb.toString();
    }
}