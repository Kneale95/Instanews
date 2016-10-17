$(function() {
  
  //variables
  var articleData, articleItems, Url,
      $articleList = $('.feed');
  var maxAppend = 0;
  
  // when the form is submitted
  $('.selections').on('change', function(event) {
    
    event.preventDefault();
    
    // resets
    $articleList.empty();
    articleData, articleItems = '',
      
    // get the search string
    url = "https://api.nytimes.com/svc/topstories/v2/home.json";
    url += '?' + $.param({
    'api-key': "6fdb737964d44cbe838b45e9f1e7a3b3"
        });
    //makes a call to the server
    $.ajax({
        url: url,
        method: 'GET',
         })
    //if it works
    .done(function(data) {
        console.log(data);
        articleData = data.results;  
    //populating with items
    $.each(articleData, function(key, value) {
        articleItems += '<ul class="article">';
        articleItems += '<li>';
        articleItems += '<img src="' + data.results[0].multimedia[4].url + '" />';
        //articleItems += '<p>' + data.results[0].multimedia[2].url + '</p>';
        articleItems += '</li>';
        articleItems += '</ul>'

    });

    $articleList.append(articleItems);
    })

// if it fails
    .fail(function(err) {
    throw err;

        });
    });
});
