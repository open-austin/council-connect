# council-connect
This project will help the citizens of Austin participate in City Council decision making by providing notifications of upcoming agenda items and deadlines to sign up for public testimony. This will enable citizens to keep tabs on decision making so they can participate before decisions are finalized because Council information is currently too fragmented across different pages on the City's website.

We expect to have notifications for future items, the ability to search past items with suggested tags and a news feature combined in one app to make it easier for citizens to follow City Council events. Demo of basic functionality [here](https://www.youtube.com/watch?v=s1Mg3bwntkU).

---
###HELP WANTED
* UI

* WordPress

* Experts who know the city's agenda management software or are familiar with the industry more generally 

* Citizens who have followed a decision through the Council's process

* Wonky types interested in sorting through the city's website to trace out workflow as much as possible

* Writers to document our work today as well as the reqs for features discussed but not viable with current data structure.

---
###Description of the Code Design
Austin City Council's website is scraped to extract meeting agenda items.  The items are then loaded into a wordpress/bbpress framework.  The backend is written using PHP to control the flow and interface with the MySql database.  Client side code is written in JQuery to standarize browser behavior for DOM manimpulation and event handling.  Responsive Bootstrap classes are used to make the front end compatible with a variety of device types and sizes.  

