
$(document).ready(function() { 

    var searchBtn = $('#searchBtn');
    var searchDiv = $('#searchDiv');
    // var searchInput = $('#searchInput');
    var citiesListed = $('#citiesListed');
    var dateDiv = $('#dateDiv')
    var cityView = $('#cityView');
    var m = moment();
    var dayOneDiv = $('#datePlusOne')
    var dayTwoDiv = $('#datePlusTwo')
    var dayThreeDiv = $('#datePlusThree')
    var dayFourDiv = $('#datePlusFour')
    var dayFiveDiv = $('#datePlusFive')

    var date = $('<h5>').text(m.format('LLLL'));
        dateDiv.prepend(date);
    var newMOne =  moment().add(1, 'days');
    var newMOne = newMOne.format('MMMM Do');
    var dayOne = $('<h6>').text(newMOne);
        dayOneDiv.prepend(dayOne);
    var newMTwo =  moment().add(2, 'days');
    var newMTwo = newMTwo.format('MMMM Do');
    var dayTwo = $('<h6>').text(newMTwo);
        dayTwoDiv.prepend(dayTwo);
    var newMThree =  moment().add(3, 'days');
    var newMThree = newMThree.format('MMMM Do');
    var dayThree = $('<h6>').text(newMThree);
        dayThreeDiv.prepend(dayThree);
    var newMFour =  moment().add(4, 'days');
    var newMFour = newMFour.format('MMMM Do');
    var dayFour = $('<h6>').text(newMFour);
        dayFourDiv.prepend(dayFour);
    var newMFive =  moment().add(5, 'days');
    var newMFive = newMFive.format('MMMM Do');
    var dayFive= $('<h6>').text(newMFive);
        dayFiveDiv.prepend(dayFive);

    var cityArr = [];



    function displayWeather() {
        var apiKey = 'fae937717785d2792a48e6280168beb0'
        var city = $(this).attr('data-name');
        //try switching city with searchInput and vice versa????
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid='+apiKey;
        $.ajax({
            url: queryURL,
            method:'GET'
        }).then(function(response){
            console.log(response);
            console.log(response.coord);
            // console.log(response.coord[1]);

            // var latNum = response.coord[0];
            // var lonNum = response.coord[1];

            // var apiKey = 'fae937717785d2792a48e6280168beb0'
            // var queryURLTwo = 'http://api.openweathermap.org/data/2.5/uvi?lat='+latNum+'&lon='+lonNum+'&appid='+apiKey;
            //     $.ajax({
            //         url:queryURLTwo,
            //         method:'GET'
            // }).then(function(response) {
            //         console.log(response);
            // });

            //icon of weather conditions, uv index, color-coded indication of weather
            var h3Name = $('<h3>').text(response.name);
            var showTemp = $('<p>').text('Temperature: ' + response.main.temp + ' F');
            var humidity = $('<p>').text('Humidity: ' + response.main.humidity + '%');
            var wind = $('<p>').text('Wind Speed: ' + response.wind.speed);
            cityView.append(h3Name, showTemp, humidity, wind);


            
            
        });
    };
    // displayWeather();
 
   

    function fiveDayForecast() {
        var apiKey = 'fae937717785d2792a48e6280168beb0'
        var city = $(this).attr('data-name');
        var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=imperial&appid='+apiKey;
        $.ajax({
           url:queryURL,
            method:'GET'
        }).then(function(response){
            console.log(response);
            //day 1
            var weatherOne = $('#weatherOne')
            var temp1 = $('<p>').text('Temp: ' + response.list[6].main.temp + ' F');
            var hum1 = $('<p>').text('Humidity: ' +  response.list[6].main.humidity + '%');
                weatherOne.append(temp1, hum1);
            //day 2
            var weatherTwo = $('#weatherTwo')
            var temp2 = $('<p>').text('Temp: ' + response.list[14].main.temp + ' F');
            var hum2 = $('<p>').text('Humidity: ' +  response.list[14].main.humidity + '%');
                weatherTwo.append(temp2, hum2);
            //day 3
            var weatherThree = $('#weatherThree')
            var temp3 = $('<p>').text('Temp: ' + response.list[22].main.temp + ' F');
            var hum3 = $('<p>').text('Humidity: ' +  response.list[22].main.humidity + '%');
                weatherThree.append(temp3, hum3);
            //day 4
            var weatherFour = $('#weatherFour')
            var temp4 = $('<p>').text('Temp: ' + response.list[30].main.temp + ' F');
            var hum4 = $('<p>').text('Humidity: ' +  response.list[30].main.humidity + '%');
                weatherFour.append(temp4, hum4);
            //day 5
            var weatherFive = $('#weatherFive')
            var temp5 = $('<p>').text('Temp: ' + response.list[38].main.temp + ' F');
            var hum5 = $('<p>').text('Humidity: ' +  response.list[38].main.humidity + '%');
                weatherFive.append(temp5, hum5);
        });
    };
    // fiveDayForecast();


    function renderCityButtons() {
        citiesListed.empty();
        cityView.empty();
        $('.fiveW').empty();
        for (var i = 0; i < cityArr.length; i++) {
            var a = $('<button>');
            a.addClass('city-btn');
            a.attr('data-name', cityArr[i]);
            a.text(cityArr[i]);
            citiesListed.append(a);
        };
    };

    
    searchBtn.on('click', function(event) {
        event.preventDefault();
        // citiesListed.empty();
        // cityView.empty();
        // $('.fiveW').empty();
        console.log('success');
        var searchInput = $('#searchInput').val().trim()
        // var searchCity = searchInput.val();
        cityArr.push(searchInput);
        renderCityButtons();
        displayWeather(searchInput);
        fiveDayForecast(searchInput);
    });

    $('.city-btn').on('click', function() {
        event.preventDefault();
        cityView.empty();
        $('.fiveW').empty();
    })
    




    // $(document).on('click', '#searchBtn', displayWeather);
    // $(document).on('click', '#searchBtn', displayWeather);
    $(document).on('click', '.city-btn', displayWeather);
    $(document).on('click', '.city-btn', fiveDayForecast);

    renderCityButtons()


});

     


    // function showUV() {
    //     var apiKey = 'fae937717785d2792a48e6280168beb0'
    //     var city = $(this).attr('data-name');
    //     var queryURL = 'http://api.openweathermap.org/data/2.5/uvi?lat='+latNum+'&lon'+lonNum+'&appid='+apiKey;
    //     $.ajax({
    //        url:queryURL,
    //         method:'GET'
    //     }).then(function(response) {

    //     });
    // };



// $('.city-btn').on('click', function() {
//     // cityView.empty();
//     $('#weatherOne').empty();
//     $('#weatherTwo').empty();
//     $('#weatherThree').empty();
//     $('#weatherFour').empty();
//     $('#weatherFive').empty();
//     // dayOneDiv.empty();
//     // dayTwoDiv.empty();
//     // dayThreeDiv.empty();
//     // dayFourDiv.empty();
//     // dayFiveDiv.empty();
//     event.preventDefault();
//     displayWeather();
//     fiveDayForecast();
// });


        // var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=pittsburgh&appid=' + apiKey;
        // http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=


    // function renderCityButtons() {
    //     citiesListed.empty()
    //     for (var i = 0; i < cityNames.length; i++) {
    //         var a = $('<button>');
    //         a.addClass('city-btn');
    //         a.attr('data-name', cityNames[i]);
    //         a.text(cityNames[i]);
    //         citiesListed.append(a);
    //     };
    // };
    



        // searchBtn.on('click', function(event) {
    //     event.preventDefault();
    //     var searchCity = searchInput.val();
    //     cityNames.push(searchCity);
    //     renderCityButtons();
    // });
    // renderCityButtons()



