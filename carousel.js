
const modifyCont = (imgLst, containerImg) => {
    containerImg.innerHTML = "";
    imgLst.forEach((img) => {
        containerImg.append(img);
    });
}

const moveRight = (containerImg) => {
    const imgLst = Array.from(containerImg.querySelectorAll('img'));
    imgLst.push(imgLst.shift());
    modifyCont(imgLst, containerImg);
}


const moveLeft = (containerImg) => {
    const imgLst = Array.from(containerImg.querySelectorAll('img'));
    imgLst.unshift(imgLst.pop());
    modifyCont(imgLst, containerImg);
}

const moveArrow = (event, containerImg) => {
    if (event.target.className === `image-carousel-nav-arrow-right`) {
        moveRight(containerImg);
    }
    else if (event.target.className === `image-carousel-nav-arrow-left`) {
        moveLeft(containerImg);
    }

}

const toggleNavCircle = (event, container) => {
    const navC = container.children;
    for (const circle of navC) {
        if (circle.classList.contains("active")) {
            circle.classList.toggle("active");
        }
    }
    event.target.classList.toggle("active");
}

const moveNav = (event, containerImg, image) => {
    const imgLst = Array.from(containerImg.querySelectorAll('img'));
    const indexImage = imgLst.indexOf(image);
    if (indexImage !== -1) {
        imgLst.splice(indexImage, 1);
    }
    modifyCont([image, ...imgLst], containerImg);
    
}

const populateArrow = () => {
    const arrowRight = document.createElement("div");
    const arrowLeft = document.createElement("div");
    
    arrowRight.innerHTML = `&#8594`;
    arrowLeft.innerHTML = `&#8592`;
    arrowRight.className = `image-carousel-nav-arrow-right`;
    arrowLeft.className = `image-carousel-nav-arrow-left`;

    return [arrowRight, arrowLeft];
}

const getImage = (containerImg, nb) => {
    const images = containerImg.querySelectorAll('img');
    for (const img of images) {
        if (img.classList.contains(`image-carousel-img_${nb}`)){
            return img;
        }
    }
    return false;
}


const populateNavCircle = (imgLst, containerImg, navCircle, intervalId) => {
    for (let i=0; i<imgLst.length; i++) {
        const circle = document.createElement("div");
        circle.className = `image-carousel-nav-circle-elem nb_${i}`;
        circle.addEventListener("click", (event) => {
            const image = getImage(containerImg, i)
            if (image) {
                moveNav(event, containerImg, image);
                toggleNavCircle(event, navCircle)
            }
        });
        navCircle.appendChild(circle);
    }
    navCircle.className = "image-carousel-nav-circle";

    return navCircle
}

const initNav = (frame, containerImg, intervalId) => {
    const [arrowRight, arrowLeft] = populateArrow();
    const navCircle = document.createElement("div");
    const imgLst = Array.from(containerImg.querySelectorAll('img'));
    populateNavCircle(imgLst, containerImg, navCircle, intervalId);

    frame.innerHTML = "";
    frame.append(arrowLeft);
    frame.append(containerImg);
    frame.append(arrowRight);
    frame.append(navCircle);

    arrowLeft.addEventListener("click", (event) => {
        moveArrow(event, containerImg);
        
    })
    arrowRight.addEventListener("click", (event) => {
        moveArrow(event, containerImg);
    })
    return navCircle;
}

const initImage = (containerImg) => {
    const images = containerImg.querySelectorAll('img');
    for (let i=0; i<images.length; i++) {
        images[i].classList.add(`image-carousel-img_${i}`);
    }
}

const createInterval = (containerImg, time) => {
    return setInterval(() => {moveRight(containerImg)},time)
}


export default function Carousel() {
    console.log("Carousel");
    const frames = document.getElementsByClassName("image-carousel-frame");
    
    [...frames].forEach((frame) => {
        const containerImg = frame.getElementsByClassName("image-carousel-container")[0];
        initImage(containerImg);
        const intervalId = createInterval(containerImg, 5000);
        initNav(frame, containerImg, intervalId);
        
    })
};

