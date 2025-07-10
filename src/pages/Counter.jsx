import { Button, Typography } from '@material-tailwind/react';
import { useRef, useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  
  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const decreaseCount = () => {
    setCount((prevCount) => (prevCount <= 0 ? 0 : prevCount - 1));
  };
  const reset = () => {
    setCount(0);
  };
    useEffect(() => {
    prevCountRef.current = count;
  }, [count]);
  
  return (
    <div className="bg-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-6 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-4 font-semibold">
          Counter
        </Typography>
        <Typography variant="h1" color="blue-gray" className="my-6 text-6xl font-mono">
          {count}
        </Typography>
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button color="red" onClick={decreaseCount} size="lg" ripple={true}>-</Button>
          <Button color="green" onClick={increaseCount} size="lg" ripple={true}>+</Button>
        </div>
        <Button onClick={reset} color="gray" variant="outlined" className="w-full" ripple={true}>
          Reset
        </Button>
      </div>
       <div style={{ marginTop: '20px' }}>
        
        <p>Previous Count: {prevCountRef.current}</p>
      </div>
    </div>
  )
}

export default Counter