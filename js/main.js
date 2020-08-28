// let arrLi = document.querySelectorAll('li img');

$('.burger img').on('click', () => {
    $('.nav ul').slideToggle();
});

$('li img').on('click', () => {
    $('ul').setAttribute('style', 'display: none');
});