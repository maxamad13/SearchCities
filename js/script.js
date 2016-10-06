
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var $street = $("#street").val();
    var $city = $("#city").val();
    // clear out old data before new request
    $wikiElem.text("");

    //Api Key
 
    // load streetview

    var imageApi = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + $street + ',' + $city;

    $body.append('<img class="bgimg" src=' + imageApi + '>');
    // YOUR CODE GOES HERE!

    //nytimes

    // Built by LucyBot. www.lucybot.co
//var key = "key=37240cb6151e447393c0a76910bc4e0d";

var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city //+ "&sort=newst&api-" + "key=37240cb6151e447393c0a76910bc4e0d";

$.getJSON(url, function(data){
    $nytHeaderElem.text("You requested info about " + $city);

    var articles = data.response.docs;

    for (var i = 0 ; i < articles.length; i++) {
        var article = articles[i]

        $nytElem.append('<li class="article">' + 

                        '<a href="">'+ article.headline.main + '</a>'+
                        '<p>' + article.snippet +'</p>'+
            '</li>' )
        //console.log(articles[i].snippet);

    }
    

}).error(function(e){
    alert("sorrralskdjfalskdfjl")
    $nytHeaderElem.text("Nytimes article couldn't be loaded");
});

//wikipedia url
var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';

$.ajax({
    url: wikiUrl,
    dataType: 'jsonp',
    success: function(response){
       // console.log(response);
        var articlestr = response[1];

        for (var i =0; i < articlestr.length; i++) {

            var url = 'http://en.wikipedia.org/wiki/' + articlestr;
            $wikiElem.append('<li><a href="' + url + '">' + articlestr +'</a></li>')
           // console.log(articlestr[i]);
        }
    }


});

//weather api key 85e2aa2320f9430de316a4ccae178753

    var weather = 'http://api.openweathermap.org/data/2.5/weather?q='+$city + '&appid=85e2aa2320f9430de316a4ccae178753';
    $.getJSON(weather, function(data){
        console.log(data);
    })

    return false;
};

$('#form-container').submit(loadData);
