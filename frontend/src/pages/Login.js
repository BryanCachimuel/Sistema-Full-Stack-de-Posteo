import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext)

  let navigate = useNavigate();

  const login = () => {
      const data = { username: username, password: password }
      axios.post("http://localhost:4000/auth/login", data).then((response) =>{
        if(response.data.error) {
          alert(response.data.error);
        }else{
          localStorage.setItem("accessToken", response.data.token);
          setAuthState({
            username: response.data.username, 
            id: response.data.id, 
            status:true
          });
          navigate("/");
        }
      })
  };

  return (
    <div className="loginContainer">
      <label>Nombre de Usuario: </label>  
      <input
        type="text"
        placeholder="Nombre de Usuario"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Contraseña: </label>
      <input
        type="password"
        placeholder="Contraseña"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Iniciar Sessión</button>
    </div>
  );
}

export default Login;
