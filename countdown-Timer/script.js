const newYears = '1 jan 2024';

// function countdown() {
//     const newYearsDate = new Date(newYears);
//     const currentDate = new Date();

//     const result = (newYearsDate - currentDate) / 1000;
//     const days = Math.floor(result / 3600 / 24);
//     const hours = Math.floor(result / 3600) % 24;
//     const mins = Math.floor(result / 60) % 60;
//     const seconds = Math.floor(result) % 60;

//     daysEl = document.getElementById('days').innerHTML =days;
//     hoursEl = document.getElementById('hours').innerHTML=hours;
//     minsEl = document.getElementById('mins').innerHTML=mins;
//     document.getElementById('seconds').innerHTML =seconds;

// }

// // init to call
// countdown();

setInterval(function(){
    const newYearsDate = new Date(newYears);
    const currentDate = new Date();

    const result = (newYearsDate - currentDate) / 1000;
    const days = Math.floor(result / 3600 / 24);
    const hours = Math.floor(result / 3600) % 24;
    const mins = Math.floor(result / 60) % 60;
    const seconds = Math.floor(result) % 60;

    daysEl = document.getElementById('days').innerHTML =days;
    hoursEl = document.getElementById('hours').innerHTML=TimeFormat(hours);
    minsEl = document.getElementById('mins').innerHTML=TimeFormat(mins);
    document.getElementById('seconds').innerHTML =TimeFormat(seconds);
},1000)

function TimeFormat(time){
    return time < 10 ? `0${time}`: time;
}

