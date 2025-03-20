// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
    } else {
        body.setAttribute('data-theme', 'dark');
    }
});

// 轮播图功能
const carousel = document.querySelector('.carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentSlide = 0;

function showSlide(index) {
    carouselItems.forEach(item => item.classList.remove('active'));
    currentSlide = (index + carouselItems.length) % carouselItems.length;
    carouselItems[currentSlide].classList.add('active');
}

prevButton.addEventListener('click', () => showSlide(currentSlide - 1));
nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

// 自动轮播
setInterval(() => showSlide(currentSlide + 1), 5000);

// 商品数据
const products = [
    {
        id: 1,
        title: '高性能笔记本电脑',
        price: '¥6999',
        image: 'assets/product-1.webp'
    },
    {
        id: 2,
        title: '智能手机',
        price: '¥3999',
        image: 'assets/product-2.webp'
    },
    {
        id: 3,
        title: '无线耳机',
        price: '¥999',
        image: 'assets/product-3.webp'
    },
    {
        id: 4,
        title: '智能手表',
        price: '¥1599',
        image: 'assets/product-4.webp'
    },
    {
        id: 5,
        title: '平板电脑',
        price: '¥4999',
        image: 'assets/product-5.webp'
    },
    {
        id: 6,
        title: '游戏主机',
        price: '¥2999',
        image: 'assets/product-6.webp'
    }
];

// 动态生成商品卡片
const productsGrid = document.querySelector('.products-grid');

// 创建观察器
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img class="product-image" 
             data-src="${product.image}" 
             alt="${product.title}" 
             loading="lazy"
        >
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">${product.price}</p>
        </div>
    `;
    
    // 观察图片元素
    const img = card.querySelector('.product-image');
    imageObserver.observe(img);
    
    return card;
}

products.forEach(product => {
    productsGrid.appendChild(createProductCard(product));
});