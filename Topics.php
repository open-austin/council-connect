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
            <h1 id='agendaheader'>Agenda Items</h1>

            <?php 
                $this->topicsShow ()
            ?>

        </div>

        <?php
    } // end topicsInit ()

		public function homeInit () {

			?>
					<h1>Council Connect - Austin is one bad ass town!</h1>
					<center><img src="<?php echo get_template_directory_uri();?>/img/acl_1024.png" /></center>

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
          <h1>The Council Process Explained</h1>
					
				<iframe src='//cdn.knightlab.com/libs/timeline/latest/embed/index.html?source=1lB2H7NGLSeHw41eIGU7I2onEN-lMVE59Z17NC_rNDrA&font=Bevan-PotanoSans&maptype=osm&lang=en&height=650' width='100%' height='650' frameborder='0'></iframe>


        <?php
    } // end homepage ()
		function aboutInit () {

		?>
        <div>
            <h1>About Council Connect</h1>

				<p>This project will help the citizens of Austin participate in City Council decision making by providing notifications of upcoming agenda items and deadlines to sign up for public testimony. This will enable citizens to keep tabs on decision making so they can participate before decisions are finalized because Council information is currently too fragmented across different pages on the City's website.</p>

			<p>We expect to have notifications for future items, the ability to search past items with suggested tags and a news feature combined in one app to make it easier for citizens to follow City Council events. Demo of basic functionality <a href='https://www.youtube.com/watch?v=s1Mg3bwntkU' TARGET='blank'>[here]</a>.</p>

				<h3>HELP WANTED</h3>
				<ul>
					<li>UI </li>
					<li>WordPress</li>
					<li>Experts who know the city's agenda management software or are familiar with the industry more generally </li>
					<li>Citizens who have followed a decision through the Council's process</li>
					<li>Wonky types interested in sorting through the city's website to trace out workflow as much as possible</li>
					<li>Writers to document our work today as well as the reqs for features discussed but not viable with current data structure.</li>
				</ul>
<hr />
				<h3>Description of the Code Design</h3>
			<p>Austin City Council's website is scraped to extract meeting agenda items.  The items are then loaded into a wordpress/bbpress framework.  The backend is written using PHP to control the flow and interface with the MySql database.  Client side code is written in JQuery to standarize browser behavior for DOM manimpulation and event handling.  Responsive Bootstrap classes are used to make the front end compatible with a variety of device types and sizes.  </p>
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


