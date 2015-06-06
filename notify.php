<?php    // notify.php

session_start ();
require_once 'Tags.php';

$atxcc_tg = new Tags ();

$atxcc_tg -> tagsNotify ($_SESSION ['user'], $_POST ['agendaItem'], $_POST ['content']);
