import React from 'react'
import ReactDOM from 'react-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './AuthForm.css'
import { Route, Redirect } from 'react-router'

const AuthForm = props => (
  <div className='wrapper fadeInDown'>
    <div id='formContent'>
      <Formik
        initialValues={{ email: '', password: '', logged: false }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required('Champs Requis'),
          password: Yup.string()
            .required('Mot de passe ?')
            .min(8, 'Votre mot de passe doit contenir au moins 8 caractères')
        })}
        onSubmit={(values, { setSubmitting }) =>
          setTimeout(() => {
            props.changeLogged()
            values.logged = true
            setSubmitting(false)
          }, 400)}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            islogged,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props

          return (
            <form onSubmit={handleSubmit}>
              <div class='fadeIn first'>
                <img
                  src='img/CoffeeCommandLogo.png'
                  id='icon'
                  alt='User Icon'
                />
                <h1> Authentification</h1>
                {errors.email &&
                  touched.email &&
                  <div className='input-feedback'>{errors.email}</div>}
                {errors.password &&
                  touched.password &&
                  <div className='input-feedback'>{errors.password}</div>}
              </div>
              <input
                id='email'
                placeholder='monadresse@canal-plus.com'
                type='text'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <input
                id='password'
                placeholder='password'
                type='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                type='submit'
                disabled={isSubmitting}
                value='Se Connecter'
              />
            </form>
          )
        }}
      </Formik>
    </div>
  </div>
)

export default AuthForm
