window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    loader.classList.add('fade');
    loader.style.zIndex = '-1';
});

$(function () {
    $('#submitRegister').attr('disabled', true);
    $('input').change(function () {
        if ($('input[name="pseudo"]').val() != '' && $('input[name="email"]').val() != '' && $('input[name="password"]').val() != '') {
            $('#submitRegister').attr('disabled', false);
        } else {
            $('#submitRegister').attr('disabled', true);
        }
    });
});

$(function () {
    $('#submitLogin').attr('disabled', true);
    $('input').change(function () {
        if ($('input[name="email"]').val() != '' && $('input[name="password"]').val() != '') {
            $('#submitLogin').attr('disabled', false);
        } else {
            $('#submitLogin').attr('disabled', true);
        }
    });
});

$(function () {
    $('#update-form').on('input change', function () {
        $('#checkout').attr('disabled', false);
    });
})