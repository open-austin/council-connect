<?php    // insert.php

require_once 'DatabaseUsPsDb.php';

insertAlert ();

//---------------------
function insertAlert () {

    $atxcc_db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $tags = explode(" ", $_POST ['tags']);
    $username = $_POST ['username'];
    $mobile = $_POST ['mobile'];
    $email = $_POST ['email'];

    $userid = $atxcc_db -> getUserId ($username);

    $alerts = "";

    if ($mobile == 'true') {

        $alerts .= 'T';

    } // end if ($mobile == 'true')
    
    if ($email == 'true') {

        $alerts .= 'E';

    } // end if ($email == 'true')
    
    foreach ($tags as $tag) {
        // first check to see if tag alert already exists for the user, and if so update it
        $query = 'SELECT idx FROM ac_data WHERE actype=? AND acrefs=? AND ackey=?';
        $params = [
            'alert', $userid, $tag
        ];


        if ($atxcc_db -> doQueryRow ($query, $params)) {


            $query = 'UPDATE ac_data SET acval=? WHERE actype=? AND acrefs=? AND ackey=?';
            $params = [
                $alerts, 'alert', $userid, $tag
            ];

            $atxcc_db -> doQuery ($query, $params);

        } else {

            $query = 'INSERT INTO ac_data (actype, acrefs, ackey, acval) VALUES (?,?,?,?)';
            $params = [
                'alert', $userid, $tag, $alerts
            ];
        
            $atxcc_db -> doQuery ($query, $params);

        } // end if ($row = $atxcc_db -> doQueryRow ($query, $params))
    }
    

} // end insertAlert ()

