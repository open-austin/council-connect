<?php    // search.php

require_once 'Topics.php';

$atxcc_tp = new Topics ();

$topics = $atxcc_tp -> getTopicsSearch ($_POST['keywords']);

$atxcc_tp -> topicsShowContent ($topics);

