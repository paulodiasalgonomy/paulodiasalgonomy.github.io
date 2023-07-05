
function initializeCarousel() {
    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6"
            + "&apiClientKey=2a52873853496275"
            + "&placements=home_page.recs_dxp";
        if (typeof window.R3_COMMON != "undefined") {
            if (typeof window.R3_COMMON.productId != "undefined") {
                url += "&productId=" + R3_COMMON.productId
            }
            if (typeof window.R3_COMMON.sessionId != "undefined") {
                url += "&sessionId=" + R3_COMMON.sessionId;
            } else {
                url += "&sessionId=test"
            }
            if (typeof window.R3_COMMON.userId != "undefined") {
                url += "&userId=" + R3_COMMON.userId;
            }
            if (rcsValue) {
                url += "&rcs=" + rcsValue.split("=")[1];
            }
        } else {
            url += "&sessionId=test"
        }
        request.open("GET", url); // form url variable
        request.send(null);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var json = JSON.parse(request.responseText);
                    buildProducts(json.placements[0].recommendedProducts);
                }
            }
        }
    }
    function buildProducts(products) {
        var html = '<div id="dxp-section"><div id="dxp-title"><p>Oferta Relâmpago</p><p>ofertas acabam em <span id="dxp-hours"></span><span id="dxp-mins"></span><span id="dxp-secs"></span></p><p id="dxp-clr"></p></div><div id="dxp-carrossel" class="owl-carousel owl-theme">';
        for (var i = 0, len = products.length; i < len; i++) {
            html += '<a class="item click-trigger" href="' + products[i].productURL + '" target="_blank"><img src="' + products[i].imageURL + '" alt="' + products[i].name + '" class="item-img"><div class="item-title">' + products[i].name + '</div> <div class="item-price">R$' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</div></a>';
        }
        html += "</div></div>";
        document.getElementById('carousel__information').insertAdjacentHTML('beforebegin', html);
    }
    function setCountdown(endDate) {
        //var countDownDate = new Date("Jul 15, 2023 23:59:59").getTime();
        var countDownDate = new Date(endDate).getTime();
        var myfunc = setInterval(function () {
            var now = new Date().getTime();
            var timeleft = countDownDate - now;
            var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
            if (parseInt(days) < 10) {
                days = "0" + days;
            }
            if (parseInt(hours) < 10) {
                hours = "0" + hours;
            }
            if (parseInt(minutes) < 10) {
                minutes = "0" + minutes;
            }
            if (parseInt(seconds) < 10) {
                seconds = "0" + seconds;
            }
            document.getElementById("dxp-hours").innerHTML = hours + " :";
            document.getElementById("dxp-mins").innerHTML = minutes + " :";
            document.getElementById("dxp-secs").innerHTML = seconds + "";
            if (timeleft < 0) {
                clearInterval(myfunc);
                document.getElementById("dxp-hours").innerHTML = "";
                document.getElementById("dxp-mins").innerHTML = "";
                document.getElementById("dxp-secs").innerHTML = "";
            }
        }, 1000);
    }
    fetchProducts();
    setCountdown('Jul 21, 2023 23:59:59');
}

if (document.readyState !== 'loading') {
    initializeCarousel();
    console.log("inicializou vitrine 15")
    let dxpInterval = setInterval(function () {
        if (initializeCarousel && typeof initializeCarousel == 'function') {
            clearInterval(dxpInterval);
            require(["jquery", "owlcarousel"], function ($) {
                const prevIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>';
                const nextIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>';
                var owl = $("#dxp-carrossel");
                owl.owlCarousel({
                    loop: true,
                    items: 4,
                    stagePadding: 1,
                    nav: true,
                    navText: [
                        prevIcon,
                        nextIcon
                    ],
                    dots: false,
                    autoplay: true,
                    transitionStyle: "slide",
                    responsive: {
                        0: {
                            items: 2,
                            nav: false,
                            dots: true
                        },
                        600: {
                            items: 4,
                            nav: true,
                            dots: false
                        }
                    }
                });
            });
            console.log("inicializou carrossel");
        }
    }, 500);
} else {
    document.addEventListener('DOMContentLoaded', initializeCarousel);
    console.log("nao inicializou carrossel");
}