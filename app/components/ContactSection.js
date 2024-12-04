'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';


const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Message submitted!');
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-indigo-950 h-3/4 px-4 md:px-8"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 flex flex-col justify-center px-8">
          <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
          
          <div className="flex items-center space-x-4">
   
            <span className='text-white'>jdwapp@gmail.com</span>
          </div>
          
          <div className="flex items-center space-x-4">
    
            <span className='text-white'>+507 6241-0588</span>
          </div>
          
          <div className="flex items-center space-x-4">
            
            <span className='text-white'>Isla Colón, Bocas del Toro, Panama</span>
          </div>
        </div>
        {/* Contact Form */}
        <div 
          className="bg-white p-8 rounded-lg shadow-lg space-y-6"
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              required
            />
            
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              required
            />
            
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              required
            ></textarea>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;