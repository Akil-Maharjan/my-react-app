import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

function Asynchronous() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  useEffect(() => {
  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products',
        {
          params:{
            limit: 10,
            skip : skip
          }
        }
      );
      setData(response.data); // Update state with fetched data
    } catch (err) {
      console.log(err);
    }
  }
    getData();
  }, [skip]);

  const products = useMemo(() => {
    if (!data || !data.products) return [];

    return data.products.map(product => (
      <Card key={product.id} className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {product.title}
          </Typography>
          <Typography color="blue-gray">{product.description}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button size="sm" color="blue" className="flex items-center gap-2">
            See more
          </Button>
        </CardFooter>
      </Card>
    ));
  }, [data]);

  const handleNextPage = () => {
    if (data && page < Math.ceil(data.total / limit)) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  return <div>
    <div className="flex flex-wrap justify-center gap-4">
      {products}
    </div>
    <div className="flex justify-center mt-4">
      <Button
        onClick={handlePrevPage}
        disabled={page === 1}
        size="sm"
        className="mr-2"
      >
        Previous
      </Button>
      <Typography variant="small" color="blue-gray" className="mx-2 self-center">
        Page {page}
      </Typography>
      <Button
        onClick={handleNextPage}
        disabled={data && page >= Math.ceil(data.total / limit)}
        size="sm"
      >
        Next
      </Button>
    </div>
  </div>;
}

export default Asynchronous;