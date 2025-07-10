import { Button } from '@material-tailwind/react';
import React, { useRef } from 'react'

function UseRef() {
    const m = useRef(90);
    const handleUpdate = ()=>{
        m.current += 1;
        console.log(m.current)
    }
    // Remove direct DOM manipulation; use React event handler instead
    const handleDecrease = () => {
        m.current -= 1;
        console.log(m.current);
    };
  return (
    <>
    <h1>{m.current}</h1>
    <Button onClick={handleUpdate}>Update</Button>
    <a
      className='btn btn-danger cursor-pointer border-2 p-3 rounded-3xl'
      onClick={handleDecrease}
    >
      Decrease
    </a>
    </>
  )
}

export default UseRef