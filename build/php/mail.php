<?php

$frm_name  = "alexgurov.com";
$recepient = "avgur89@gmail.com";
$sitename  = "alexgurov.com";
$subject   = "New message from \"$sitename\"";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

$message = "
Name: $name <br>
Email: $email <br>
Message: $message
";

mail($recepient, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
