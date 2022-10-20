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

  const updateButtonHandler = async (event) => {
    event.preventDefault();
  // console.log("upate###")
    const id = event.target.getAttribute('data-id');
    const bTitle = document.querySelector(`#update-blog-title${id}`).value.trim();
    const bdescription = document.querySelector(`#update-blog-desc${id}`).value.trim();
   
      const response = await fetch(`/api/blog/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(
          {
            title: bTitle, description: bdescription
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
  
      if (response.ok) {
        document.location.reload('/account');
      } else {
        alert('Failed to update blog');
      }
    
  };
  
  document
    .querySelector('.new-blog-form')
    .addEventListener('submit', newFormHandler);
  

  const deleteBTN = document.querySelectorAll('.delete-btn')
    for (let i = 0; i < deleteBTN.length; i++) {
      deleteBTN[i].addEventListener('click', delButtonHandler);
    }


  const updatebtn = document.querySelectorAll('#update-btn')
  for (let i = 0; i < updatebtn.length; i++) {
    updatebtn[i].addEventListener('click', updateButtonHandler);
  }
  