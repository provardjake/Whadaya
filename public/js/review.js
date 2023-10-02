const newForm = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#review-title').value.trim();
  const message = document.querySelector('#review-message').value.trim();
  const category_id = document.querySelector('#review-category').value.trim();
  


  if (title && message) {
  const response = await fetch(`/api/review`, {
    method: 'POST',
    body: JSON.stringify({title, message, category_id}),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  if (response.ok) {
    console.log(response);
    {
    
      window.location = '/';
      alert('Review posted!');
  }
  } else {
    console.log("Failed to post review", response.json());
  }}
};


const delButton = async (event) => {
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

document.querySelector('.new-review-form').addEventListener('submit', newForm);

document.querySelector('.review-list').addEventListener('click', delButton);



