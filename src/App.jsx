import React, { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollIndicator from './components/ScrollIndicator'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="app">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />
      <ScrollIndicator activeSection={activeSection} scrollToSection={scrollToSection} />
      <Header scrollToSection={scrollToSection} />
      <About />
      <Projects />
      <Contact />
      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}

export default App

