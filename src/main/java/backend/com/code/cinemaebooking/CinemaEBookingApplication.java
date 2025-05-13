package backend.com.code.cinemaebooking;

import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CinemaEBookingApplication {

	public static void main(String[] args) throws ClassNotFoundException {
		SpringApplication.run(CinemaEBookingApplication.class, args);
		// // test code
		// // Load environment variables
		// String dbHost = "aws.connect.psdb.cloud";
		// String dbUsername = "5jcblz2kfqy66v6uigk7";
		// String dbPassword = "pscale_pw_YcxW3izgAXad2F6NFXnfacNUs3So7K8zkipp4A68bkd";
		// String dbName = "ces4050";

		// // JDBC connection properties
		// Properties props = new Properties();
		// props.setProperty("user", dbUsername);
		// props.setProperty("password", dbPassword);
		// props.setProperty("useSSL", "true"); // Enable SSL

		// try {
		// // Connect to the database
		// String url = "jdbc:mysql://" + dbHost + "/" + dbName;
		// Connection connection = DriverManager.getConnection(url, props);

		// // Execute query
		// Statement statement = connection.createStatement();
		// String query = "SELECT * FROM movie;";
		// ResultSet resultSet = statement.executeQuery(query);

		// // Display tables
		// if (resultSet.next()) {
		// System.out.println("Tables in the database:");
		// do {
		// System.out.println("- " + resultSet.getString(1));
		// } while (resultSet.next());
		// } else {
		// System.out.println("Connected successfully. No tables found in the
		// database.");
		// }

		// // Close resources
		// resultSet.close();
		// statement.close();
		// connection.close();
		// } catch (SQLException e) {
		// e.printStackTrace();
		// }
	}

}
