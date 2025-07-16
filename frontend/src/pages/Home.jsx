import React from 'react'
import {useState} from 'react'
import { FaUsers, FaChartBar, FaBullhorn, FaMicrochip, FaRobot, FaChartLine } from "react-icons/fa";
import { motion , AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Legend } from "recharts";
import { Clock, Wallet, TrendingUp, DollarSign } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ArrowRight } from 'lucide-react'; 




const Home = () => {
  const [hovered, setHovered] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


  const faqs = [
    { question: 'What kind of services do you provide?', answer: "We provide short to long-term investment services as per the client's financial goal requirement." },
    { question: 'How to subscribe for the services?', answer: "You can subscribe through our website by following the simple instructions provided." },
    { question: 'What kind of due diligence is required?', answer: "We ensure all necessary checks and verifications are completed for a secure experience." },
    { question: 'How will I get the service?', answer: "You will receive access details via email after successful subscription." }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

const features = [
  {
    icon: <FaUsers size={26} />,
    title: "Customer Insights",
    description: "Analyze customer interactions across touchpoints with real-time data.",
  },
  {
    icon: <FaChartBar size={26} />,
    title: "Product Metrics",
    description: "Track your product’s performance in real-time.",
  },
  {
    icon: <FaBullhorn size={26} />,
    title: "Campaign Optimization",
    description: "Measure campaign success and refine marketing strategies.",
  },
];

const pieData = [
  { name: "Rent", value: 900, color: "#f97316" },
  { name: "Shopping", value: 650, color: "#10b981" },
  { name: "Utilities", value: 220, color: "#3b82f6" },
];

  const services = [
    {
      title: 'Professional IT Services',
      description: 'Get access to top-tier IT staffing, consulting, and tailored tech solutions to accelerate your digital transformation journey.',
      icon: Clock,
    },
    {
      title: 'Strategic Trading Solutions',
      description: 'Leverage expert-developed trading strategies to enhance market performance, manage risk, and grow your investments.',
      icon: Wallet,
    },
    {
      title: 'Technical Indicators Suite',
      description: 'Use powerful market indicators and analytics tools to make smarter, data-driven trading decisions with confidence.',
      icon: TrendingUp,
    },
    {
      title: ' E-Learning & Courses',
      description: 'Explore our library of PDFs, tutorials, and certified online courses—built to help you master trading and investing at every level.',
      icon: DollarSign,
    }
  ];


const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};


 const hexItems = [
  {
    icon: '📈',
    title: 'Scalping Strategy',
    desc: 'Quick in-out trades with high precision for volatile markets',
  },
  {
    icon: '📉',
    title: 'Swing Trading Plan',
    desc: 'Catch short– to mid–term trends using price action & volume',
  },
  {
    icon: '⚡',
    title: 'Breakout Strategy',
    desc: 'Spot momentum shifts and act before the crowd moves in',
  },
];


  


  return (
    <div>
    <div className="bg-black min-h-[30vh] text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-[url('/images/starssbg.jpg')] opacity-10 z-0" />

  <section className="relative flex flex-col justify-center items-center text-center px-4 md:px-6 py-34
    z-10">
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-4 px-4 py-1 bg-orange-600/20 border border-orange-500 rounded-full text-orange-400 text-xs font-semibold uppercase tracking-wider"
    >
      ⚡ Solutions
    </motion.div>

    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
    >
      Transform Your Data Into <br />
      <span className="text-orange-500">Actionable Solutions</span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="text-gray-300 max-w-xl mt-4 px-4"
    >
      Unlock the full potential of your data with our suite of analytics tools
    </motion.p>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-6 flex flex-wrap gap-4 justify-center"
    >
      <button className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-700 transition">
        Download app
      </button>
      <button className="bg-white/10 border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition">
        Talk to sales
      </button>
    </motion.div>
  </section>

  <div className="curve-container">
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 1.2 }}
      viewBox="0 0 1000 200"
      className="w-full h-[120px] md:h-[180px]"
    >
      <defs>
        <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 80, 0, 0)" />
          <stop offset="50%" stopColor="rgba(255, 80, 0, 1)" />
          <stop offset="100%" stopColor="rgba(255, 80, 0, 0)" />
        </linearGradient>
      </defs>

      <path d="M0,200 C250,50 750,50 1000,200" stroke="url(#glowGradient)" strokeWidth="10" fill="none" />
      <path d="M0,200 C250,50 750,50 1000,200" stroke="url(#coreGradient)" strokeWidth="2" fill="none" />
    </motion.svg>
  </div>
</div>

    
    {/* section */}
     <section className="bg-black text-white py-16 px-6 md:px-12 ">
      <div className="text-center mb-12">
        <button className="mb-4 px-4 py-1 rounded-full text-sm bg-gray-800 text-white border border-gray-600">
          Take Full Control of Your Task
        </button>
        <h2 className="text-3xl md:text-4xl font-bold">
          Business <span className="text-orange-500">Application</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto">
          Our users love how Hurdle-CRM simplifies their processes and enhances operations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            viewport={{ once: true }}
            className="relative bg-[#0f0f0f] p-6 pt-6 rounded-xl border border-[#1a1a1a] group overflow-hidden"
          >
            <div className="absolute top-0 left-4 h-1 w-10 rounded-full bg-orange-500 z-10 before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:w-12 before:h-10 before:rounded-full before:bg-orange-500 before:blur-lg before:opacity-50"></div>

            <motion.div whileHover={{ scale: 1.1 }} className="mb-6 text-orange-500 flex items-start">
              <div className="inline-block">{item.icon}</div>
            </motion.div>

            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>


{/* section-stats */}
<div className="bg-black text-white py-28 px-4 md:px-20 font-sans">
  <div className="text-center mb-10">
    <p className="text-sm mb-2 px-4 py-1 border border-orange-500 w-max mx-auto rounded-full text-orange-400">
      Stay Ahead Of The Competition
    </p>
    <h2 className="text-3xl sm:text-4xl font-semibold leading-snug">
      Redefining <span className="text-orange-500">Supply Chains</span> With
      <span className="text-orange-500"> AI Precision</span>
    </h2>
    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
      AI helps you move faster and smarter, cutting costs and increasing
      customer satisfaction at every step of your supply chain.
    </p>
  </div>

  {/* Main Container */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border border-gray-900 bg-opacity-60 rounded-4xl p-3">
    {/* Left Stats */}
    <div className="flex flex-col items-center space-y-4 bg-[#1a1a1a] rounded-4xl p-4 shadow-md shadow-orange-500/10">
      <div className="flex flex-col items-center bg-[#1a1a1a] rounded-4xl p-4 sm:p-6 shadow-md shadow-orange-500/10 w-full max-w-xs">
        <div className="text-xl sm:text-2xl font-bold text-orange-500">50B+</div>
        <p className="text-gray-300 text-sm mt-1 text-center">Data Points Processed</p>
      </div>

      <div className="flex flex-col items-center bg-[#1a1a1a] rounded-4xl p-4 sm:p-6 shadow-md shadow-orange-500/10 w-full max-w-xs">
        <div className="text-xl sm:text-2xl font-bold text-orange-500">55+</div>
        <p className="text-gray-300 text-sm mt-1 max-w-[140px] text-center">
          Optimization Algorithms Developed
        </p>
      </div>
    </div>

    {/* Graph Section */}
    <div className="bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl p-4 sm:p-6 relative overflow-hidden h-[200px] sm:h-[300px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[...Array(10)].map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} stroke="#ff8000" strokeOpacity="0.1" />
        ))}
        {[...Array(10)].map((_, i) => (
          <line key={`v-${i}`} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="100" stroke="#ff8000" strokeOpacity="0.1" />
        ))}
        <motion.polyline
          points="0,80 10,75 20,72 30,68 40,60 50,65 60,55 70,45 80,30 90,25 100,20"
          fill="none"
          stroke="#ff8000"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          style={{ filter: "drop-shadow(0 0 6px #ff8000)" }}
        />
      </svg>

      <div className="absolute top-1/2 left-1/2 text-[10px] sm:text-xs text-white -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="bg-orange-500/20 rounded px-2 py-1 mb-1">
          Efficiency <span className="text-green-400">+103%</span>
        </div>
        <div className="bg-orange-500/20 rounded px-2 py-1">
          Cost Reduction <span className="text-green-400">-34%</span>
        </div>
      </div>
    </div>

    {/* Right Stats */}
    <div className="flex flex-col items-center space-y-4 bg-[#1a1a1a] rounded-2xl p-4 shadow-md shadow-orange-500/10">
      <div className="flex flex-col items-center bg-[#1a1a1a] rounded-4xl p-4 sm:p-6 shadow-md shadow-orange-500/10 w-full max-w-xs">
        <div className="text-xl sm:text-2xl font-bold text-orange-500">70+</div>
        <p className="text-gray-300 text-sm mt-1 text-center">AI Models Deployed</p>
      </div>

      <div className="flex flex-col items-center bg-[#1a1a1a] rounded-4xl p-4 sm:p-6 shadow-md shadow-orange-500/10 w-full max-w-xs">
        <div className="text-xl sm:text-2xl font-bold text-orange-500 mt-2 sm:mt-8">40+</div>
        <p className="text-gray-300 text-sm mt-1 max-w-[120px] text-center">Predictive Models Developed</p>
      </div>
    </div>
  </div>
</div>



    {/* section */}

<section className="bg-black text-white w-full min-h-[30vh] px-4 md:px-8 py-16 flex flex-col md:flex-row items-center md:items-start gap-10 relative overflow-hidden">
  {/* Background Animation */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute w-[180%] h-[180%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent rounded-full animate-pulse scale-[1.6] rotate-45" />
  </div>

  {/* Left Text & Circular Try Button */}
  <div className="z-10 w-full md:w-1/2 max-w-lg space-y-4 mt-6 md:ml-10 px-2 sm:px-4 md:px-0 text-center md:text-left">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light">Your Financial Journey with</h2>
    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-500 leading-tight">
      Expert Insights <br className="hidden sm:block" /> and Tools
    </h1>
    <p className="text-lg sm:text-xl font-light text-gray-300">for Success</p>

    {/* Circular Try Button */}
    <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-52 md:h-52 flex items-center justify-center mx-auto md:mx-0 mt-6">
      <div className="absolute flex items-center md:mb-28 md:mr-22 mb-6  justify-center">
        <span className="text-white text-sm sm:text-base md:text-lg font-semibold">Try→</span>
      </div>
      <div className="w-full h-full rounded-full flex items-center justify-center relative">
        <svg className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 20, 20
                 m 22, 50
                 a 30,30 0 1,1 30,0
                 a 10,5 0 1,1 -30,0"
            />
          </defs>
          <text className="text-[8px] sm:text-[10px] md:text-[12px] fill-orange-500">
            <textPath href="#circlePath" startOffset="0%">
              For success • For success • For success •
            </textPath>
          </text>
        </svg>
      </div>
    </div>
  </div>

  {/* Right Floating Data Cards */}
  <motion.div
    variants={floatVariants}
    animate="animate"
    className="z-10 w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 md:mt-38 sm:px-4 md:px-0"
  >
    {/* Pie Chart & Spendings */}
    <div className="flex flex-col  items-center gap-4">
      <motion.div className="bg-white/5  backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md w-full max-w-[240px] hover:scale-105 transition-transform">
        <h3 className="text-gray-300 mb-2 text-sm font-medium text-center">SPENDINGS</h3>
        <div className="relative flex justify-center">
          <PieChart width={160} height={160}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              fill="#8884d8"
              paddingAngle={3}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold">
            64%
          </div>
        </div>
        <div className="mt-4 space-y-1 text-xs text-white">
          {pieData.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div className="flex items-center gap-1">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                {item.name}
              </div>
              <span>${item.value}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md w-full max-w-[240px] hover:scale-105 transition-transform text-center">
        <h3 className="text-gray-400 text-xs">TOTAL SPENDINGS</h3>
        <p className="text-xl font-bold mt-1">$6,7890</p>
      </motion.div>
    </div>

    {/* Balance & Investment */}
    <div className="flex flex-col items-center gap-4">
      <motion.div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md w-full max-w-[240px] hover:scale-105 transition-transform text-center">
        <h3 className="text-gray-400 text-xs">ACCOUNT BALANCE</h3>
        <p className="text-lg font-semibold mt-1">$14,250</p>
      </motion.div>

      <motion.div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-md w-full max-w-[250px] hover:scale-105 transition-transform">
        <h3 className="text-gray-400 text-xs text-center mb-4">TOTAL INVESTMENTS</h3>
        <p className="text-base font-semibold mb-3 text-center">$6.70M</p>
        <div className="space-y-8 text-sm text-white/90">
          {/* Mutual Funds */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                <span>Mutual Funds</span>
              </div>
              <span>$4.8M</span>
            </div>
            <div className="w-full h-1 mt-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-orange-400 w-[70%] rounded-full"></div>
            </div>
          </div>

          {/* Stocks */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>Stocks</span>
              </div>
              <span>$1.3M</span>
            </div>
            <div className="w-full h-1 mt-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-green-400 w-[20%] rounded-full"></div>
            </div>
          </div>

          {/* Fixed Deposits */}
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span>Fixed Deposits</span>
              </div>
              <span>$580K</span>
            </div>
            <div className="w-full h-1 mt-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 w-[10%] rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</section>




{/* section-service */}

   <div className="bg-black text-white py-28 px-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Explore Our <span className="text-orange-500">Services</span>
      </h2>

      {/* For large and medium screens */}
      <div className="hidden md:flex relative items-center justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="w-80 h-80 md:w-96 md:h-96 bg-neutral-800 flex items-center justify-center hexagon large border-[3px] border-orange-500 rounded-[15%] relative" style={{ background: 'linear-gradient(to right, orange, transparent)' }}>
          <img src="/images/stock.jpg" alt="Central" className="w-full h-full object-cover rounded-[15%]" />
        </div>

        {services.map((service, index) => (
          <motion.div
            key={index}
            className="absolute w-40 h-40 md:w-56 md:h-52 bg-neutral-800 text-white flex items-center justify-center hexagon large border-[3px] border-transparent p-4 text-center rounded-[15%]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: hovered ? 1 : 0,
              x: hovered ? (index % 2 === 0 ? -300 : 300) : 0,
              y: hovered ? (index < 2 ? -140 : 140) : 0
            }}
            transition={{ duration: 0.6 }}
            style={{ background: 'linear-gradient(to right, gray, transparent)' }}
          >
            <div className="flex flex-col items-center">
              <service.icon size={32} className="text-orange-500 mb-2" />
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-xs mt-1">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* For small screens */}
      <div className="md:hidden w-full flex flex-col gap-6 mt-6">
        {services.map((service, index) => (
          <div key={index} className="bg-neutral-900 border-l-4 border-orange-500 p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              <service.icon size={28} className="text-orange-500" />
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm mt-1 text-gray-300">{service.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Only used for clip-path styling */}
      <style>{`
        .hexagon.large {
          clip-path: polygon(20% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
        }
      `}</style>
    </div>


    {/* SECTION */}

       <section className="bg-black py-20 px-4">
      <h2 className="text-white text-3xl font-bold text-center mb-2">Powerful Market <span className='text-orange-400'>Strategies</span> </h2>
      <p className="text-gray-300 text-center mb-8">
        Boost your success with time-tested and expert-built strategies.
      </p>

      <div className="hex-container-custom">
        {hexItems.map((item, i) => (
          <motion.div
            key={i}
            className="hex-box-custom"
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="hex-icon-custom">{item.icon}</div>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
         <a href="/strategies"> Explore More Strategies →</a>
        </motion.button>
      </div>
    </section>

     <section className="bg-black py-20 px-4">
      <h2 className="text-white text-3xl font-bold text-center mb-2">Smart Technical <span className='text-orange-400'>Indicators</span></h2>
      <p className="text-gray-300 text-center mb-8">
        Boost your success with time-tested and expert-built strategies.
      </p>

      <div className="hex-container-custom">
        {hexItems.map((item, i) => (
          <motion.div
            key={i}
            className="hex-box-custom"
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="hex-icon-custom">{item.icon}</div>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
         <a href="/freeindicators"> Explore More Indicators →</a>
        </motion.button>
      </div>
    </section>


 <section className="bg-black py-20 px-4">
      <h2 className="text-white text-3xl font-bold text-center mb-2">Our Premium <span className='text-orange-400'>Services</span> </h2>
      <p className="text-gray-300 text-center mb-8">
        Boost your success with time-tested and expert-built strategies.
      </p>

      <div className="hex-container-custom">
        {hexItems.map((item, i) => (
          <motion.div
            key={i}
            className="hex-box-custom"
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="hex-icon-custom">{item.icon}</div>
              <h3 className="text-base font-bold">{item.title}</h3>
              <p className="text-sm mt-1">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-orange-500 text-black px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
         <a href="/services"> Explore More Services →</a>
        </motion.button>
      </div>
    </section>



    



{/* section-faq */}
<div className="bg-black w-full px-4 sm:px-6 md:px-8 py-16 sm:py-20">
  <div className="text-white max-w-4xl mx-auto rounded-xl">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10">
      Have a Question?
    </h2>

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          layout
          className="rounded-md overflow-hidden bg-neutral-800"
          transition={{ layout: { duration: 0.25, ease: "easeInOut" } }}
        >
          {/* Toggle Button */}
          <motion.button
            layout
            className={`w-full flex justify-between items-center px-4 py-4 text-left text-sm sm:text-base md:text-lg font-semibold transition-colors duration-300 ${
              activeIndex === index ? "bg-orange-500" : "bg-neutral-800"
            }`}
            onClick={() => toggleFAQ(index)}
          >
            <span className="flex-1">
              {index + 1 < 10 ? `0${index + 1}.` : `${index + 1}.`}{" "}
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {activeIndex === index ? <ChevronUp /> : <ChevronDown />}
            </motion.div>
          </motion.button>

          {/* Animated Answer */}
          <AnimatePresence initial={false} mode="wait">
            {activeIndex === index && (
              <motion.div
                key="content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-black text-white px-4 py-3 text-sm sm:text-base"
              >
                {faq.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  </div>
</div>







    </div>
  )
}

export default Home
