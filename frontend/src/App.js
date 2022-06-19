import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CrearPost from "./pages/CrearPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";


/* el sessionsStorage hace que las rutas se oculten cuando el usuario esta logeado */

function App() {

  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios.get("http://localhost:4000/auth/auth", {
      headers:{
        accessToken: localStorage.getItem('accessToken'),
      },
    }).then((response) => {
      if(response.data.error){
        setAuthState({...authState, status:false});
      }else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    });
  })


  // función para salir y eliminar el token generado
  const salir = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username:"",id:0, status:false});
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
          <div className="navbar">
           
            {!authState.status ? (
              <>
                <Link to="/login">Iniciar Sessión</Link>
                <Link to="/registro">Registro</Link>
              </>
            ) :(
              <>
                <Link to="/">Home</Link>
                <Link to="/crearpost">Crear Posts</Link>
              </>
            )}

           <div className="loggedInContainer">
              <h2>{authState.username}</h2>
              {authState.status && <button onClick={salir}> Salir</button>}
           </div>  

          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/crearpost" element={<CrearPost />} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registration/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
