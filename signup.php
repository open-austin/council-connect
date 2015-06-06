<?php    // signup.php

session_start();
$_SESSION ['err'] = '';

require_once 'Util.php';
require_once 'User.php';

$atxcc_us = new User ();

if ($_POST) {

    $username = $_POST ['username'];
    $password = $_POST ['password'];
    $email = $_POST ['email'];
    $mobile = preg_replace ('/[^\d]/', "", $_POST ['mobile']);


    $err = '';

    $server = $_SERVER ['SERVER_NAME'];
    $urlRedirect = 'http://' . $server . '/atxcc';

    if ($atxcc_us -> getIdx ($username)) {

        $err = "user: '$username' already exists";
        $urlRedirect = $urlRedirect . '/signup';

    } elseif (strlen ($mobile) != 10) {

        $err = "The mobile number can have any puntuation you want, but must have exactly 10 digits.  i.e. (512)555-1212 or 512.555.1212 or 512-555-1212 or 512!555xyz1212 will all work";
        $urlRedirect = $urlRedirect . '/signup';

    } else {

        $mobile = preg_replace ('/(\d{3})(\d{3})(\d{4})/', '$1-$2-$3', $mobile);
        $atxcc_us -> registerUser ($username, $password, $email, $mobile);

    } // end if ($atxcc_us -> getIdx ($username))
    
    $_SESSION ['err'] = $err;

    Util::redirect ($urlRedirect); 

} // end if ($_POST)

