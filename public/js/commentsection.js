const newFormHandler = async (event) => {
    event.preventDefault();
    // console.log("hi")
    const comment = document.querySelector('#comments').value.trim();
    const blogId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // console.log("***", blogId)
    if (comment) {
        // console.log("herer", comment)
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify(
          { 
            blog_id: blogId,
            comments: comment, 
          }
         
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });

  
      if (response.ok) {
        
        document.location.reload();
      } else {
        alert('Failed to add a comment');
      }
    }
  };

document
    .querySelector('#comment-section')
    .addEventListener('submit', newFormHandler);