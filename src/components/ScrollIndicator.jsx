import React from 'react'
import './ScrollIndicator.css'

const ScrollIndicator = ({ activeSection, scrollToSection }) => {
  const sections = ['home', 'about', 'projects', 'contact']

  return (
    <div className="scroll-indicator">
      {sections.map((section) => (
        <div
          key={section}
          className={`scroll-bar ${activeSection === section ? 'active' : ''}`}
          data-section={section}
          onClick={() => scrollToSection(section)}
        />
      ))}
    </div>
  )
}

export default ScrollIndicator

