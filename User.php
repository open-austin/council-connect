<?php    // User.php

require_once 'DatabaseUsPsDb.php';

class User {

public $isLoggedIn = false;
public $username = '';
public $salt = 'salty';

//---------------------
public function __construct () {

    if (!array_key_exists ('user', $_SESSION)) {

        $_SESSION ['user'] = '';

    } // end if (!array_key_exists ('user', $_SESSION))
    
    $this->isLoggedIn = $_SESSION ['user'] != '';
    $this->username = $_SESSION ['user'];

} // end __construct ()



//---------------------
public function signupForm ($err_msg) {

    ?>
    <div id="zsignup" class="row">
        <?php
            if ($err_msg) {

                echo '<p style="color:red">' . $err_msg . '</p>';

            } // end if ($err_msg)
            
        ?>
        <form id="zsignupform" class="form-horizontal well" method="post" action="<?php echo get_template_directory_uri();?>/signup.php">
            <fieldset>
                <legend>Sign In:</legend>
                <div class="form-group">
                    <label for="username" class="col-lg-2 control-label">Username</label> 
                    <div class="col-lg-10">
                        <input id="zusername" name="username" type="text" class="form-control" placeholder="Username">
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="col-lg-2 control-label">Password</label> 
                    <div class="col-lg-10">
                        <input id="zpassword" name="password" type="password" class="form-control" placeholder="Password">
                    </div>
                </div>

                <div class="form-group">
                    <label for="email" class="col-lg-2 control-label">Email address</label> 
                    <div class="col-lg-10">
                        <input id="zemail" name="email" type="text" class="form-control" placeholder="user@domain.com">
                    </div>
                </div>

                <div class="form-group">
                    <label for="mobile" class="col-lg-2 control-label">Mobile number</label> 
                    <div class="col-lg-10">
                        <input id="zmobile" name="mobile" type="text" class="form-control" placeholder="512-555-1212">
                    </div>
                </div>

            <!-- Submit button -->
            <div class="form-group">
            	<input type="submit" value="Register" class="btn btn-default btn-success" style="margin-left: 100px; margin-top: 10px"/>
        	</div>
        </form>

    </div>
    <?php
    

} // end signupForm ()


//---------------------
public function loginForm ($err_msg) {

    ?>
    <div id="zlogin" class="row">
        <?php
            if ($err_msg) {

                echo '<p style="color:red">' . $err_msg . '</p>';

            } // end if ($err_msg)
            
        ?>
        <form id="zloginform" class="form-horizontal well" method='post' action='<?php echo get_template_directory_uri();?>/login.php'>
            <fieldset>
            	<legend>Log In</legend>
            	<div class="form-group">
                    <label for="username" class="col-lg-2 control-label">Username</label> 
                    <div class="col-lg-10">
                        <input id="zusername" name="username" type="text" class="form-control" placeholder="Username" autofocus="true">
                    </div>
                </div>
                <div class="form-group">
                    <label for="password" class="col-lg-2 control-label">Password</label> 
                    <div class="col-lg-10">
                        <input id="zpassword" name="password" type="password" class="form-control" placeholder="Password">
                    </div>
                </div>
                <div class="form-group">
                	<input type="submit" value="Login" class="btn btn-default btn-success" style="margin-left: 100px; margin-top: 10px"/>
            	</div>
            </fieldset>
        </form>
    </div>
    <?php

} // end loginForm ()



//---------------------
public function changePasswordForm ($err_msg) {

    ?>
    <div id="zpasswordc" class="row">
        <div class="col-sm-4">
        <?php
            if ($err_msg) {

                echo '<p style="color:red">' . $err_msg . '</p>';

            } // end if ($err_msg)
            
        ?>
            <form id="zchangepasswordform" class="form-horizontal well" method='post' action='<?php echo get_template_directory_uri();?>/changepassword.php'>
                <fieldset>
                	<legend>Change Password</legend>

					<div class="form-group">
                        <label for="username" class="col-lg-2 control-label">New Password</label> 
                        <div class="col-lg-10">
                            <input id="zpassword" name="password" type="password" class="form-control" placeholder="new password">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cpassword" class="col-lg-2 control-label">Confirm Password</label> 
                        <div class="col-lg-10">
                            <input id="zconfirmpassword" name="cpassword" type="password" class="form-control" placeholder="confirm password">
                        </div>
                    </div>

                    <div class="form-group">
                    	<input type="submit" value="ChangePassword" class="btn btn-default btn-success" style="margin-left: 100px; margin-top: 10px"/>
                	</div>

                </fieldset>
        	</form>
        </div>
    </div>
    <?php

} // end changePasswordForm ()



//---------------------
public function logout () {

    $this->isLoggedIn = false;
    $_SESSION ['user'] = '';

    return;

} // end function logout ()

//---------------------
public function getIdx ($username) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $query = 'SELECT idx FROM ac_data WHERE actype="user" AND ackey=?';
    $row = $db -> doQueryRow ($query, $username);

    $idx = empty ($row) ? 0 : $row ['idx'];

    return $idx;

} // end getIdx ($username)



//---------------------
public function getUsername ($idx) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $query = 'SELECT ackey FROM ac_data WHERE idx=?';
    $row = $db -> doQueryRow ($query, $idx);

    $username = empty ($row) ? '' : $row ['ackey'];

    return $username;

} // end getUsername ($idx)

//---------------------
public function getMobile ($idx) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $query = 'SELECT acval FROM ac_data WHERE idx=?';
    $row = $db -> doQueryRow ($query, $idx);

    $userDataS = $row ['acval'];
    $userData = json_decode ($userDataS, true);

    $mobile = $userData ['mobile'];

    return $mobile;

} // end getMobile ($idx)

//---------------------
public function getEmail ($idx) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $query = 'SELECT acval FROM ac_data WHERE idx=?';
    $row = $db -> doQueryRow ($query, $idx);

    $userDataS = $row ['acval'];
    $userData = json_decode ($userDataS, true);

    $email = $userData ['email'];

    return $email;

} // end getEmail ($idx)

//---------------------
public function registerUser ($username, $password, $email, $mobile) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $hashpwd = sha1 ($password . $this->salt);

    $userData = [
        'hpassword' => $hashpwd,
        'email' => $email,
        'mobile' => $mobile
    ];

    $userDataJ = json_encode ($userData);

    $query = "INSERT INTO ac_data (actype, ackey, acval) VALUES (?, ?,?)";
    $db->doQuery ($query, array ('user', $username, $userDataJ));

} // end function registerUser ()


//---------------------
public function doAuth ($username, $password) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');

    $hashpwd = sha1 ($password . $this->salt);

    $query = "SELECT acval FROM ac_data WHERE actype='user' AND ackey=?";
    $row = $db->doQueryRow ($query, $username);

    $acval = $row ['acval'];
    $userData = json_decode ($acval, true);
    $hashpwdStored = $userData ['hpassword'];
    //$hashpwdStored = preg_replace ('/.*hpassword":"(\w+).*/', '$1', $acval);

    $authenticate = ($hashpwd === $hashpwdStored);
        
    return $authenticate;

} // end public function authenticate ()



//---------------------
public function changePassword ($user, $newpassword) {

    $db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');
    
    $query = "SELECT acval FROM ac_data WHERE actype='user' AND ackey=?";
    $row = $db -> doQueryRow ($query, $user);

    $userData = json_decode ($row ['acval'], true);

    $hashpwd = sha1 ($newpassword . $this->salt);
    $userData ['hpassword'] = $hashpwd;

    $userDataS = json_encode ($userData);
    
    $query = "UPDATE ac_data SET acval=? WHERE actype='user' AND ackey=?";

    $params = [
        $userDataS, $user
    ];

    $db->doQuery ($query, $params);

} // end functionchangePassword ($user, $newpassword)


} // end class User
