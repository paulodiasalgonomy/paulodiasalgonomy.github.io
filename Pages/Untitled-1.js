
function initializeCarousel() {
    var dxpElement = "<%=element%>";
    var dxpTitle = "<%=title%>";
    var dxpMessage = "<%=message%>";
    var dxpDataFinal = "<%=end_date%>";
    var dxpPlacement = "<%=placement%>";
    var dxpButtonText = "<%=button_text%>";
    var dxpButtonLink = "<%=button_link%>";
    var dxpPosition = "<%=position%>";
    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie
            .split("; ")
            .find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6"
            + "&apiClientKey=2a52873853496275"
            + "&placements="+dxpPlacement;
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
        request.open("GET", url);
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

        var dxpWindowWidth = window.innerWidth;
        (dxpWindowWidth < 600) ? dxpWindowWidth = "?imwidth=169" : dxpWindowWidth = "?imwidth=283";
        var html = `<div id="dxp-section" class="click-trigger">
                        <div id="dxp-title">
                        <div id="dxp-title-left">
                            <p>`+dxpTitle+`</p>
                        </div>
                        <div id="dxp-title-right">
                            <p>`+dxpMessage+`</p>
                            <div id="dxp-clock">
                                <div>
                                    <span id="dxp-days"></span>
                                    <span id="dxp-days-label">dias</span>
                                </div>
                                <div>
                                    <span id="dxp-hours"></span>
                                    <span id="dxp-hours-label">hrs</span>
                                </div>
                                <div>
                                    <span id="dxp-mins"></span>
                                    <span id="dxp-mins-label">min</span>
                                </div>
                                <div>
                                    <span id="dxp-secs"></span>
                                    <span id="dxp-secs-label">seg</span>
                                </div>
                            </div>
                        </div>
                        <div id="dxp-clr"></div>
                    </div>
                    <div id="dxp-carrossel" class="click-trigger owl-carousel owl-theme">`;
        for (var i = 0, len = products.length; i < len; i++) {
            if (products[i].salePriceCents == products[i].priceCents){
                var finalPrice = '<p class="dxp-precoCheio">R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', {style: 'decimal', minimumFractionDigits: 2})+'</p>';
            }else{
                var fromPrice = '<p class="dxp-precoDe">De R$ ' + (parseInt(products[i].priceCents) / 100).toLocaleString('pt-br', {style: 'decimal', minimumFractionDigits: 2})+'</p>';     
                var toPrice = '<p class="dxp-precoPor">Por R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', {style: 'decimal', minimumFractionDigits: 2})+'</p>';     
                var finalPrice = fromPrice + toPrice;
            }
            html += `<a class="item click-trigger" href="`+products[i].clickURL+`" target="_blank">
                        <div class="dxp-bg-img click-trigger"><img src="`+products[i].imageURL+dxpWindowWidth+`" alt="`+products[i].name+`" class="item-img" /></div>
                        <div class="item-title click-trigger"><p class="dxp-p-title">`+products[i].name+`</p></div> 
                        <div class="item-price click-trigger">`+finalPrice+`</div>
                    </a>`;
        }
        html += "</div><a href='"+dxpButtonLink+"'title='"+dxpButtonText+"' class='click-trigger' id='dxp-button-link'><button class='click-trigger'  id='dxp-button'>"+dxpButtonText+"</button></a></div>";
        document.getElementById(dxpElement).insertAdjacentHTML(dxpPosition, html);
    }
    function setCountdown(endDate){
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
            document.getElementById("dxp-days").innerHTML = days + " :";
            document.getElementById("dxp-hours").innerHTML = hours + " :";
            document.getElementById("dxp-mins").innerHTML = minutes + " :";
            document.getElementById("dxp-secs").innerHTML = seconds + "";

            if (timeleft < 0) {
                clearInterval(myfunc);
                document.getElementById("dxp-days").innerHTML = "";
                document.getElementById("dxp-hours").innerHTML = "";
                document.getElementById("dxp-mins").innerHTML = "";
                document.getElementById("dxp-secs").innerHTML = "";
            }
        }, 1000);
    }
    fetchProducts();
    setCountdown(dxpDataFinal);
}


if (document.readyState !== 'loading') {
    initializeCarousel();
    console.log("inicializou vitrine 15")
    let dxpInterval = setInterval(function() {
    if(initializeCarousel && typeof initializeCarousel == 'function') {
        clearInterval(dxpInterval);
        require(["jquery", "owlcarousel"], function ($) {
            const prevIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>';
            const nextIcon = '<svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeLarge" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>';
            var owl = $("#dxp-carrossel");
            owl.owlCarousel({
                loop: true,
                items: 4,
				stagePadding: 1,
				responsiveBaseElement: "#dxp-section",
                nav: false,
                navText: [
                    prevIcon,
                    nextIcon
                ],
                dots: false,
                autoplay: false,
                transitionStyle: "slide",
                responsive: {
                    0: {
                        items: 2,
						nav: false,
                		dots: true,
                        autoplay: true
                    },
                    600: {
                        items: 4,
						nav: true,
                		dots: false,
                        autoplay: false
                    }
                }
            });
        });
    }
}, 2500);
} else {
  document.addEventListener('DOMContentLoaded', initializeCarousel);
}