import React from 'react';

const Footer = () => {
  return (
    <div className="relative bg-black text-white px-4 md:px-18 flex flex-col items-center">
      {/* Overlapping Newsletter Section */}
      <div className="relative w-full max-w-5xl -mb-26 z-10">
        <div className="bg-orange-500 mt-28 rounded-2xl p-6 sm:p-8 text-center text-white shadow-lg relative -translate-y-16">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <img
              src="/images/stockfooterimg.png"
              alt="stock image"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-56 md:h-52 mx-auto md:ml-14"
            />
            <div className="flex-grow w-full md:px-52 text-left px-2">
              <h2 className="text-xl sm:text-2xl font-bold text-center md:text-left">Subscribe to our newsletter</h2>
              <p className="mt-2 text-sm text-center md:text-left">
                Get 20% off on your first order just by subscribing to our newsletter.
              </p>
              <div className="flex flex-col sm:flex-row mt-4 rounded-full gap-2 sm:gap-4 sm:items-center">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 rounded-lg text-dark focus:outline-none flex-1"
                />
                <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
                  Subscribe
                </button>
              </div>
              <p className="mt-2 text-xs opacity-75 text-center md:text-left">
                You will be able to unsubscribe at any time. <br />
                Read our privacy policy here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="w-full bg-white/5 backdrop-blur-lg pt-24 pb-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-white">
          {/* Logo and Description */}
          <div className="col-span-1 text-center md:text-left">
            <h3 className="text-2xl font-bold">MarketMindset</h3>
            <p className="mt-2 text-sm text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-3">
              <i className="fab fa-facebook text-white"></i>
              <i className="fab fa-twitter text-white"></i>
              <i className="fab fa-instagram text-white"></i>
              <i className="fab fa-linkedin text-white"></i>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>About Us</li>
              <li>Services</li>
              <li>Community</li>
              <li>Testimonial</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Support</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Help Center</li>
              <li>Tweet @ Us</li>
              <li>Webinars</li>
              <li>Feedback</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>Courses</li>
              <li>Become Teacher</li>
              <li>Service</li>
              <li>All in One</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact Us</h4>
            <p className="text-sm text-gray-400">📞 (+91) 98765 4321 54</p>
            <p className="text-sm text-gray-400">✉️ support@gmail.com</p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 text-center text-xs text-gray-500">
          <p className='text-xl'>© Copyright by <span className=' text-amber-900'>CodePillars</span>. All rights reserved.</p>
          {/* <div className="flex flex-wrap justify-center space-x-4 mt-2">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Use</a>
            <a href="#legal">Legal</a>
            <a href="#sitemap">Site Map</a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
