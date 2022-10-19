const newFormHandler = async (event) => {
    event.preventDefault();
  
    const blogTitle = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    
    if (blogTitle && description) {
      const response = await fetch(`/api/blog/`, {
        method: 'POST',
        body: JSON.stringify(
          {
            title: blogTitle, description: description
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (response.ok) {
        document.location.reload('/account');
      } else {
        alert('Failed to create a blog');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/account');
      } else {
        alert('Failed to delete blog');
      }
    }
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  
  // document
  //   .querySelector('.blog-list')
  //   .addEventListener('click', delButtonHandler);
  