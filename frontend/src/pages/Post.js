import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "../css/App.css";


function Post() {
  let { id } = useParams();

  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  let navigate = useNavigate();

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


  //  consumiendo endpoint de eliminación de posts
  const eliminarPosts = (id) => {
    axios.delete(`http://localhost:4000/post/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken")},
    }).then(() => {
      navigate("/")
    });
  };


  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">
            {postObject.username} 
            {authState.username === postObject.username && ( 
              <button className="eliminarpost" onClick={() => {eliminarPosts(postObject.id)}}>Eliminar</button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Escriba su comentario..."
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
                <br></br>
                <label className="usuario">Nombre de Usuario: {comment.username}</label>
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
