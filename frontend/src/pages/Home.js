import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

/* Se usa useNavigate en vez de useHistory */
import { useNavigate } from 'react-router-dom';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);

    let navigate = useNavigate()

    useEffect(() => {
      axios.get("http://localhost:4000/post").then((response) => {
        setListOfPosts(response.data);
      });
    },[]);

    const likePost = (postId) => {
      axios.post("http://localhost:4000/likes", { PostId: postId }, { 
        headers:{
          accessToken: localStorage.getItem("accessToken")
       }}
      ).then((response) =>{
        alert(response.data)
      })
    }

    return (
        <div>
        {listOfPosts.map((list) => {
            return (
            <div  key={list.id} className="post">
                <div className="title"> {list.title} </div>
                <div 
                  className="body"  
                  onClick={() => {navigate(`/post/${list.id}`)
                  }}>{list.postText}
                </div>
                <div className="footer">{list.username} <button onClick={() => {likePost(list.id)}}>Like</button></div>
            </div>
            );
        })}
        </div>
    );
}

export default Home;
