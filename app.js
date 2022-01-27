
//we would add an event listener to 'add note' button
//when a user add a note, it will store in local storage.
showNotes();

let addButton = document.getElementById('addBtn');
addButton.addEventListener("click", function (params) {
  let addText = document.getElementById("addTxt");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");

  if(notes == null){
    notesObj = []; // blank array
  }
  else{
    notesObj = JSON.parse(notes);
  }
 
    let myObj = {
      title: addTitle.value,
      text: addTxt.value
  }
   // I am going to store the notes in an array

  notesObj.push(myObj);

  // we will be inserting the notes to the local storage

localStorage.setItem("notes", JSON.stringify(notesObj));
addText.value = "";
addTitle.value = "";
// We have convered into a string as we need to set as "Strings" in the local Storage
// console.log(notesObj);
showNotes();

})

function showNotes(){
  let notes=localStorage.getItem('notes');
  if(notes==null){
    notesObj=[];
  }
  else{
    notesObj=JSON.parse(notes);
  }

  let html="";
  notesObj.forEach(function(element, index){
    html +=`
      <div class="card row my-2 mx-2 noteCard" style="width: 18rem; box-shadow: 5px 10px">
        <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <p class="card-text">${element.text}</p>
          <button id = "${index}"  onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
         
      
          </div>
      </div>
    `;

    
  })
// if in line 48 I put {index+1} it will NOT remove the first note, index starts at "0"
// change above from:  line 48: <button id="deleteBtn" class="btn btn-primary">Delete Note</button> because
// it was not doing anything, just displaying Delete note on card
// // 
// ====== !!! my findings ================================================================
// click != onclick

// (HTML&JS) onclick with element or function
// (JS) click with addEventListener()

// In HTML:
// <element onclick="myScript">
// In JavaScript:
// object.onclick = function(){myScript};

// In JavaScript, using the addEventListener() method:
// object.addEventListener("click", myScript);

//when I used "this.style.display='none'" only "Delete Note" disappeared, but the card was still there
// after using onclick="deleteNote(this.id)" whole card disappeared
// =========================================================================================
// The JavaScript this keyword refers to the object it belongs to.

// It has different values depending on where it is used:

// In a method, this refers to the owner object.
// Alone, this refers to the global object.
// In a function, this refers to the global object.
// In a function, in strict mode, this is undefined.
// In an event, this refers to the element that received the event.
// Methods like call(), and apply() can refer this to any object.


  let notesElem = document.getElementById("notes");
  if(notesElem !=0){
  notesElem.innerHTML = html;
  }
  
}

// 
// marking as 'important'
// document.getElementById("notes").addEventListener("click", myFunction);

// function myFunction() {
//   var x = document.getElementById("notes");
//   x.style.color = "red";
//   x.style.fontWeight = "bold";
// }

// 


// deleting a note
function deleteNote(index) {
// this below copied from showNotes function above
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);

  // from 'index'th position, we remove 1 note 

  // array.splice(index, howmany, item1, ....., itemX)
  
  // index:	Required. The position to add/remove items. Negative values a the position from the end of the array.
  // howmany:	Optional. Number of items to be removed.

  // item1, ..., itemX	Optional. New elements(s) to be added

  // The splice() method adds and/or removes array elements.
  // splice() overwrites the original array.

  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

let search = document.getElementById("SearchTxt");
// add event listener so that when there is any input into the search box an annomynous function runs
search.addEventListener("input", function () {
    // create variable that stores the value of the inputted text
    //////
    let inputVal = search.value.toLowerCase();
    /////
    // set variable to capture the cards html element (all the cards share noteCard class)
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
      // sets variable by capturing the <p>[0] and the inner text inside it. in this case it captures the element
      let cardText = element.getElementsByTagName("p")[0].innerText
      /////
      let addTitle = element.getElementsByTagName("h5")[0].innerText;
      /////
      // runs if statment saying convert the cardtext to lowercase and include the inputted text from search bar 
      // .includes(inputVal) = does card text include whats in input val
      /////
      if (cardText.toLowerCase().includes(inputVal) || addTitle.toLowerCase().includes(inputVal)) {
      /////
         
          // if true it displays as block
          element.style.display = 'block';
      }
      else {
          // if false it will not display
          element.style.display = 'none';
      }
  })
})









// function searchFunction() {
//   var input, filter, ul, li, a, i, txtValue;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   ul = document.getElementById("myUL");
//   li = ul.getElementsByTagName("li");
//   for (i = 0; i < li.length; i++) {
//       a = li[i].getElementsByTagName("a")[0];
//       txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           li[i].style.display = "";
//       } else {
//           li[i].style.display = "none";
//       }
//   }
// }