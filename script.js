document.addEventListener('DOMContentLoaded', () => {

    // Contact Form 
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message-success');

    const saveToLocalStorage = (data) => {
        const existingSubmissions = JSON.parse(localStorage.getItem('contact_submissions')) || [];
        const submissionWithDate = { ...data, submittedAt: new Date().toLocaleString() };
        existingSubmissions.push(submissionWithDate);
        localStorage.setItem('contact_submissions', JSON.stringify(existingSubmissions));
    };

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            saveToLocalStorage(data);

            if (formMessage) {
                formMessage.textContent = `Submission saved successfully!`;
                formMessage.classList.remove('opacity-0');
                formMessage.classList.add('opacity-100', 'bg-blue-100', 'text-blue-800', 'text-center');

                setTimeout(() => {
                    formMessage.classList.replace('opacity-100', 'opacity-0');
                }, 3000);
            }

            this.reset();
        });
    }

    // Navigation Bar
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove("text-cyan-400", "drop-shadow-[0_0_15px_#07C5FF]");
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("text-cyan-400", "drop-shadow-[0_0_15px_#07C5FF]");
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            const targetId = this.getAttribute("href").replace("#", "");
            setActiveLink(targetId);
        });
    });

    window.addEventListener("scroll", () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        if (currentSection) {
            setActiveLink(currentSection);
        }
    });

    // Projects 
    const overlay = document.getElementById("overlay");
    const projectLinks = document.querySelectorAll(".project-link");

    projectLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".project-card");
            const title = card.querySelector(".project-title").textContent;
            const desc = card.querySelector(".project-desc").textContent;
            const imageDiv = card.querySelector(".project-image");

            const imageUrl = imageDiv.style.backgroundImage
                .replace(/^url\(["']?/, '')
                .replace(/["']?\)$/, '');

            overlay.innerHTML = `
                <div class="modal">
                    <button id="closeModal">&times;</button>
                    <div class="modal-content">
                        <div class="modal-image">
                            <img src="${imageUrl}" alt="">
                        </div>
                        <div class="modal-text">
                            <h2>${title}</h2>
                            <p>${desc}</p>
                        </div>
                    </div>
                </div>
            `;

            overlay.classList.add("active");

            document.getElementById("closeModal").addEventListener("click", () => {
                overlay.classList.remove("active");
            });
        });
    });

    if (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    }

    document.addEventListener("mousemove", function (e) {
        const trail = document.createElement("div");
        trail.className = "cursor-trail";

        trail.style.left = e.clientX + "px";
        trail.style.top = e.clientY + "px";

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 400);
    });

    // Magic Sparkles/Background Designs
    const magicBackground = document.getElementById("magic-background");

    function createMagicSpark() {
        if (!magicBackground) return;

        const spark = document.createElement("div");
        spark.className = "magic-spark";

        spark.style.left = Math.random() * window.innerWidth + "px";

        const size = Math.random() * 4 + 3;
        spark.style.width = size + "px";
        spark.style.height = size + "px";

        const duration = Math.random() * 5 + 5;
        spark.style.animationDuration = duration + "s";

        magicBackground.appendChild(spark);

        setTimeout(() => {
            spark.remove();
        }, duration * 1000);
    }

    setInterval(createMagicSpark, 300);


});
