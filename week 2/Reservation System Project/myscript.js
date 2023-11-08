 
 var reservedSeats = {
    record1: {
        seat: "b19",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record2: {
        seat: "b20",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record3: {
        seat: "b21",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    },
    record4: {
        seat: "b22",
        owner: {
            fname: "Joe",
            lname: "Smith"
        }
    }
};

 function makeRows(sectionLength,rowLength,placement){
    const rows = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t"];
   let html ="";
   let counter = 1;
   rows.forEach(row =>{
    switch(placement){
        case "left" : html += `<div class="label">${row}</div>`;break;
        case "right": counter = counter + (rowLength-sectionLength);break;
        default: counter = counter + ((rowLength-sectionLength)/2);break;
    }

    for(let i=0; i<sectionLength; i++){
        html += `<div class="a" id="${row+counter}">${counter}</div>`;
        counter++;
    }

    switch(placement){
        case "left" :counter = counter + (rowLength-sectionLength);break;
        case "right":html += `<div class="label">${row}</div>`;break;
        default: counter = counter + ((rowLength-sectionLength)/2);break;
    }


   });
  document.getElementById(placement).innerHTML=html;
 }

 makeRows(3,15,'left');
 makeRows(3,15,'right');
 makeRows(9,15,'middle');
     
 (function(){
     'use strict';

    let  selectedSeats = [];
    const seats = document.querySelectorAll('.a');

    for( const key in reservedSeats ){

    if( reservedSeats.hasOwnProperty(key)){
         const obj = reservedSeats[key];
    document.getElementById(obj.seat).className = 'r';
    document.getElementById(obj.seat).innerHTML = 'R';
    }
   
 }

    seats.forEach(seat =>{
        seat.addEventListener('click', () => {

            seatSelectionProcess(seat.id);


        });
    });
  function seatSelectionProcess(thisSeat){
    if(!document.getElementById(thisSeat).classList.contains('r')){
        var index = selectedSeats.indexOf(thisSeat);
    
    if( index > -1){
        selectedSeats.splice(index,1);
        document.getElementById(thisSeat).className = 'a';

    }
    else{
        selectedSeats.push(thisSeat);
         document.getElementById(thisSeat).className = 's';

    }
    manageConfirmForm();
    console.log(selectedSeats);
    }
    
  }

  document.getElementById('reserve').addEventListener('click', event =>{
     event.preventDefault();
     document.getElementById('resform').style.display = 'block';
  });
  document.getElementById('cancel').addEventListener('click', event =>{
     event.preventDefault();
     document.getElementById('resform').style.display = 'none';
  });

function manageConfirmForm(){

    if (selectedSeats.length > 0) {
       if(selectedSeats.length === 1){
         document.getElementById('selectedseats').innerHTML = `You have selected seat ${selectedSeats[0]}`;   
       }

       else{
        let seatString = selectedSeats.toString();
        seatString = seatString.replace(/,/g,", ");
        seatString = seatString.replace(/,(?=[^,]*$)/,' and');
        document.getElementById('confirmres').style.display = 'block';
        document.getElementById('selectedseats').innerHTML = `You have selected seats ${seatString}`;
           }
        

    }
    

    else{
    document.getElementById('confirmres').style.display = 'none';
    document.getElementById('selectedseats').innerHTML = 'You need to select some seats to reserve.<br> <a href="#" id="error">Close</a> this dialog box and pick at least one seat.';

    document.getElementById('error').addEventListener('click', ()=>{

        document.getElementById('resform').style.display = 'none';
    });
    }


  }
  manageConfirmForm();

  document.getElementById('confirmres').addEventListener('submit', event =>{
     event.preventDefault();
     processReservation();
  });

function processReservation(){
 const hardCodeRecords = Object.keys(reservedSeats).length;
 const fname = document.getElementById('fname').value;
 const lname = document.getElementById('lname').value;
 let counter = 1;
 let nextRecord = '';
 
 selectedSeats.forEach( thisSeat =>{
    document.getElementById(thisSeat).className = 'r';
    document.getElementById(thisSeat).innerHTML = 'R';

    nextRecord = `record${hardCodeRecords + counter}`;
    reservedSeats[nextRecord] = {
        seat: thisSeat,
        owner: {
         fname: fname,
         lname: lname
        }
    }
    counter++;

 });
 document.getElementById('resform').style.display = 'none';
 selectedSeats = [];
 manageConfirmForm();

 console.log(reservedSeats);

}
 

}());