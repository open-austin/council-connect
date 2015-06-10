<?php    // Topics.php
require_once 'DatabaseUsPsDb.php';

class Topics {
    
    //---------------------
    function __construct () {

        global $atxcc_db;
        $atxcc_db = new Database ('tgregone_atxcc', 'tgregone_atxcc', 'tgregone_atxcc$', 'localhost');
        
    } // end __construct ()

    
    
    //---------------------
    function topicsInit () {

        ?>
        <div id='agendaitems'>
        <p>
        Demo mode.  Try this:   <br>
        1.  Sign up as a new user with your mobile number for text notifications. <br>
        2.  Login with the new username. <br>
        3.  Select 'Agenda Items', then scroll over the Description column and observe a text box pop up with the full description of any description field. <br>
        4.  Move the cursor inside the box that just popped up, and scroll over any of the words (highlighted in red). <br>
        5.  Click on any word.  There will be an instant search of all agenda items containing the word clicked.  There will also appear a form at the top with an option to register Text and/or Email message notification. <br>
        6.  Select Text Msg checkbox, then click 'Register'. <br>
        7.  Click on Tags menu to observe the keyword you just registered. <br>
        8.  Click the Agenda Items menu again, and this time, click on the Description row you just visited to make the text pop up box.   <br>
        9.  You should see an alert indicating confirmation of a text message sent, or a message that there was no match, if you clicked on a row that did not contain any of your registered keyword tags. <br>
        </p>

            <h1 id='agendaheader'>Agenda Items</h1>

            <?php 
                $this->topicsShow ()
            ?>
        </div>

        <?php
    } // end topicsInit ()

		public function homeInit () {

			?>
					<center><img src="<?php echo get_template_directory_uri();?>/img/home_splash.png" /></center>
<br />
		<div style="width:80%; height=5em;margin:auto;">
		<div style="float:left; width:33%; background-color:yellow;">Subscribe</div><div style="float:left; width:33%; background-color:yellow;">Read Your Notifications</div><div style="float:left; width:33%; background-color:yellow;">Get Involved</div>
	</div>
	<br />
	<div style="width:80%; height=5em;margin:auto;">
<div style="float:left; width:33%; border-color:black; border:1px;">Subscribe to issues you care about by selecting keywords</div><div style="float:left; width:33%; border-color:black; border:1px;">Receive text messages or emails about upcoming counil agenda items releated to those issues.</div><div style="float:left; width:33%; border-color:black; border:1px;">We'll give you the tools to contact your council member, schedule testimony before the council, and learn ways to get involved.</div>
	</div>

    		<?php
		} // end homepage ()

   public function councilInit () {

    ?>
          <h1>Find your council District</h1>
					
					<iframe src='http://www.austintexas.gov/GIS/CouncilDistrictMap/' width='100%' height='650' frameborder='0'></iframe>

        <?php
    } // end homepage ()

   public function councilprocessInit () {

    ?>

        <h3>Follow a Sample Agenda</h3>
					
				<iframe src='//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=1lB2H7NGLSeHw41eIGU7I2onEN-lMVE59Z17NC_rNDrA&font=Bevan-PotanoSans&maptype=osm&lang=en&height=650' width='100%' height='650' frameborder='0'></iframe>

          <h3>The Council Process Explained</h3>
					
				<center><img src="<?php echo get_template_directory_uri();?>/img/cc-flow-chart_720.png" /></center>

        <?php
    } // end homepage ()
		function aboutInit () {

		?>
        <div>
            <h1>About Council Connect</h1>
<p>
Why can’t following the work of Austin’s City Council be as easy as following your high school friend’s vacation on Facebook? Council Connect is a first effort to make that happen.</p>

<p>
Proposed through a brief sketch at February’s Code Across event in Austin, Council Connect wants to facilitate citizen participation in Council decision making while it’s still possible to influence those decisions. The aspirations for the project were expansive but the leverage available through the data provided was limited. The Council Connect team who picked up the project at ATX Hack 4 Change refused to let that limitation write the end of the story. </p>

<p>
The demo presented here will help the citizens of Austin participate in City Council decision making by providing notifications of upcoming agenda items based on user defined search terms identified through previous agenda items. This functionality will enable citizens to keep an eye on the issues that matter most to them. The app currently delivers notifications via text message but an e-mail option will be added soon. Future development will include further e-mail integration including the ability to contact selected Council Members and to sign up for General Citizen Communication. The vision behind the Council Connect demo intends to make it possible for a citizen to receive a notification about an item of interest on an upcoming Meeting Agenda and to then review that item, contact a Council Member or sign up for public testimony directly from that notification.</p>

<p>
Our discussions as a team and the feedback we received from other community members attending the weekend hack event navigated to functionality that the data Austin’s City Council now publishes does not support. The original idea in February, for example, was more of a legislative tracking app that would make the whole workflow observable from an idea’s proposal to it’s final act on a Regular Meeting Agenda. Other ideas discussed included quick links to search by district numbers or by topics. This functionality would make it possible for citizens to learn more about the Council’s process by following their curiosity about their own district or trending topics.</p>

<p>
As much as the Council Connect team would like to deploy a slick new app, the team behind this project wants to launch a conversation… </p>

<p>
What would a citizen’s portal to City Council business look like? </p>

<p>
What are the technical requirements of a civic tool Austinites could use to both follow that business and to learn more about how it came to be?</p>

<p>
What could we make possible if our Public Information Offices not only published data but imagined the citizens of Austin as their end user?</p>

        </div>

        <?php
    } // end topicsInit ()

    //---------------------
    function topicsShow () {

        $topics = $this->getTopics ();

        ?>
            <div id='ztopics'>
            <table class='table table-striped table-hover table-bordered'>
                <tbody>
                    <tr id='ztopicsheader'>
                        <th id='datecat'>Date</th>
                        <th id='itemcat'>Item</th>
                        <th id='descriptioncat'>Description</th>
                    </tr>

                        
                    <?php
                    $this -> topicsShowContent ($topics);
                    ?>

                </tbody>
            </table>
            </div>

        <?php

    } // end function topicsShow ()

    
    //---------------------
    function topicsShowContent ($topics) {

        global $atxcc_db;

            // get draft date from ac_data                    
        $query = "SELECT ackey FROM ac_data WHERE actype=?"; 
        $row = $atxcc_db -> doQueryRow ($query, ['draft']); 
                                                           
        $draftDate = $row ['ackey'];        
        $stopics = [];

        foreach ($topics as $topic) {
            
            $this->convTitle ($topic);
            array_push ($stopics, $topic);

        } // end foreach ($topics as $topic)

        usort ($stopics, array ('Topics', 'cmpTopics'));

        foreach ($stopics as $topic) {

            $dispDate = $topic ['ddate']; 

            ?>
            <tr class='ztopicsrow'> 
                <td class='zdate <?php if ($dispDate == $draftDate) {echo "zdraft";} ?>'> 
                    <?php 
                        echo ($dispDate);
                    ?>
                </td>
                <td class='zitem'> 
                    <?php 
                        echo ($topic ['item']);
                    ?>
                </td>
                <td class='zcontent'> 
                    <?php echo ($topic ['post_content']);?>
                </td>
            </tr>
            <?php

        } // end foreach ($topics as $topic)

    } // end topicsShowContent ($topics)

    
    //---------------------
    private function cmpTopics ($topic1, $topic2) {

        return $topic1 ['sdate'] < $topic2 ['sdate'];

    } // end cmpTopics ()

    //---------------------
    function getTopics () {

        global $atxcc_db;
        //$query = "SELECT post_title, post_content FROM wp_posts WHERE post_status='publish' AND post_type='topic' LIMIT 5";
        $query = "SELECT post_title, post_content FROM wp_posts WHERE post_status='publish' AND post_type='topic'";
        $rows = $atxcc_db -> doQuery ($query);

        return $rows;

    } // end getTopics ()

    
    
    //---------------------
    function getTopicsSearch ($keyword) {

        global $atxcc_db;

        $query = "SELECT post_title, post_content FROM wp_posts WHERE post_status='publish' AND post_type='topic' AND post_content LIKE '%$keyword%'";

        $rows = $atxcc_db -> doQuery ($query);

        return $rows;
        

    } // end getTopicsSearch (keyword)

    //---------------------
    function convTitle (&$topic) {

        $rawTitle = $topic ['post_title'];

        if (preg_match ('/Item\s+(\d+)\s+\-\s+(\w+)\s+(\d+),\s*(\d+)/', $rawTitle, $matches)) {

            $itemNo = $matches [1];
            $month = $matches [2];
            $day = $matches [3];
            $year = $matches [4];

            $month3 = substr ($month, 0, 3);

            $monthsInt = [
                'Jan' => '01',
                'Feb' => '02',
                'Mar' => '03',
                'Apr' => '04',
                'May' => '05',
                'Jun' => '06',
                'Jul' => '07',
                'Aug' => '08',
                'Sep' => '09',
                'Oct' => '10',
                'Nov' => '11',
                'Dec' => '12',
            ];

            $monthInt = $monthsInt [$month3];

            $day = sprintf ('%02d', $day);
            $year = substr ($year, 2, 2);

            // $items = [$itemNo, $monthInt . '/' . $day . '/' . $year];
            $topic ['item'] = $itemNo;
            $topic ['ddate'] = $monthInt . '/' . $day . '/' . $year;
            $topic ['sdate'] = $year . $monthInt . $day . sprintf ('%03d', 1000 - $itemNo);

        } else {

            //$items = [$rawTitle, ""];
            $topic ['item'] = '';
            $topic ['ddate'] = '';
            $topic ['sdate'] = '';

        } // end if (preg_match ())

        return $topic;
        
    } // end convTitle ($rawTitle)


}


