// JS for intro buttons

// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Function to scroll to top (home)
function scrollToHome() {
    const home = document.getElementById('home');
    if (home) {
        home.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    } else {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
    }
}

// Event listener for "Contact Me" button
document.addEventListener("DOMContentLoaded", function() {
    // Initialize Swiper for About section carousel
    const aboutSwiper = new Swiper('.about-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.about-swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.about-swiper .swiper-button-next',
            prevEl: '.about-swiper .swiper-button-prev',
        },
        keyboard: {
            enabled: true,
        },
        effect: 'slide',
    });

    // Initialize 3D Carousel for Projects section
    const carousel = document.querySelector(".carousel");
    let currdeg = 0;

    function rotate(direction) {
        if (direction === "n") {
            currdeg = currdeg - 120;
        }
        if (direction === "p") {
            currdeg = currdeg + 120;
        }
        carousel.style.transform = "rotateY(" + currdeg + "deg)";
        carousel.style.webkitTransform = "rotateY(" + currdeg + "deg)";
        carousel.style.mozTransform = "rotateY(" + currdeg + "deg)";
        carousel.style.oTransform = "rotateY(" + currdeg + "deg)";
    }

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    
    if (nextBtn) {
        nextBtn.addEventListener("click", () => rotate("n"));
    }
    if (prevBtn) {
        prevBtn.addEventListener("click", () => rotate("p"));
    }

    const contactBtn = document.querySelector(".intro-contact-btn");
    if (contactBtn) {
        contactBtn.addEventListener("click", () => {
            scrollToSection("contact");
        });
    }

    // Event listener for "View My Work" button
    const projectBtn = document.querySelector(".intro-project-btn");
    if (projectBtn) {
        projectBtn.addEventListener("click", () => {
            scrollToSection("projects");
        });
    }
    
    // Set up navigation links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId === '' || targetId === 'home') {
                scrollToHome();
            } else {
                scrollToSection(targetId);
            }
        });
    });
    
    // Handle index.html links (home)
    document.querySelectorAll('a[href="index.html"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToHome();
        });
    });

    // Scroll indicator functionality
    const scrollBars = document.querySelectorAll('.scroll-bar');
    const sections = ['home', 'about', 'projects', 'contact'];

    function updateActiveSection() {
        // Remove active from all bars first
        scrollBars.forEach(bar => bar.classList.remove('active'));
        
        let activeIndex = 0;
        let minDistance = Infinity;
        
        sections.forEach((sectionId, index) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const rect = section.getBoundingClientRect();
                // With scroll-snap, find section closest to top of viewport
                const distanceFromTop = Math.abs(rect.top);
                
                if (distanceFromTop < minDistance) {
                    minDistance = distanceFromTop;
                    activeIndex = index;
                }
            }
        });
        
        // Update active class
        if (scrollBars[activeIndex]) {
            scrollBars[activeIndex].classList.add('active');
        }
    }

    // Make scroll bars clickable
    scrollBars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            const sectionId = sections[index];
            if (sectionId === 'home') {
                scrollToHome();
            } else {
                scrollToSection(sectionId);
            }
        });
    });

    // Update on scroll
    function onScroll() {
        updateActiveSection();
    }

    // Use multiple event listeners for better detection
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scrollend', updateActiveSection, { passive: true });
    
    // Initial update
    setTimeout(() => {
        updateActiveSection();
    }, 100);
    
    // Update periodically to catch scroll-snap changes
    setInterval(updateActiveSection, 200);
});


document.addEventListener("DOMContentLoaded", function () {
    const commonImageUrl = "./images-and-files/Projects-illustration.jpg";
                          
   // Function to set the common image for project images
function setCommonImage(containerId) {
    const projectContainer = document.getElementById(containerId);
    const projectImages = projectContainer ? projectContainer.querySelectorAll(".projectimg img") : [];
    projectImages.forEach((img) => {
        // Check if the image is not inside the links section
        if (!img.closest(".link")) {
            img.src = commonImageUrl;
        }
    });
}

    // Function to handle project click and display floating description
    function handleProjectClick(description) {
        // Create a floating element
        const floatingDescription = document.createElement("div");
        floatingDescription.classList.add("floating-description");
        floatingDescription.innerHTML = `
            <p>${description}</p>
            <button class="close-btn">Close</button>
        `;

        // Append the floating element to the body
        document.body.appendChild(floatingDescription);

        // Add event listener for the close button
        const closeBtn = floatingDescription.querySelector(".close-btn");
        if (closeBtn) {
            closeBtn.addEventListener("click", closeFloatingDescription);
        }
    }

    // Function to close the floating description
    function closeFloatingDescription() {
        const floatingDescription = document.querySelector(".floating-description");
        if (floatingDescription) {
            floatingDescription.remove();
        }
    }

    // Add event listeners for each project image
    document.querySelectorAll(".projectimg img").forEach((img) => {
        img.addEventListener("click", () => {
            // Get the closest parent element with a class starting with "img"
            const projectContainer = img.closest('[class^="img"]');
            if (projectContainer) {
                // Check for the img elements inside the specific project container
                const projectImages = projectContainer.querySelectorAll("img");
                projectImages.forEach((projectImg) => {
                    const projectId = projectContainer.classList[0];
                    const description = getProjectDescription(projectId);
                    handleProjectClick(projectId, description);
                });
            }
        });
    });

    // Function to get project description (replace with actual data retrieval logic)
    function getProjectDescription(projectId) {
        // descriptions
        const descriptions = {
            "img1": `A ReactJS app flavored with Node and Express in the backend, fetches some movies from TMDB and allows users to store their favorites. View on 
            <a href="https://github.com/Londeka-Zikalala/favorite-movies-webapp" target="_blank">GitHub</a> and 
            <a href="https://github.com/Londeka-Zikalala/favorite-movies-react" target="_blank">gh-pages</a>.`,
        
            "img2": `A Hackathon Collaboration utilizing Google AI's Teachable Machine, a Zulu learning app allowing a user to learn Zulu while graded by AI. View
            <a href="https://github.com/Londeka-Zikalala/pixelGiggles-learning-isiZulu" target="_blank">GitHub Repo Link</a> and 
            <a href="https://learning-isizulu.onrender.com" target="_blank"> App on Render</a>.`,
            
             "img3": `A lightweight React application, scaffolded with Vite, that provides a user-friendly interface for submitting CV revamp requests. Its Express.js backend leverages NeonDB for data storage and Cloudinary for secure file hosting.
            <a href="https://cvrefine.netlify.app/" target="_blank">CVRefine</a>.`
        };
        
        return descriptions[projectId] || "No description available.";
    }

    // Set common image for frontend projects
    setCommonImage("frontend-projects");

    // Set common image for full-stack projects
    setCommonImage("full-stack-projects");
});

//JS FOR THE FORM SUBMISSION
document.addEventListener("DOMContentLoaded", function () {
    const loader = document.getElementById('form-loader');
    const submitButton = document.querySelector('.submit-button');
    const formMessage = document.getElementById('form-message');
    const form = document.querySelector('.contact-form form');
    const contactForm = document.getElementById('contact-form');
    const resendContainer = document.getElementById('resend-container');
    const resendButton = document.getElementById('resend-button');
    const successMessagePersistent = document.getElementById('success-message-persistent');
    
    // Function to show validation message
    function showMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'form-message active ' + type;
            
            // Auto-hide after 3 seconds (only for errors)
            if (type === 'error') {
                setTimeout(() => {
                    formMessage.classList.remove('active');
                }, 3000);
            }
        }
    }
    
    // Function to show persistent success message in resend container
    function showSuccessMessagePersistent(text) {
        if (successMessagePersistent) {
            successMessagePersistent.textContent = text;
            successMessagePersistent.className = 'form-message success-message-persistent success';
        }
    }
    
    // Function to hide form and show resend button
    function hideFormAndShowResend() {
        if (contactForm) {
            contactForm.classList.add('hidden');
        }
        if (resendContainer) {
            resendContainer.style.display = 'flex';
        }
    }
    
    // Function to show form and hide resend button
    function showFormAndHideResend() {
        if (contactForm) {
            contactForm.classList.remove('hidden');
        }
        if (resendContainer) {
            resendContainer.style.display = 'none';
        }
        // Hide any messages
        if (formMessage) {
            formMessage.classList.remove('active');
        }
        if (successMessagePersistent) {
            successMessagePersistent.textContent = '';
            successMessagePersistent.className = 'form-message success-message-persistent';
        }
    }
    
    // Event listener for resend button
    if (resendButton) {
        resendButton.addEventListener('click', function() {
            showFormAndHideResend();
        });
    }
    
    //function to submit the form to the database
    function submitForm() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Hide any previous messages
        if (formMessage) {
            formMessage.classList.remove('active');
        }
        
        // Show loader and disable button
        if (loader) {
            loader.classList.add('active');
        }
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.style.opacity = '0.6';
            submitButton.style.cursor = 'not-allowed';
        }
    
        const formData = {
            name: name,
            email: email,
            message: message,
        };
    //post the message
        fetch('https://portfolio-server-yhj6.onrender.com/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                
                // Check server response status
                if (data.status === 'success') {
                    // Clear form on success
                    if (form) {
                        form.reset();
                    }
                    // Hide form and show resend button with persistent success message
                    hideFormAndShowResend();
                    showSuccessMessagePersistent('Thanks for contacting me, Will get back to you soon! (:');
                } else {
                    // Show server error message and keep form visible
                    showMessage(data.message || 'Something went wrong. Please try again.', 'error');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Show error message and keep form visible
                showMessage('Oops! Something went wrong. Please try again later.', 'error');
            })
            .finally(() => {
                // Hide loader and re-enable button
                if (loader) {
                    loader.classList.remove('active');
                }
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.style.opacity = '1';
                    submitButton.style.cursor = 'pointer';
                }
            });
    }
    //event listener for the submit button
    const submit = document.querySelector('.submit-button')
    if (submit) {
        submit.addEventListener('click', function(event) {
            event.preventDefault(); 
            submitForm();
        });
    }
});

// Set current year dynamically in footer
document.addEventListener("DOMContentLoaded", function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});


