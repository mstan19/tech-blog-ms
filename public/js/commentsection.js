const addComment = async () => {
  
const comments = document.querySelector('#text-comment').value.trim();
const blogId = document.querySelector('.comment-btn')


  if(comments) {
    const response = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify(
      {  
        comments: comments, 
        blog_id: blogId.name,
      }
    ),
    headers: {
      'Content-Type': 'application/json',
    },
  });
// console.log("!!@#!@#blog", blogId.name)
// console.log("comment console", comments)

  if (response.ok) {
    
    document.location.reload()
  } else {
    alert('Failed to add a comment');
  }
}
};


// document
//     .querySelector('#comment-section')
//     .addEventListener('submit', newFormHandler);

