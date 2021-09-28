import React, { useState } from "react";
import "./PostDetail.css";

export default function PostDetail({ posts }) {
  const [clicked, setClicked] = useState(false);
  const [comments, setComments] = useState([]);

  const fetchComments = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then((response) => response.json())
      .then(setComments)
      .catch((error) => {
        console.log(error);
      });
  };

  //Create list of all posts
  const postsList = posts.map((post, index) => (
    <div key={index}>
      <h2>{post.title}</h2>
      <p
        // onClick, set the postId equal to the specific post's id
        onClick={() => {
          //When clicked is true, comments will display
          setClicked(true);
          if (post.id > 0) {
            // On click, fetch the comments with the postId
            fetchComments(post.id);
          }
        }}
      >
        {post.body}
      </p>
    </div>
  ));

  //Go through the comments and list them
  const postComments = (
    <div>
      {comments.map((comment, index) => (
        <p key={index}>{`Comment ${index + 1}: ${comment.body}`}</p>
      ))}
      {/* Button to clear comments from screen (not necessary) */}
      <button onClick={() => setClicked(false)}>Clear Comments</button>
    </div>
  );

  return (
    <div className="container">
      <div className="posts">{postsList}</div>
      <div className="comments">
        {/* If clicked, render comments for the specific post */}
        <h2>
          {clicked
            ? "Comments for selected post"
            : "Click the body of a post to see post's comments"
          }
        </h2>
        {clicked && postComments}
      </div>
    </div>
  );
}
