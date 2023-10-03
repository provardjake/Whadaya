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

document.querySelector('.new-review-form').addEventListener('submit', newForm);





