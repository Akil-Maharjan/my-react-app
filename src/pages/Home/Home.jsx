 // Correct import for v6
import BlogList from "./BlogList"

function Home() {
  return (
      <>
       <div className='home flex flex-col text-center font-bold text-3xl gap-4 mt-5'>
        
        <h1>MY BLOG</h1>
        <p>Welcome to my blog!</p>
        </div>
       <BlogList />
    </>
  )
}

export default Home

