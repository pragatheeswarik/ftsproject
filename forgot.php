<?php
function sendOTP($email, $otp) {
    $to = $email;
    $subject = "One Time Password (OTP)";
    $message = "Your OTP is: $otp";
    $headers = "From: your_email@example.com"; // Change this to your email address

    if (mail($to, $subject, $message, $headers)) {
        return true; // Email sent successfully
    } else {
        return false; // Failed to send email
    }
}

if(isset($_POST['email_or_mobile'])){
    $email = $_POST["email_or_mobile"];
    $otp = generateOTP(); // Assuming you have a function to generate OTP
    if (sendOTP($email, $otp)) {
        echo "OTP sent successfully!";
    } else {
        echo "Failed to send OTP. Please try again later.";
    }
}
?>
