const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


populateUI();


let ticketprice = +movieSelect.value





// Save selected movie and price
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedmovieIndex', movieIndex);
  localStorage.setItem('selectedmoviePrice', moviePrice);
};




// Update total and count
function  UpdateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');


  const seatsIndex= [...selectedSeats].map(seat =>[...seats].indexOf(seat));


  localStorage.setItem('selectedSeats' , JSON.stringify(seatsIndex));

  const selectedSeatCount = selectedSeats.length;
  
  count.innerText= selectedSeatCount;
  total.innerText= selectedSeatCount * ticketprice;
};

// Get data from local storage and populateUI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
 
  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat , index) => {
      if(selectedSeats.indexOf(index)> -1){
        seat.classList.add('selected')
      }
    });
  }


  const selectedmovieIndex = localStorage.getItem('selectedMovieIndex')
  if(selectedmovieIndex !== null){
    movieSelect.selectedIndex = selectedmovieIndex;
  }
}

 
// Movie select event 
movieSelect.addEventListener('change' , e =>{
  ticketprice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  UpdateSelectedCount();
})



container.addEventListener('click', e =>{
if(e.target.classList.contains('seat') && !
e.target.classList.contains('occupied')){

  e.target.classList.toggle('selected')
}
 
    
  
UpdateSelectedCount();
});

// Initial Update count
UpdateSelectedCount();
