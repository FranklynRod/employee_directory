const gallery = document.querySelector(".gallery");
const modal= document.querySelectorAll(".modal-container");
const search = document.querySelector('.search-container')
const body = document.querySelector("body")

const getEmployees = async () => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?format=json&results=12"
    );
    const data = await response.json();
    console.log(data.results);
    displayEmployees(data.results);
  } catch (error) {
    console.log(error);
  }
};

getEmployees();

const displayEmployees = (results) => {
  const employees = results.map(user => `<div class="card">
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

window.onload = () => {
const html = `<form action="#" method="get">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;
search.insertAdjacentHTML("beforeend", html);
};


body.addEventListener("keyup", (e) => {
   const currentValue = e.target.value.toLowerCase();
   const employeesNames = document.querySelectorAll("card-name cap");
   employeesNames.forEach(employee =>{
   if (employee.textContent.toLowerCase().includes(currentValue)){
      employee.parentNode.parentNode.style.display = "block";
   } else{employee.parentNode.parentNode.style.display = "none"}
  })
}); 


// modal.addEventListener('click', (e)=> {
//   employeeModal = e.target.closest('modal-info-container')
//   if (employeeModal){
//     displayModal();
//   }
// });

// const displayModal = () => {
//   const html = ``;
// }

