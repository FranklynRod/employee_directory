//Query Selectors
const gallery = document.querySelector(".gallery");
const search = document.querySelector('.search-container');
const body = document.querySelector("body");

//Variable that holds data results from API
let employeeData = [];

//Function to get data from API
const getEmployees = async () => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?format=json&results=12"
    );
    const data = await response.json();
    employeeData = data.results
    displayEmployees(data.results);
  } catch (error) {
    console.log(error);
  }
};

getEmployees();


//Function to dynamically add HTML and display employees in UI
const displayEmployees = (employeeData) => {
  const employees = employeeData.map(user => 
    `<div class="card">
  <div class="card-img-container">
  <img class="card-img" src="${user.picture.large}" alt="Image of ${user.name.first} ${user.name.last}">
  </div>
  <div class="card-info-container">
  <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
  <p class="card-text">${user.email}</p>
  <p class="card-text cap">${user.location.city},${user.location.state}</p>
  </div>
  </div>`).join("");
   ;
  
    gallery.insertAdjacentHTML("beforeend", employees);
    
};

//Function to displays modal of one employee
const displayModal = (user) =>{
 const employee = `
  <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
  <img class="modal-img" src="${user.picture.thumbnail}" alt="Image of ${user.name.first} ${user.name.last}">
  <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
  <p class="modal-text">${user.email}</p>
  <p class="modal-text cap">${user.location.city}</p>
  <hr>
  <p class="modal-text">${user.phone}</p>
  <p class="modal-text">${user.location.street.name}${user.location.city}</p>
  <p class="modal-text">Birthday: ${user.dob.date}</p>
  </div>
  </div>
  <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
 body.insertAdjacentHTML("beforeend", employee); 

}
const button = document.getElementById("modal-close-btn");

//Creates search bar when page is loaded
window.onload = () => {
const html = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
search.insertAdjacentHTML("beforeend", html);
};

//Event Listeners 

//Searches employees
search.addEventListener("keyup", (e) => {
   const currentValue = e.target.value.toLowerCase();
   const employeesNames = document.querySelectorAll(".card-name.cap");
   employeesNames.forEach(employee =>{
   if (employee.textContent.toLowerCase().includes(currentValue)){
      employee.parentNode.parentNode.style.display = "block";
   } else{employee.parentNode.parentNode.style.display = "none"}
  })
}); 

//Event that will display modal when card is clicked
gallery.addEventListener('click', (e) => {
    const employeeModal = e.target.closest('.card');
    
    if (employeeModal) {
      const employeeName = employeeModal.querySelector("#name").textContent;
      const user = employeeData.find((employee) => employee.name.first +" "+ employee.name.last === employeeName)
      displayModal(user);
    }
  });

  //Event that allows user to keyboard to remove module (more accessible)
  body.addEventListener("keydown" , (e) =>{
    const modal= document.querySelector(".modal");
    const modalButtons = document.querySelector(".modal-btn-container")
    const modalContainer = document.querySelector(".modal-container")
    if (e.key === 'Escape'){
      modal.remove()
      modalButtons.remove();
      modalContainer.remove();
    }
  });

//Remove module and/or flip through employees in the modal view
button.addEventListener("click" , (e) =>{
    const modalContainer = document.querySelector(".modal-container")
    const clickedPrev = e.target.classList.contains("modal-prev")
    const clickedNext =  e.target.classList.contains("modal-next")
    const clickedButton = e.target.closest('#modal-close-btn')
    if (clickedButton){
      modalContainer.remove();
    } 
    if (clickedPrev) {
      const currentEmployee = document.querySelector(".modal-name").textContent;
      const currentIndex = employeeData.findIndex((employee) => employee.name.first + " " + employee.name.last === currentEmployee);
      console.log(currentEmployee)

      if (currentIndex > 0) {
          modalContainer.remove();
          displayModal(employeeData[currentIndex - 1]);
      }
  }
  
  if (clickedNext) {
      const currentEmployee = document.querySelector(".modal-name").textContent;
      const currentIndex = employeeData.findIndex((employee) => employee.name.first + " " + employee.name.last === currentEmployee);
      
      if (currentIndex < employeeData.length - 1) {
          modalContainer.remove();
          displayModal(employeeData[currentIndex + 1]);
      }
  }
  });




