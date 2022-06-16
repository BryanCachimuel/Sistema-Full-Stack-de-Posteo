import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";


function Post() {
  let { id } = useParams();

  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:4000/post/porId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  });

  useEffect(() => {
    axios.get(`http://localhost:4000/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  });

  const addComment = () => {
    axios
      .post("http://localhost:4000/comments/", {
        commentsBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        },
      }
      )
      .then((response) => {
        if(response.data.error){
          alert(response.data.error)
        }else{
          const commentToAdd = { commentsBody: newComment, username: response.data.username };
          setNewComment([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  // consumiendo endpoint de eliminación de comentario
  const eliminarComentario = (id) => {
    axios.delete(`http://localhost:4000/comments/${id}`,{
      headers:{accessToken:localStorage.getItem('accessToken')},
    }).then(() =>{
      setComments(comments.filter((val) => {
        return val.id !== id;
      }))
    });
  }

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comentario..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Añadir Comentario</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment) => {
            return (
              <div key={comment.id} className="comment">
                {comment.commentsBody}
                <label>Nombre de Usuario: {comment.username}</label>
                {authState.username === comment.username && <button onClick={() => {eliminarComentario(comment.id);}}>Eliminar</button>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
