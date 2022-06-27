import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CrearPost from "./pages/CrearPost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import Inicio from "./pages/Inicio";
import PaginaNoEncontrada from "./pages/PaginaNoEncontrada";
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
                <Link to="/">Inicio</Link>
                <Link to="/login">Iniciar Sessión</Link>
                <Link to="/registro">Registro</Link> 
              </>
            ) :(
              <>
                <Link to="/">Inicio</Link>
                <Link to="/crearpost">Crear Posts</Link>
              </>
            )}

           <div className="loggedInContainer">
             {!authState.status ? (
              <>
              
              </>
             ) :(
              <>
               <h2>{authState.username}</h2>
               {authState.status && <button onClick={salir}> Salir</button>}
              </>
             )}
           </div>  

          </div>
          <Routes>
            {!authState.status ?(
              <>
                <Route path="/" element={<Inicio/>}/>
                <Route path="/post/:id" element={<Inicio/>} />
                <Route path="/crearpost" element={<Inicio />} />
              </>
            ) :(
              <>
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<Post/>} />
                <Route path="/crearpost" element={<CrearPost />} />
              </>
            )}
            <Route path="/login" element={<Login/>}/>
            <Route path="/registro" element={<Registration/>}/>
            <Route path="*" element={<PaginaNoEncontrada/>}/>
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
