import {React, useState} from 'react'
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


const faqData = [
  {
    question: 'What is the best way to start learning about stock markets?',
    answer: 'Start by learning stock market basics such as terminology, how trading works, and the types of stocks. Then gradually move to strategies and tools using our beginner modules.',
  },
  {
    question: 'Do I need any prior experience in finance?',
    answer: 'No, our courses are designed for absolute beginners as well as intermediate learners. You’ll build foundational knowledge step-by-step.',
  },
  {
    question: 'Is stock trading safe for beginners?',
    answer: 'With the right education and risk management strategies, beginners can trade safely. Our lessons emphasize capital protection and long-term planning.',
  },
  {
    question: 'What tools do I need to start trading?',
    answer: 'You need a demat account, a trading platform, and access to reliable market data. We guide you on setting these up in our course.',
  },
  {
    question: 'Do you provide real-time market examples?',
    answer: 'Yes, our tutorials often include real charts, analysis of live trends, and trading case studies to help you learn practically.',
  },
  {
    question: 'Will I get support if I have questions during the course?',
    answer: 'Absolutely! We offer community support, webinars, and doubt sessions with mentors to help resolve your queries.',
  },
];

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();

  const [submissionStatus, setSubmissionStatus] = useState(null);

const onSubmit = async (data) => {
  try {
    const res = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });



    const result = await res.json();
    if (result.success) {
      reset();
        setSubmissionStatus("success");
    } else {
     setSubmissionStatus("error");
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred.');
  }
};


  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };


  return (
    <div>
      <section
      className="relative min-h-[45vh]  md:h-[60vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/starssbg.jpg')", // replace with your image path
      }}
    >
      <div className="absolute inset-0 " /> {/* Overlay */}

      <div className="relative text-center text-white z-10 px-4">
        <motion.h2
          className="text-4xl sm:text-6xl font-bold"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact <span className='text-orange-400'>Us</span>
        </motion.h2>

        {/* Signature-style line animation */}
        <motion.svg
          viewBox="0 0 500 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-4 w-60 h-12"
        >
          <motion.path
            d="M10 30 C 100 10, 200 50, 300 30 S 400 10, 490 30"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.svg>
      </div>
    </section>

    {/* section-contact */}
    <section className="bg-black text-white px-4 py-16 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left: Form */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-2">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Please fill out the form. We’ll get back to you within a day.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Name*"
                  className="w-full p-3 rounded-md bg-neutral-800 placeholder-gray-400"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>

              <div className="w-full">
                <input
                  {...register('company', { required: 'Company name is required' })}
                  placeholder="Company Name*"
                  className="w-full p-3 rounded-md bg-neutral-800 placeholder-gray-400"
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company.message}</p>}
              </div>

              <div className="w-full">
                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="E-mail*"
                  className="w-full p-3 rounded-md bg-neutral-800 placeholder-gray-400"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            {/* Country & Phone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <select
                {...register('country')}
                className="w-full sm:w-1/3 p-3 rounded-md bg-neutral-800 text-white"
              >
                <option value="India">India (+91)</option>
                <option value="USA">USA (+1)</option>
                <option value="UK">UK (+44)</option>
                <option value="UAE">UAE (+971)</option>
              </select>

              <div className="w-full sm:w-2/3">
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Enter a valid 10-digit number',
                    },
                  })}
                  placeholder="Phone Number*"
                  className="w-full p-3 rounded-md bg-neutral-800 placeholder-gray-400"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Query */}
            <div>
              <textarea
                {...register('message', { required: 'Please enter your query' })}
                placeholder="Your Query*"
                className="w-full p-3 rounded-md bg-neutral-800 placeholder-gray-400"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" {...register('consent', { required: true })} />
              <label>
                I agree to allow <span className="text-orange-500">Technoviaan Solutions Group</span> to communicate with me in accordance with CDN’s{" "}
                <a href="#" className="underline text-orange-500">Privacy Policy</a>.
              </label>
            </div>
            {errors.consent && <p className="text-red-500 text-sm">You must agree before submitting.</p>}

            {/* Radio */}
            <div className="text-sm">
              <p className="mb-1">Can we connect via Whatsapp, Skype or direct call?</p>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="radio" value="Yes" {...register('connect')} />
                  Yes
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="No" {...register('connect')} />
                  No
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
            >
              Submit Request
            </button>
                      {submissionStatus === "success" && (
  <p className="text-green-500 mt-2">Your message was sent successfully!</p>
)}
{submissionStatus === "error" && (
  <p className="text-red-500 mt-2">There was a problem sending your message.</p>
)}
          </form>



          <div className="mt-6 text-sm text-gray-400">
            <strong className="text-white">Domestic Operations of Technoviaan Solutions Group</strong><br />
            1st FLOOR, 27A Nirmala Sadan, Chandan Nagar, Vijay Nagar, Indore. India
          </div>
        </div>

      

        {/* Right: Info Sidebar */}
        <div className="w-full lg:w-1/3 space-y-4">
          <h3 className="text-xl font-semibold">Explore your <span className="text-orange-500">ideas with us!</span></h3>

          <div>
            <p className="font-semibold text-orange-500">CALL US:</p>
            <p className="text-gray-300">+91 9131243144</p>
            <p className="text-gray-300">+91 8602363151</p>
          </div>

          <div>
            <p className="font-semibold text-orange-500">EMAIL US:</p>
            <p className="text-gray-300">info@technoviaan.com</p>
          </div>

          <div>
            <p className="font-semibold text-orange-500">ADDRESS</p>
            <p className="text-gray-300">1st FLOOR, 27A Nirmala Sadan, Chandan Nagar, Vijay Nagar, Indore, MP</p>
          </div>

          {/* Social Icons (Placeholder) */}
          <div className="flex gap-4 mt-4 text-gray-300 text-lg">
            <span className="hover:text-orange-500 cursor-pointer">🌐</span>
            <span className="hover:text-orange-500 cursor-pointer">🐦</span>
            <span className="hover:text-orange-500 cursor-pointer">📘</span>
            <span className="hover:text-orange-500 cursor-pointer">📸</span>
            <span className="hover:text-orange-500 cursor-pointer">▶️</span>
          </div>

          <div className="text-sm mt-4">
            <p className="font-semibold text-orange-500">For Sales Inquiry</p>
            <p className="text-gray-300">info@metadigitalagecy.in</p>
            <p className="text-orange-500 mt-1">Call Us</p>
            <p className="text-gray-300">+91 8602363151</p>
          </div>
        </div>
      </div>
    </section>

    {/* section-faq */}
    <div className="bg-black py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      <h2 className="text-center text-3xl md:text-4xl font-bold text-orange-500 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div key={index} className="bg-neutral-900 rounded-md shadow-md">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-white hover:bg-neutral-800 transition-colors"
              onClick={() => toggle(index)}
            >
              <span>{faq.question}</span>
              {activeIndex === index ? (
                <FaChevronUp className="text-orange-500" />
              ) : (
                <FaChevronDown className="text-orange-500" />
              )}
            </button>
            {activeIndex === index && (
              <div className="bg-black text-gray-300 px-4 py-3 border-t border-neutral-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>



    </div>
  )
}

export default Contact
