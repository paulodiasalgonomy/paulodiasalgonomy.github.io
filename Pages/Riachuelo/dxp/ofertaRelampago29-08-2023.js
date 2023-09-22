
// Variables
let dxpElement = "<%=element%>";
let dxpTitle = "<%=title%>";
let dxpMessage = "<%=message%>";
let dxpDataFinal = "<%=end_date%>";
let dxpPlacement = "<%=placement%>";
let dxpButtonText = "<%=button_text%>";
let dxpButtonLink = "<%=button_link%>";
let dxpPosition = "<%=position%>";
let dxpImpressionsJSON = "";
let dxpRender = false;

// DataLayer Push Click em Produtos
function pushClickDatalayer(url, dlPriceCents, dlIsMkt, dlName, dlId, dlList, i, dlBrand, dlCategory, dlSalesPrice) {
    // faz o push no datalayer   
    window.dataLayer = window.dataLayer || [];
    if (dlCategory != '') {
        dlCategory = `"category":"` + dlCategory + `",`;
    }
    let json = JSON.parse(`{
        "event":"productClick",
        "eventCategory":"enhanced-ecommerce",
        "eventAction":"click",
        "ecommerce":{
            "click": {
                "actionField":{"list": "` + dlList + `"},
                "products": [{
                        "dimension32":"` + dlPriceCents + `",
                        "dimension40":"` + dlIsMkt + `",
                        "name":"` + dlName + `",
                        "id":"` + dlId + `",
                        "position":"` + i + `",
                        "brand":"` + dlBrand + `",
                        ` + dlCategory + `
                        "price":"` + dlSalesPrice + `" 
                    }]
                }
        }
    }`);
    window.dataLayer.push(json);
    sessionStorage.setItem("PRODUCT_DETAIL_LIST", dlList);

    // faz o get da url de click
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    }
    xhttp.send();
}
// DataLaayer Push click no botão que leva para a lista
function pushClickButtonListDatalayer() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        "event": "event",
        "eventCategory": "riachuelo:oferta-relampago",
        "eventAction": "clique:botao",
        "eventLabel": "confira-a-lista-completa-de-produtos"
    });
}

// Onload Funcion
function initializeCarousel() {
    // recsForPlacements Request
    function fetchProducts() {
        var request = new XMLHttpRequest();
        const rcsValue = document.cookie.split("; ").find(row => row.startsWith(`rr_rcs=`));
        var url = "https://recs.richrelevance.com/rrserver/api/rrPlatform/recsForPlacements?apiKey=e20fd45b1e19a8c6" + "&apiClientKey=2a52873853496275" + "&placements=" + dxpPlacement;
        if (typeof window.R3_COMMON != "undefined") {
            if (typeof window.R3_COMMON.categoryId != "undefined") {
                url += "&categoryId=" + R3_COMMON.categoryId
            }
            if (typeof window.R3_COMMON.productId != "undefined") {
                url += "&productId=" + R3_COMMON.productId
            }
            if (typeof window.R3_COMMON.sessionId != "undefined") {
                url += "&sessionId=" + R3_COMMON.sessionId;
            } else {
                url += "&sessionId=" + R3_COMMON.sessionId;
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
    // DataLayer JSON impressions
    function createImpressions(dlPriceCents, dlIsMkt, dlName, id, dlList, i, dlBrand, dlCategory, dlSalesPrice) {
        if (dlCategory != '') {
            dlCategory = `"category":"` + dlCategory + `",`;
        }
        if (dxpImpressionsJSON == "") {
            dxpImpressionsJSON = `{"dimension32":"` + dlPriceCents + `","dimension40":"` + dlIsMkt + `","name":"` + dlName + `","id":"` + id + `","list":"` + dlList + `","position":"` + i + `","brand":"` + dlBrand + `",` + dlCategory + `"price":"` + dlSalesPrice + `"}`;
        } else {
            dxpImpressionsJSON = dxpImpressionsJSON + `,{"dimension32":"` + dlPriceCents + `","dimension40":"` + dlIsMkt + `","name":"` + dlName + `","id":"` + id + `","list":"` + dlList + `","position":"` + i + `","brand":"` + dlBrand + `",` + dlCategory + `"price":"` + dlSalesPrice + `"}`;
        }
    }
    // DataLayer Push Event
    function pushImpressionsDataLayer(dxpImpressionsJSON) {
        let datalayerJson = `{
            "event":"productImpression",
            "noInteraction":"1",
            "eventCategory":"enhanced-ecommerce",
            "eventAction":"impressions",
            "ecommerce":{
                "impressions":[` + dxpImpressionsJSON + `]
        }}`;
        window.dataLayer = window.dataLayer || [];
        var newDataLayerJson = JSON.parse(datalayerJson);
        window.dataLayer.push(newDataLayerJson);
        dxpRender = true;
    }
    // Products Carousel Build
    function buildProducts(products) {
        var dxpWindowWidth = window.innerWidth;
        (dxpWindowWidth < 600) ? dxpWindowWidth = "?imwidth=100" : dxpWindowWidth = "?imwidth=140";
        var html = `<div id="dxp-section">
                        <div id="dxp-title">
                        <div id="dxp-title-left">
                            <p>`+ dxpTitle + `</p>
                        </div>
                        <div id="dxp-title-right">
                            <p>`+ dxpMessage + `</p>
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
                    <div id="dxp-carrossel" class="owl-carousel owl-theme">`;
        for (var i = 0, len = products.length; i < len; i++) {
            // Datalayer Variables
            var finalPrice = '';
            let dlIsMkt = '';
            let dlCategory = '';
            let catalogDepartament = "";
            let productCategoryName = "";

            if ('catalog_department' in products[i].attributes) {
                catalogDepartament = products[i].attributes.catalog_department[0];
            }
            if ('product_category_name' in products[i].attributes) {
                productCategoryName = products[i].attributes.product_category_name[0];
            }
            let dlPriceCents = String(products[i].priceCents / 100);
            let dlName = products[i].name.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
            let dlList = dxpTitle.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
            let dlBrand = products[i].brand.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
            let dlSalesPrice = String(products[i].salePriceCents / 100);
            if (products[i].attributes.marketplace[0] == "false") {
                dlIsMkt = "sim:" + products[i].attributes.seller_id[0].normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
                dlCategory = catalogDepartament.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
            } else {
                dlIsMkt = "nao:" + products[i].attributes.seller_id[0].normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
                dlCategory = productCategoryName.normalize("NFD").replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().replace(/\s/g, "-");
            }
            // Price layout
            if (products[i].salePriceCents == products[i].priceCents) {
                finalPrice = '<p class="dxp-precoCheio">R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
            } else {
                var fromPrice = '<p class="dxp-precoDe">De R$ ' + (parseInt(products[i].priceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
                var toPrice = '<p class="dxp-precoPor">Por R$ ' + (parseInt(products[i].salePriceCents) / 100).toLocaleString('pt-br', { style: 'decimal', minimumFractionDigits: 2 }) + '</p>';
                finalPrice = fromPrice + toPrice;
            }

            // Layout HTML estructure
            html += `<a class="item click-trigger" href="` + products[i].productURL + `" title="Ir para ` + products[i].name + `" onClick="javascript:pushClickDatalayer('` + products[i].clickTrackingURL + `','` + dlPriceCents + `','` + dlIsMkt + `','` + dlName + `','` + products[i].id + `','` + dlList + `','` + String(i + 1) + `','` + dlBrand + `','` + dlCategory + `','` + dlSalesPrice + `');">
                        <div class="dxp-bg-img"><img src="`+ products[i].imageURL + dxpWindowWidth + `" data-src="` + products[i].imageURL + dxpWindowWidth + `" alt="` + products[i].name + `" class="item-img owl-lazy"  onLoad="`
                + createImpressions(dlPriceCents, dlIsMkt, dlName, products[i].id, dlList, String(i + 1), dlBrand, dlCategory, dlSalesPrice) + `"/></div>
                        <div class="item-title"><p class="dxp-p-title">`+ products[i].name + `</p></div> 
                        <div class="item-price">`+ finalPrice + `</div>
                    </a>`;
        }
        html += "</div><a href='" + dxpButtonLink + "'title='" + dxpButtonText + "' onClick='javascript:pushClickButtonListDatalayer();' class='click-trigger' id='dxp-button-link'><button id='dxp-button'>" + dxpButtonText + "</button></a></div>";

        if (typeof document.getElementById(dxpElement) !== 'undefined') {
            let el = document.getElementById(dxpElement) || "";
            if (el != '') {
                el.insertAdjacentHTML(dxpPosition, html);
                pushImpressionsDataLayer(dxpImpressionsJSON);
            }
        }
    }

    // Countdown Function
    function setCountdown(endDate) {
        var countDownDate = new Date(endDate);
        countDownDate = new Date(countDownDate).getTime();
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

// Innitialize Experience
if (document.readyState !== 'loading') {
    initializeCarousel();
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
                    lazyLoad: true,
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
                            items: 1,
                            nav: false,
                            dots: true,
                            autoplay: true
                        },
                        330: {
                            items: 2,
                            nav: false,
                            dots: true,
                            autoplay: true
                        },
                        600: {
                            items: 3,
                            nav: true,
                            dots: false,
                            autoplay: false
                        },
                        900: {
                            items: 4,
                            nav: true,
                            dots: false,
                            autoplay: false
                        }
                    }
                });
            });
        }
    }, 1500);
} else {
    document.addEventListener('DOMContentLoaded', initializeCarousel);
}
