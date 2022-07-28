$(function () {
    $('#crypto-cards,#loader').hide();

    // API Call Function
    const apiCall = () => {
        $('#crypto-cards').hide();
        $.ajax({
            url: `https://api.coingecko.com/api/v3/coins/`,
            beforeSend: function () {
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
                                    <input type="checkbox">
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

    // function that hides menu on link click
    $('.navbar-collapse a').on('click', () => {
        $(".navbar-collapse").collapse('hide');
    });

    // API call on load
    apiCall();

    // Function that animates navbar on scroll
    $(window).scroll(() => {
        if ($(document).scrollTop() > 30) {
            $('nav').addClass('animate');
        } else {
            $('nav').removeClass('animate');
        }
    });

    // Function to refresh data every 2 minutes
    // setInterval(function () {
    //     apiCall();
    // }, 120000);

    // $("[type='checkbox']:checked").length
});