import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Header.css'

const Header = ({ scrollToSection }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [displayedParagraph, setDisplayedParagraph] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [showMarginLines, setShowMarginLines] = useState(false)
  const hasTypedRef = useRef(false)
  const headerRef = useRef(null)
  const fullText = "Hi, I'm Londeka Zikalala"
  const fullParagraph = "I'm a Systems Developer specialised in full-stack development. I'm passionate about creating innovative web applications, and building digitally inclusive solutions."
  const typingSpeed = 100 // milliseconds per character
  const paragraphTypingSpeed = 30 // milliseconds per character for paragraph

  const startTyping = () => {
    if (hasTypedRef.current) return
    hasTypedRef.current = true
    setDisplayedText('')
    setDisplayedParagraph('')
    setShowMarginLines(false)
    
    // Start typing the heading
    let currentIndex = 0
    const headingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(headingInterval)
        // Start typing paragraph after heading is done
        setTimeout(() => {
          startParagraphTyping()
        }, 500) // Small delay between heading and paragraph
      }
    }, typingSpeed)
  }

  const startParagraphTyping = () => {
    let currentIndex = 0
    const firstLineEnd = fullParagraph.indexOf('.') + 1 // End of first sentence
    const paragraphInterval = setInterval(() => {
      if (currentIndex < fullParagraph.length) {
        let textToDisplay = fullParagraph.substring(0, currentIndex + 1)
        // Add line breaks at natural points
        textToDisplay = textToDisplay.replace('development. ', 'development.\n')
        textToDisplay = textToDisplay.replace('about ', 'about\n')
        setDisplayedParagraph(textToDisplay)
        
        // Show margin lines when first line is typed
        if (currentIndex >= firstLineEnd && !showMarginLines) {
          setShowMarginLines(true)
        }
        
        currentIndex++
      } else {
        clearInterval(paragraphInterval)
      }
    }, paragraphTypingSpeed)
  }

  useEffect(() => {
    // Set up intersection observer for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTypedRef.current) {
            startTyping()
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of header is visible
        rootMargin: '0px'
      }
    )

    const currentHeader = headerRef.current
    if (currentHeader) {
      observer.observe(currentHeader)
    }

    // Also start typing on mount if header is already visible
    if (currentHeader) {
      const rect = currentHeader.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (isVisible && !hasTypedRef.current) {
        startTyping()
      }
    }

    return () => {
      if (currentHeader) {
        observer.unobserve(currentHeader)
      }
    }
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

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
    <div className="parallax-background">
      <header className="header" id="home" ref={headerRef}>
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
        <div className="parallax-content-wrapper">
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
                  src="/Original Avatar.png"
                  alt="A headshot of Londeka Zikalala"
                />
              </motion.div>
              <motion.div 
                className="header-text-box" 
                variants={itemVariants}
              >
                <div className="text-box-content">
                  <h1>
                    <span className="star">✦</span>{' '}
                    <span className="typing-text">
                      {displayedText}
                      {showCursor && <span className="cursor">|</span>}
                    </span>
                  </h1>
                  <p className={`intro-text typing-paragraph ${showMarginLines ? 'show-margin-lines' : ''}`}>
                    {displayedParagraph.split('\n').map((line, index, array) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < array.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header

