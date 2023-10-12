const gallery = document.querySelector(".gallery");
// const modal= document.querySelectorAll(".modal");

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



//fetch modal 
// {
//   /* <p>${data.phone}</p><p>${data.location.street} or ${data.location.postcode}</p><p>${data.dob}</p> */
// }


// card.addEventListener('click', );
//Event listener to close modal by clickin on arrow or overlay
