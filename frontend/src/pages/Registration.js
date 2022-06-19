import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";


function Registration() {
  const initialValuesPost = {
    username: "",
    password: "",
  };

  const validationSchemaPost = Yup.object().shape({
    username: Yup.string().min(3).max(15).required("Escriba Nombre de Usuario"),
    password: Yup.string().min(5).max(30).required("Escriba una contraseña"),
  });

  const onSubmitRegistration = (data) =>{
    axios.post("http://localhost:4000/auth", data).then(() => {
        console.log(data)
    })
  };

  return (    
    <div> 
      <Formik
        initialValues={initialValuesPost}
        onSubmit={onSubmitRegistration}
        validationSchema={validationSchemaPost}
      >
        <Form className="formContainer">
          <h2 className="titulo">Registro de Usuarios</h2>
          <label>Nombre del Usuario: </label>
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="Nombre de usuario"
          />
          <ErrorMessage name="username" component="span" />

          <label>Contraseña: </label>
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Escriba su Contraseña"
          />
          <ErrorMessage name="password" component="span" />

          <button type="submit">Registrar</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
