const cards = document.querySelectorAll(".card");
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
  cards.forEach((card, index) => {
    const user = results[index];
    const html = `<div class="card"><div class="card-img-container"><img src="${user.picture.large}" alt="Image of ${user.name.first} ${user.name.last}"></div><h3>${user.name.first} ${user.name.last}</h3><p>${user.email}</p><p>${user.location.city}</p><p>${user.location.state}</p></div>`;
    card.insertAdjacentHTML("beforeend", html);
  });
};


//fetch modal 
// {
//   /* <p>${data.phone}</p><p>${data.location.street} or ${data.location.postcode}</p><p>${data.dob}</p> */
// }


// card.addEventListener('click', );
//Event listener to close modal by clickin on arrow or overlay
