document.addEventListener('DOMContentLoaded', function () {
    fetch('/images')
        .then(response => response.json())
        .then(images => {
            const carouselInner = document.getElementById('carouselInner');

            images.forEach((image, index) => {
                const div = document.createElement('div');
                div.className = 'carousel-item' + (index === 0 ? ' active' : '');
                const img = document.createElement('img');
                img.src = `images/${image}`;
                img.className = 'd-block w-100';
                img.alt = `Image ${index + 1}`;
                div.appendChild(img);
                carouselInner.appendChild(div);
            });
        });
});