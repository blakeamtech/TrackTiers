const setTime = new Date(2020,11,18)

// Function to compute the time between now and the release date.
function computeGap(setTime){

  let timeGap = (setTime.getTime()-Date.now()) / 1000;
  days = Math.floor(timeGap / (60*60*24));
  timeGap -= days*60*60*24;

  hours = Math.floor(timeGap / (60*60));
  timeGap -= hours*60*60;

  minutes = Math.floor(timeGap / 60);
  timeGap -= minutes*60;

  seconds = Math.floor(timeGap);
  
  // store data in a readable format.
  return {'days': days, 'hours':hours, 'minutes':minutes,'seconds':seconds};
}

function updateCountdown(){
  timeGap = computeGap(setTime);
  
  // If a time value is less than 10, append a 0.
  Object.keys(timeGap).forEach(time => {
    if (timeGap[time] >= 10){
      timeGap[time] = timeGap[time].toString();
    }else{
      timeGap[time] = "0"+timeGap[time].toString();
    }
  })
  document.getElementById("days").textContent = timeGap.days;
  document.getElementById("hours").textContent = timeGap.hours;
  document.getElementById("minutes").textContent = timeGap.minutes;
  document.getElementById("seconds").textContent = timeGap.seconds;
}

window.addEventListener("DOMContentLoaded",function(){
  setInterval(updateCountdown,1000); // Call updateCountdown every second to update the clock.
});
