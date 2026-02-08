/* ===========================================
   CONSOLIDATED JAVASCRIPT FROM ALL MODULES
   Generated from HTML modules
   =========================================== */

// ======================== 
//  access_sharing.html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section, .activity');
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));
            
            document.getElementById('progressFill').style.width = `${scrollPercent}%`;
            document.getElementById('progressPercent').textContent = `${scrollPercent}%`;
            
            // Update sidebar active link
            updateActiveSidebarLink();
        }
        
        function updateActiveSidebarLink() {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            const sections = document.querySelectorAll('.section, .activity');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = '#' + section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.getElementById('checkQuiz').addEventListener('click', function() {
            let score = 0;
            const questions = document.querySelectorAll('#activity-8 .quiz-question');
            
            questions.forEach((question, index) => {
                const selectedOption = question.nextElementSibling.querySelector('input:checked');
                if (selectedOption) {
                    const isCorrect = selectedOption.parentElement.getAttribute('data-correct') === 'true';
                    if (isCorrect) score++;
                }
            });
            
            const feedback = document.getElementById('quizFeedback');
            feedback.textContent = `You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent!' : score >= questions.length/2 ? 'Good job!' : 'Try again!'}`;
            feedback.className = `quiz-feedback ${score === questions.length ? 'correct' : 'incorrect'}`;
        });
        
        document.getElementById('checkFinalQuiz').addEventListener('click', function() {
            let score = 0;
            const questions = document.querySelectorAll('#activity-19 .quiz-question');
            
            questions.forEach((question, index) => {
                const selectedOption = question.nextElementSibling.querySelector('input:checked');
                if (selectedOption) {
                    const isCorrect = selectedOption.parentElement.getAttribute('data-correct') === 'true';
                    if (isCorrect) score++;
                }
            });
            
            const feedback = document.getElementById('finalQuizFeedback');
            feedback.textContent = `You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Perfect! You really understand information access and sharing!' : score >= 4 ? 'Well done! You have a good understanding.' : 'Review the material and try again.'}`;
            feedback.className = `quiz-feedback ${score === questions.length ? 'correct' : score >= 4 ? 'correct' : 'incorrect'}`;
        });
        
        // Quiz option selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const inputs = this.querySelector('input');
                if (inputs) inputs.checked = true;
                
                // Clear other selections in the same question
                const questionGroup = this.closest('.quiz-options');
                questionGroup.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.classList.add('selected');
            });
        });
        
        // Print functionality
        document.getElementById('printModule').addEventListener('click', () => {
            window.print();
        });
        
        // Save progress (simulated)
        document.getElementById('saveProgress').addEventListener('click', () => {
            const progress = document.getElementById('progressPercent').textContent;
            alert(`Progress saved: ${progress} complete. In a real application, this would save to your account.`);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize progress on load
        updateProgress();
    

// ======================== 
//  computer hardware.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add check answer buttons dynamically
        document.querySelectorAll('.quiz').forEach(quiz => {
            const btn = document.createElement('button');
            btn.className = 'btn-check';
            btn.style.cssText = `
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
                margin-top: 1rem;
                display: block;
            `;
            btn.textContent = 'Check Answer';
            btn.onmouseover = function() { this.style.backgroundColor = '#3a5a85'; };
            btn.onmouseout = function() { this.style.backgroundColor = 'var(--primary)'; };
            
            // Find the last element before the feedback divs to insert before
            const quizOptions = quiz.querySelector('.quiz-options');
            if (quizOptions) {
                quiz.insertBefore(btn, quizOptions.nextSibling);
            }
        });
        
        // Interactive hardware identification
        document.addEventListener('DOMContentLoaded', function() {
            // Add click events to part cards for interactive learning
            document.querySelectorAll('.part-card').forEach(card => {
                card.addEventListener('click', function() {
                    const deviceName = this.querySelector('h4').textContent;
                    const category = this.querySelector('.part-category').textContent;
                    
                    // Create a simple alert with device info
                    alert(`Device: ${deviceName}\nCategory: ${category}\n\nClick OK to continue learning.`);
                });
            });
        });
    

// ======================== 
//  file and folder management.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add check answer buttons dynamically
        document.querySelectorAll('.quiz').forEach(quiz => {
            const btn = document.createElement('button');
            btn.className = 'btn-check';
            btn.style.cssText = `
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
                margin-top: 1rem;
                display: block;
            `;
            btn.textContent = 'Check Answer';
            btn.onmouseover = function() { this.style.backgroundColor = '#21867a'; };
            btn.onmouseout = function() { this.style.backgroundColor = 'var(--primary)'; };
            
            // Find the last element before the feedback divs to insert before
            const quizOptions = quiz.querySelector('.quiz-options');
            if (quizOptions) {
                quiz.insertBefore(btn, quizOptions.nextSibling);
            }
        });
        
        // Interactive data unit converter
        document.addEventListener('DOMContentLoaded', function() {
            // Create a simple interactive converter if desired
            // This could be expanded to include an actual converter
            console.log('File Management module loaded successfully');
        });
    

// ======================== 
//  Health and safety  (2).html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section, .activity');
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));
            
            document.getElementById('progressFill').style.width = `${scrollPercent}%`;
            document.getElementById('progressPercent').textContent = `${scrollPercent}%`;
            
            // Update sidebar active link
            updateActiveSidebarLink();
        }
        
        function updateActiveSidebarLink() {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            const sections = document.querySelectorAll('.section, .activity');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = '#' + section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.getElementById('checkQuiz').addEventListener('click', function() {
            let score = 0;
            const questions = document.querySelectorAll('#activity-8 .quiz-question');
            
            questions.forEach((question, index) => {
                const selectedOption = question.nextElementSibling.querySelector('input:checked');
                if (selectedOption) {
                    const isCorrect = selectedOption.parentElement.getAttribute('data-correct') === 'true';
                    if (isCorrect) score++;
                }
            });
            
            const feedback = document.getElementById('quizFeedback');
            feedback.textContent = `You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent! You have mastered health and safety in ICT!' : score >= 3 ? 'Good job! You understand the key concepts.' : 'Review the material and try again.'}`;
            feedback.className = `quiz-feedback ${score === questions.length ? 'correct' : score >= 3 ? 'correct' : 'incorrect'}`;
        });
        
        // Quiz option selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const inputs = this.querySelector('input');
                if (inputs) inputs.checked = true;
                
                // Clear other selections in the same question
                const questionGroup = this.closest('.quiz-options');
                questionGroup.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.classList.add('selected');
            });
        });
        
        // Print functionality
        document.getElementById('printModule').addEventListener('click', () => {
            window.print();
        });
        
        // Save progress (simulated)
        document.getElementById('saveProgress').addEventListener('click', () => {
            const progress = document.getElementById('progressPercent').textContent;
            alert(`Progress saved: ${progress} complete. In a real application, this would save to your account.`);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize progress on load
        updateProgress();
    

// ======================== 
//  Health and safety .html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section, .activity');
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));
            
            document.getElementById('progressFill').style.width = `${scrollPercent}%`;
            document.getElementById('progressPercent').textContent = `${scrollPercent}%`;
            
            // Update sidebar active link
            updateActiveSidebarLink();
        }
        
        function updateActiveSidebarLink() {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            const sections = document.querySelectorAll('.section, .activity');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = '#' + section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.getElementById('checkQuiz').addEventListener('click', function() {
            let score = 0;
            const questions = document.querySelectorAll('#activity-8 .quiz-question');
            
            questions.forEach((question, index) => {
                const selectedOption = question.nextElementSibling.querySelector('input:checked');
                if (selectedOption) {
                    const isCorrect = selectedOption.parentElement.getAttribute('data-correct') === 'true';
                    if (isCorrect) score++;
                }
            });
            
            const feedback = document.getElementById('quizFeedback');
            feedback.textContent = `You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent! You have mastered health and safety in ICT!' : score >= 3 ? 'Good job! You understand the key concepts.' : 'Review the material and try again.'}`;
            feedback.className = `quiz-feedback ${score === questions.length ? 'correct' : score >= 3 ? 'correct' : 'incorrect'}`;
        });
        
        // Quiz option selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const inputs = this.querySelector('input');
                if (inputs) inputs.checked = true;
                
                // Clear other selections in the same question
                const questionGroup = this.closest('.quiz-options');
                questionGroup.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.classList.add('selected');
            });
        });
        
        // Print functionality
        document.getElementById('printModule').addEventListener('click', () => {
            window.print();
        });
        
        // Save progress (simulated)
        document.getElementById('saveProgress').addEventListener('click', () => {
            const progress = document.getElementById('progressPercent').textContent;
            alert(`Progress saved: ${progress} complete. In a real application, this would save to your account.`);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize progress on load
        updateProgress();
    

// ======================== 
//  information_access_and_sharing_and_security.html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Tab functionality
        document.querySelectorAll('.tab-header').forEach(header => {
            header.addEventListener('click', () => {
                const tabId = header.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                const parent = header.closest('.tabs');
                
                // Deactivate all tabs in this group
                parent.querySelectorAll('.tab-header').forEach(h => h.classList.remove('active'));
                parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // Activate selected tab
                header.classList.add('active');
                tabContent.classList.add('active');
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));
            
            document.getElementById('progressFill').style.width = `${scrollPercent}%`;
            document.getElementById('progressPercent').textContent = `${scrollPercent}%`;
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                // Clear previous selections
                this.parentElement.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Select this option
                this.classList.add('selected');
                
                // Show feedback
                const feedback = document.getElementById('quizFeedback');
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                feedback.textContent = isCorrect 
                    ? 'Correct! The encryption backdoor debate is indeed a classic example of the tension between access (for law enforcement) and security (for all users).' 
                    : 'Not quite. While this tension is involved, the encryption backdoor debate is primarily about balancing access needs with security requirements.';
                
                feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
            });
        });
        
        // Triad visualization interaction
        function showInfo(type) {
            const info = {
                access: 'Information Access: The ability to obtain, retrieve, and utilize information resources. It encompasses availability, findability, and usability.',
                sharing: 'Information Sharing: The distribution and exchange of information between individuals, groups, organizations, or systems.',
                security: 'Information Security: The practice of protecting information from unauthorized access, use, disclosure, disruption, modification, or destruction.'
            };
            
            alert(info[type]);
        }
        
        // Print functionality
        document.getElementById('printPage').addEventListener('click', () => {
            window.print();
        });
        
        // Download as PDF (simulated)
        document.getElementById('downloadPDF').addEventListener('click', () => {
            alert('PDF download would be implemented with a server-side PDF generation service in a real application.');
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize first tab as active on page load
        document.querySelectorAll('.tabs').forEach(tabGroup => {
            const firstHeader = tabGroup.querySelector('.tab-header');
            const firstTab = tabGroup.querySelector('.tab-content');
            
            if (firstHeader && firstTab) {
                firstHeader.classList.add('active');
                firstTab.classList.add('active');
            }
        });
    

// ======================== 
//  introduction to ICT.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add check answer buttons dynamically
        document.querySelectorAll('.quiz').forEach(quiz => {
            const btn = document.createElement('button');
            btn.className = 'btn-check';
            btn.style.cssText = `
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
                margin-top: 1rem;
                display: block;
            `;
            btn.textContent = 'Check Answer';
            btn.onmouseover = function() { this.style.backgroundColor = '#2a65c0'; };
            btn.onmouseout = function() { this.style.backgroundColor = 'var(--primary)'; };
            
            // Find the last element before the feedback divs to insert before
            const quizOptions = quiz.querySelector('.quiz-options');
            if (quizOptions) {
                quiz.insertBefore(btn, quizOptions.nextSibling);
            }
        });
    

// ======================== 
//  PowerPoint.html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Update progress based on scroll position
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update section count based on scroll
            let visibleSection = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2) {
                    visibleSection = index + 1;
                }
            });
            
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                const totalSections = sections.length;
                progressText.innerHTML = `<span>${Math.round(scrollPercentage)}% Complete</span><span>${visibleSection} of ${totalSections} Sections</span>`;
            }
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionContainer = this.closest('.quiz');
                const options = questionContainer.querySelectorAll('.quiz-option');
                const feedback = questionContainer.querySelector('.quiz-feedback');
                
                // Remove selected class from all options in this question
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Check if answer is correct
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                // Show feedback
                feedback.textContent = isCorrect ? 
                    "✓ Correct! Well done." : 
                    "✗ Incorrect. Review the material and try again.";
                feedback.className = isCorrect ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    navOverlay.classList.remove('active');
                }
            });
        });
    

// ======================== 
//  software.html\n// ======================== 

        // Simple progress tracking
        document.addEventListener('DOMContentLoaded', function() {
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = '20%';
        });
    

// ======================== 
//  spreadsheets 1.html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Update progress based on scroll position
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollPosition / documentHeight) * 100;
            
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update section count based on scroll
            let visibleSection = 0;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight / 2) {
                    visibleSection = index + 1;
                }
            });
            
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                const totalSections = sections.length;
                progressText.innerHTML = `<span>${Math.round(scrollPercentage)}% Complete</span><span>${visibleSection} of ${totalSections} Sections</span>`;
            }
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const questionContainer = this.closest('.quiz');
                const options = questionContainer.querySelectorAll('.quiz-option');
                const feedback = questionContainer.querySelector('.quiz-feedback');
                
                // Remove selected class from all options in this question
                options.forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Check if answer is correct
                const isCorrect = this.getAttribute('data-correct') === 'true';
                
                // Show feedback
                feedback.textContent = isCorrect ? 
                    "✓ Correct! Well done." : 
                    "✗ Incorrect. Review the material and try again.";
                feedback.className = isCorrect ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                    navOverlay.classList.remove('active');
                }
            });
        });
    

// ======================== 
//  system security and data security .html\n// ======================== 

        // Mobile navigation toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section, .activity');
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - viewportHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollPercent = Math.min(100, Math.round((scrollTop / documentHeight) * 100));
            
            document.getElementById('progressFill').style.width = `${scrollPercent}%`;
            document.getElementById('progressPercent').textContent = `${scrollPercent}%`;
            
            // Update sidebar active link
            updateActiveSidebarLink();
        }
        
        function updateActiveSidebarLink() {
            const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
            const sections = document.querySelectorAll('.section, .activity');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = '#' + section.id;
                }
            });
            
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateProgress);
        window.addEventListener('load', updateProgress);
        
        // Quiz functionality
        document.getElementById('checkQuiz').addEventListener('click', function() {
            let score = 0;
            const questions = document.querySelectorAll('#activity-12 .quiz-question');
            
            questions.forEach((question, index) => {
                const selectedOption = question.nextElementSibling.querySelector('input:checked');
                if (selectedOption) {
                    const isCorrect = selectedOption.parentElement.getAttribute('data-correct') === 'true';
                    if (isCorrect) score++;
                }
            });
            
            const feedback = document.getElementById('quizFeedback');
            feedback.textContent = `You scored ${score} out of ${questions.length}. ${score === questions.length ? 'Excellent! You have mastered system and data security!' : score >= 3 ? 'Good job! You understand the key security concepts.' : 'Review the material and try again.'}`;
            feedback.className = `quiz-feedback ${score === questions.length ? 'correct' : score >= 3 ? 'correct' : 'incorrect'}`;
        });
        
        // Quiz option selection
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                const inputs = this.querySelector('input');
                if (inputs) inputs.checked = true;
                
                // Clear other selections in the same question
                const questionGroup = this.closest('.quiz-options');
                questionGroup.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                this.classList.add('selected');
            });
        });
        
        // Print functionality
        document.getElementById('printModule').addEventListener('click', () => {
            window.print();
        });
        
        // Save progress (simulated)
        document.getElementById('saveProgress').addEventListener('click', () => {
            const progress = document.getElementById('progressPercent').textContent;
            alert(`Progress saved: ${progress} complete. In a real application, this would save to your account.`);
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Initialize progress on load
        updateProgress();
    

// ======================== 
//  ticking timer..html\n// ======================== 

/*
  Ticking timer with small scheduler and Web Audio API
  - Schedules ticks slightly ahead to avoid jitter
  - No external audio files: uses short noise burst + click via oscillator + gain envelope
*/

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const muteBtn = document.getElementById('muteBtn');
const bpmEl = document.getElementById('bpm');
const volumeEl = document.getElementById('volume');
const bpmDisplay = document.getElementById('bpmDisplay');
const pulseEl = document.getElementById('pulse');
const accentEl = document.getElementById('accent');

let audioCtx = null;
let masterGain = null;
let isRunning = false;
let nextNoteTime = 0;
let scheduleInterval = null;
let lookahead = 0.1; // seconds to schedule ahead
let schedulerTimerID = null;
let currentBeat = 0;

function ensureAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = parseFloat(volumeEl.value);
    masterGain.connect(audioCtx.destination);
  }
}

// synthesize a very short tick (combined tiny oscillator click + filtered noise)
function scheduleTick(time, strong=false) {
  if (!audioCtx) return;

  // tiny oscillator pulse
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'square';
  osc.frequency.value = strong ? 1400 : 1000; // slightly different timbre for accent
  g.gain.setValueAtTime(0, time);
  g.gain.linearRampToValueAtTime(0.9, time + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.065);

  osc.connect(g);

  // filtered noise layer for more clickiness
  const bufferSize = 0.1 * audioCtx.sampleRate;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (strong ? 0.4 : 0.25);
  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(strong ? 0.6 : 0.4, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.06);

  const lp = audioCtx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = strong ? 4000 : 3500;

  noise.connect(noiseGain);
  noiseGain.connect(lp);
  lp.connect(g);

  // route to master gain
  g.connect(masterGain);

  // start/stop
  osc.start(time);
  osc.stop(time + 0.08);
  noise.start(time);
  noise.stop(time + 0.08);
}

// update visual pulse (non-blocking)
function doVisualPulse() {
  pulseEl.style.transition = 'none';
  pulseEl.style.opacity = '1';
  pulseEl.style.transform = 'scale(1)';
  setTimeout(() => {
    pulseEl.style.transition = 'opacity 420ms ease-out, transform 420ms ease-out';
    pulseEl.style.opacity = '0';
    pulseEl.style.transform = 'scale(2)';
  }, 10);
}

// scheduler: called frequently, schedules ticks slightly ahead
function scheduler() {
  if (!isRunning) return;
  const currentTime = audioCtx.currentTime;
  while (nextNoteTime < currentTime + lookahead) {
    const bpm = parseFloat(bpmEl.value);
    const secondsPerBeat = 60.0 / bpm;
    // decide if this beat is accent (every 4th by default)
    const strong = accentEl.checked && (currentBeat % 4 === 0);
    scheduleTick(nextNoteTime, strong);
    // schedule visual to run at approximately the same instant (uses setTimeout with ms offset)
    const msDelay = Math.max(0, (nextNoteTime - currentTime) * 1000);
    setTimeout(doVisualPulse, msDelay);
    nextNoteTime += secondsPerBeat;
    currentBeat = (currentBeat + 1) % 64;
  }
}

// Start the ticking
function start() {
  ensureAudio();
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  isRunning = true;
  nextNoteTime = audioCtx.currentTime + 0.05; // small lead
  currentBeat = 0;
  // run scheduler every 25ms
  if (schedulerTimerID) clearInterval(schedulerTimerID);
  schedulerTimerID = setInterval(scheduler, 25);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

// Stop the ticking
function stop() {
  isRunning = false;
  if (schedulerTimerID) {
    clearInterval(schedulerTimerID);
    schedulerTimerID = null;
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Mute/unmute
let wasMuted = false;
function toggleMute() {
  if (!audioCtx) ensureAudio();
  wasMuted = !wasMuted;
  masterGain.gain.value = wasMuted ? 0.0 : parseFloat(volumeEl.value);
  muteBtn.textContent = wasMuted ? 'Unmute' : 'Mute';
}

// update volume slider
volumeEl.addEventListener('input', () => {
  if (!audioCtx) return;
  if (!wasMuted) masterGain.gain.value = parseFloat(volumeEl.value);
});

// update BPM display
bpmEl.addEventListener('input', () => {
  bpmDisplay.textContent = bpmEl.value;
});

// wire buttons
startBtn.addEventListener('click', () => {
  // many browsers require this to be in user gesture event
  ensureAudio();
  start();
});
stopBtn.addEventListener('click', stop);
muteBtn.addEventListener('click', toggleMute);

// keyboard shortcut: space to toggle
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (!isRunning) {
      ensureAudio();
      start();
    } else {
      stop();
    }
  }
});

// initialize UI state
stopBtn.disabled = true;
bpmDisplay.textContent = bpmEl.value;


// ======================== 
//  Waste management (2).html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    

// ======================== 
//  Waste management.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    

// ======================== 
//  word 1.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add check answer buttons dynamically
        document.querySelectorAll('.quiz').forEach(quiz => {
            const btn = document.createElement('button');
            btn.className = 'btn-check';
            btn.style.cssText = `
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
                margin-top: 1rem;
                display: block;
            `;
            btn.textContent = 'Check Answer';
            btn.onmouseover = function() { this.style.backgroundColor = '#5a4acd'; };
            btn.onmouseout = function() { this.style.backgroundColor = 'var(--primary)'; };
            
            // Find the last element before the feedback divs to insert before
            const quizOptions = quiz.querySelector('.quiz-options');
            if (quizOptions) {
                quiz.insertBefore(btn, quizOptions.nextSibling);
            }
        });
        
        // Interactive formatting demonstration
        document.addEventListener('DOMContentLoaded', function() {
            // Add click events to formatting examples for interactive learning
            console.log('Word Processing module loaded successfully');
            
            // Example of interactive functionality that could be added:
            // Allow students to "apply" formatting to sample text
        });
    

// ======================== 
//  word processingone.html\n// ======================== 

        // Mobile Navigation Toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        const navOverlay = document.getElementById('navOverlay');
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
        });
        
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        });
        
        // Quiz functionality
        function selectOption(optionElement, questionName) {
            // Remove selected class from all options in this question
            const options = document.querySelectorAll(`[name="${questionName}"]`);
            options.forEach(opt => {
                opt.parentElement.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            optionElement.classList.add('selected');
            
            // Check the radio button
            const radioBtn = optionElement.querySelector('input[type="radio"]');
            radioBtn.checked = true;
        }
        
        function checkAnswer(questionName, correctId, correctFeedbackId, incorrectFeedbackId) {
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            if (!selectedOption) {
                alert('Please select an answer first.');
                return;
            }
            
            // Hide all feedback for this question first
            document.getElementById(correctFeedbackId).style.display = 'none';
            document.getElementById(incorrectFeedbackId).style.display = 'none';
            
            // Show correct feedback
            if (selectedOption.id === correctId) {
                document.getElementById(correctFeedbackId).style.display = 'block';
            } else {
                document.getElementById(incorrectFeedbackId).style.display = 'block';
            }
        }
        
        // Progress tracking
        function updateProgress() {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Calculate percentage scrolled
            const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;
            
            // Update progress bar
            const progressFill = document.getElementById('progressFill');
            progressFill.style.width = `${scrollPercentage}%`;
            
            // Update progress text
            const progressText = document.querySelector('.progress-text span:first-child');
            progressText.textContent = `${Math.min(100, Math.round(scrollPercentage))}% Complete`;
        }
        
        // Update progress on scroll
        window.addEventListener('scroll', updateProgress);
        
        // Initialize progress on page load
        document.addEventListener('DOMContentLoaded', updateProgress);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Add check answer buttons dynamically
        document.querySelectorAll('.quiz').forEach(quiz => {
            const btn = document.createElement('button');
            btn.className = 'btn-check';
            btn.style.cssText = `
                background-color: var(--primary);
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 600;
                transition: var(--transition);
                margin-top: 1rem;
                display: block;
            `;
            btn.textContent = 'Check Answer';
            btn.onmouseover = function() { this.style.backgroundColor = '#5a4acd'; };
            btn.onmouseout = function() { this.style.backgroundColor = 'var(--primary)'; };
            
            // Find the last element before the feedback divs to insert before
            const quizOptions = quiz.querySelector('.quiz-options');
            if (quizOptions) {
                quiz.insertBefore(btn, quizOptions.nextSibling);
            }
        });
        
        // Interactive formatting demonstration
        document.addEventListener('DOMContentLoaded', function() {
            // Add click events to formatting examples for interactive learning
            console.log('Word Processing module loaded successfully');
            
            // Example of interactive functionality that could be added:
            // Allow students to "apply" formatting to sample text
        });
    
