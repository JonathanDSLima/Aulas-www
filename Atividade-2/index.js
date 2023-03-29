$(document).ready(() => { 
    popularTabela() 
    $( ".search" ).on( "click", function() {
        searchCoin($('.form-control').val())
    });
})

const url = "https://api.coincap.io/v2/assets";

function popularTabela(field){
    $.ajax({
        url: url,
        type: "GET"
    })
    .done(function(obj) {
        exibirCoins(obj.data);
    })
    .fail(function(message){
        console.log(message);
    })
}

function exibirCoins(data){
    for (let index = 0; index < data.length; index++) {
        const link = `<a class='btn' target='_blank' href=${data[index].explorer}><img class='icon-link' src="images/link.png" alt="${data[index].explorer}"></a>`

        $(".body-data").append(
            "<tr>" +
            "<td>" + data[index].symbol + "</td>" +
            "<td>" + data[index].id.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) + "</td>" +
            "<td>" + parseFloat(data[index].priceUsd).toFixed(4)  + "</td>" +
            "<td>" + parseFloat(data[index].changePercent24Hr).toFixed(2)  + "%" + "</td>" +
            "<td>" + link + "</td>" +
            "</tr>"
        )
    }
}

function searchCoin(field){
    $.ajax({
        url: url,
        type: "GET"
    })
    .done(function(obj) {
        let aux = obj.data.find( t => t.symbol == field);
        $.ajax({
            url: url + '/' + aux.id,
            type: "GET"
        })
        .done(function(obj) {
            displayOneCoin(obj);
        })
        .fail(function(message){
            console.log(message);
        })
    })
    .fail(function(message){
        console.log(message);
    })
}

function displayOneCoin(obj){
    console.log(obj);
    $(".body-data" ).remove();
    $("table" ).append('<tbody class="body-data"></tbody>');
    const link = `<a class='btn' target='_blank' href=${obj.data.explorer}><img class='icon-link' src="images/link.png" alt="${obj.data.explorer}"></a>`
    $(".body-data").append(
        "<tr>" +
        "<td>" + obj.data.symbol + "</td>" +
        "<td>" + obj.data.id.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase()) + "</td>" +
        "<td>" + parseFloat(obj.data.priceUsd).toFixed(4)  + "</td>" +
        "<td>" + parseFloat(obj.data.changePercent24Hr).toFixed(2)  + "%" + "</td>" +
        "<td>" + link + "</td>" +
        "</tr>"
    )
}