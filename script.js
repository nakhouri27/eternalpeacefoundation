document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.banner-slider img');
    let currentIndex = 0;

    // A function to show the next image in the sequence
    const showNextImage = () => {
        // Hide the current active image
        images[currentIndex].classList.remove('active');

        // Increment the index, and loop back to 0 if we're at the end
        currentIndex = (currentIndex + 1) % images.length;

        // Show the new active image
        images[currentIndex].classList.add('active');
    };

    // Make the first image active initially
    if (images.length > 0) {
        images[currentIndex].classList.add('active');
    }

    // Set an interval to change the image every 4 seconds (4000ms)
    setInterval(showNextImage, 4000);
});