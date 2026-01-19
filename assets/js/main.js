document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('.input-bottom-line, .textarea-bottom-line');
            
            inputs.forEach(input => {
                if (input.value) {
                    input.parentElement.classList.add('has-value');
                }
                
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    this.parentElement.classList.remove('focused');
                    if (this.value) {
                        this.parentElement.classList.add('has-value');
                    } else {
                        this.parentElement.classList.remove('has-value');
                    }
                });
                
                input.addEventListener('input', function() {
                    if (this.tagName === 'TEXTAREA') {
                        this.style.height = 'auto';
                        this.style.height = (this.scrollHeight) + 'px';
                    }
                });
            });
            
            const visitForm = document.getElementById('visitForm');
            const privacyCheckbox = document.getElementById('privacyPolicy');
            
            visitForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const requiredFields = visitForm.querySelectorAll('[required]');
                
                requiredFields.forEach(field => {
                    const inputGroup = field.closest('.input-group-bottom') || field.closest('.checkbox-group');
                    
                    if (!field.value && field.type !== 'checkbox') {
                        isValid = false;
                        inputGroup.classList.add('error');
                    } else if (field.type === 'checkbox' && !field.checked) {
                        isValid = false;
                        inputGroup.classList.add('error');
                    } else {
                        inputGroup.classList.remove('error');
                    }
                });
                
                if (isValid) {
                    alert('Solicitação enviada com sucesso! Entraremos em contato em breve para confirmar sua visita.');
                    visitForm.reset();
                    
                    inputs.forEach(input => {
                        input.parentElement.classList.remove('has-value', 'focused');
                        if (input.tagName === 'TEXTAREA') {
                            input.style.height = 'auto';
                        }
                    });
                } else {
                    alert('Por favor, preencha todos os campos obrigatórios e aceite a política de privacidade.');
                }
            });
            
            const routeButtons = document.querySelectorAll('.route-btn');
            
            routeButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const action = this.textContent.includes('chegar') ? 'traçar rota' : 'ver rotas alternativas';
                    alert(`Funcionalidade: ${action}. Em uma implementação real, isso abriria o Google Maps ou aplicativo similar.`);
                });
            });
        });
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        document.getElementById('scrollTopBtn').addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function() {
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
            scrollTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
        });

        document.addEventListener('DOMContentLoaded', function() {
            const galleryCarouselTrack = document.getElementById('galleryCarouselTrack');
            const galleryItems = document.querySelectorAll('.gallery-item');
            const galleryPrevBtn = document.getElementById('galleryPrevBtn');
            const galleryNextBtn = document.getElementById('galleryNextBtn');
            const galleryIndicators = document.querySelectorAll('.gallery-indicator');
            
            let currentGalleryIndex = 2;
            const totalGalleryItems = galleryItems.length;
            
            updateGalleryCarousel();
            
            function updateGalleryCarousel() {
                const itemWidth = 100 / 3;
                const offset = -currentGalleryIndex * itemWidth;
                
                galleryCarouselTrack.style.transform = `translateX(${offset}%)`;
                
                galleryItems.forEach((item, index) => {
                    item.classList.remove('active');
                    if (index === currentGalleryIndex) {
                        item.classList.add('active');
                    }
                });
                
                galleryIndicators.forEach((indicator, index) => {
                    indicator.classList.remove('active');
                    if (index === currentGalleryIndex) {
                        indicator.classList.add('active');
                    }
                });
                
                galleryPrevBtn.disabled = currentGalleryIndex === 0;
                galleryNextBtn.disabled = currentGalleryIndex === totalGalleryItems - 1;
            }
            
            galleryNextBtn.addEventListener('click', function() {
                if (currentGalleryIndex < totalGalleryItems - 1) {
                    currentGalleryIndex++;
                    updateGalleryCarousel();
                }
            });
            
            galleryPrevBtn.addEventListener('click', function() {
                if (currentGalleryIndex > 0) {
                    currentGalleryIndex--;
                    updateGalleryCarousel();
                }
            });
            
            galleryIndicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    currentGalleryIndex = index;
                    updateGalleryCarousel();
                });
            });
            
            let isDragging = false;
            let startPos = 0;
            
            galleryCarouselTrack.addEventListener('mousedown', dragStart);
            galleryCarouselTrack.addEventListener('touchstart', dragStart);
            
            galleryCarouselTrack.addEventListener('mousemove', drag);
            galleryCarouselTrack.addEventListener('touchmove', drag);
            
            galleryCarouselTrack.addEventListener('mouseup', dragEnd);
            galleryCarouselTrack.addEventListener('mouseleave', dragEnd);
            galleryCarouselTrack.addEventListener('touchend', dragEnd);
            
            function dragStart(event) {
                if (event.type === 'touchstart') {
                    startPos = event.touches[0].clientX;
                } else {
                    startPos = event.clientX;
                    event.preventDefault();
                }
                
                isDragging = true;
                galleryCarouselTrack.style.transition = 'none';
            }
            
            function drag(event) {
                if (!isDragging) return;
                
                let currentPosition = 0;
                if (event.type === 'touchmove') {
                    currentPosition = event.touches[0].clientX;
                } else {
                    currentPosition = event.clientX;
                }
                
                const diff = currentPosition - startPos;
                
                if (currentGalleryIndex === 0 && diff > 50) return;
                if (currentGalleryIndex === totalGalleryItems - 1 && diff < -50) return;
                
                galleryCarouselTrack.style.transform = `translateX(calc(${-currentGalleryIndex * (100/3)}% + ${diff/10}%))`;
            }
            
            function dragEnd(event) {
                if (!isDragging) return;
                
                isDragging = false;
                galleryCarouselTrack.style.transition = 'transform 0.5s ease-in-out';
                
                let endPos = 0;
                if (event.type === 'touchend') {
                    endPos = event.changedTouches[0].clientX;
                } else {
                    endPos = event.clientX;
                }
                
                const diff = endPos - startPos;
                
                if (diff < -50 && currentGalleryIndex < totalGalleryItems - 1) {
                    currentGalleryIndex++;
                } else if (diff > 50 && currentGalleryIndex > 0) {
                    currentGalleryIndex--;
                }
                
                updateGalleryCarousel();
            }
        });