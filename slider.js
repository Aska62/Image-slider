let images = [
    './images/1.jpg',
    './images/2.jpg',
    './images/3.jpg',
    './images/4.jpg',
    './images/5.jpg'
];

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');

// set images
const imageWindow = document.querySelector('.image-container');
for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.classList.add('image','right');
    img.setAttribute('id', `image${i}`);
    img.setAttribute('src', images[i]);
    imageWindow.appendChild(img);
};

// set navigation dots
const dotContainer = document.querySelector('.navigation');
for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('nav-dots');
    dot.setAttribute('id', `dot${i}`)
    dotContainer.appendChild(dot);
};

// set default image and dot
window.onload = () => {
    const firstImage = document.querySelector('#image0');
    const firstDot = document.querySelector('#dot0');
    firstImage.classList.replace('right', 'shown');
    firstDot.classList.add('current-dot');
};

const allImages = document.querySelectorAll('.image');
const allDots = document.querySelectorAll('.nav-dots');

const moveToNext = () => {
    const shownImage = document.querySelector('.shown');
    const currentId = Number(shownImage.id[5]);
    let nextId = currentId + 1;
    if (currentId === images.length - 1) {
        nextId = 0;
    };
    const nextImage = document.getElementById(`image${nextId}`);
    // move shown image to left
    shownImage.classList.replace('shown', 'left');
    // move enxt image to center from right
    if (nextId === 0) {
        allImages.forEach((image) => {
            image.classList.replace('left', 'right');
        });
    };
    nextImage.classList.replace('right', 'shown');
    moveDots(nextId);
}

// move dot according to image change
const moveDots = (nextId) => {
    for (dot of allDots) {
        const dotId = Number(dot.id[3]);
        if (dotId === nextId) {
            dot.classList.add('current-dot');
        } else {
            dot.classList.remove('current-dot')
        }
    };
};

// click 'next' button to show next image
nextBtn.addEventListener('click', () => {
    moveToNext();
});

setInterval(moveToNext, 5000);

// click 'previous' button to show previous image
prevBtn.addEventListener('click', () => {
    const shownImage = document.querySelector('.shown');
    const currentId = Number(shownImage.id[5]);
    let prevId = currentId - 1;
    if (currentId === 0) {
        prevId = images.length -1;
    };
    const prevImage = document.getElementById(`image${prevId}`);
    // move shown image to right
    shownImage.classList.replace('shown', 'right');
    // move next image to center from left
    if (prevId === images.length -1) {
        allImages.forEach((image) => {
            image.classList.replace('right', 'left');
        });
    };
    prevImage.classList.replace('left', 'shown');
    moveDots(prevId);
});

// click dot to switch image
for (let i = 0; i < allDots.length; i++) {
    allDots[i].addEventListener('click', () => {
        for (let n = 0; n < allDots.length; n++) {
            if (n === i) {
                allDots[n].classList.add('current-dot');
                allImages[n].setAttribute('class', 'image');
                allImages[n].classList.add('shown');
            } else {
                allDots[n].classList.remove('current-dot');
                if (i < n) {
                    allImages[n].setAttribute('class', 'image');
                    allImages[n].classList.add('right');
                } else {
                    allImages[n].setAttribute('class', 'image');
                    allImages[n].classList.add('left');
                }
            }
        }
    });
};

