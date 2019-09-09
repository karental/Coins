
// start chart
function liveReports() {
    if (coinArray.length < 5) {
        alert('Please choose 5 coins for the Live Reports.');
        return;
    }
    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var dataPoints4 = [];
    var dataPoints5 = [];
    var options = {
        title: {
            text: "CryptoCompare",
            fontSize: 40

        },
        axisX: {
            title: "chart updates every 2 secs"
        },
        axisY: {
            suffix: "$",
            title: "Coin Value"

        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            verticalAlign: "top",
            fontSize: 17,
            fontColor: "dimGrey",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "000.000000 $",
            xValueFormatString: "hh:mm:ss TT",
            showInLegend: true,
            name: coinArray[0],
            dataPoints: dataPoints1
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "000.000000 $",
            showInLegend: true,
            name: coinArray[1],
            dataPoints: dataPoints2
        }, {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "000.000000 $",
            showInLegend: true,
            name: coinArray[2],
            dataPoints: dataPoints3
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "000.000000 $",
            showInLegend: true,
            name: coinArray[3],
            dataPoints: dataPoints4
        },
        {
            type: "line",
            xValueType: "dateTime",
            yValueFormatString: "000.000000 $",
            showInLegend: true,
            name: coinArray[4],
            dataPoints: dataPoints5
        }]
    };

    var chart = $("#chartContainer").CanvasJSChart(options);

    function toggleDataSeries(e) { /// פה לעשות את הפונקציה שמחליפה מטבעות
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

    var updateInterval = 5000;
    // initial value
    var yValue1 = 0;
    var yValue2 = 0;
    var yValue3 = 0;
    var yValue4 = 0;
    var yValue5 = 0;

    var time = new Date;

    function updateChart(count) {
        if (coinArray.length < 5) return
        refresh();

        count = count || 1;
        var deltaY1, deltaY2, deltaY3, deltaY4, deltaY5;
        for (var i = 0; i < count; i++) {
            time.setTime(time.getTime() + updateInterval);
            deltaY1 = -1 + Math.random() * (1 + 1);
            deltaY2 = -1 + Math.random() * (1 + 1);
            deltaY3 = -1 + Math.random() * (1 + 1);
            deltaY4 = -1 + Math.random() * (1 + 1);
            deltaY5 = -1 + Math.random() * (1 + 1);

            yValue1 = myCoin[0];
            yValue2 = myCoin[1];
            yValue3 = myCoin[2];
            yValue4 = myCoin[3];
            yValue5 = myCoin[4];

            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });
            dataPoints3.push({
                x: time.getTime(),
                y: yValue3
            });
            dataPoints4.push({
                x: time.getTime(),
                y: yValue4
            });
            dataPoints5.push({
                x: time.getTime(),
                y: yValue5
            });

        }

        // updating legend text with  updated with y Value 
        options.data[0].legendText = coinArray[0] + ": " + yValue1 + "$";
        options.data[1].legendText = coinArray[1] + ": " + yValue2 + "$";
        options.data[2].legendText = coinArray[2] + ": " + yValue3 + "$";
        options.data[3].legendText = coinArray[3] + ": " + yValue4 + "$";
        options.data[4].legendText = coinArray[4] + ": " + yValue5 + "$";

        $("#chartContainer").CanvasJSChart().render();
    }
    // generates first set of dataPoints 
    updateChart(100);
    setInterval(function () { updateChart() }, updateInterval);
}
/// end chart

function getCoin(element) { // creats a more info div with information about coin currancy and image
    element = element.toLowerCase()
    let coinLink = `https://api.coingecko.com/api/v3/coins/${element}`;
    if (/\s/.test(element)) {
        alert('Information Not Available');
    }
    else {
        $.get(coinLink,
            function (element) {
                coinIdElement = element.id;
                var coinMoreInfo = $(`#coin${coinIdElement}`)
                coinMoreInfo.html('');
                var coinImage = element.image.small;
                var coinDoll = element.market_data.current_price.usd;
                var coinEuro = element.market_data.current_price.eur;
                var coinNis = element.market_data.current_price.ils;
                var coinArray = [coinIdElement, coinImage, coinDoll, coinEuro, coinNis];
                localStorageSave(coinArray);
                coinMoreInfo.append(
                    `<span class="theFlag"><img id="theFlag" src=${coinImage} /></span></br>
                Dollars: <span>${coinDoll}$</span></br>
                Euro: <span>${coinEuro}&euro;</span></br>
                Nis: <span>${coinNis}&#8362;</span>`
                );
            });
    }
}


var t = 0;
function timeInter(element) { // gets information from local story or api, depends on time that past
    if (localStorage.getItem(`${element}`) === null) {
        getCoin(element);
        t = 0;
    }
    else {
        if (t == 1) {
            localStorageSave(element);
        }
        else {
            getCoin(element);
        }
        t = 1;
        setTimeout(function () {
            t = 0;
        }, 120000)
    }
}

function localStorageSave(element) { // saves more info information in loacl storage as array
    localStorage.setItem(element[0], element);
}
// global arrays
let coinArray = [];
let myCoin = [];
let myCoinLink = [];
let myElemCoin = null;

function toggleBack(element) { // gets switch back in certin situation when coin cannot be pushed to array
    var unCheck = document.getElementById(`${element}`);
    if (unCheck.checked === true) {
        unCheck.checked = false;
    }

}

function toggle(element) { // pushes relevent coins to array, if nmore then 5, modal opens
    var elemCoin = element.id;
    var checkBox = document.getElementById(elemCoin);
    if (checkBox.checked === true) {
        if (coinArray.length <= 4) {
            myElemCoin = elemCoin.toUpperCase();
            coinArray.push(myElemCoin);
            refresh()
        }
        else {
            console.log('more than 5');
            toggleBack(elemCoin);
            document.getElementById(`${elemCoin}`).onclick = modalDelete(elemCoin);
            $("#myModal").modal();
            return;
        }
    }
    else {
        var coinId = elemCoin.toUpperCase();
        var coinIdx = coinArray.indexOf(coinId);
        if (coinIdx !== -1) {
            myCoin.splice(coinIdx, 1);
            coinArray.splice(coinIdx, 1);
        }
    }
}

function refresh() { // pushes to array relevent information of dollar currancy for the chart
    myCoinLink = [];
    let USDlink = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${myElemCoin}&tsyms=USD`;
    myCoinLink.push(USDlink);
    for (var v in myCoinLink) {
        $.get(myCoinLink[v], function (dollar) {
            for (var x in dollar) {
                if (isNaN(dollar[x].USD)) {
                    alert(`There is no data for ${myElemCoin}. Please pick another coin.`);
                    coinArray.pop();
                    toggleBElem = myElemCoin.toLowerCase();
                    toggleBack(toggleBElem);
                    return
                }
                // else {
                // }
                var selCoin = (dollar[x].USD);
                if (myCoin.length <= 4) {
                    console.log(selCoin)
                    console.log('coinArray', coinArray)
                    console.log('myCoin', myCoin)
                    console.log('myCoinLink', myCoinLink)
                    myCoin.push(selCoin);
                }
            }
        }
        );
    }
}
function getCoins() { // the first function in on load, gets all coins.
    localStorage.clear();

    let coinLink = "https://api.coingecko.com/api/v3/coins/list";
    $.get(coinLink,
        function (coin) {
            var coins = 102;
            var coinCards = $('#coinCards');
            var elem = document.getElementById("myBar");
            var width = 2;
            document.getElementById('coinCards').innerHTML = '';
            for (var i = 2; i <= coins; i++) {
                width++
                elem.style.width = width + '%';
                if (elem.style.width === '100%') {
                    elem.style.display = 'none';
                }
                var coinSymbol = (coin[i].symbol);
                var coinName = (coin[i].name);
                var coinId = (coin[i].id);
                coinCards.append(
                    `<div  id = "${coinSymbol}1" class="card eachCard" style="width: 18rem;">
                                <div id="${coinName}" class="card-body card-body-cus">
                                <label class="switch" >
                                <input type="checkbox" id="${coinSymbol}" onclick="toggle(this)">
                                <span class="slider round"></span>
                                </label>
                                <h5 id = "${coinSymbol}" class="card-title">${coinSymbol}</h5>
                                <p class="card-text">${coinName}</p>
                                <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#coin${coinId}" onclick="timeInter(this.parentElement.id)">More Info</button>
                                <div id="coin${coinId}" class="collapse"> 
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>`

                );
            }
        });
}
function modalDelete(elemCoin) { // creates the relevent coins in array for chart in moday, so user can delete
    console.log(elemCoin)
    $("#delete").empty();
    var chosenCoins = $('#delete');
    for (var i = 0; i < coinArray.length; i++) {
        chosenCoins.append(
            `<div id='${coinArray[i]}'>${coinArray[i]}: <button class="btn btn-primary modal-button" onclick="erase('${elemCoin}',this.parentElement.id)">erase</button></div>  </br>`
        );
    }
}

function erase(addCoin, eraseCoin) { // eraeses chosen coin from array via modal
    var erase = coinArray.indexOf(eraseCoin);
    myCoin.splice(erase, 1);
    coinArray.splice(erase, 1);
    coinArray.push(addCoin.toUpperCase())
    refresh()
    toggleBack(eraseCoin.toLowerCase());
    document.querySelector(`input[id="${addCoin}"]`).checked = true;
    modalDelete();
}



function search() { // search threw coin for coin in client wrote in input
    getCoins();
    let coinLink = "https://api.coingecko.com/api/v3/coins/list";
    $.get(coinLink,
        function (coin) {
            var coins = 102;
            var elem = document.getElementById("myBar");
            var width = 0;
            for (var i = 2; i <= coins; i++) {
                elem.style.display = 'block';
                var index = coin.indexOf(coin[i]);
                width++
                elem.style.width = width + '%';
                debugger
                if (elem.style.width === (index -1) + '%') {
                    elem.style.display = 'none';
                }
                var coinName = (coin[i].name);
                var coinSymbol = (coin[i].symbol);
                var myCoin = document.getElementById("searchInput").value;
                if (coinSymbol === myCoin) {
                    $(`#coinCards > :not(#${coinSymbol}1)`).hide();
                    break;
                }
            }
        });
}