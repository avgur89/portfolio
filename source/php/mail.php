<?php

$frm_name  = "woodbesedka.ru";
$recepient = "avgur89@gmail.com";
$sitename  = "woodbesedka.ru";
$subject   = "Новая заявка с сайта \"$sitename\"";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$email = trim($_POST["email"]);
$message = trim($_POST["message"]);

$message = "
Имя: $name <br>
Телефон: $phone <br>
Почта: $email <br>
Сообщение: $message
";

mail($recepient, $subject, $message, "From: $frm_name <$email>" . "\r\n" . "Reply-To: $email" . "\r\n" . "X-Mailer: PHP/" . phpversion() . "\r\n" . "Content-type: text/html; charset=\"utf-8\"");
