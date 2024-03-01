document.addEventListener('DOMContentLoaded', function () {
    // Existing code to load images and populate the carousel

    // Add an event listener for the form's submit event
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault(); // This prevents the default form submission

        const formData = new FormData(this); // 'this' refers to the form

        // Asynchronously submit the form data
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Upload successful'); // Show a success message
            document.getElementById('uploadForm').reset(); // Reset the form fields
            loadImages(); // Refresh the album to include the newly uploaded image
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Upload failed'); // Show an error message
        });
    });

    // Function to load images and update the carousel
    function loadImages() {
        fetch('/images')
            .then(response => response.json())
            .then(images => {
                const carouselInner = document.getElementById('carouselInner');
                carouselInner.innerHTML = ''; // Clear existing images first

                images.forEach((image, index) => {
                    const div = document.createElement('div');
                    div.className = 'carousel-item' + (index === 0 ? ' active' : '');
                    const img = document.createElement('img');
                    img.src = `images/${image.filename}`; // Access the filename property
                    img.className = 'd-block w-100';
                    img.alt = `${image.title}: ${image.caption}`; // Use title and caption for alt text, if you want
                    div.appendChild(img);
                    carouselInner.appendChild(div);
                });
            });
    }

    // Call loadImages to initially populate the carousel
    loadImages();
});
