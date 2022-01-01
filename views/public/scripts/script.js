window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const innerloader = document.getElementsByClassName('loader');
    // loader.classList.add('fade');
    loader.style.display = 'none';
});

$(document).ready(function () {
    $('#submitRegister').attr('disabled', true);
    $('input').change(function () {
        if ($('input[name="pseudo"]').val() != '' && $('input[name="email"]').val() != '' && $('input[name="password"]').val() != '') {
            $('#submitRegister').attr('disabled', false);
        } else {
            $('#submitRegister').attr('disabled', true);
        }
    });
});

$(document).ready(function () {
    $('#submitLogin').attr('disabled', true);
    $('input').change(function () {
        if ($('input[name="email"]').val() != '' && $('input[name="password"]').val() != '') {
            $('#submitLogin').attr('disabled', false);
        } else {
            $('#submitLogin').attr('disabled', true);
        }
    });
});

// $(document).ready(function () {
//     $('#checkwork').attr('disabled', true);
//     $('input').change(function () {
//         if ($('input[name="work"]').val() != '') {
//             $('#checkwork').attr('disabled', false);
//         } else {
//             $('#checkwork').attr('disabled', true);
//         }
//     });
// });