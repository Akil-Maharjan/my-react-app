import { faker } from "@faker-js/faker";
import { Button, Typography } from "@material-tailwind/react";
import {  useState } from "react";






export default function FlexLearning() {


  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setData((prevData) => [...prevData, faker.internet.email()]);
  }
  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle)
  }
const removeEmail = (emailToRemove) => {
  setData((prevData) => prevData.filter((email) => email !== emailToRemove));
}

  return (
    <div className="text-center">

      <Button className="mt-1.5 mr-1.5" onClick={handleClick}>Random Email</Button>
      <Button onClick={handleToggle} color={toggle ? "red" : "green"}>Toggle</Button>
      <Typography  variant="h3">
        <ul>
        {data.map((email, idx) => (
          <div key={idx} className="flex justify-between px-10 py-2">
            <li>{email}</li>
            <Button onClick={() => removeEmail(email)}>Remove</Button>
          </div>
        ))}
      </ul>
      </Typography>

    </div>
  )
}