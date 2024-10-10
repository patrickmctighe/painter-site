window.onload = function() {
    var sphereContainer = document.querySelector('.headerEffect');
    var sphereContainerWidth = sphereContainer.offsetWidth;
    var minSphereSize = 15;
    var maxSphereSize = 70;
    var numberOfSpheres = Math.ceil(sphereContainerWidth / minSphereSize); // Use minSphereSize to ensure enough spheres are created

    var sphereTemplate = document.querySelector('.sphere');
    animateSphere(sphereTemplate, minSphereSize, maxSphereSize); // Animate the first sphere

    for (var i = 1; i < numberOfSpheres; i++) { // Start from 1 because the first sphere is already in the HTML
        var sphere = sphereTemplate.cloneNode(true);
        animateSphere(sphere, minSphereSize, maxSphereSize);
        sphereContainer.appendChild(sphere);
    }
}
function animateSphere(sphere, minSize, maxSize) {
    var randomSize = Math.random() * (maxSize - minSize) + minSize; // Generate a random number between minSize and maxSize
    var randomDelay = Math.random() * 2; // Generate a random number between 0 and 2
    var randomDuration = Math.random() * (5 - 2) + 2; // Generate a random number between 2 and 5
    sphere.style.width = randomSize + 'px'; // Apply the random size to the width of the sphere
    sphere.style.height = randomSize + 'px'; // Apply the random size to the height of the sphere
    sphere.style.position = 'relative';
    sphere.style.animation = `moveUpDown ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`; // Add CSS animation with random delay and duration

    // Change the size of the sphere at the end of each animation iteration
    sphere.addEventListener('animationiteration', function() {
        var newSize = Math.random() * (maxSize - minSize) + minSize; // Generate a new random size
        sphere.style.width = newSize + 'px'; // Apply the new size to the width of the sphere
        sphere.style.height = newSize + 'px'; // Apply the new size to the height of the sphere

        // Occasionally make the sphere fall to the bottom of the page
        if (Math.random() < 0.01) { // 1% chance
            sphere.style.borderRadius = "50% 50% 50% 50%/60% 60% 40% 40%";
            if(sphere.style.borderRadius = "50% 50% 50% 50%/60% 60% 40% 40%"){
                sphere.style.animation = `fallToBottom 2s ease-in forwards`;
            }
        }
    });

    // Put the sphere back to its original position after it falls
    sphere.addEventListener('animationend', function() {
        sphere.style.animation = `moveUpDown ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate`;
    });
}

// CSS for the animation
var style = document.createElement('style');
style.innerHTML = `
@keyframes moveUpDown {
    0% { transform: translateY(0); }
    100% { transform: translateY(50%); }
}`;
document.head.appendChild(style);