import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetArticlesQuery, useGetArticleByIdQuery } from './articlesApi';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

function Article() {
  const { id } = useParams();

  // Helper function to truncate text to a specific word count
  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

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
          <CardFooter className="pt-2">
            <Link to="/articles">
              <Button color="blue" variant="text">
                &larr; Back to Articles
              </Button>
            </Link>
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
          <Card key={item.id} className="mt-6 w-full flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300">
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
            <CardFooter className="pt-0 p-6">
              <Link to={`/articles/${item.id}`}>
                <Button color="blue" variant="text" className="flex items-center gap-2">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                </Button>
              </Link>
            </CardFooter>
          </Card>
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