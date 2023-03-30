$(document).ready(() => { 
    fillTable() 
})

const url = "https://api.coincap.io/v2/assets";

function fillTable(symbol){
    $.ajax({
        url: url,
        type: "GET"
    })
    .done(function(obj) {
        if(symbol){
            let aux = obj.data.find( t => t.symbol == symbol);
            if (aux){
                displayOneCoin(aux)
            } else {  
                $(".modal").modal("show")
                $("#modal-message").html("Moeda inválida!")
            }
        } else {
            displayCoins(obj.data);
        }  
    })
    .fail(function(msg){
        const error = msg.responseJSON.message
        console.log(error, msg);
        if(error === "Not Found"){
            $(".modal").modal("show")
            $("#modal-message").html("Moeda não encontrada na base de dados oO")
        }
    })
}

$( ".search" ).on( "click", function() {
    const inputValue = $('.form-control').val().toUpperCase()
    if(inputValue === ""){
        $(".modal").modal("show")
        $("#modal-message").html("O campo de pesquisa não pode ser vazio =/")
    } else {
        fillTable(inputValue)
    }
});

$( ".clear" ).on( "click", function() {
    fillTable()
});

function displayCoins(data){
    clearTable()
    for (let index = 0; index < data.length; index++) {
        constructTable(data[index])
    }
}

function displayOneCoin(obj){
    console.log(obj);
    clearTable()
    constructTable(obj)
}

function clearTable(){
    $(".body-data" ).remove();
    $("table" ).append('<tbody class="body-data"></tbody>');
}

function constructTable(obj){
    const formatter = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
      });
    const link = `<a class='btn' target='_blank' href=${obj.explorer}><img class='icon-link' src="images/link.png" alt="${obj.explorer}"></a>`
    const changePercent = obj.changePercent24Hr 
    let color = "green";
    changePercent > 0 ? color : color = "red"

    $(".body-data").append(
        "<tr>" +
        "<td>" + obj.symbol + "</td>" +
        "<td>" + obj.name + "</td>" +
        "<td>" + formatter.format(parseFloat(obj.priceUsd).toFixed(4))  + "</td>" +
        `<td style='color: ${color}'>` + parseFloat(obj.changePercent24Hr).toFixed(2)  + "%" + "</td>" +
        "<td>" + link + "</td>" +
        "</tr>"
    )
}