// LocalStorage Variables 
// APIs
localStorage.recsForPlacements = localStorage.recsForPlacements || false;
localStorage.discover = localStorage.discover || false;
localStorage.recsForPlacementsContext || false;
localStorage.find = localStorage.find || false;
localStorage.personalize = localStorage.personalize || false;
localStorage.apiKey = localStorage.apiKey || false;
localStorage.apiClientKey = localStorage.apiClientKey || false;
// Pages
localStorage.homePage = localStorage.homePage || false;
localStorage.categoryPage = localStorage.categoryPage || false;
localStorage.genericPage = localStorage.genericPage || false;
localStorage.searchPage = localStorage.searchPage || false;
localStorage.itemPage = localStorage.itemPage || true;
localStorage.addToCartPage = localStorage.addToCartPage || false;
localStorage.cartPage = localStorage.cartPage || false;
localStorage.purchaseCompletePage = localStorage.purchaseCompletePage || true;

// Functions
function apisDefinition(api, status) {
    switch (api) {
        case 'recsForPlacements':
            localStorage.recsForPlacements = status;
            break;
        case 'discover':
            localStorage.discover = status;
            break;
        case 'recsForPlacementsContext':
            localStorage.recsForPlacementsContext = status;
            break;
        case 'find':
            localStorage.find = status;
            break;
        case 'personalize':
            localStorage.personalize = status;
            break;

        case 'homePage':
            localStorage.homePage = status;
            break;
        case 'categoryPage':
            localStorage.categoryPage = status;
            break;
        case 'genericPage':
            localStorage.genericPage = status;
            break;
        case 'searchPage':
            localStorage.searchPage = status;
            break;
        case 'itemPage':
            localStorage.itemPage = status;
            break;
        case 'addToCartPage':
            localStorage.addToCartPage = status;
            break;
        case 'cartPage':
            localStorage.cartPage = status;
            break;
        case 'purchaseCompletePage':
            localStorage.purchaseCompletePage = status;
            break;

    }
}
function infoDefinition(id, value) {
    switch (id) {
        case 'apiKey':
            localStorage.apiKey = value;
            break;
        case 'apiClientKey':
            localStorage.apiClientKey = value;
            break;
    }
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}
includeHTML();

// Jquery Listeners
$("body").on('load', function () {
    infoDefinition(this.id, this.value);
    console.log(this.id + ' ---> ' + this.value);
});

var switchStatus = 'nao-alterado';
$(".form-check-input").on('change', function () {
    if ($(this).is(':checked')) {
        switchStatus = $(this).is(':checked');
        apisDefinition(this.id, switchStatus);
    }
    else {
        switchStatus = $(this).is(':checked');
        apisDefinition(this.id, switchStatus);
    }
});

/* $(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
 */
// Input update
$(".form-input-text").on('input', function () {
    infoDefinition(this.id, this.value);
});
// Retrieve Form Status
$(window).on('load', function () {
    let i;
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    let textInputs = document.querySelectorAll('input[type=text]');
    for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = localStorage.getItem(checkboxes[i].id) === 'true' ? true : false;
    }
    for (i = 0; i < textInputs.length; i++) {
        textInputs[i].value = localStorage.getItem(textInputs[i].id) !== 'false' ? localStorage.getItem(textInputs[i].id) : '';
    }
});

// Nav Functions
function nextPage(currentPage) {
    if (localStorage.apiKey == 'false') {
        alert('apiKey is required!');
    } else if ((localStorage.homePage == 'false') && (localStorage.categoryPage == 'false') && (localStorage.genericPage == 'false') && (localStorage.searchPage == 'false') && (localStorage.itemPage == 'false') && (localStorage.addToCartPage == 'false') && (localStorage.cartPage == 'false') && (localStorage.purchaseCompletePage == 'false')) {
        alert('Please select at least one type of page!');
    } else {
        switch (currentPage) {
            case 'index.html':
                if (localStorage.homePage == 'true') {
                    window.location.href = "./homePage.html";
                } else if (localStorage.categoryPage == 'true') {
                    window.location.href = "./categoryPage.html";
                } else if (localStorage.genericPage == 'true') {
                    window.location.href = "./genericPage.html";
                } else if (localStorage.searchPage == 'true') {
                    window.location.href = "./searchPage.html";
                } else if (localStorage.itemPage == 'true') {
                    window.location.href = "./itemPage.html";
                } else if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'homePage.html':
                if (localStorage.categoryPage == 'true') {
                    window.location.href = "./categoryPage.html";
                } else if (localStorage.genericPage == 'true') {
                    window.location.href = "./genericPage.html";
                } else if (localStorage.searchPage == 'true') {
                    window.location.href = "./searchPage.html";
                } else if (localStorage.itemPage == 'true') {
                    window.location.href = "./itemPage.html";
                } else if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'categoryPage.html':
                if (localStorage.genericPage == 'true') {
                    window.location.href = "./genericPage.html";
                } else if (localStorage.searchPage == 'true') {
                    window.location.href = "./searchPage.html";
                } else if (localStorage.itemPage == 'true') {
                    window.location.href = "./itemPage.html";
                } else if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'genericPage.html':
                if (localStorage.searchPage == 'true') {
                    window.location.href = "./searchPage.html";
                } else if (localStorage.itemPage == 'true') {
                    window.location.href = "./itemPage.html";
                } else if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'searchPage.html':
                if (localStorage.itemPage == 'true') {
                    window.location.href = "./itemPage.html";
                } else if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'itemPage.html':
                if (localStorage.addToCartPage == 'true') {
                    window.location.href = "./addToCartPage.html";
                } else if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'addToCartPage.html':
                if (localStorage.cartPage == 'true') {
                    window.location.href = "./cartPage.html";
                } else if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'cartPage.html':
                if (localStorage.purchaseCompletePage == 'true') {
                    window.location.href = "./purchaseCompletePage.html";
                } else {
                    window.location.href = "./result.html";
                }
                break;
            case 'purchaseCompletePage.html':
                window.location.href = "./result.html";
                break;
        }
    }

}
function prevPage(currentPage) {
    switch (currentPage) {
        case 'result.html':
            if (localStorage.purchaseCompletePage == 'true') {
                window.location.href = "./purchaseCompletePage.html";
            } else if (localStorage.cartPage == 'true') {
                window.location.href = "./cartPage.html";
            } else if (localStorage.addToCartPage == 'true') {
                window.location.href = "./addToCartPage.html";
            } else if (localStorage.itemPage == 'true') {
                window.location.href = "./itemPage.html";
            } else if (localStorage.searchPage == 'true') {
                window.location.href = "./searchPage.html";
            } else if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'purchaseCompletePage.html':
            if (localStorage.cartPage == 'true') {
                window.location.href = "./cartPage.html";
            } else if (localStorage.addToCartPage == 'true') {
                window.location.href = "./addToCartPage.html";
            } else if (localStorage.itemPage == 'true') {
                window.location.href = "./itemPage.html";
            } else if (localStorage.searchPage == 'true') {
                window.location.href = "./searchPage.html";
            } else if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'cartPage.html':
            if (localStorage.addToCartPage == 'true') {
                window.location.href = "./addToCartPage.html";
            } else if (localStorage.itemPage == 'true') {
                window.location.href = "./itemPage.html";
            } else if (localStorage.searchPage == 'true') {
                window.location.href = "./searchPage.html";
            } else if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'addToCartPage.html':
            if (localStorage.itemPage == 'true') {
                window.location.href = "./itemPage.html";
            } else if (localStorage.searchPage == 'true') {
                window.location.href = "./searchPage.html";
            } else if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'itemPage.html':
            if (localStorage.searchPage == 'true') {
                window.location.href = "./searchPage.html";
            } else if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'searchPage.html':
            if (localStorage.genericPage == 'true') {
                window.location.href = "./genericPage.html";
            } else if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'genericPage.html':
            if (localStorage.categoryPage == 'true') {
                window.location.href = "./categoryPage.html";
            } else if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'categoryPage.html':
            if (localStorage.homePage == 'true') {
                window.location.href = "./homePage.html";
            } else {
                window.location.href = "./index.html";
            }
            break;
        case 'homePage.html':
            window.location.href = "./index.html";
            break;
    }
}

// Title generator
$(window).on('load', function () {
    let url = window.location.href;
    if (url.match(/homePage/)) {
        $('#h1Header').append('Home Page');
        $('#progress-header > div').width('12.5%');
        $('#progress-header > div').css('background-color', '#E10000');
    } else if (url.match(/categoryPage/)) {
        $('#h1Header').append('Category Page');
        $('#progress-header > div').width('25%');
        $('#progress-header > div').css('background-color', '#B93428');
    } else if (url.match(/genericPage/)) {
        $('#h1Header').append('Generic Page');
        $('#progress-header > div').width('37.5%');
        $('#progress-header > div').css('background-color', '#DE6656');
    } else if (url.match(/searchPage/)) {
        $('#h1Header').append('Search Page');
        $('#progress-header > div').width('50%');
        $('#progress-header > div').css('background-color', '#D97551');
    } else if (url.match(/itemPage/)) {
        $('#h1Header').append('Item Page');
        $('#progress-header > div').width('62.5%');
        $('#progress-header > div').css('background-color', '#AB8969');
    } else if (url.match(/addToCartPage/)) {
        $('#h1Header').append('Add To Cart Page');
        $('#progress-header > div').width('75%');
        $('#progress-header > div').css('background-color', '#CAC567');
    } else if (url.match(/cartPage/)) {
        $('#h1Header').append('Cart Page');
        $('#progress-header > div').width('80.5%');
        $('#progress-header > div').css('background-color', '#EBE042');
    } else if (url.match(/purchaseCompletePage/)) {
        $('#h1Header').append('Purchase Complete Page');
        $('#progress-header > div').width('95%');
        $('#progress-header > div').css('background-color', '#ADDE52');
    } else if (url.match(/result/)) {
        $('#h1Header').append('Result Page');
    } else { console.log('URL NOT FOUND'); }
});