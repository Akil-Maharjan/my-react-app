import { Button } from '@material-tailwind/react';
import React, { useState } from 'react'

function Toggle() {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => setToggle(!toggle);
  return (
    <>
    {/* {toggle && <Button  color='purple'>Show Button</Button>} */}
    <Button onClick={handleToggle}>HandleToggle</Button>
    <h1>{toggle ? 'True' : 'False'}</h1>
    </>
  )
}

export default Toggle