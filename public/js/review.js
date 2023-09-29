// const { get } = require("../../controllers/homeRoutes");

const newFormHandler = async (event) => {
  event.preventDefault();

  let today = new Date();
  let yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if(dd < 10) dd ="0" + dd;
  if(mm < 10) mm ="0" + mm;

  const todayDate = `${dd}/${mm}/${yyyy}`;

  const title = document.querySelector('#review-title').value.trim();
  const message = document.querySelector('#review-message').value.trim();
  const category = document.querySelector('#review-category').value.trim();
  
  const response = await fetch(`/api/review`, {
    method: 'POST',
    body: JSON.stringify({title, message}),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    console.log(response);
  } else {
    console.log("Failed to post review", response.json());
  }

  // if (title && message) {
  //   return;
  // }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/review/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/review');
    } else {
      alert('Failed to delete review');
    }
  }
};

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.review-list')
  .addEventListener('click', delButtonHandler);



