function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const sliders = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidersWrapper = document.querySelector(wrapper),
          slidersField = document.querySelector(field),
          width = window.getComputedStyle(slidersWrapper).width;
        
    let slideIndex = 1;
    let offset = 0;
    if(sliders.length < 10) {
            total.textContent = `0${sliders.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = sliders.length;
            current.textContent = slideIndex;
        }

    slidersField.style.width = 100 * sliders.length + '%';
    slidersField.style.display = 'flex';
    slidersField.style.transition = '0.5s all ease-in';
    slidersWrapper.style.overflow = 'hidden';



    sliders.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const dots = document.createElement('ol'),
          dotsCollection = [];

    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for(let i =0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if(i == 0) {
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsCollection.push(dot);

    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (sliders.length - 1)){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == sliders.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if(sliders.length < 10) {
            current.textContent = `0${slideIndex}`;

        } else {
            current.textContent = slideIndex;
        }
        dotsCollection.forEach(dot => dot.style.opacity = 0.5);
        dotsCollection[slideIndex - 1].style.opacity = 1;
    });
    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = deleteNotDigits(width) * (sliders.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }

        if(sliders.length < 10) {
            current.textContent = `0${slideIndex}`;

        } else {
            current.textContent = slideIndex;
        }
        dotsCollection.forEach(dot => dot.style.opacity = 0.5);
        dotsCollection[slideIndex - 1].style.opacity = 1;
    });
    dotsCollection.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);
            slidersField.style.transform = `translateX(-${offset}px)`;

            if(sliders.length < 10) {
                current.textContent = `0${slideIndex}`;
    
            } else {
                current.textContent = slideIndex;
            }

            dotsCollection.forEach(dot => dot.style.opacity = 0.5);
            dotsCollection[slideIndex - 1].style.opacity = 1;
        });
    });


    // OR SECOND VARIANT ==>

    // showSlides(slideIndex);
    // if(sliders.length < 10) {
    //     total.textContent = `0${sliders.length}`;
    // } else {
    //     total.textContent = sliders.length;
    // }
    
    // function showSlides(n) {
    //     if(n > sliders.length) {
    //         slideIndex = 1;
    //     }
    //     if(n < 1) {
    //         slideIndex = sliders.length;
    //     }

    //     sliders.forEach(item =>  item.style.display = 'none');
    //     sliders[slideIndex-1].style.display = 'block';

    //     if(sliders.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }

    // }

    // function plusSlide(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener( 'click', () => {
    //     plusSlide(-1);
    // });
    // next.addEventListener( 'click', () => {
    //     plusSlide(1);
    // });

    // <== OR SECOND VARIANT
}
export default slider;