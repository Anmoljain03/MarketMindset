import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from 'react-icons/fa';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-white p-10">Loading blog...</p>;

  return (
    <div className="bg-black text-white px-6 py-32 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="md:col-span-2">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-xl mb-8 shadow-md"
          />
          <h3 className='hover:text-orange-300 mb-3'><a href="/blogs">-Back</a></h3>
          <div className="mb-4 text-sm text-orange-500 flex flex-wrap items-center gap-2">
           
            <span>{blog.date}</span>
            <span>•</span>
            <span className="text-white">by {blog.author}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <p className="text-gray-300 text-lg mb-6 leading-relaxed">
            {blog.description}
          </p>

          <span className="bg-orange-600 inline-block px-4 py-1 rounded-full text-sm text-black font-semibold mb-8">
            {blog.category}
          </span>

         <div className="prose text-white">
  {blog?.content?.split('\n').map((para, i) => (
    <p key={i}>{para}</p>
  ))}
</div>


          {/* Share Section */}
          <div className="border-t border-gray-700 pt-6 mt-10">
            <h3 className="text-xl font-semibold mb-2">Share this blog:</h3>
            <div className="flex gap-4 mt-3">
              {blog.shareLinks?.facebook && (
                <a
                  href={blog.shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
                >
                  <FaFacebookF />
                </a>
              )}
              {blog.shareLinks?.twitter && (
                <a
                  href={blog.shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 p-3 rounded-full hover:bg-sky-600 transition"
                >
                  <FaTwitter />
                </a>
              )}
              {blog.shareLinks?.linkedin && (
                <a
                  href={blog.shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-800 p-3 rounded-full hover:bg-blue-900 transition"
                >
                  <FaLinkedinIn />
                </a>
              )}
              {blog.shareLinks?.whatsapp && (
                <a
                  href={blog.shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 p-3 rounded-full hover:bg-green-700 transition"
                >
                  <FaWhatsapp />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="bg-[#111] p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
            Author
          </h2>
          <p className="text-gray-300 mb-6">{blog.author}</p>

          {blog.shortLinks?.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">
                Related Links
              </h3>
              <ul className="list-disc list-inside text-blue-400 space-y-2 mb-6">
                {blog.shortLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline break-words"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
