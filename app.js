document.addEventListener('DOMContentLoaded', function () {
    const images = ['images\Screenshot 2024-02-29 152528.png']; // Update with your image filenames
    const carouselInner = document.getElementById('carouselInner');

    images.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (index === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = `images/${image}`;
        img.className = 'd-block w-100';
        img.alt = `Screenshot ${index + 1}`;
        div.appendChild(img);
        carouselInner.appendChild(div);
    });
});