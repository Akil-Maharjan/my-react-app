import { faker } from '@faker-js/faker'
import { Button } from '@material-tailwind/react'
import axios from 'axios'
import {  useState } from 'react'
import toast from 'react-hot-toast'


function Hooks() {
  const [todos, setTodos] = useState([])
  
  const [isCreating, setIsCreating] = useState(false)
  const [isFetching, setIsFetching] = useState(false)

  const postData = async () => {
    setIsCreating(true)
    try {
      await axios.post('https://6870d98d7ca4d06b34b8529e.mockapi.io/todos', {
        title: faker.food.dish(),
        detail: faker.food.description(),
      })
      toast.success('Todo created successfully!')
    } catch (err) {
      console.log(err)
    } finally {
      setIsCreating(false)
    }
  }

  const getData = async () => {
    setIsFetching(true)
    try {
      const response = await axios.get('https://6870d98d7ca4d06b34b8529e.mockapi.io/todos')
      setTodos(response.data)
      toast.success('Todo fetched successfully!')
    } catch (err) {
      console.log(err)
    } finally {
      setIsFetching(false)
    }
  }


  return (
    <div>
      <Button loading={isCreating} onClick={postData}>Create Todo</Button>
      <Button loading={isFetching} onClick={getData}>Fetch Todos</Button>
      <div className='flex flex-col gap-2'>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Hooks