import { Textarea } from '@material-tailwind/react'
import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useNavigate } from 'react-router';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  image: Yup.string().url('Invalid URL').required('Image URL is required'),
  detail: Yup.string().required('Details are required'),
  author: Yup.string().required('Author is required'),
});

function ArticleForm() {
    const nav = useNavigate();
  return (
    <div>
        <Formik initialValues={{
            title: '',
            image: '',
            detail: '',
            author: ''
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
             try {
                    // 3. This is a mock API call. Replace with your actual API endpoint.
                    const response = await fetch('https://687a1c1dabb83744b7eb7867.mockapi.io/articles', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(values),
                    });

                    if (!response.ok) {
                        throw new Error('Server responded with an error!');
                    }

                    await response.json();
                    alert('Article submitted successfully!');
                    nav('/articles'); // 4. Navigate to the articles list page on success
                } catch (error) {
                    console.error('Error submitting article:', error);
                    alert('Failed to submit article. Please try again.');
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, errors, touched }) => (
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
                    <button type='submit' disabled={isSubmitting} className='bg-blue-500 text-white rounded-md px-4 py-2 disabled:bg-blue-300'>
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            )}
        </Formik>
         
    </div>
  )
}

export default ArticleForm