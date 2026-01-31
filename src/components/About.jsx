import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import './About.css'

const About = ({ scrollToSection }) => {
  const [curSlide, setCurSlide] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [diff, setDiff] = useState(0)
  const sliderRef = useRef(null)
  const autoSlideTimeoutRef = useRef(null)
  const startXRef = useRef(0)
  const curSlideRef = useRef(0)

  const numOfSlides = 2 // Introduction, My Toolkit, Aspirations (0, 1, 2)
  const animTime = 500
  const autoSlideDelay = 6000

  const techStack = [
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
    { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
    { name: 'Digital Ocean', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg' }
  ]

  const changeSlides = (instant = false) => {
    const slideIndex = curSlideRef.current
    if (!instant && !animating) {
      setAnimating(true)
      if (sliderRef.current) {
        sliderRef.current.classList.add('animating')
      }
      setTimeout(() => {
        if (sliderRef.current) {
          sliderRef.current.classList.remove('animating')
        }
        setAnimating(false)
      }, animTime)
    }

    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current)
    }

    // Update slider position
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(${-slideIndex * 100}%,0,0)`
    }

    // No background movement needed - static background

    setDiff(0)
  }

  const autoSlide = () => {
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current)
    }
    autoSlideTimeoutRef.current = setTimeout(() => {
      curSlideRef.current = curSlideRef.current + 1
      if (curSlideRef.current > numOfSlides) curSlideRef.current = 0
      setCurSlide(curSlideRef.current)
    }, autoSlideDelay)
  }

  const navigateLeft = () => {
    if (animating) return
    if (curSlideRef.current > 0) {
      curSlideRef.current--
      setCurSlide(curSlideRef.current)
    }
  }

  const navigateRight = () => {
    if (animating) return
    if (curSlideRef.current < numOfSlides) {
      curSlideRef.current++
      setCurSlide(curSlideRef.current)
    }
  }

  useEffect(() => {
    curSlideRef.current = curSlide
    changeSlides(false)
    autoSlide()
  }, [curSlide])

  useEffect(() => {
    // Initial setup
    curSlideRef.current = 0
    changeSlides(true)
    autoSlide()
    return () => {
      if (autoSlideTimeoutRef.current) {
        clearTimeout(autoSlideTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseDown = (e) => {
    if (animating) return
    if (autoSlideTimeoutRef.current) {
      clearTimeout(autoSlideTimeoutRef.current)
    }
    startXRef.current = e.pageX || (e.touches && e.touches[0].pageX) || 0
    let currentDiff = 0

    const handleMouseMove = (e) => {
      const x = e.pageX || (e.touches && e.touches[0].pageX) || 0
      const winW = window.innerWidth
      const newDiff = (startXRef.current - x) / winW * 70
      let adjustedDiff = newDiff
      if ((curSlideRef.current === 0 && newDiff < 0) || (curSlideRef.current === numOfSlides && newDiff > 0)) {
        adjustedDiff = newDiff / 2
      }
      currentDiff = adjustedDiff
      setDiff(adjustedDiff)

      if (sliderRef.current) {
        sliderRef.current.style.transform = `translate3d(${-curSlideRef.current * 100 - adjustedDiff}%,0,0)`
      }
      // No background movement needed - static background
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleMouseUp)

      if (animating) return
      if (Math.abs(currentDiff) < 8) {
        changeSlides(true)
        autoSlide()
        return
      }
      if (currentDiff <= -8) {
        navigateLeft()
      }
      if (currentDiff >= 8) {
        navigateRight()
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('touchmove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleMouseUp)
  }

  return (
    <div className="parallax-background">
      <section id="about" className="about">
        <div className="parallax-content-wrapper">
          <div className="slider-container">
            <div 
              className={`slider-control left ${curSlide === 0 ? 'inactive' : ''}`}
              onClick={navigateLeft}
            ></div>
            <div 
              className={`slider-control right ${curSlide === numOfSlides ? 'inactive' : ''}`}
              onClick={navigateRight}
            ></div>
            <ul className="slider-pagi">
              {[0, 1, 2].map((index) => (
                <li
                  key={index}
                  className={`slider-pagi__elem slider-pagi__elem-${index} ${curSlide === index ? 'active' : ''}`}
                  onClick={() => setCurSlide(index)}
                ></li>
              ))}
            </ul>
            <div className="about-static-background">
              <h2 className="about-static-heading">A Little About Me</h2>
              <div className="about-static-image-wrapper">
                <img 
                  className="about-static-image" 
                  src="/b&w avatar.png"
                  alt="A photo of Londeka taken at her favorite place" 
                  loading="lazy"
                />
              </div>
            </div>
            <div 
              className="slider"
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
            >
              <div className={`slide slide-0 ${curSlide === 0 ? 'active' : ''}`}>
                <div className="slide__content">
                  <svg className="slide__overlay" viewBox="0 0 720 405" preserveAspectRatio="xMaxYMax slice">
                    <path className="slide__overlay-path" d="M0,0 150,0 500,405 0,405" fill="rgba(244, 114, 182, 0.8)" />
                  </svg>
                  <div className="slide__text">
                    <h3 className="slide__text-title">Introduction</h3>
                    <p className="slide__text-desc">
                      Hello there! I'm Londeka Zikalala, I am a Full-Stack Developer and Coding Facilitator with experience in modern web development, cloud computing, and technical support. I build scalable, user-centric applications using JavaScript, TypeScript, React, Next.js, Node.js, and Python, with secure SQL and PostgreSQL databases. Certified in Huawei Cloud Computing (HCCDP) and trained through industry programmes like CodeX, I combine technical expertise, cloud awareness, and strong communication skills, with a passion for reliable software, mentorship, and continuous growth in full-stack and AI-driven systems
                    </p>
                  </div>
                </div>
              </div>

              <div className={`slide slide-1 ${curSlide === 1 ? 'active' : ''}`}>
                <div className="slide__content">
                  <svg className="slide__overlay" viewBox="0 0 720 405" preserveAspectRatio="xMaxYMax slice">
                    <path className="slide__overlay-path" d="M0,0 150,0 500,405 0,405" fill="rgba(244, 114, 182, 0.8)" />
                  </svg>
                  <div className="slide__text">
                    <div className="tech-stack-header">
                      <h3 className="slide__text-title">My Toolkit</h3>
                      <span className="tech-icon">💻</span>
                    </div>
                    <div className="tech-stack-grid">
                      {techStack.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          className="tech-item"
                          initial={{ opacity: 0, y: 20 }}
                          animate={curSlide === 1 ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{ scale: 1.1, boxShadow: '0 4px 20px rgba(244, 114, 182, 0.3)' }}
                        >
                          {/* Place tech content here, e.g. icon or label */}
                          {tech.icon && <img src={tech.icon} alt={tech.name} />}
                          <span>{tech.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-link">
            <ul>
              <li>
                <a href="#projects">
                  <img
                    src="/rocket_launch_FILL0_wght400_GRAD0_opsz24.png"
                    alt="rocket icon"
                  />
                </a>
              </li>
              <li>
                <a href="#contact">
                  <img
                    src="/chat_bubble_FILL0_wght400_GRAD0_opsz24.png"
                    alt="chat bubble icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
