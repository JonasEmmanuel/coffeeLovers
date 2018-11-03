import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

const AddCoffeeForm = x => (
  <div className='wrapper fadeInDown'>
    <div id='formContent'>
      <Formik
        initialValues={{ categorie: '', name: '', prix: 0.0 }}
        validationSchema={Yup.object().shape({
          categorie: Yup.string().required('Saisissez la catégorie du Café'),
          name: Yup.string().required('Saissisez le nom du Café'),
          prix: Yup.number().required('Prix requis')
        })}
      >

        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props

          var addMyCoffee = () => {
            x.AddCoffee(values)
          }

          return (
            <form>
              <div class='fadeIn first'>
                <img
                  src='img/CoffeeCommandLogo.png'
                  id='icon'
                  alt='User Icon'
                />
                <h1> Coffee Form</h1>
                {errors.categorie &&
                  touched.categorie &&
                  <div className='input-feedback'>{errors.categorie}</div>}
                {errors.name &&
                  touched.name &&
                  <div className='input-feedback'>{errors.name}</div>}
              </div>
              <input
                id='categorie'
                placeholder='Categorie'
                type='text'
                value={values.categorie}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.categorie && touched.categorie
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <input
                id='name'
                placeholder='Name'
                type='text'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.categorie && touched.categorie
                    ? 'text-input error'
                    : 'text-input'
                }
              />

              <input
                id='prix'
                placeholder='0.34'
                type='text'
                value={values.prix}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.prix && touched.prix
                    ? 'text-input error'
                    : 'text-input'
                }
              />
              <input
                type='button'
                onClick={addMyCoffee}
                disabled={isSubmitting}
                value='Ajouter a la liste'
              />
            </form>
          )
        }}
      </Formik>
    </div>
  </div>
)

export default AddCoffeeForm
