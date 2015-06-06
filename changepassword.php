<?php    // login.php

session_start();
$_SESSION ['err'] = '';

require_once 'Util.php';
require_once 'User.php';
require_once 'DatabaseUsPsDb.php';

$atxcc_us = new User ();

if ($_POST) {

    $password = $_POST ['password'];
    $cpassword = $_POST ['cpassword'];

    $err = '';

    $server = $_SERVER ['SERVER_NAME'];
    $urlRedirect = 'http://' . $server . '/atxcc';

    if ($password !== $cpassword) {

        $err = "Passwords don't match";
        $urlRedirect = $urlRedirect . '/apassword';

    } else {

        $atxcc_us -> changePassword ($_SESSION ['user'], $password);

    } // end if ($password !== $cpassword)
    
    $_SESSION ['err'] = $err;

    Util::redirect ($urlRedirect); 

} // end if ($_POST)


