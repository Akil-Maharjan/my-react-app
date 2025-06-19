
import { blogs, posts, tags } from '../../data'; // Ensure posts and tags are exported from your data file

function BlogList() {
  return (
    // Overall container for the page content, similar to w3-content
    <div className="max-w-screen-xl mx-auto p-4 md:p-6">
      {/* Main row for content and sidebar */}
      <div className="flex flex-col lg:flex-row lg:gap-x-8 gap-y-10">
        
        {/* Left Column: Blog Entries */}
        <div className="lg:w-2/3 w-full">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden mb-10" // Card styling
            >
              <img 
                className="w-full h-auto max-h-[500px] object-cover" // Image styling
                src={blog.image} 
                alt={blog.title || 'Blog post image'} 
              />
              <div className="p-5 md:p-6"> {/* Content padding */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                <h5 className="text-sm text-gray-500 mb-4">
                  {blog.titleDescription || `A great post about ${blog.title}`},&nbsp;
                  {/* Assuming blog.date exists, otherwise provide a fallback */}
                  <span className="opacity-75">{blog.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </h5>
                <p className="text-gray-700 mb-6 leading-relaxed">{blog.desc}</p>
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <button  className="px-5 py-2.5 border cursor-pointer border-gray-400 bg-white text-black font-semibold hover:bg-gray-100 transition-colors duration-200 rounded-sm text-sm tracking-wider">
                    READ MORE »
                  </button>
                  <p className="text-gray-800 font-semibold cursor-pointer ">
                    Comments&nbsp;
                    {/* Assuming blog.commentsCount is a number, or blog.comments is like "0 Comments" */}
                    <span className="bg-black text-white px-2.5 py-1 text-xs rounded-sm">
                      {blog.commentsCount !== undefined ? blog.commentsCount : (String(blog.comments || '0').match(/\d+/) || ['0'])[0]}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:w-1/3 w-full">
          {/* About Me Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
            {/* Use a relevant image for the "My Name" card, e.g., an avatar */}
            <img 
              className="w-full h-auto object-cover"
              src={posts[0]?.image || "/images/avatar_profile.jpg"} // Example: Use first popular post image or a dedicated avatar
              alt="My Name" 
            />
            <div className="p-5 bg-white">
              <h4 className="text-xl font-bold text-gray-900">My Name</h4>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Just me, myself and I, exploring the universe of uknownment. I have a heart of love and a interest of lorem ipsum and mauris neque quam blog. I want to share my world with you.
              </p>
            </div>
          </div>

          {/* Popular Posts Card */}
          <div className="bg-white shadow-lg rounded-lg mb-8">
            <div className="p-4 bg-gray-100 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Popular Posts</h4>
            </div>
            <ul className="divide-y divide-gray-200">
              {posts.slice(0, 4).map((post) => ( // Displaying top 4 popular posts
                <li key={post.id} className="p-3 hover:bg-gray-50 flex items-center cursor-pointer transition-colors duration-150">
                  <img 
                    src={post.image || '/images/default-thumbnail.jpg'} // Fallback image for posts
                    alt={post.title} 
                    className="w-12 h-12 object-cover mr-4 flex-shrink-0 rounded-sm"
                  />
                  <div>
                    <span className="text-base font-medium text-gray-800 block hover:text-black">{post.title}</span>
                    <span className="text-xs text-gray-500">{post.subtitle || 'An interesting topic'}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags Card */}
          <div className="bg-white shadow-lg rounded-lg">
            <div className="p-4 bg-gray-100 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Tags</h4>
            </div>
            <div className="p-4 bg-white">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span 
                    key={typeof tag === 'string' ? tag : tag.id || index} // Use tag.id if available
                    className={`px-2.5 py-1 text-xs font-medium rounded-sm cursor-pointer transition-colors duration-150
                                ${index === 0 ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} // First tag is styled differently
                  >
                    {typeof tag === 'string' ? tag : tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogList