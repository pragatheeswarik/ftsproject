<?php
// Database configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = 'root';
$db_name = 'logindetails';

// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}

// Process login form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Validate user input
    if (empty($email) || empty($password)) {
        echo "Please fill in all fields";
        exit();
    }

    // Check if email and password exist in registered_users table
    $sql = "SELECT * FROM registered_users WHERE email =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        // Check if password matches
        if ($password == $row["password"]) {
            // Store login user credentials into users table
            $sql = "INSERT INTO users (email, password) VALUES (?,?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $email, $password);
            $stmt->execute();

            // Redirect to a success page
            header("Location: index.html");
            exit();
        } else {
            echo "Invalid password";
        }
    } else {
        echo "Email not found";
    }
}

// Close connection
$conn->close();
?>