import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const [showResend, setShowResend] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await axios.post('https://portfolio-server-yhj6.onrender.com/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.data.status === 'success') {
        setFormData({ name: '', email: '', message: '' })
        setShowResend(true)
        setMessage({ text: 'Thanks for contacting me, Will get back to you soon! (:', type: 'success' })
      } else {
        setMessage({ text: response.data.message || 'Something went wrong. Please try again.', type: 'error' })
      }
    } catch (error) {
      console.error('Error:', error)
      setMessage({ text: 'Oops! Something went wrong. Please try again later.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleResend = () => {
    setShowResend(false)
    setMessage({ text: '', type: '' })
  }

  return (
    <div className="parallax-background">
      <section id="contact" className="contact">
        <div className="parallax-content-wrapper">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Tell me about a project you'd like me to help you with!
          </motion.h1>
          <div className="contact-content">
        <motion.div 
          className="contact-avatar"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <img src="/images-and-files/matrix avatar.png" alt="avatar cubic" />
        </motion.div>
        {!showResend ? (
          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="name">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="email">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="message">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="submit">
                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                  whileHover={{ scale: 1.05, backgroundColor: '#FF99C8' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {loading ? 'Sending...' : 'Send Me A Message!'}
                </motion.button>
                {loading && <div className="form-loader active"></div>}
                {message.text && (
                  <motion.div
                    className={`form-message active ${message.type}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {message.text}
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            className="resend-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="resend-content">
              <div className="form-message success-message-persistent success">
                {message.text}
              </div>
              <motion.button
                className="resend-button"
                onClick={handleResend}
                whileHover={{ scale: 1.05, backgroundColor: '#FF99C8' }}
                whileTap={{ scale: 0.95 }}
              >
                Send Another Message
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
        </div>
      </section>
    </div>
  )
}

export default Contact

