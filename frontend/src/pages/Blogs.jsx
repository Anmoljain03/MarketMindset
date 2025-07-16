import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categories = ['All', 'Basics', 'Strategies', 'Technical Analysis', 'Market News', 'Crypto'];

const Blogs = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setAllPosts(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const filteredPosts = allPosts.filter((post) => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className='bg-black'>
      <div className="text-white py-32 px-4 md:px-10 lg:px-20">
        <h2 className="text-3xl font-bold text-orange-500 mb-10">Market Insights & Articles</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1 space-y-8">
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500"
            />

            <div>
              <h3 className="text-orange-500 font-semibold mb-2">Categories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    className={`cursor-pointer hover:text-orange-500 ${
                      selectedCategory === cat ? 'text-orange-500 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 border border-neutral-700 rounded-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <p className="text-sm text-orange-500 mb-1">{post.date}</p>
                  <h4 className="font-semibold text-lg mb-2 hover:text-orange-500 cursor-pointer">
                    {post.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{post.description}</p>
                  <Link to={`/blog/${post._id}`}>
                    <button className='mt-4 hover:text-orange-400'>Explore More</button>
                  </Link>
                </div>
              </div>
            ))}

            {currentPosts.length === 0 && (
              <p className="text-gray-400 col-span-full">No articles found.</p>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`px-4 py-2 border rounded ${
                currentPage === i + 1
                  ? 'bg-orange-500 text-black border-orange-500'
                  : 'bg-neutral-800 text-white border-neutral-600 hover:bg-orange-500 hover:text-black'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
