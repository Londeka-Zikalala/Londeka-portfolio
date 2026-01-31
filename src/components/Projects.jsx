import React from 'react'
import { motion } from 'framer-motion'
import './Projects.css'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Favorite Movies',
      description: 'A ReactJS app with Node and Express backend, fetches movies from TMDB and allows users to store their favorites.',
      technologies: ['React', 'Node.js', 'Express', 'TMDB API'],
      github: 'https://github.com/Londeka-Zikalala/favorite-movies-webapp',
      live: 'https://github.com/Londeka-Zikalala/favorite-movies-react'
    },
    {
      id: 2,
      title: 'ZuluZest',
      description: 'A Hackathon collaboration utilizing Google AI\'s Teachable Machine, a Zulu learning app allowing users to learn Zulu while graded by AI.',
      technologies: ['React', 'Google AI', 'Teachable Machine', 'JavaScript'],
      github: 'https://github.com/Londeka-Zikalala/pixelGiggles-learning-isiZulu',
      live: 'https://learning-isizulu.onrender.com'
    },
    {
      id: 3,
      title: 'CV Refine',
      description: 'A lightweight React application scaffolded with Vite, providing a user-friendly interface for submitting CV revamp requests. Express.js backend with NeonDB and Cloudinary.',
      technologies: ['React', 'Vite', 'Express.js', 'NeonDB', 'Cloudinary'],
      github: null,
      live: 'https://cvrefine.netlify.app/'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
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
      <section id="projects" className="projects">
        <div className="parallax-content-wrapper">
          <motion.div 
            className="projects-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h1>My Recent Work</h1>
          </motion.div>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <div className="project-card-inner">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {project.title}
              </motion.h3>
              
              <div className="project-content">
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="project-link"
                    >
                      github
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="project-link"
                    >
                      view live
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="link">
        <ul>
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

export default Projects

