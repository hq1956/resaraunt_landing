document.querySelectorAll('h1').forEach(h1 => {
    h1.addEventListener('mouseenter', () => {
        h1.classList.add('underline-active_1');
    });
});

document.querySelectorAll('h2').forEach(h2 => {
    h2.addEventListener('mouseenter', () => {
        h2.classList.add('underline-active_2');
    });
});

// Анимация при скролле
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        let delay = 0;
        
        entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.target.offsetTop - b.target.offsetTop) // сортируем сверху вниз
            .forEach((entry, index) => {
                const element = entry.target;
                const elementDelay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    element.classList.add('animated');
                }, delay + elementDelay);
                
                delay += 300; // увеличиваем задержку для следующего элемента
                observer.unobserve(element);
            });
    }, { threshold: 0.05 });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
});

// Content for each dropdown
    const dropdownContents = {
        'about_us': `
            <ul>
                <li><a>Our story</a></li>
                <li><a>Why us</a></li>
                <li><a>How it works</a></li>
                <li><a>FAQ</a></li>
            </ul>
        `,
        'our_cabins': `
            <ul>
                <li><span>North of London</span></li>
                <li><a>Golden Hideaway</a></li>
                <li><a>Oak Treehouse</a></li>
                <li><a>Acacia Retreat</a></li>
                <li><a>Blue Lagoon</a></li>
                <li><span>South of London</span></li>
                <li><a>Lavender Retreat</a></li>
                <li><a>Butterfly Treehouse</a></li>
                <li><a>Mahogany Hideaway</a></li>
            </ul>
        `,
        'get_inspired': `
            <ul>
                <li><span>Explore nature</span></li>
                <li><a>Hiking trails</a></li>
                <li><a>Swimming</a></li>
                <li><a>Fishing</a></li>
                <li><a>Boating</a></li>
                <li><a>Cycling</a></li>
                <li><span>Rest, relax and re-set</span></li>
                <li><a>Spa treatments</a></li>
                <li><a>Hot tubs</a></li>
                <li><a>Nature Trails</a></li>
            </ul>
        `,
        'get_inspired_0': `
            <ul>
                <li><span>Great food and drink</span></li>
                <li><a>Pubs</a></li>
                <li><a>Resturants</a></li>
                <li><a>Food markets</a></li>
                <li><a>Picnics</a></li>
                <li><span>For you and yours</span></li>
                <li><a>Solo or a couple</a></li>
                <li><a>Pet friendly</a></li>
                <li><a>Accessible cabins</a></li>
            </ul>
        `,
        'support': `
            <ul>
                <li><a>Help</a></li>
                <li><a>Contact us</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Terms of Service</a></li>
                <li><a>Complaints Policy</a></li>
            </ul>
        `
    };

    // Function to close dropdown
    function closeDropdown() {
        const dropdown = document.getElementById('fullscreen-dropdown');
        dropdown.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Инициализация только если мы на мобильном устройстве
    function initMobileMenu() {
        if (window.innerWidth <= 850) {
            document.querySelectorAll('.toggle-list').forEach(header => {
                header.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    const dropdown = document.getElementById('fullscreen-dropdown');
                    const dropdownInner = document.querySelector('.dropdown-inner');
                    const section = header.parentElement.className;
                    
                    dropdownInner.innerHTML = dropdownContents[section];
                    dropdown.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                });
            });

            document.querySelector('.close-btn').addEventListener('click', closeDropdown);
            document.getElementById('fullscreen-dropdown').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeDropdown();
                }
            });
            
            document.querySelector('.dropdown-content').addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    // Close button functionality
    document.querySelector('.close-btn').addEventListener('click', closeDropdown);

    // Close when clicking anywhere (including the dropdown content)
    document.addEventListener('click', closeDropdown);

    // Prevent dropdown content clicks from closing the dropdown
    document.querySelector('.dropdown-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Инициализация при загрузке
    document.addEventListener('DOMContentLoaded', initMobileMenu);
    
    // Инициализация при изменении размера окна
    window.addEventListener('resize', initMobileMenu);