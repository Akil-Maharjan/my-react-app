import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGetArticlesQuery, useGetArticleByIdQuery } from './articlesApi';
import {
  Card,
  CardBody,
  CardFooter,
  IconButton,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useRemoveArticleMutation } from './articlesApi';
import toast from 'react-hot-toast';

function Article() {
  const [removeArticle, { isLoading: isDeleting }] = useRemoveArticleMutation();
  const [deletingId, setDeletingId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Helper function to truncate text to a specific word count
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setDeletingId(articleId);
      try {
        await removeArticle(articleId).unwrap();
        toast.success('Article deleted successfully!');
        if (id) {
          navigate('/articles');
        }
      } catch (err) {
        toast.error('Failed to delete the article.');
        console.error('Failed to delete article:', err);
      } finally {
        setDeletingId(null);
      }
    }
  };
  
  // Or if you want to implement inline editing:
 



  // Fetch a single article if an ID is present in the URL
  const {
    data: article,
    error: articleError,
    isLoading: isArticleLoading
  } = useGetArticleByIdQuery(id, {
    skip: !id, // Skip this query if there's no ID
  });

  // Fetch all articles if no ID is present in the URL
  const {
    data: articles,
    error: articlesError,
    isLoading: areArticlesLoading
  } = useGetArticlesQuery(undefined, {
     // Skip this query if there is an ID
  });

  if (isArticleLoading || areArticlesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (articleError || articlesError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Typography color="red" variant="h4">
          Error loading content. Please try again later.
        </Typography>
      </div>
    );
  }

  // Render a single article
  if (id) {
    if (!article) {
      return (
        <div className="text-center mt-10">
          <Typography variant="h4" color="blue-gray">Article not found.</Typography>
        </div>
      );
    }
    return (
      <div className="container mx-auto  p-4 md:p-8">
        <Card className="mt-6 shadow-lg">
          <CardBody>
            <Typography variant="h2" color="blue-gray" className="mb-4 font-bold">
              {article.title}
            </Typography>
           
            <img src={article.image} alt={article.title} className="mt-4 w-full h-64 object-cover rounded-lg" />
             <Typography color="gray" className="font-normal leading-relaxed text-lg">
              {article.detail}
            </Typography>
            <Typography className="mt-4 text-gray-500">{article.author}</Typography>
          </CardBody>
          <CardFooter className="pt-2 flex justify-between items-center">
            <Link to="/articles">
              <Button color="blue" variant="text" className='cursor-pointer'>
                &larr; Back to Articles
              </Button>
            </Link>
            <IconButton color="red" variant="text" onClick={() => handleDelete(article.id)} disabled={isDeleting && deletingId === article.id}>
              {isDeleting && deletingId === article.id ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.036.954-2.036 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              )}
            </IconButton>
            <Button color="blue" variant="filled" onClick={() => navigate(`/articles-form/${article.id}`)}>
              Edit 
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render a list of articles
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center mt-10">
        <Typography variant="h4" color="blue-gray">No articles found.</Typography>
      </div>
    );
  }
  


  return (
   
    <div className="container  mx-auto p-4 md:p-8">
      <Typography variant="h2" color="blue-gray" className="text-center mb-12 font-bold">
        Latest Articles
      </Typography>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {articles.map((item) => (
          <Link to={`/articles/${item.id}`} key={item.id}>
            <Card className="mt-6 w-full flex flex-col shadow-lg lg:h-[450px] md:h-[350px] sm:h-[250px] hover:shadow-2xl transition-shadow duration-300">
              <CardBody className="flex-grow p-6">
              <Typography variant="h5" color="blue-gray" className="mb-2 font-semibold">
                {item.title}
              </Typography>
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-lg mb-4" />
              <Typography className="text-gray-600">
                {truncateText(item.detail, 20)}
              </Typography>
              <Typography className="text-gray-500 mt-2">
                Auhtor: &nbsp; {item.author}
              </Typography>
            </CardBody>
           
          </Card>
          </Link>
        ))}
        
      </div>
      <div className="mt-8 text-center">
        <Link to="/articles-form">
          <Button color="blue" variant="filled">
            Add New Article
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Article;