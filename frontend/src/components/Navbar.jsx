// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Smart Learn", path: "/services" },
  { name: "Strategies", path: "/strategies" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
  { name: "Indicators", path: "/freeindicators" },
];
  return (
 <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 
                   w-[90%]  py-1
                   bg-white/5 backdrop-blur-md 
                   border border-white/10 
                   rounded-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">M</span>
            </div>
            MarketMindset
          </div>

          {/* Desktop Nav */}
         <nav className="hidden md:flex space-x-8 text-white text-sm">
  {navItems.map((item, idx) => (
    <a
      key={idx}
      href={item.path}
      className="hover:text-orange-500 transition-colors"
    >
      {item.name}
    </a>
  ))}
</nav>
          {/* Sign Up Button */}
          <div className="hidden md:block">
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
  <div className="md:hidden px-6 pb-4 space-y-3">
    {navItems.map((item, idx) => (
      <a
        key={idx}
        href={item.path}
        className="block text-white text-sm hover:text-orange-500 transition-colors"
      >
        {item.name}
      </a>
    ))}
    <button className="w-full mt-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
      Sign up
    </button>
  </div>
      )}
    </header>
  );
};

export default Navbar;
