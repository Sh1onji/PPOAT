

const emblaNode = document.querySelector('.embla__viewport');

const emblaApi = EmblaCarousel(emblaNode, {
    align: 'center',
    containScroll: false,
    loop: true,
    slidesToScroll: 1,
    
});

const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');

function updateButtons() {
    nextButton.style.display = emblaApi.canScrollNext()
        ? 'block'
        : 'none';

    prevButton.style.display = emblaApi.canScrollPrev()
        ? 'block'
        : 'none';
}

nextButton.addEventListener('click', () => {
    emblaApi.scrollNext();
});

prevButton.addEventListener('click', () => {
    emblaApi.scrollPrev();
});

emblaApi.on('select', updateButtons);
emblaApi.on('reInit', updateButtons);

updateButtons();
