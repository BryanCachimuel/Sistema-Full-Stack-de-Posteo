import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import axios from 'axios';


function CrearPost() {

   let navigate = useNavigate()

    const initialValuesPost = {
        title : "",
        postText : "",
        username : "",
    }

    const validationSchemaPost = Yup.object().shape({
        title : Yup.string().required("Escriba un título"),
        postText : Yup.string().required("Escriba una descripción"),
        username : Yup.string().min(3).max(15).required("Escriba Nombre de Usuario")
    })

    const onSubmitPost = (data) => {
        axios.post("http://localhost:4000/post", data).then((response) => {
            navigate("/")
          });
    }

    

  return (
    <div className="createPostPage">
      <Formik initialValues={initialValuesPost} onSubmit={onSubmitPost} validationSchema={validationSchemaPost}>
          <Form className="formContainer">
              <label>Título: </label>
              <Field 
                autocomplete="off"
                id="inputCreatePost" 
                name="title" 
                placeholder="Título del Post"
              />
              <ErrorMessage name="title" component="span" />

              <label>Post: </label>
              <Field 
                autocomplete="off"
                id="inputCreatePost" 
                name="postText" 
                placeholder="Post"
              />
              <ErrorMessage name="postText" component="span" />

              <label>Nombre del Usuario: </label>
              <Field 
                autocomplete="off"
                id="inputCreatePost" 
                name="username" 
                placeholder="Nombre de usuario"
              />
              <ErrorMessage name="username" component="span" />
          
              <button type='submit'>Crear Post</button>

          </Form>
      </Formik>
    </div>
  )
}

export default CrearPost
