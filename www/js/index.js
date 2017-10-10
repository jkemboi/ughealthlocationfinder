/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function  createSidebar() { //This line is important, change Table ID and column names
	locate();
	var txt = document.getElementById("no").value;
	var queryText = encodeURIComponent("SELECT 'Name','LAT','LON','Code','coordinates' FROM 1euHNAy9kG1LMiPuvTjgJjOc25qOqIWmYVCCoZEnD ORDER BY ST_DISTANCE(col24, ");
	var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq='  + queryText + 'LATLNG(' + lat + ',' + long + '))' + 'LIMIT '+ txt);
	
	query.send(getData);//set the callback function

}
  
  google.setOnLoadCallback(createSidebar);// Set a callback to run when the Google Visualization API is loaded.


// <script type="text/javascript"> //Second sript to create sidebar
var geocoder= new google.maps.Geocoder();
var FTresponse = null;

function getData(response) { //define callback function, this is called when the results are returned
if (!response) {
  alert('no response');
  return;
}
if (response.isError()) {
  alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
  return;
} 
  FTresponse = response;
  numRows = response.getDataTable().getNumberOfRows();
  numCols = response.getDataTable().getNumberOfColumns();
  
  
  fusiontabledata = "<table><tr>";//concatenate the results into a string, you can build a table here
  fusiontabledata += "<th>Facility Name</th>";
  fusiontabledata += "<th>Information Link</th>";
  fusiontabledata += "<th>Map Link</th>";
  //fusiontabledata += "<th>" Map + "</th>";
  fusiontabledata += "</tr><tr>";
  
  
  for(i = 0; i < numRows; i++) {
//    for(j = 0; j < numCols; j++) {
      fusiontabledata += "<td><a>"+response.getDataTable().getValue(i, 0) +"</a></td>";
	  //fusiontabledata += "<td><a onclick="$('object').attr('data','https://fusiontables.googleusercontent.com/embedviz?viz=CARD&q=select+*+from+1euHNAy9kG1LMiPuvTjgJjOc25qOqIWmYVCCoZEnD+where+Code="+ response.getDataTable().getValue(i, 3) + "')">Link</a></td>";
	  fusiontabledata += "<td><div =InfoWin><a href='https://fusiontables.googleusercontent.com/embedviz?viz=CARD&q=select+*+from+1euHNAy9kG1LMiPuvTjgJjOc25qOqIWmYVCCoZEnD+where+Code="+ response.getDataTable().getValue(i, 3) + "'>Link</a></div></td>";
	  fusiontabledata += "<td><a href='http://maps.google.com/maps?z=12&t=m&q="+ response.getDataTable().getValue(i, 4) + "(Label,"+ response.getDataTable().getValue(i, 0) + ")'>Map</a></td>";
	  //fusiontabledata += "<td><a href='geo:"+ response.getDataTable().getValue(i, 4) + "?q"+ response.getDataTable().getValue(i, 4) + "(Label,"+ response.getDataTable().getValue(i, 0) + ")'>Map</a></td>";
	  //fusiontabledata += "<td><a href='https://fusiontables.googleusercontent.com/embedviz?viz=CARD&q=select+*+from+1euHNAy9kG1LMiPuvTjgJjOc25qOqIWmYVCCoZEnD+where+Code="+ response.getDataTable().getValue(i, 3) + "'>"+response.getDataTable().getValue(i, 2) +"</a></td>";
//    }
	fusiontabledata += "</tr><tr>";
  }
 
  
  fusiontabledata += "</table>"  
  //display the results on the page
  document.getElementById('content').innerHTML = fusiontabledata;
  //document.getElementById("content").style.table-layout = "fixed";

  
  
}
google.load('visualization', '1', {'packages':['corechart', 'table', 'geomap']});

function locate() {
        var lat, long;
        lat = 0.511,
        long = 35.282;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function success(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            initialize(lat, long);
          }, function (error) {
            switch (error.code) {
            case error.TIMEOUT:
              alert('Timeout. Try again.');
              return initialize(lat, long);
            case error.POSITION_UNAVAILABLE:
              alert('Your position is not available at the moment.');
              return initialize(lat, long);
            case error.PERMISSION_DENIED:
              alert('No geolocation. Things wont work out this way.');
              return initialize(lat, long);
            case error.UNKNOWN_ERROR:
              alert('Unknown error. Fyi.');
              return initialize(lat, long);
            }
          });
        } else {
          alert('Your device does not support geolocation');
          // IE-8 issue...
          return initialize(lat, long);
        }
		}

</head>
<body 
