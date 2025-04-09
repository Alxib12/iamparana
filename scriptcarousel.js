let index = 0;

function moveSlide(direction) {
  const slide = document.getElementById('carousel-slide');
  const slides = slide.children;
  index = (index + direction + slides.length) % slides.length;
  slide.style.transform = `translateX(${-index * 100}%)`;
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('show');
}

function loadCarousel() {
  fetch('carousel.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('carousel-slide');
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'carousel-item';

        const picture = document.createElement('picture');

        const sourceMobile = document.createElement('source');
        sourceMobile.media = '(max-width: 768px)';
        sourceMobile.srcset = item.imageMobile;

        const sourceDesktop = document.createElement('source');
        sourceDesktop.media = '(min-width: 769px)';
        sourceDesktop.srcset = item.imageDesktop;

        const img = document.createElement('img');
        img.src = item.imageDesktop; // fallback
        img.alt = item.alt;

        picture.appendChild(sourceMobile);
        picture.appendChild(sourceDesktop);
        picture.appendChild(img);

        div.appendChild(picture);

        if (item.link) {
          const a = document.createElement('a');
          a.href = item.link;
          a.className = 'overlay-button';
          a.textContent = item.buttonText;
          div.appendChild(a);
        }

        container.appendChild(div);
      });
    });
}

setInterval(() => moveSlide(1), 15000);
document.addEventListener('DOMContentLoaded', loadCarousel);
