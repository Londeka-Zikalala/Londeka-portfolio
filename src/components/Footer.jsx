import React from 'react'
import { motion } from 'framer-motion'
import './Footer.css'

const Footer = ({ scrollToSection }) => {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/londeka-sendzekile-zikalala-/', icon: 'in' },
    { name: 'GitHub', url: 'https://github.com/Londeka-Zikalala', icon: 'gh' }
  ]

  return (
    <footer className="footer">
      <div className="footer-curve"></div>
      <div className="footer-container">
        <div className="footer-main">
          <p className="footer-question">Your cup of tea?</p>
          <motion.h2 
            className="footer-cta"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Let's start
          </motion.h2>
        </div>
        
        <div className="footer-contact-row">
          <div className="footer-email">
            <a href="mailto:mnaka4@gmail.com" className="email-link">
            mnaka4@gmail.com
            </a>
          </div>
          
          <motion.button 
            className="footer-quote-btn"
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, backgroundColor: '#FF99C8' }}
            whileTap={{ scale: 0.95 }}
          >
            Get a quote
          </motion.button>
          
          <div className="footer-phone">
            <div className="phone-icon">🕐</div>
            <div className="phone-info">
              <a href="tel:+27123456789" className="phone-number"></a>
              <p className="phone-location">South Africa (SAST)</p>
            </div>
          </div>
        </div>
        
        <div className="footer-social">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {social.name === 'LinkedIn' ? (
                <img 
                  src="/images-and-files/kisspng-computer-icons-linkedin-rsum-curriculum-vitae-linkedin-5b4755c26536f7.3711096515314016664146-fotor-202311211894.png"
                  alt="LinkedIn"
                  className="social-icon-img"
                />
              ) : (
                <img 
                  src="/images-and-files/kisspng-computer-icons-logo-portable-network-graphics-clip-icons-for-free-iconza-circle-social-5b7fe46b0bac53.1999041115351082030478-fotor-2023112118730.jpg"
                  alt="GitHub"
                  className="social-icon-img"
                />
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer

