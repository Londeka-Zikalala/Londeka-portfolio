import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './About.css'

const About = () => {
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

  return (
    <section id="about" className="about">
      <motion.h1 
        className="about-h1"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        A Little About Me
      </motion.h1>
      <div className="about-content">
        <motion.div 
          className="aboutImg"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <img 
            className="aboutImage" 
            src="/images-and-files/b&w avatar.png"
            alt="A photo of Londeka taken at her favorite place" 
            loading="lazy"
          />
        </motion.div>
        <div className="about-carousel-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 10000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="about-swiper"
            watchSlidesProgress={true}
            preventClicks={false}
            preventClicksPropagation={false}
          >
            <SwiperSlide>
              <motion.div 
                className="about-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3>Introduction</h3>
                <p className="about-text">
                  Hello there! I'm Londeka Zikalala, I am a Full-Stack Developer and Coding Facilitator with experience in modern web development, cloud computing, and technical support. I build scalable, user-centric applications using JavaScript, TypeScript, React, Next.js, Node.js, and Python, with secure SQL and PostgreSQL databases. Certified in Huawei Cloud Computing (HCCDP) and trained through industry programmes like CodeX, I combine technical expertise, cloud awareness, and strong communication skills, with a passion for reliable software, mentorship, and continuous growth in full-stack and AI-driven systems
                </p>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div 
                className="about-card tech-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="tech-stack-header">
                  <h3>My Toolkit</h3>
                  <span className="tech-icon">💻</span>
                </div>
                <div className="tech-stack-grid">
                  {techStack.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      className="tech-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <div className="tech-icon-wrapper">
                        <img 
                          src={tech.icon} 
                          alt={tech.name}
                          className="tech-logo"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'block'
                          }}
                        />
                        <span className="tech-fallback" style={{ display: 'none' }}>
                          {tech.name.charAt(0)}
                        </span>
                      </div>
                      <span className="tech-label">{tech.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </SwiperSlide>
            <SwiperSlide>
              <motion.div 
                className="about-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3>Aspirations</h3>
                <p className="about-text">
                  I'm continually seeking fresh challenges to enhance my skills and knowledge.
                  My aspiration is to evolve into a proficient developer capable of crafting innovative web applications and software solutions that are digitally inclusive,
                  and offer an exceptional user experience.
                  Explore some of my projects on <a target="_blank" rel="noopener noreferrer" href="https://github.com/Londeka-Zikalala"><b>GitHub</b></a>, and download my <a target="_blank" rel="noopener noreferrer" href="/images-and-files/_LL Zikalala CV.pdf"><b>CV</b></a> here.
                </p>
              </motion.div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="about-link">
        <ul>
          <li>
            <a href="#projects">
              <img
                src="/images-and-files/rocket_launch_FILL0_wght400_GRAD0_opsz24.png"
                alt="rocket icon"
              />
            </a>
          </li>
          <li>
            <a href="#contact">
              <img
                src="/images-and-files/chat_bubble_FILL0_wght400_GRAD0_opsz24.png"
                alt="chat bubble icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default About

