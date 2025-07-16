import {React,  useState, useRef, useEffect } from 'react'
import { motion, useAnimation,  useScroll, useInView, useTransform , AnimatePresence } from "framer-motion";
import { Monitor, Search, PenTool, Camera,  } from "lucide-react";
import { CheckCircle, TrendingUp, BarChart3, Users, Globe2, ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { FaQuoteLeft } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";



const stocks = [
  {
    name: "BHARTIARTL",
    company: "Bharti Airtel",
    target: "15%",
    logo: "/images/airtel.png", // Replace with your logo/image
    range: "Buy range: ₹X – ₹Y",
    stoploss: "Stop loss: ₹Z",
    type: "Short term (1–3 Mos.)",
  },
  {
    name: "BEL",
    company: "Bharat Electronics",
    target: "12%",
    logo: "/images/bel.png",
    range: "Buy range: ₹A – ₹B",
    stoploss: "Stop loss: ₹C",
    type: "Mid term (3–6 Mos.)",
  },
  {
    name: "HEROMOTOCO",
    company: "Hero MotoCorp",
    target: "18%",
    logo: "/images/hero.png",
    range: "Buy range: ₹P – ₹Q",
    stoploss: "Stop loss: ₹R",
    type: "Long term (6+ Mos.)",
  },
  // Add more if needed
];



const expertiseData = [
  {
    title: "Digital Marketing",
    description: "Expand your reach, increase conversion rates for your business.",
    icon: <Monitor size={32} />,
    bgColor: "bg-orange-700"
  },
  {
    title: "Web Design Development",
    description: "Create websites with stunning visuals and user experiences.",
    icon: <PenTool size={32} />,
    bgColor: "bg-orange-600"
  },
  {
    title: "SEO Optimization",
    description: "Increase visibility and attract organic traffic with SEO techniques.",
    icon: <Search size={32} />,
    bgColor: "bg-orange-500"
  },
  {
    title: "Content Creation",
    description: "Engage and inform your beloved audience with relevant content.",
    icon: <Camera size={32} />,
    bgColor: "bg-orange-400"
  }
];

const steps = [
  {
    title: "Registration & Onboarding",
    subtitle: "Attend Your LIVE Orientation & Kick Off Session With Parang Mehta",
    description:
      "We have new cohorts starting every Sunday at 7pm. You learn how to get started with trading & investing, capital management, risk management and introduction to professional stock trading.",
    align: "left",
    stepColor: "text-orange-400",
    glow: "shadow-orange-400/40",
    icon: "📝",
  },
  {
    title: "Super Trader Program Starts",
    subtitle: "Start Your Course with Daily LIVE Trading Support",
    description:
      "Learn all the concepts from the absolute basics covered across 20+ modules. Apply these in the markets with our SEBI Registered Research Analysts.",
    align: "right",
    stepColor: "text-cyan-400",
    glow: "shadow-cyan-400/40",
    icon: "📈",
  },
  {
    title: "Apply 10+ Institutional Trading Strategies",
    subtitle: "Start Trading Like A Professional Trader",
    description:
      "We empower you with 10+ accurate institutional strategies to apply in equity, futures, options & commodity markets.",
    align: "left",
    stepColor: "text-purple-400",
    glow: "shadow-purple-400/40",
    icon: "📊",
  },
  {
    title: "Optimize & Improve Your Trading Statistics",
    subtitle: "Create Generational Income",
    description:
      "Now you're ready to trade independently while improving key stats like win rate, risk/reward, and profit factor. You are now a SUPER TRADER.",
    align: "right",
    stepColor: "text-green-400",
    glow: "shadow-green-400/40",
    icon: "📉",
  },
];

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "This service is phenomenal. I’ve seen a dramatic improvement in my results!",
    title: "Senior Analyst at XYZ Corp",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    feedback:
      "Highly recommend to anyone serious about leveling up their business.",
    title: "Founder at Startup Inc",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Alex Johnson",
    feedback:
      "Absolutely loved the experience, support was top-notch!",
    title: "Product Manager at ABC Ltd",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const stepss = [
  {
    title: "Getting Started",
    description: "Learn the basics of trading with beginner-friendly content.",
  },
  {
    title: "Understanding Markets",
    description: "Dive into market structures, patterns, and indicators.",
  },
  {
    title: "Strategic Trading",
    description: "Apply strategies with risk management and psychology.",
  },
];




const About = () => {

   const headingRef = useRef(null);
  const controls = useAnimation();
  const inView = useInView(headingRef, { threshold: 0.5 });
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.6 },
      });
      setHideNavbar(true);
    } else {
      controls.start({
        opacity: 0,
        scale: 0.85,
        y: -80,
        transition: { duration: 0.6 },
      });
      setHideNavbar(false);
    }
  }, [inView]);


  const [isHeadingSticky, setIsHeadingSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeadingSticky(entry.isIntersecting);
      },
      { threshold: 0.9 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  // 🧠 This is how you tell parent layout (Navbar) to hide
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      navbar.style.display = isHeadingSticky ? "none" : "block";
    }
  }, [isHeadingSticky]);

   const [billingCycle, setBillingCycle] = useState("monthly");

  const handleClick = (plan) => {
    alert(`Redirecting to checkout for ${plan}`);
  };

const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const handlePrev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  const handleNext = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
 
  
 
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % stocks.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + stocks.length) % stocks.length);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(nextSlide, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className='bg-black'>
     <section className="bg-black text-orange-400 py-32 px-4 md:px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center leading-tight">
        Empowering India’s <br /> Wealth Journey
      </h1>

      <div className="relative max-w-3xl sm:max-w-4xl mx-auto">
        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-0 z-20 transform -translate-y-1/2 bg-gray-800 hover:bg-orange-500 p-2 sm:p-3 rounded-full"
        >
          <FaArrowLeft className="text-sm sm:text-lg" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-0 z-20 transform -translate-y-1/2 bg-gray-800 hover:bg-orange-500 p-2 sm:p-3 rounded-full"
        >
          <FaArrowRight className="text-sm sm:text-lg" />
        </button>

        {/* Slider Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl px-6 py-8 sm:px-10 sm:py-10 shadow-2xl w-full mx-auto flex flex-col items-start justify-between space-y-5"
          >
            {/* Logo + Name */}
            <div className="flex items-center gap-4">
              <img
                src={stocks[index].logo}
                alt={stocks[index].name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-contain border border-orange-400"
              />
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white">{stocks[index].name}</h2>
                <p className="text-sm text-gray-300">{stocks[index].company}</p>
              </div>
            </div>

            {/* Target */}
            <div className="bg-green-600 text-white text-sm sm:text-base px-4 py-2 rounded-md">
              Potential Target: <strong>{stocks[index].target}</strong>
            </div>

            {/* Details */}
            <div className="text-gray-300 text-sm space-y-1">
              <p>{stocks[index].range}</p>
              <p>{stocks[index].stoploss}</p>
            </div>

            {/* Type Button */}
            <button className="bg-gray-700 hover:bg-orange-500 text-white px-4 py-2 rounded-full text-xs sm:text-sm mt-2">
              {stocks[index].type}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
{/* section-2  */}

 <section className="bg-black  text-orange-400 pl-10 py-16 px-6 md:px-38">
      <div className="max-w-6xl  mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* CEO Image */}
        <div className="relative group">
         
        </div>

        {/* CEO Content */}
       
<motion.div
  className="space-y-6"
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
          <FaQuoteLeft className="text-4xl text-orange-500 mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            Meet Our Visionary Leader
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            <span className="font-semibold text-orange-400">Mr. Vikas Kumar</span>, the founder and CEO of StockGenius, is a passionate educator and market strategist with over a decade of experience in financial analysis and stock trading. His mission is to simplify the stock market for everyone and help learners build wealth through knowledge.
          </p>
          <p className="italic text-orange-500 font-medium">
            "Success in stocks doesn’t come from luck. It comes from learning the game."
          </p>
     </motion.div>
      </div>
    </section>



{/* section */}
 <section className="bg-black text-white py-32 px-4 text-center">
      <h2 className="text-4xl font-bold mb-14">OUR <span className='text-orange-500'> OFFERINGS</span></h2>

      <div className="flex flex-wrap justify-center gap-6">
        {expertiseData.map((item, index) => (
          <motion.div
            key={index}
            className={`relative w-64 p-6 rounded-lg shadow-lg ${item.bgColor} text-white`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="absolute top-0 right-0 flex gap-1 -mt-4 -mr-4">
              <div className="w-6 h-6 bg-white/50 rounded-full rotate-45 origin-center transform"></div>
              <div className="w-6 h-6 bg-white/50 rounded-full rotate-45 origin-center transform"></div>
              <div className="w-6 h-6 bg-white/50 rounded-full rotate-45 origin-center transform"></div>
            </div>
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-white/90">{item.description}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-400 cursor-pointer hover:text-orange-500 transition">
        See More Services
      </p>
    </section>

{/* section-3 */}

  <section className="bg-black text-orange-500 py-38 px-4 rounded-lg max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
      {/* Left - Advanced Image Section with Animation */}
      <div className="flex-1 relative group">
        <img
          src="/images/stockfooterimg.png"
          alt="Stock Learning"
          className="rounded-lg shadow-lg transform transition duration-500 group-hover:scale-105"
        />
        <div className="absolute  inset-0 bg-gradient-to-r from-transparent to-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center text-orange-500 text-2xl font-bold">
          Master Stock Trading
        </div>
      </div>

      {/* Right - Enhanced Features Section with Icons */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
        <p className="text-gray-400 mb-6">
          Learn stock trading from industry experts with proven strategies.
        </p>

        <ul className="space-y-4">
          {["Expert Mentorship", "Live Trading Sessions", "Comprehensive Courses", "Real-Time Market Analysis", "24/7 Community Support"].map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              {index === 0 && <TrendingUp className="text-orange-500" size={24} />}
              {index === 1 && <BarChart3 className="text-orange-500" size={24} />}
              {index === 2 && <Users className="text-orange-500" size={24} />}
              {index === 3 && <Globe2 className="text-orange-500" size={24} />}
              {index === 4 && <CheckCircle className="text-orange-500" size={24} />}
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>



{/* section */}

 <section className="bg-black text-orange-400 min-h-screen relative">
  {/* Sticky Heading */}
  <div className="sticky top-0 bg-black z-50 py-6 text-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
      Roadmap
    </h1>
    <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto">
      Here's a customized tailor-made roadmap to take you from an amateur to a
      professional super trader.
    </p>
  </div>

  {/* Timeline Line & Steps */}
  <div className="relative flex justify-center">
    {/* Vertical Line */}
    <div className="absolute hidden sm:block left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-orange-500 to-orange-500 h-full z-0" />

    {/* Steps */}
    <div className="flex flex-col space-y-20 sm:space-y-32 py-20 sm:py-28 z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className={`relative flex flex-col sm:flex-row items-center  ${
            step.align === "left" ? "sm:flex-row" : "sm:flex-row-reverse"
          } gap-4`}
        >
          {/* Step Number - Visible only on md+ screens */}
          <div
            className={`hidden md:block absolute top-10 text-orange-400 font-bold text-3xl select-none glow-text ${
              step.align === "left" ? "left-[65%]" : "right-[65%] mr-4"
            }`}
          >
            Step {index + 1}
          </div>

          {/* Dot */}
          <div
            className={`w-6 h-6 rounded-full border-4 border-white bg-black flex items-center justify-center z-10 ${step.glow}`}
          >
            <span className={`text-lg ${step.stepColor}`}>{step.icon}</span>
          </div>

          {/* Content */}
          <div
            className={`bg-gray-900 text-white p-5 sm:p-6 rounded-2xl shadow-xl w-full sm:max-w-md  ${
              step.align === "left" ? "text-left sm:ml-2 md:-ml-2" : "text-left sm:mr-2 md:-mr-3"
            } ${step.glow}`}
          >
            <h3 className="text-lg sm:text-xl font-bold mb-1">{step.title}</h3>
            <h4 className="text-sm sm:text-base text-gray-400 mb-2 font-medium italic">
              {step.subtitle}
            </h4>
            <p className="text-sm text-gray-300">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>




{/* section-5 */}

 <section className="bg-black text-orange-400 min-h-[40vh] mt-38 px-4">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-white ">Trade Anytime, <span className='text-orange-400'>Anywhere</span> </h2>
        <p className="text-lg max-w-xl mx-auto  text-gray-300">
          Follow this step-by-step journey to become a confident trader.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-10 mt-28 max-w-6xl mx-auto">
        {/* Left Side Image */}
        <div className="md:w-1/2">
          <img
            src="\images\mobile.jpg!sw800"
            alt="Roadmap Visual"
            className=" shadow-lg"
          />
        </div>

        {/* Right Side Timeline */}
        <div className="md:w-1/2 relative pl-10">
          {/* Vertical Dotted Line */}
          <div className="absolute left-3 top-0 bottom-0 w-1 border-l-4 border-dotted border-orange-400"></div>

          {/* Timeline Steps */}
          <div className="flex flex-col gap-20">
            {stepss.map((stepss, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-10"
              >
                {/* Glow Circle */}
                <div className="absolute left-[-27px] top-1 w-6 h-6 rounded-full bg-orange-200 shadow-glow animate-pulse hover:scale-110 transition-all duration-300"></div>

                {/* Step Content */}
                <h3 className="text-xl font-bold mb-1">{stepss.title}</h3>
                <p className="text-gray-300">{stepss.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>





{/* section-4 */}

<section className="bg-black text-white py-46 pb-28  px-4  text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
        Client{" "}
        <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
          Testimonials
        </span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto mb-10">
        We have transformed and impacted thousands of traders through our platform, hear it from them.
      </p>

      {/* Avatars */}
      <div className="flex justify-center items-center space-x-3 overflow-x-auto no-scrollbar mb-6">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className={`w-16 h-16 rounded-full overflow-hidden border-4 transition-all duration-300 ${
              current === index
                ? "scale-110 border-orange-400 shadow-orange-400 shadow-lg"
                : "border-gray-700 opacity-60"
            }`}
            onClick={() => setCurrent(index)}
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Testimonial Content */}
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h3 className="text-xl font-bold text-white">{testimonials[current].name}</h3>
        <p className="text-orange-400 font-semibold mb-4 italic">
          "{testimonials[current].title}"
        </p>
        <div className="relative text-gray-300 text-base px-6">
          <Quote className="absolute -left-4 top-0 w-6 h-6 text-orange-400" />
          <p>{testimonials[current].feedback}</p>
          <Quote className="absolute -right-4 bottom-0 w-6 h-6 text-orange-400 rotate-180" />
        </div>
      </motion.div>

      {/* Arrows */}
      <div className="flex justify-center items-center mt-6 space-x-6">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-gray-800 hover:bg-orange-400 transition"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-gray-800 hover:bg-orange-400 transition"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </section>

{/* <div className="bg-black text-white py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-orange-500 mb-2 text-sm">Pricing</p>
        <h1 className="text-4xl text-white font-bold mb-4">Simple and <span className='text-orange-500'>transparent pricing</span> </h1>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Unlock stock market education with flexible plans tailored for beginner and advanced learners.
        </p>

        <div className="inline-flex bg-orange-100/10 backdrop-blur-md rounded-full p-1 mb-12">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-1 font-semibold rounded-full transition ${billingCycle === "monthly" ? "bg-orange-500 text-black" : "text-orange-500 hover:opacity-75"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-1 font-semibold rounded-full transition ${billingCycle === "yearly" ? "bg-orange-500 text-black" : "text-orange-500 hover:opacity-75"}`}
          >
            Yearly
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-orange-100/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-xs text-left shadow-lg border border-orange-300/10">
            <h3 className="text-xl font-semibold mb-2">Beginner Plan</h3>
            <p className="text-3xl font-bold mb-4">
              {billingCycle === "monthly" ? "$49" : "$490"}
              <span className="text-base font-normal">/{billingCycle === "monthly" ? "Month" : "Year"}</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Introductory Stock Market Courses</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Weekly Live Q&A Sessions</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Access to Community Forum</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Basic Analytics Tools</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Email Support</li>
            </ul>
            <button onClick={() => handleClick('Beginner Plan')} className="bg-orange-500 text-black rounded-full px-6 py-2 font-semibold w-full transition hover:opacity-90">
              Get started
            </button>
          </div>

          <div className="bg-orange-100/5 backdrop-blur-lg rounded-2xl p-8 w-full max-w-xs text-left shadow-lg border border-orange-300/10">
            <h3 className="text-xl font-semibold mb-2">Pro Plan</h3>
            <p className="text-3xl font-bold mb-4">
              {billingCycle === "monthly" ? "$99" : "$999"}
              <span className="text-base font-normal">/{billingCycle === "monthly" ? "Month" : "Year"}</span>
            </p>
            <ul className="space-y-2 mb-6">
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Everything in Beginner Plan</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Advanced Trading Strategies</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Real-Time Market Insights</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">1-on-1 Mentorship Sessions</li>
              <li className="relative pl-6 before:content-['✔'] before:absolute before:left-0 before:text-green-400">Priority Email & Chat Support</li>
            </ul>
            <button onClick={() => handleClick('Pro Plan')} className="bg-orange-500 text-black rounded-full px-6 py-2 font-semibold w-full transition hover:opacity-90">
              Get started
            </button>
          </div>
        </div>

        <div className="bg-orange-100/5 backdrop-blur-lg rounded-2xl p-6 mt-12 flex flex-col sm:flex-row justify-between items-center border border-orange-300/10">
          <span className="text-gray-400 mb-4 sm:mb-0">Book a 15-minute call with our mentor team</span>
          <button onClick={() => handleClick('Intro Call')} className="bg-orange-500 text-black rounded-full px-6 py-2 font-semibold transition hover:opacity-90">
            Get started
          </button>
        </div>
      </div>
    </div> */}

    </div>
  )
}

export default About
