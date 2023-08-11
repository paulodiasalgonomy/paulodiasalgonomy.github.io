// LocalStorage Variables 
// APIs
localStorage.RecForPlacements = localStorage.RecForPlacements || false;
localStorage.Discover = localStorage.Discover || false;
localStorage.RecForPlacementsContext || false;
localStorage.Find = localStorage.Find || false;
localStorage.Personalize = localStorage.Personalize || false;
localStorage.apiKey = localStorage.apiKey || false;
localStorage.apiClientKey = localStorage.apiClientKey || false;
// Pages
localStorage.HomePage = localStorage.HomePage || false;
localStorage.CategoryPage = localStorage.CategoryPage || false;
localStorage.GenericPage = localStorage.GenericPage || false;
localStorage.SearchPage = localStorage.SearchPage || false;
localStorage.ItemPage = localStorage.ItemPage || true;
localStorage.AddtoCartPage = localStorage.AddtoCartPage || false;
localStorage.CartPage = localStorage.CartPage || false;
localStorage.PurchaseCompletePage = localStorage.PurchaseCompletePage || true;

// Functions
function apisDefinition(api, status) {
    switch (api) {
        case 'RecForPlacements':
            localStorage.RecForPlacements = status;
            break;
        case 'Discover':
            localStorage.Discover = status;
            break;
        case 'RecForPlacementsContext':
            localStorage.RecForPlacementsContext = status;
            break;
        case 'Find':
            localStorage.Find = status;
            break;
        case 'Personalize':
            localStorage.Personalize = status;
            break;

        case 'HomePage':
            localStorage.HomePage = status;
            break;
        case 'CategoryPage':
            localStorage.CategoryPage = status;
            break;
        case 'GenericPage':
            localStorage.GenericPage = status;
            break;
        case 'SearchPage':
            localStorage.SearchPage = status;
            break;
        case 'ItemPage':
            localStorage.ItemPage = status;
            break;
        case 'AddtoCartPage':
            localStorage.AddtoCartPage = status;
            break;
        case 'CartPage':
            localStorage.CartPage = status;
            break;
        case 'PurchaseCompletePage':
            localStorage.PurchaseCompletePage = status;
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
                    /* Remove the attribute, and call this function once more: */
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

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

// Input update
$(".form-input-text").on('input', function () {
    infoDefinition(this.id, this.value);
});
// Retrieve Form Status
$(window).on('load', function () {
   let  i;
   let checkboxes = document.querySelectorAll('input[type=checkbox]');
   let textInputs = document.querySelectorAll('input[type=text]');
   for (i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = localStorage.getItem(checkboxes[i].id) === 'true' ? true : false;
    }
    for (i = 0; i < textInputs.length; i++) {
        textInputs[i].value = localStorage.getItem(textInputs[i].id) !== 'false' ? localStorage.getItem(textInputs[i].id) : '';
    }
});

