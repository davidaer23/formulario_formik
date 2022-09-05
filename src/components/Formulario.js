import React from 'react'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirm_pass: ''
}

const onSubmit = (values, {resetForm}) => {
    
    const newUser = 
    {
        username: values.username,
        email: values.email,
        password: values.password
    }

    axios
    .post('http://localhost:3001/users', newUser)
    .then(response => alert(`Username: ${response.data.username} Email: ${response.data.email} registrado existosamente`))

    resetForm({values: ''})

}

const validationSchema = Yup.object({
    username: Yup.string().matches(/^\w*$/,'Without space or special characters').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirm_pass: Yup.string().oneOf([Yup.ref('password'), null], "Password are not the same").required('Required')
})


function Formulario() {
    
  return (
    <Formik
        initialValues = {initialValues}
        onSubmit = {onSubmit}
        validationSchema = {validationSchema}
    >
        <Form>
            <h2>Register New Account</h2>
            <label htmlFor="username">Username</label>
            <Field type='text' id='username' name='username'/>
            <ErrorMessage name='username' render = { msj => < div className='error' > { msj } </ div > } />

            <label htmlFor="email">Email</label>
            <Field type='email' id='email' name='email'/>
            <ErrorMessage name='email' render = { msj => < div className='error' > { msj } </ div > }/>

            <label htmlFor="password">Password</label>
            <Field type='text' id='password' name='password'/>
            <ErrorMessage name='password' render = { msj => < div className='error' > { msj } </ div > } />

            <label htmlFor="confirm_pass">Confirm Password</label>
            <Field type='text' id='confirm_pass' name='confirm_pass'/>
            <ErrorMessage name='confirm_pass' render = { msj => < div className='error' > { msj } </ div > } />
            
            <button type='submit'>Submit</button>

        </Form>
    </Formik>
  )
}

export default Formulario