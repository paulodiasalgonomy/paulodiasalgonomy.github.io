(function () {
    var trigger = document.querySelector("#recommedationExperience_<%= guid %> .trigger"),
        content = document.querySelector("#recommedationExperience_<%= guid %> .content"),
        arrows = document.querySelectorAll("#recommedationExperience_<%= guid %> .icon-block"),
        recList = document.querySelector("#recommedationExperience_<%= guid %> .list"),
        spinner = document.querySelector("#recommedationExperience_<%= guid %> .spinner"),
        slider;

    var script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tiny-slider@2.9.1/dist/tiny-slider.min.js";
    document.head.appendChild(script);

    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdn.jsdelivr.net/npm/tiny-slider@2.9.1/dist/tiny-slider.min.css";
    document.head.appendChild(css);

    var isCarousel = true; // <% bool variable %>

    fetchProducts();

    setTimeout(function () {
        trigger.classList.remove("hidden");
    }, 100);

    trigger.addEventListener("click", function () {
        var classList = content.classList;
        var isClosed = classList.value.indexOf("hidden") !== -1;

        if (isClosed) {
            content.classList.remove("hidden");
            for (var i = 0; i < arrows.length; i++) {
                arrows[i].classList.add("rotate");
            }
        } else {
            content.classList.add("hidden");
            for (var i = 0; i < arrows.length; i++) {
                arrows[i].classList.remove("rotate");
            }
        }
    });

    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey="
            + "<%= apiKey %>"
            + "&apiClientKey="
            + "<%= apiClientKey %>"
            + "&placements="
            + "<%= placements %>";

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
        var html = '';
        for (var i = 0, len = products.length; i < len; i++) {
            html += `<a class="item click-trigger" href="${products[i].productURL}" target="_blank">
        <img src="${products[i].imageURL}" alt="${products[i].name}" class="item-img">
        <div class="item-title">
          ${products[i].name}
        </div>
        <div class="item-price">
          <%= items_currency %>${(parseInt(products[i].priceCents) / 100).toLocaleString("pt-BR")}
        </div>
      </a>`;
        }
        spinner.classList.add("hidden");
        recList.innerHTML = html;
        enableCarousel();
    }

    function enableCarousel() {

        var axis = window.innerWidth <= 600 ? "vertical" : "horizontal";

        slider = tns({
            container: "#recommedationExperience_<%= guid %> .list",
            prevButton: "#recommedationExperience_<%= guid %> .icon-left",
            nextButton: "#recommedationExperience_<%= guid %> .icon-right",
            nav: false,
            slideBy: "page",
            arrowKeys: true,
            mouseDrag: false,
            loop: isCarousel,
            axis: axis,
            items: 3,
            responsive: {
                600: {
                    items: 3
                },
                900: {
                    items: 4
                },
                1300: {
                    items: 6
                },
                1700: {
                    items: 7
                }
            }
        });
    }

})();