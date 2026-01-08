import React from 'react'
import './Navigation.css'

const Navigation = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <div className="nav-name">
          <a 
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
          >
            Londeka Zikalala
          </a>
        </div>
        <ul className="nav-links">
          {navItems.map(item => (
            <li key={item.id}>
              <a 
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(item.id)
                }}
                className={activeSection === item.id ? 'active' : ''}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

