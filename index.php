<!-- index.php  -->
<?php 

    session_start ();
    if (! array_key_exists ('err', $_SESSION)) {

        $_SESSION ['err'] = '';

    } // end if (! array_key_exists ('err', $_SESSION))
    
    get_header(); 
    require_once 'Topics.php';
    require_once 'User.php';
    require_once 'Util.php';
    require_once 'Tags.php';
    require_once 'AgendaCtrl.php';

    $atxcc_tp = new Topics ();
    $atxcc_us = new User ();
    $atxcc_tg = new Tags ();

    $requestUrl = $_SERVER ['REQUEST_URI'];

        // pick off trailing ?0, if present
    if (preg_match ('/([^?]+)\?(.*)$/', $requestUrl, $matches)) {


        $requestUrl = $matches [1];
        $optionSuffix = $matches [2];

        if ($optionSuffix == '0') {

            $_SESSION ['err'] = '';

        } // end if ($suffix == '0')
        

    } // end if (preg_match ('/([^?]+)\?(.*)$/', $requestUrl, $matches))
    
    $request = preg_replace ('/.*\//', "", $requestUrl);

    switch ($request) {

        //case '':
            //$_SESSION ['err'] = '';
            //$atxcc_tp -> homeInit ();
            //break;

        case 'home':
            $_SESSION ['err'] = '';
            $atxcc_tp -> homeInit ();
            break;

        case 'agendapage':
            $_SESSION ['err'] = '';
            $atxcc_tp -> topicsInit ();
						break;

        case 'findyourcouncildistrict':
            $_SESSION ['err'] = '';
            $atxcc_tp -> councilInit ();
						break;

        case 'councilprocess':
            $_SESSION ['err'] = '';
            $atxcc_tp -> councilprocessInit ();
						break;

        case 'about':
            $atxcc_tp -> aboutInit ($_SESSION ['err']);
            break;

        case 'signup':
            $atxcc_us->signupForm ($_SESSION ['err']);
            break;

        case 'alogin':
            $atxcc_us->loginForm ($_SESSION ['err']);
            break;

        case 'alogout':
            $atxcc_us->logout ();

            $server = $_SERVER ['SERVER_NAME'];
            $urlRedirect = 'http://' . $server . '/atxcc';

            Util::redirect ($urlRedirect);
            break;

        case 'apassword':
            $atxcc_us->changePasswordForm ($_SESSION ['err']);
            break;

        case 'tags':
            $atxcc_tg->tagsInit ();
            break;

        case 'agendactrl':
            if ($_SESSION ['user'] == 'atxcchot') {

                $atxcc_ac = new AgendaCtrl ();
                $atxcc_ac -> agendaInit ();
                
            } else {

                $atxcc_tp -> topicsInit ();

            } // end if ($_SESSION ['user'] == 'atxcchot')
            
            break;

        default:
            $_SESSION ['err'] = '';
            $atxcc_tp -> homeInit ();
            break;
            #echo "'$request' not found";
            #break;

    } // end switch ($_SERVER ['REQUEST_URI'])
        
    get_footer(); 
?>
<!-- END index.php  -->
