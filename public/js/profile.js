const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#review-title').value.trim();
  const message = document.querySelector('#review-message').value.trim();
  const category = document.querySelector('#review-category').value.trim();
  

  if (title && message && category) {
    const response = await fetch(`/api/review`, {
      method: 'POST',
      body: JSON.stringify({ title, message, category }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/review');
    } else {
      alert('Failed to create review');
    }
  }
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
