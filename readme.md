Travel Bucket List (Dream Travel)
==================================


What is it? (Functionality)
---------------------------
Keep your travel bucket list handy so that you don't miss any awesome place you come across. Currently, this app allows us to hardcode locations and use those throughout. It can be extended to add persistent storage, user profile, interests, blogs, likes, etc. It extensively uses Knockout, Google Maps API, and Wikipedia API to provide richer content.


Last Update Date
-----------------
Sept, 2018


System Specific Notes
-----------------------
* Developed on Google App Engine Platform (Not deployed to the cloud yet.)
* Developed in Python 2.7 using Flask, Jinja.
* Uses Knockout, Google Maps API, Wikipedia API


Testing
----------
* The website is designed for all devices but has been tested only on Chrome browser on Desktop.


Package Details (files)
--------------------------------
Below is a brief description of the folders/files that have been used for this application.
1. static/js (folder): Contains the Javascript code used in the application.
    * map.js
    * mvc.js

2. static/css (folder): Contains the css file used.

3. templates/index.html: Contains the html associated with the app.

4. dream.py (file): The very light weight python file that receives and handles all app requests.

5. appengine_config.py, requirements.txt - files to support the project


How to get started
-------------------
To run the app locally, you will need two things:
    a. Google Cloud SDK: Download and install it.
    b. API Key to use Google Maps API
    
    
1. Copy the code to local folder, open terminal and `cd` into that folder.

2. Replace <GOOGLE MAPS API KEY> in templates/index.html file with your Maps API Key.

3. Depending upon which OS (Linux/Windows) you are using start the dev app server. Below is how you would start it on Windows:
    <code>python "..\Google\Cloud SDK\google-cloud-sdk\bin\dev_appserver.py . </code>

4. Once the server is up, access the website at http://localhost:8080/dream.

5. Filter places by clicking on checkbox provided for each place. 

6. Please Note: For filtering the places, I have used a checkbox option and not a text or a drop down. 


References, Credits & Acknowledgements
--------------------------------------
  * Udacity's lectures for basic map related functionalities.
  * https://developers.google.com/api-client-library/python/guide/aaa_oauth.
  * https://knockoutjs.com/index.html. Also, some instances of code is inspired from code samples from the website.
  * https://developers.google.com/maps/documentation/javascript/reference 


Contact Information
--------------------
For any comments, queries, issues, and bugs, please contact singhshalinis@gmail.com.
