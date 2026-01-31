import React, { useEffect, useRef, useState } from 'react'
import './ParallaxContainer.css'

const ParallaxContainer = ({ children }) => {
  const [currentSlideNumber, setCurrentSlideNumber] = useState(0)
  const [ticking, setTicking] = useState(false)
  const containerRef = useRef(null)
  const sectionsRef = useRef([])
  const currentSlideRef = useRef(0)

  // Detect browser
  const isFirefox = typeof navigator !== 'undefined' && /Firefox/i.test(navigator.userAgent)
  const isIe = typeof navigator !== 'undefined' && ((/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent)))

  const scrollSensitivitySetting = 30
  const slideDurationSetting = 600

  // Throttle function
  const throttle = (func, limit) => {
    let inThrottle
    return function(...args) {
      if (!inThrottle) {
        const result = func.apply(this, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
        return result
      } else {
        // While throttled, explicitly return true to indicate the event
        // should be treated as handled (so callers may preventDefault).
        return true
      }
    }
  }

  useEffect(() => {
    // Get all background sections (excluding footer)
    const backgrounds = containerRef.current?.querySelectorAll('.parallax-background') || []
    sectionsRef.current = Array.from(backgrounds)

    const totalSlideNumber = sectionsRef.current.length

    const slideDurationTimeout = (slideDuration) => {
      setTimeout(() => {
        setTicking(false)
      }, slideDuration)
    }

    const nextItem = () => {
      // When scrolling down, mark the previous slide as down-scroll
      const previousSlide = sectionsRef.current[currentSlideRef.current - 1]
      if (previousSlide) {
        previousSlide.classList.remove('up-scroll')
        previousSlide.classList.add('down-scroll')
      }
    }

    const previousItem = () => {
      // When scrolling up, we're going to a previous slide
      // Remove down-scroll from all slides after the current one
      for (let i = currentSlideRef.current + 1; i < totalSlideNumber; i++) {
        const slide = sectionsRef.current[i]
        if (slide) {
          slide.classList.remove('down-scroll')
          slide.classList.remove('up-scroll')
        }
      }
      // Add up-scroll to the slide we're going to (current one after decrement)
      const currentSlide = sectionsRef.current[currentSlideRef.current]
      if (currentSlide) {
        currentSlide.classList.remove('down-scroll')
        currentSlide.classList.add('up-scroll')
      }
    }

    const parallaxScroll = (evt) => {
      // Check if we're at the last slide and scrolling down - allow normal scroll to footer
      if (currentSlideRef.current === totalSlideNumber - 1) {
        const isScrollingDown = evt.deltaY > 0 || (evt.wheelDelta && evt.wheelDelta < 0) || (evt.detail && evt.detail > 0)
        if (isScrollingDown) {
          // Allow normal scroll to footer - don't prevent default
          return false
        }
      }

      let delta = 0

      if (isFirefox) {
        delta = evt.detail * (-120)
      } else if (isIe) {
        delta = -evt.deltaY
      } else {
        delta = evt.wheelDelta || -evt.deltaY
      }

      if (!ticking) {
        if (delta <= -scrollSensitivitySetting) {
          // Down scroll
          setTicking(true)
          if (currentSlideRef.current !== totalSlideNumber - 1) {
            currentSlideRef.current++
            setCurrentSlideNumber(currentSlideRef.current)
            nextItem()
          }
          slideDurationTimeout(slideDurationSetting)
        }
        if (delta >= scrollSensitivitySetting) {
          // Up scroll
          setTicking(true)
          if (currentSlideRef.current !== 0) {
            currentSlideRef.current--
            setCurrentSlideNumber(currentSlideRef.current)
            previousItem()
          }
          slideDurationTimeout(slideDurationSetting)
        }
      }
      
      return true // Prevent default scroll
    }

    const throttledParallaxScroll = throttle(parallaxScroll, 60)
    const mousewheelEvent = isFirefox ? 'DOMMouseScroll' : 'wheel'

    const handleWheel = (evt) => {
      // Only intercept wheel events when the parallax container is visible
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const containerVisible = rect.top < window.innerHeight && rect.bottom > 0
      if (!containerVisible) {
        // Let the browser handle scrolling when the parallax is off-screen
        return
      }

      const shouldPreventDefault = throttledParallaxScroll(evt)
      if (shouldPreventDefault !== false) {
        evt.preventDefault()
      }
      // If false, allow default scroll behavior (for footer)
    }

    window.addEventListener(mousewheelEvent, handleWheel, { passive: false })

    // Handle the case where the user scrolls down from the last parallax slide
    // to the footer (allow normal scroll), and when they scroll up from the
    // footer we want to snap back to the last parallax slide and re-activate
    // the parallax behaviour.
    const footer = document.querySelector('footer')
    const handleFooterWheel = (evt) => {
      if (!footer) return

      // Determine if footer is currently visible in viewport
      const rect = footer.getBoundingClientRect()
      const footerVisible = rect.top < window.innerHeight && rect.bottom > 0

      // Normalize delta for wheel events
      let delta = 0
      if (isFirefox) {
        delta = evt.detail * (-120)
      } else if (isIe) {
        delta = -evt.deltaY
      } else {
        delta = evt.wheelDelta || -evt.deltaY
      }

      const isScrollingUp = delta >= scrollSensitivitySetting

      // If we're inside the footer and the user scrolls up, snap back
      if (footerVisible && isScrollingUp) {
        // Prevent the default page scroll so we can snap smoothly
        evt.preventDefault()

        const totalSlideNumber = sectionsRef.current.length
        const lastIndex = totalSlideNumber - 1
        const lastSlide = sectionsRef.current[lastIndex]
        if (lastSlide && containerRef.current) {
          // Compute the document scroll position for the last slide so the
          // footer is hidden after snapping up. Each slide corresponds to
          // one viewport height within the parallax container.
          const containerTop = containerRef.current.offsetTop || 0
          const targetScroll = containerTop + lastIndex * window.innerHeight

          // Smoothly scroll the document to the last slide position. This
          // ensures the footer is moved out of the viewport instead of
          // remaining visible over the parallax background.
          window.scrollTo({ top: targetScroll, behavior: 'smooth' })

          currentSlideRef.current = lastIndex
          setCurrentSlideNumber(lastIndex)

          // Ensure classes reflect an upward arrival from the footer
          for (let i = 0; i < totalSlideNumber; i++) {
            const s = sectionsRef.current[i]
            if (!s) continue
            s.classList.remove('down-scroll')
            s.classList.remove('up-scroll')
          }
          lastSlide.classList.add('up-scroll')
        }
      }
    }

    // Attach the footer wheel handler to the footer element when possible
    // so it only intercepts wheel events that occur over the footer itself.
    const footerListenerTarget = footer || window
    footerListenerTarget.addEventListener(mousewheelEvent, handleFooterWheel, { passive: false })

    return () => {
      window.removeEventListener(mousewheelEvent, handleWheel)
      footerListenerTarget.removeEventListener(mousewheelEvent, handleFooterWheel)
    }
  }, [ticking, isFirefox, isIe])

  return (
    <div className="parallax-container" ref={containerRef}>
      {children}
    </div>
  )
}

export default ParallaxContainer

