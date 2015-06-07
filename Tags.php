<?php    // Tags.php
require_once 'DatabaseUsPsDb.php';
require_once 'User.php';
require "twilio-php-master/Services/Twilio.php";

class Tags {

protected $atxcc_db;
protected $atxcc_us;

//---------------------
public function __construct () {

    $this->atxcc_db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');
    $this->atxcc_us = new User ();
    
} // end __construct ()



//---------------------
public function tagsInit () {

    ?>
    <div id='tagitems'>
        <h1 id='tagheader'>Alerts</h1>

        <?php 
            $this->alertsShow ()
        ?>

    </div>

    <?php
} // end topicsInit ()




//---------------------
public function alertsShow () {

    $tags = $this->getAlerts ($_SESSION ['user']);

    ?>
        <div id='ztags'>
        <table class='table table-striped table-hover table-bordered'>
            <tbody>
                <tr id='ztagsheader'>
                    <th id='ztag'>Tag</th>
                    <th id='ztmobile'>Mobile</th>
                    <th id='ztemail'>Email</th>
                </tr>

                    
                <?php
                $this -> tagsShowContent ($tags);
                ?>

            </tbody>
        </table>
        </div>

    <?php

} // end function topicsShow ()


//---------------------
public function tagsShowContent ($tags) {

    foreach ($tags as $tag) {
        
        ?>
        <tr class='ztagsrow'> 
            <td class='ztags'> 
                <?php 
                    echo ($tag ['tag']);
                ?>
            </td>
            <td class='ztmobiles'> 
                <?php 
                    echo ($tag ['mobile']);
                ?>
            </td>
            <td class='ztemails'> 
                <?php 
                    echo ($tag ['email']); 
                ?>
            </td>
        </tr>
        <?php

    } // end foreach ($tags as $tags

} // end tagsShowContent ($tags)

//---------------------
public function getAlerts ($username) {

    $userid = $this->atxcc_db -> getUserId ($username);

    $query = "SELECT ackey, acval FROM ac_data WHERE actype=? AND acrefs=?";

    $params = [
        'alert', $userid
    ];

    $rows = $this->atxcc_db -> doQuery ($query, $params);

    $alerts = [];

    foreach ($rows as $row) {

        $tag = [];

        $tagname = $row ['ackey'];
        $tag ['tag'] = $tagname;

        $alertTypes = $row ['acval'];

        if (preg_match ('/T/', $alertTypes)) {

            $tag ['mobile'] = 'x';

        } else {

            $tag ['mobile'] = '';

        } // end if (preg_match ('/T/', $alertTypes))
        
        if (preg_match ('/E/', $alertTypes)) {

            $tag ['email'] = 'x';

        } else {

            $tag ['email'] = '';

        } // end if (preg_match ('/T/', $alertTypes))
        
        array_push ($alerts, $tag);

    } // end foreach ($rows as $row)
    
    return $alerts;

} // end getTopics ()


//---------------------
public function tagsNotify ($user, $agendaItem, $content) {

    $tags = $this->getTags ($user);

    $this->tagsNotifyText ($tags ['mobile'], $agendaItem, $content);
    //$this->tagsNotifyEmail ($tags ['email'], $content);

} // end tagsNotify ()



//---------------------
public function tagsNotifyText ($mobileTags, $agendaItem, $content) {

    $AccountSid = "AC493f9987eac70cfdca386037c4a09423";
    $AuthToken = "78ca1ef4c9460df1e7389c4725eb3371";

    $msgsPrepared = "";

    foreach ($mobileTags as $tag => $numbers) {

        if (preg_match ("/$tag/i", $content)) {

            foreach ($numbers as $number) {
    
                $msg = $tag . ' ' . $agendaItem . "\n";
                $msgsPrepared .= $msg;
                $agendaLink = 'http://goo.gl/i0FtLm';
                $txtmsg = 'atxcc notify ' . $msg . ' ' . $agendaLink;

                $sms = array ('From' => '512-309-7363', 'To' => $number, 'Body' => $txtmsg);

                $client = new Services_Twilio($AccountSid, $AuthToken);
                $message = $client->account->messages->create($sms);
                $res = "Sent message {$message->sid}";

            } // end foreach ($numbers as $number)

        } // end if (preg_match ("/$tag/", $content))

    } // end foreach ($mobileTags as $mobileTag)

    if ($msgsPrepared == "") {

        echo 'NO tags matched for item: ' . $agendaItem;

    } else {
        
        echo $msgsPrepared;

    } // end if (empty ($msgs))
    

} // end tagsNotifyText ($mobileTags, $content)



//---------------------
public function tagsNotifyEmail ($emailData, $content) {

    

} // end tagsNotifyEmail ($emailData, $content)

//---------------------
public function getTags ($user) {

    $atxcc_us = new User ();
    $userIdx = $atxcc_us -> getIdx ($user);

    $query = 'SELECT acrefs, ackey, acval FROM ac_data WHERE actype=?';
    $params = ['alert'];

    if ($user != 'atxcchot') {

        $query .= 'AND acrefs=?';
        array_push ($params, $userIdx);

    } // end if ($user == 'atxcchot')
    
    $rows = $this->atxcc_db -> doQuery ($query, $params);

    $mobileAlerts = [];
    $emailAlerts = [];

    $tags = [];

    foreach ($rows as $row) {

        $uidx = $row ['acrefs'];
        $username = $this->atxcc_us -> getUsername ($uidx);

        $tagname = $row ['ackey'];

        $transport = $row ['acval'];

        if (preg_match ('/T/', $transport)) {

            $mobileNo = $this->atxcc_us -> getMobile ($uidx);
            if (array_key_exists ($tagname, $mobileAlerts)) {

                $mobileNumbers = &$mobileAlerts [$tagname];
                array_push ($mobileNumbers, $mobileNo);

            } else {

                $mobileAlerts [$tagname] = [$mobileNo];

            } // end if (array_key_exists ($mobileAlerts, $tagname))
            
        } // end if (preg_match ('/T/', $transport))

        
        if (preg_match ('/E/', $transport)) {

            $email = $this->atxcc_us -> getEmail ($uidx);

            if (array_key_exists ($tagname, $emailAlerts)) {

                $emailAddresses = &$emailAlerts [$tagname];
                array_push ($emailAddresses, $email);

            } else {

                $emailAlerts [$tagname] = [$email];

            } // end if (array_key_exists ($mobileAlerts, $tagname))


        } // end if (preg_match ('/E/', $transport))

        
    } // end foreach ($rows as $row)


    $tags = [
        'mobile' => $mobileAlerts,
        'email' => $emailAlerts
    ];

    return $tags;
    
} // end getTags ($user)


}


