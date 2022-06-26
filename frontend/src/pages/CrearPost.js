import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import "../css/App.css";


function CrearPost() {

   let navigate = useNavigate()

    const initialValuesPost = {
        title : "",
        postText : "",
    }

    const validationSchemaPost = Yup.object().shape({
        title : Yup.string().required("Escriba un título"),
        postText : Yup.string().required("Escriba una descripción"),
    })

    const onSubmitPost = (data) => {
        axios.post("http://localhost:4000/post", data, { headers: {accessToken: localStorage.getItem('accessToken')},
         })
         .then((response) => {
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
          
              <button type='submit'>Crear Post</button>

          </Form>
      </Formik>
    </div>
  )
}

export default CrearPost
