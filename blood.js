let hospitals=[
  {name:"BRD Medical College", units:{"O+":12,"O-":12,"A+":12,"A-":12,"B+":12,"B-":12,"AB+":12,"AB-":12}, address:"Medical Road", phone:"9876543210", username:"brd", password:"brd123", history:{}},
  {name:"Apollo Hospital", units:{"O+":5,"O-":5,"A+":5,"A-":5,"B+":5,"B-":5,"AB+":5,"AB-":5}, address:"ABC Nagar", phone:"9934789210", username:"apollo", password:"apollo123", history:{}},
  {name:"City Care Hospital", units:{"O+":8,"O-":8,"A+":8,"A-":8,"B+":8,"B-":8,"AB+":8,"AB-":8}, address:"Civil Lines", phone:"9123456780", username:"citycare", password:"city123", history:{}},
  {name:"Maa Vindhyavasini Hospital", units:{"O+":6,"O-":6,"A+":6,"A-":6,"B+":6,"B-":6,"AB+":6,"AB-":6}, address:"Golghar", phone:"9988776655", username:"vindhya", password:"vindhya123", history:{}},
  {name:"Shri Ram Hospital", units:{"O+":10,"O-":10,"A+":10,"A-":10,"B+":10,"B-":10,"AB+":10,"AB-":10}, address:"Basharatpur", phone:"9876501234", username:"shriram", password:"ram123", history:{}},
  {name:"Rathore Hospital", units:{"O+":7,"O-":7,"A+":7,"A-":7,"B+":7,"B-":7,"AB+":7,"AB-":7}, address:"Khalilabad Road", phone:"9123098765", username:"rathore", password:"rath123", history:{}}
];

let loggedInHospital=null;

function openDrawer(){
  document.getElementById("myDrawer").style.width="250px";
}
function closeDrawer(){
  document.getElementById("myDrawer").style.width="0";
}

function showSection(id){
  ["searchSection","loginSection","dashboardSection","registerSection"].forEach(s=>document.getElementById(s).style.display="none");
  document.getElementById(id).style.display="block";
  closeDrawer();
  if(id==="dashboardSection" && loggedInHospital){ showHistory(); }
}





let slideIndex = 1;
showSlides(slideIndex);

// Next/Previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Dot controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Auto slideshow every 4s
setInterval(() => {
  plusSlides(1);
}, 7000);














function searchBlood(){
  let blood=document.getElementById("bloodGroup").value;
  let city=document.getElementById("city").value.trim().toLowerCase();
  if(city===""){ alert("Please enter a city!"); return; }
  let resultsDiv=document.getElementById("results");
  resultsDiv.innerHTML=`<h3>Results for "${blood}" in ${city}</h3>`;
  hospitals.forEach(h=>{
    let availableUnits=h.units[blood];
    let displayUnits=availableUnits>0?availableUnits:"No Stock";
    let mapQuery=encodeURIComponent(h.name+" "+h.address+" "+city);
    resultsDiv.innerHTML+=`<div class="hospital">
      <h3>🏥 ${h.name}</h3>
      <p>Available: <b>${displayUnits}</b> of ${blood}</p>
      <p>📍 Address: <a href="https://www.google.com/maps/search/${mapQuery}" target="_blank" class="map-link">${h.address}, ${city}</a></p>
      <p>📞 Contact: <a href="tel:${h.phone}" class="phone-link">${h.phone}</a></p>
      <div class="actions">
            <a class="emergency" href="requestblood.html">📨 Request Blood  </a>
        <a class="direction" href="https://www.google.com/maps/dir/?api=1&destination=${mapQuery}" target="_blank">🚗 Get Directions</a>
        <a class="emergency" href="emergencydelivery.html">🚑 Emergency Delivery</a>
      </div>
    </div>`;
  });
}

function requestBlood(hospital,blood){ 
  alert("Blood request for "+blood+" sent to "+hospital); 
}

function hospitalLogin(){
  let user=document.getElementById("username").value;
  let pass=document.getElementById("password").value;
  let hospital=hospitals.find(h=>h.username===user && h.password===pass);
  if(hospital){ 
    loggedInHospital=hospital; 
    alert("Login successful!"); 
    showSection("dashboardSection"); 
  }
  else { 
    alert("Invalid username or password"); 
  }
}

function updateAvailability(){
  if(!loggedInHospital){ alert("Please login!"); return; }
  let group=document.getElementById("bloodGroupUpdate").value;
  let units=document.getElementById("units").value;
  if(units===""){ alert("Please select units!"); return; }
  let updatedUnits=parseInt(units);
  loggedInHospital.units[group]=updatedUnits;
  loggedInHospital.history[group]={units:updatedUnits,time:new Date().toLocaleString()};
  alert(updatedUnits===0?"Blood group "+group+" marked as NO STOCK / NOT AVAILABLE ✅":"Updated "+units+" units of "+group+" ✅");
  showHistory();
}

function showHistory(){
  let table=document.getElementById("historyTable");
  table.innerHTML=`<tr><th>🩸 Blood Group</th><th>📦 Units</th><th>⏰ Last Updated</th></tr>`;
  for(let group in loggedInHospital.units){
    let entry=loggedInHospital.history[group];
    let time=entry?entry.time:"Not Updated";
    let displayUnits=loggedInHospital.units[group]===0?"No Stock":loggedInHospital.units[group];
    table.innerHTML+=`<tr><td>${group}</td><td>${displayUnits}</td><td>${time}</td></tr>`;
  }
}

function registerHospital(){
  let name=document.getElementById("newHospitalName").value;
  let addr=document.getElementById("newHospitalAddress").value;
  let phone=document.getElementById("newHospitalPhone").value;
  let username=document.getElementById("newHospitalUsername").value;
  let password=document.getElementById("newHospitalPassword").value;
  if(name && addr && phone && username && password){
    hospitals.push({
      name:name, 
      units:{"O+":0,"O-":0,"A+":0,"A-":0,"B+":0,"B-":0,"AB+":0,"AB-":0}, 
      address:addr, 
      phone:phone, 
      username:username, 
      password:password, 
      history:{}
    });
    alert("Hospital "+name+" registered successfully!"); 
    showSection('searchSection'); 
  }
  else { 
    alert("Please fill all details!"); 
  }
}
