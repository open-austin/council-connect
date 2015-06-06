<?php    // login.php

session_start();
$_SESSION ['err'] = '';

require_once 'Util.php';
require_once 'User.php';
require_once 'DatabaseUsPsDb.php';

$atxcc_us = new User ();

if ($_POST) {

    $username = $_POST ['username'];
    $password = $_POST ['password'];

    $err = '';

    $server = $_SERVER ['SERVER_NAME'];
    $urlRedirect = 'http://' . $server . '/atxcc';

    if (! $atxcc_us -> getIdx ($username)) {

        $err = "user: '$username' does not exist";
        $urlRedirect = $urlRedirect . '/alogin';

    } elseif (! $atxcc_us -> doAuth ($username, $password)) {

        $err = "password does not match";
        $urlRedirect = $urlRedirect . '/alogin';

    } else {

        $_SESSION ['user'] = $username;

    } // end if ($atxcc_us -> getIdx ($username))
    
    $_SESSION ['err'] = $err;

    Util::redirect ($urlRedirect); 

} // end if ($_POST)


