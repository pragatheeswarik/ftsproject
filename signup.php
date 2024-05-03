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
    $firstname = $_POST["firstname"];
    $lastname = $_POST["lastname"];
    $country = $_POST["country"];
    $phonenumber = $_POST["phonenumber"];

    // Validate user input
    if (empty($email) || empty($password) || empty($firstname) || empty($lastname) || empty($country) || empty($phonenumber)) {
        echo "Please fill in all fields";
        exit();
    }

    // Store password in plain text (NOT RECOMMENDED FOR PRODUCTION USE)
    $stored_password = $password;

    // Check if email already exists in registered_users table
    $sql = "SELECT * FROM registered_users WHERE email =?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if ($row) {
        echo "Email already exists.<a href='login.html'>Click here to login</a>";
    } else {
        // Insert new user into registered_users table
        $sql = "INSERT INTO registered_users (email, password, firstname, lastname, country, phonenumber) VALUES (?,?,?,?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssss", $email, $stored_password, $firstname, $lastname, $country, $phonenumber);
        $stmt->execute();

        // Redirect to a success page
        header("Location: login.html");
        exit();
    }
}

// Close connection
$conn->close();
?>