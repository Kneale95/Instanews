$(function() {

  //variables
  var articleData, articleItems, url,
      $articleList = $('.feed');
   var articletype = $('#locationChoice').val();
$("transitionGif").hide;
$("#locationChoice").change(function() {
    event.preventDefault();
  articletype = $(this).val().toLowerCase();
    $(".logo").height("20vh");
    $(".categorySelector").height("40vh");
    $("transitionGif").show;
  // when the form is submitted


    // resets
    $articleList.empty();
    articleData, articleItems = '',

    // get the search string
    url = "http://api.nytimes.com/svc/topstories/v2/" + articletype +".json?api-key=6fdb737964d44cbe838b45e9f1e7a3b3";
    // url += '?' + $.param({
    // 'api-key': "6fdb737964d44cbe838b45e9f1e7a3b3"
        // });
    //makes a call to the server
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
         })
    //if it works
    .done(function(data) {
        articleData = data.results;
        console.log(data)
    //populating with items
    var filterData = data.results.filter(function(value){
        return value.multimedia.length >=5
    });
    filterData.splice(12);

$.each(filterData, function(key, value) {
    if (value.multimedia.length > 0) {
                       var picture = value.multimedia[4].url,
                       abstract = value.abstract,
                       articleUrl = value.url


        articleItems += '<li class="article">';
        articleItems += '<a href="' + value.url + '">';
        articleItems += "<div class='articleBackground' style=background-image:url("
        articleItems += picture;
        articleItems += ")>";
        articleItems += '<div class="wrapper">'
        articleItems += '<p>' + abstract + '</p>';
        articleItems += '</div></div></a>'
        articleItems += '</li>';

    }
    });

    $articleList.append(articleItems);
    $("transitionGif").hide;

    })


// if it fails
    .fail(function(err) {
    throw err;

           });

    });
});
