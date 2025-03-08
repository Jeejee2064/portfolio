'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
    // Add form submission logic here
    console.log(formData);
    alert('Message submitted!');
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 mt-16 bg-indigo-950  px-4 flex justify-center md:px-8"
      id="contact"
    >
      <div className=" mx-auto ">
        {/* Contact Info */}
        <div className="space-y-6 flex flex-col justify-center px-8">
          
          
          <div className="flex items-center space-x-4">
            <Mail className="text-[#FA5D66] w-6 h-6" />
            <span className='text-white'>jdwapp@gmail.com</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Phone className="text-[#FFA1C5] w-6 h-6" />
            <span className='text-white'>+507 6241-0588</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <MapPin className="text-[#ffdb40] w-6 h-6" />
            <span className='text-white'>Isla Colón, Bocas del Toro, Panama</span>
          </div>
        </div>

       
      </div>
    </motion.section>
  );
};

export default ContactSection;