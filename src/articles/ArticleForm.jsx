import { Textarea } from '@material-tailwind/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAddArticleMutation, useUpdateArticleMutation, useGetArticleByIdQuery } from './articlesApi'


const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  detail: Yup.string().required('Details are required'),
  author: Yup.string().required('Author is required'),
})

function ArticleForm() {
  const nav = useNavigate()
  const [addArticle, { isLoading }] = useAddArticleMutation()
  const [updateArticle, { isLoading: isUpdating }] = useUpdateArticleMutation()
  const { id } = useParams()
  
  // Fetch single article if in edit mode
  const { data: updatingArticle, isLoading: isArticleLoading } = useGetArticleByIdQuery(id, {
    skip: !id // Skip if no ID (create mode)
  })

  const initialValues = {
    title: updatingArticle?.title || '',
    image: updatingArticle?.image || '',
    detail: updatingArticle?.detail || '',
    author: updatingArticle?.author || ''
  }

  const handleSubmit = async (values) => {
    try {
      if (id) {
        // Update existing article
        await updateArticle({ id, ...values }).unwrap()
        toast.success('Article updated successfully!')
      } else {
        // Create new article
        await addArticle(values).unwrap()
        toast.success('Article submitted successfully!')
      }
      nav('/articles')
    } catch (error) {
      console.error('Error submitting article:', error)
      toast.error(`Failed to ${id ? 'update' : 'submit'} article. Please try again.`)
    }
  }

  if (isArticleLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // Important for edit mode
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit} className='max-w-md mx-auto mt-10 pb-10'>
            <div className='mb-4'>
              <label htmlFor='title' className='block text-gray-700'>Title</label>
              <Field
                id='title'
                name='title'
                type='text'
                className={`mt-1 block w-full border rounded-md p-2 ${errors.title && touched.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className='mb-4'>
              <label htmlFor='image' className='block text-gray-700'>Image URL</label>
              <Field
                id='image'
                name='image'
                type='text'
                className={`mt-1 block w-full border rounded-md p-2 ${errors.image && touched.image ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className='mb-4'>
              <label htmlFor='detail' className='block text-gray-700'>Details</label>
              <Textarea
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.detail}
                id='detail'
                name='detail'
                error={touched.detail && !!errors.detail}
                className='mt-1 block w-full border-gray-300 rounded-md p-2'
              />
              <ErrorMessage name="detail" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className='mb-4'>
              <label htmlFor='author' className='block text-gray-700'>Author</label>
              <Field
                id='author'
                name='author'
                type='text'
                className={`mt-1 block w-full border rounded-md p-2 ${errors.author && touched.author ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="author" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <button 
              type='submit' 
              disabled={isLoading || isUpdating} 
              className='bg-blue-500 cursor-pointer text-white rounded-md px-4 py-2 disabled:bg-blue-300'
            >
              {isLoading || isUpdating 
                ? (id ? 'Updating...' : 'Submitting...') 
                : (id ? 'Update Article' : 'Submit Article')}
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default ArticleForm