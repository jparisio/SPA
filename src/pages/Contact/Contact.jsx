import { useState } from "react";
import { motion } from "framer-motion";
import Curve from "../../transitions/Curve.jsx";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
    agree: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://formspree.io/f/mjkyvqdr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      console.error("Email sending failed");
    }
  };

  const variants = {
    initial: { y: 200 },
    animate: (i) => ({
      y: 0,
      transition: {
        delay: 0.3 + i,
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      },
    }),
  };

  return (
    <>
      <Curve>
        <div className="contact-container">
          {/* Left section: Heading & description */}
          <motion.div
            className="contact-info"
            initial="initial"
            animate="animate"
            variants={variants}
            custom={0.02}
          >
            <h1 className="contact-title">Let's Get in Touch</h1>
            <p className="contact-description">
              Looking for a reliable aquatic service provider? Request a quote
              today and let us help you maintain, repair, or enhance your
              aquatic facility with expert care. Our team is ready to assist you
              with tailored solutions to meet your needs.
            </p>

            <div className="image-container">
              <motion.img src="/contact.jpg"></motion.img>
            </div>
          </motion.div>

          {/* Right section: Form or Thank You message */}
          <motion.div
            className="contact-form-wrapper"
            initial="initial"
            animate="animate"
            variants={variants}
            custom={0}
          >
            {!submitted ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">COMPANY</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">MESSAGE</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="agree">
                    By clicking submit, I agree to have my personal data
                    processed to handle my request according to the privacy
                    policy.
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  initial={{ y: 40 }}
                  animate="animate"
                  variants={variants}
                  custom={0.1}
                >
                  Submit
                </motion.button>
              </form>
            ) : (
              <div className="thank-you-container">
                <motion.div
                  className="thank-you-card"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  <span className="thank-you-title">Thank you!</span>
                  <span>Your request was sent</span>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </Curve>
    </>
  );
}
