<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = trim($_POST["name"]);
    $email = trim($_POST["email"]);
    $subject = trim($_POST["subject"]);
    $description = trim($_POST["description"]);

    // Validate form data
    if (empty($name) || empty($email) || empty($subject) || empty($description)) {
        // If any field is empty, redirect back to the contact page with an error message
        header("Location: support.html?error=empty_fields");
        exit;
    }

    // Set recipient email address
    $to = "edengateinteractive@gmail.com"; // Change this to your email address

    // Set email headers
    $headers = "From: $name <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8" . "\r\n";

    // Construct email message
    $message = "Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Subject: $subject\n\n";
    $message .= "Description:\n$description";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        // If email is sent successfully, redirect back to the contact page with a success message
        header("Location: support.html?success=true");
        exit;
    } else {
        // If there's an error sending email, redirect back to the contact page with an error message
        header("Location: support.html?error=email_failed");
        exit;
    }
} else {
    // If the form is not submitted, redirect back to the contact page
    header("Location: support.html");
    exit;
}
?>
