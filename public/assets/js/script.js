$(function () {
    $('#crypto-cards,#loader').hide();

    // API Call Function
    const apiCall = () => {
        $('#crypto-cards').empty().hide();
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/`,
            beforeSend: function () {
                $('#footer').addClass('d-none');
                $('#loader').show();
            },
            success: function (res) {
                res.forEach(coin => {
                    appendCard(coin);
                });
                $('#loader').fadeOut(1000, () => {
                    $('#crypto-cards').fadeIn(1000);
                    $('#footer').removeClass('d-none');
                });
            }
        });
    }

    // API call on load
    apiCall();

    // Function that appends crypto data into cards
    const appendCard = (coin) => {
        $('#crypto-cards').append(
            `<div class="col">
                <div class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <img src="${coin.image.large}"
                                class="img-fluid" alt="${coin.symbol}" />
                            ${coin.symbol.toUpperCase()}
                        </div>
                        <div class="card-content">
                            <h2 class="mb-3">${coin.name}</h2>
                            <h3 class="mb-3">
                                <i class="fa-solid fa-dollar-sign"></i>
                                ${coin.market_data.current_price.usd.toLocaleString()}
                            </h3>
                            <div class="card-buttons">
                                <button type="button" class="btn btn-main" data-id="${coin.id}" data-mdb-toggle="collapse"
                                    data-mdb-target="#collapse${coin.id}" aria-expanded="false" aria-controls="collapseCoinData">
                                    More info
                                </button>
                                <label class="switch">
                                    <input class="checkbox" type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="collapse mt-3" id="collapse${coin.id}">
                                <h3 class="mb-3">
                                    <i class="fa-solid fa-euro-sign"></i>
                                    ${coin.market_data.current_price.eur.toLocaleString()}
                                </h3>
                                <h3>
                                    <i class="fa-solid fa-shekel-sign"></i>
                                    ${coin.market_data.current_price.ils.toLocaleString()}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        );
    }

    // API Call by id function
    const apiCallById = (id) => {
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/${id}`,
            success: function (res) {
                appendCard(res);
            }
        });
    }

    // API search Call function
    const apiSearchCall = (query) => {
        $('#crypto-cards').empty().hide();
        $.ajax({
            url: `https://api.coingecko.com/api/v3/search?query=${query}`,
            beforeSend: function () {
                $('#footer').addClass('d-none');
                $('#loader').show();
            },
            success: function (res) {
                res.coins.forEach(coin => {
                    apiCallById(coin.id);
                });
                $('#loader').fadeOut(1000, () => {
                    $('#crypto-cards').fadeIn(1000);
                    $('#footer').removeClass('d-none');
                });
            }
        });
    }

    // Form submit return false in order to prevent page reload
    $('form').on('submit', () => {
        return false;
    });

    // Search Function
    $('#search').on('input', (e) => {
        if($('#search').val() == '') {
            apiCall();
        } else {
            apiSearchCall($('#search').val().toLowerCase());
        }
    });

    // function that hides menu on link click
    $('.navbar-collapse a').on('click', () => {
        $(".navbar-collapse").collapse('hide');
    });

    // Function that animates navbar on scroll
    $(window).on('scroll', () => {
        if ($(document).scrollTop() > 30) {
            $('nav').addClass('animate');
        } else {
            $('nav').removeClass('animate');
        }
    });

    // Function that checks if toggle buttons are not more that 5
    $('#crypto-cards').on('click', '.checkbox', function () {
        if (this.checked) {
            if ($(".checkbox:checked").length > 5) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: 'You can not select more that 5 cryptocurrencies',
                });
                $(this).prop('checked', false);
            }
        } else {
            return;
        }
    });
});