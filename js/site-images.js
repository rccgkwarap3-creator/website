window.SITE_IMAGES = Object.freeze({
    logo: 'images/logo.png',
    hero: 'images/hero-slide-1.png',
    heroSlides: [
        'images/hero-slide-1.png',
        'images/hero-slide-2.jpeg',
        'images/hero-slide-3.jpeg'
    ],
    about: 'images/audience.jpg',
    ministryKids: 'images/kids.jpg',
    ministryYouth: 'images/youth1.jpg',
    ministryOutreach: 'images/evangelism.png',
    eventFlyer: 'images/breakthrough_anointing_service.png',
    bloggerFallback: 'images/about-community.png',
    fallbackActivity: 'images/breakthrough_anointing_service.png',
    fallbackOutreach: 'images/ministry-outreach.png',
    fallbackYouth: 'images/youth.png',
    gallery: [
        { image: 'audience.jpg', alt: 'Congregation gathered for worship', caption: 'Worship together', layout: 'tall' },
        { image: 'choir.jpg', alt: 'Choir leading the congregation in worship', caption: 'Choir praise' },
        { image: 'kids.jpg', alt: 'Children gathered at church', caption: 'Grace Kids' },
        { image: 'teens.jpg', alt: 'Teenagers gathered at church', caption: 'Our teens' },
        { image: 'worship.jpg', alt: 'Church member worshipping with raised hands', caption: 'In worship', layout: 'wide' },
        { image: 'worship2.jpg', alt: 'Church members worshipping together', caption: 'Growing together' },
        { image: 'people.jpg', alt: 'Church members gathered together', caption: 'Life together' },
        { image: 'Pastor.jpg', alt: 'Pastor preaching at church', caption: 'The Word' },
        { image: 'Daddy.jpg', alt: 'Minister speaking at church', caption: 'Sunday service' },
        { image: 'youth1.jpg', alt: 'Youth fellowship at church', caption: 'Youth fellowship' }
    ]
});

function applySiteImages() {
    const images = window.SITE_IMAGES;

    Object.entries(images).forEach(([key, path]) => {
        if (key === 'gallery') return;

        document.querySelectorAll(`[data-image-key="${key}"]`).forEach((element) => {
            if (element instanceof HTMLImageElement) {
                element.src = path;
            } else if (element instanceof HTMLMetaElement) {
                element.content = new URL(path, window.location.href).href;
            } else if (element instanceof HTMLLinkElement) {
                element.href = path;
            } else {
                element.style.backgroundImage = `url("${path}")`;
            }
        });
    });

    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    images.gallery.forEach((item) => {
        const path = `images/${item.image}`;
        const button = document.createElement('button');
        button.className = `gallery-item${item.layout ? ` gallery-item-${item.layout}` : ''}`;
        button.type = 'button';
        button.dataset.image = path;
        button.dataset.caption = item.caption;

        const image = document.createElement('img');
        image.src = path;
        image.alt = item.alt;
        image.loading = 'lazy';

        const caption = document.createElement('span');
        caption.textContent = item.caption;

        button.append(image, caption);
        galleryGrid.append(button);
    });
}

applySiteImages();