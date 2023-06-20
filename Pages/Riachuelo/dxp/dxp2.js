function recsCarousel() {

    fetchProducts();

    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6"
            + "&apiClientKey=2a52873853496275"
            + "&placements=home_page.app_carrossel_produtos_novidades";
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
        var html = '<div id="dxp-carrossel" class="owl-carousel">';
        for (var i = 0, len = products.length; i < len; i++) {
            html += '<a class="item click-trigger" href="' + products[i].productURL + '" target="_blank"><img src="' + products[i].imageURL + '" alt="' + products[i].name + '" class="item-img"><div class="item-title">' + products[i].name + '</div> <div class="item-price">R$' + (parseInt(products[i].priceCents) / 100).toLocaleString("pt-BR") + '</div></a>';
        }
        html += "</div>";
        document.getElementById('carousel__information').insertAdjacentHTML('beforebegin', html);
    }
}


recsCarousel();
function recsCarousel() {

    fetchProducts();

    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6"
            + "&apiClientKey=2a52873853496275"
            + "&placements=home_page.app_carrossel_produtos_novidades";
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
        var html = '<div id="dxp-carrossel" class="owl-carousel">';
        for (var i = 0, len = products.length; i < len; i++) {
            html += '<a class="item click-trigger" href="' + products[i].productURL + '" target="_blank"><img src="' + products[i].imageURL + '" alt="' + products[i].name + '" class="item-img"><div class="item-title">' + products[i].name + '</div> <div class="item-price">R$' + (parseInt(products[i].priceCents) / 100).toLocaleString("pt-BR") + '</div></a>';
        }
        html += "</div>";
        document.getElementById('carousel__information').insertAdjacentHTML('beforebegin', html);
        require(["jquery", "owlcarousel"], function ($) {

            var isMobile = navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)
    
            function startCarousel() {
                var owl = $("#dxp-carrossel");
                owl.owlCarousel({
                    "navText": ["", ""],
                    "nav": false,
                    "dots": false,
                    "loop": false,
                    "items": 1,
                    "stagePadding": 30,
                    "autoplay": true,
                    "touchDrag": true
                })
            }
    
            function stopCarousel() {
                var owl = $("#dxp-carrossel");
                owl.trigger('destroy.owl.carousel');
                owl.addClass('no-carousel');
            }
    
            if (isMobile) {
                startCarousel();
            } else {
                stopCarousel();
            }
        });
    }
}


recsCarousel();
