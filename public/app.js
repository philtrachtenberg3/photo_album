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
                    img.src = `images/${image.filename}`; // Make sure this matches your server's response
                    img.className = 'd-block w-100';
                    img.alt = `Image ${index + 1}`;
                
                    // Create a div for the caption and title
                    const captionDiv = document.createElement('div');
                    captionDiv.className = 'carousel-caption d-none d-md-block'; // Bootstrap classes for captions
                
                    // Create a heading element for the title
                    const title = document.createElement('h5');
                    title.textContent = image.title; // Make sure 'title' matches your server's response
                
                    // Create a paragraph element for the caption
                    const caption = document.createElement('p');
                    caption.textContent = image.caption; // Make sure 'caption' matches your server's response
                
                    // Append the title and caption to the caption div
                    captionDiv.appendChild(title);
                    captionDiv.appendChild(caption);
                
                    // Append the image and caption div to the carousel item div
                    div.appendChild(img);
                    div.appendChild(captionDiv);
                
                    // Append the carousel item to the carousel inner container
                    carouselInner.appendChild(div);
                });
            });
    }

    // Call loadImages to initially populate the carousel
    loadImages();
});
