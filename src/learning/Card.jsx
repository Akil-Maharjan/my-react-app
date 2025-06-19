

function Card({ image, title, work, description }) {
  return (
    <div className='inline-block align-middle'>
      <div className="flex flex-col  items-center w-80 bg-amber-600 justify-evenly m-3 rounded-3xl p-6">
        <img src={image} alt={title} className="rounded-full w-32 h-32 object-cover" />
        <div className="card-content text-center mt-4">
          <h2 className="card-title text-xl font-bold">{title}</h2>
          <p className="card-work text-amber-900 font-semibold">{work}</p>
          <div className="card-description-container mt-10">
            <p className="card-description text-amber-100">{description}</p>
          </div>
          <div className="card-button mt-5">
            <button className="cursor-pointer mt-3 px-4 py-2 bg-amber-800 text-white rounded-full hover:bg-amber-900 transition">Hire me</button>
          </div>
          <div className="links flex justify-between gap-4 mt-10">
            <a href="javascript:void(0)" className="link text-blue-700 hover:underline">LinkedIn</a>
            <a href="javascript:void(0)" className="link text-blue-400 hover:underline">Twitter</a>
            <a href="javascript:void(0)" className="link text-gray-900 hover:underline">GitHub</a>
          </div>
        </div>
      </div>
     </div> 
  );
}

export default Card;