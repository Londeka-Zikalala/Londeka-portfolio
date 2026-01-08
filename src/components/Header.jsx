import React from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = ({ scrollToSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <header className="header" id="home">
      <div className="confetti-container">
        <div className="confetti confetti-1"></div>
        <div className="confetti confetti-2"></div>
        <div className="confetti confetti-3"></div>
        <div className="confetti confetti-4"></div>
        <div className="confetti confetti-5"></div>
        <div className="confetti confetti-6"></div>
        <div className="confetti confetti-7"></div>
        <div className="confetti confetti-8"></div>
      </div>
      <div className="header-contents">
        <motion.div 
          className="intro"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="headerimg"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              className="headerImg" 
              src="/images-and-files/Original Avatar.png"
              alt="A headshot of Londeka Zikalala"
            />
          </motion.div>
          <motion.div 
            className="header-text-box" 
            variants={itemVariants}
          >
            <div className="text-box-content">
              <h1>
                <span className="star">✦</span> Hi, I'm <span className="name-with-cursor">Londeka Zikalala<span className="cursor">|</span></span>
              </h1>
              <p className="intro-text">
                I'm a Systems Developer specialised in full-stack development. I'm passionate about 
                creating innovative web applications, and building digitally inclusive 
                solutions.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}

export default Header

