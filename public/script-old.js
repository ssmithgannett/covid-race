jQuery.ajax({
  url : 'https://ghminternaldev.wpengine.com/wp-content/plugins/ghm-admin/covid1/covid-featured.php',
  type : 'GET',
  success : function(data) {
    pullData(data);

  },
  error : function(request,error)
  {
    console.log("Request: "+JSON.stringify(request));
  }
});// end ajax


jQuery.ajax({
  url : 'https://ghminternaldev.wpengine.com/wp-content/plugins/ghm-admin/covid1/covid-all.php',
  type : 'GET',
  success : function(data2) {
    pullData2(data2);

    function alphabetize(a, b) {

      a = a.toLowerCase();
      b = b.toLowerCase();

      return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    data2.sort(function(a, b) {
      return alphabetize(a.county, b.county);

    })
  },
  error : function(request,error)
  {
    console.log("Request: "+JSON.stringify(request));
  }
});// end ajax

var windowWidth = jQuery(window).width();


function pullData(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++ ) {
    jQuery('.featured').append('<option value="'+data[i].county+'">'+data[i].county+'</option>');

    var casesRaw = data[i].cases_09012020;
    var deathsRaw = data[i].deaths_09012020;
    var population = data[i].total_population;
    var county = data[i].county;

    var caseRate = (casesRaw*100)/population;
    caseRate = caseRate.toFixed(2);
    var deathRate = (deathsRaw*100)/casesRaw;
    deathRate = deathRate.toFixed(2);

    var asianPop = data[i].asian;
    var blackPop = data[i].black;
    var hawaiianPop = data[i].hawaiian;
    var hispanicPop = data[i].hispanic;
    var multiPop = data[i].multi_race;
    var nativePop = data[i].native_amer;
    var otherPop = data[i].other;
    var whitePop = data[i].white;

    var asianPerc = ((asianPop*100)/population).toFixed(2);
    var blackPerc = ((blackPop*100)/population).toFixed(2);
    var hawaiianPerc = ((hawaiianPop*100)/population).toFixed(2);
    var hispanicPerc = ((hispanicPop*100)/population).toFixed(2);
    var multiPerc = ((multiPop*100)/population).toFixed(2);
    var nativePerc = ((nativePop*100)/population).toFixed(2);
    var otherPerc = ((otherPop*100)/population).toFixed(2);
    var whitePerc = ((whitePop*100)/population).toFixed(2);

    if (data[i].county == 'Essex') {
      jQuery('.county-name').text(county + ', NJ');
      jQuery('.population').text(population);
      jQuery('.case-rate').text(casesRaw);
      jQuery('.death-rate').text(deathRate);

      jQuery('.asian-pop span').text(asianPerc);
      jQuery('.black-pop span').text(blackPerc);
      jQuery('.hawaiian-pop span').text(hawaiianPerc);
      jQuery('.hispanic-pop span').text(hispanicPerc);
      jQuery('.multi-pop span').text(multiPerc);
      jQuery('.native-pop span').text(nativePerc);
      jQuery('.other-pop span').text(otherPerc);
      jQuery('.white-pop span').text(whitePerc);

      jQuery('.case-percent').text(caseRate);

    }

  }

    jQuery('.featured').on('change', function() {

    var featCounty = jQuery(this).val();

     for (var i = 0; i < data.length; i++) {

       var casesRaw = data[i].cases_09012020;
      var deathsRaw = data[i].deaths_09012020;
      var population = data[i].total_population;
      var county = data[i].county;

      var caseRate = (casesRaw*100)/population;
      caseRate = caseRate.toFixed(2);
      var deathRate = (deathsRaw*100)/casesRaw;
      deathRate = deathRate.toFixed(2);

      var asianPop = data[i].asian;
      var blackPop = data[i].black;
      var hawaiianPop = data[i].hawaiian;
      var hispanicPop = data[i].hispanic;
      var multiPop = data[i].multi_race;
      var nativePop = data[i].native_amer;
      var otherPop = data[i].other;
      var whitePop = data[i].white;

      var asianPerc = ((asianPop*100)/population).toFixed(2);
      var blackPerc = ((blackPop*100)/population).toFixed(2);
      var hawaiianPerc = ((hawaiianPop*100)/population).toFixed(2);
      var hispanicPerc = ((hispanicPop*100)/population).toFixed(2);
      var multiPerc = ((multiPop*100)/population).toFixed(2);
      var nativePerc = ((nativePop*100)/population).toFixed(2);
      var otherPerc = ((otherPop*100)/population).toFixed(2);
      var whitePerc = ((whitePop*100)/population).toFixed(2);

   if (featCounty == data[i].county) {
      jQuery('.county-name').text(county);
      jQuery('.population').text(population);
      jQuery('.case-rate').text(casesRaw);
      jQuery('.death-rate').text(deathRate);

      jQuery('.asian-pop span').text(asianPerc);
      jQuery('.black-pop span').text(blackPerc);
      jQuery('.hawaiian-pop span').text(hawaiianPerc);
      jQuery('.hispanic-pop span').text(hispanicPerc);
      jQuery('.multi-pop span').text(multiPerc);
      jQuery('.native-pop span').text(nativePerc);
      jQuery('.other-pop span').text(otherPerc);
      jQuery('.white-pop span').text(whitePerc);
    }
  }
  });



}// end function pullData(data)


function pullData2(data2) {
  var state;
    console.log(data2);
 for (var i = 0; i < data2.length; i++ ) {


         }

  jQuery('.state-selection').on('change', function() {

    jQuery('.county-select').css('opacity', '1');
    jQuery('.county-select').html('<option>Select a County</option>');
  //  jQuery(this).append('<select class="county-select"></select>')
     state = jQuery(this).val();
    for (var i=0; i<data2.length; i++) {
      if (state == data2[i].state) {
       // alert('!')
        jQuery('.county-select').append('<option       value="'+data2[i].county+'">'+data2[i].county+'</option>');
      }
    }
  });

  jQuery('.county-select').on('change', function() {
    jQuery('.your-county').css('display','flex').hide().fadeIn(500);
    if (windowWidth < 426) {
      jQuery('.vars-sm').css('display','flex').hide().fadeIn(500);
    } else {
      jQuery('.vars-lg').css('display','flex').hide().fadeIn(500);
    }

    jQuery('.county-label2').fadeIn(500);
    jQuery('.container').css('height','100vh');
    var countySel = jQuery(this).val();
    for (var i = 0; i < data2.length; i++) {

      var casesRaw = data2[i].cases_09012020;
      var deathsRaw = data2[i].deaths_09012020;
      var population = data2[i].total_population;
      var county = data2[i].county;

      var caseRate = (casesRaw*100)/population;
      caseRate = caseRate.toFixed(2);
      var deathRate = (deathsRaw*100)/casesRaw;
      deathRate = deathRate.toFixed(2);

      var asianPop = data2[i].asian;
      var blackPop = data2[i].black;
      var hawaiianPop = data2[i].hawaiian;
      var hispanicPop = data2[i].hispanic;
      var multiPop = data2[i].multi_race;
      var nativePop = data2[i].native_amer;
      var otherPop = data2[i].other;
      var whitePop = data2[i].white;

      var asianPerc = ((asianPop*100)/population).toFixed(2);
      var blackPerc = ((blackPop*100)/population).toFixed(2);
      var hawaiianPerc = ((hawaiianPop*100)/population).toFixed(2);
      var hispanicPerc = ((hispanicPop*100)/population).toFixed(2);
      var multiPerc = ((multiPop*100)/population).toFixed(2);
      var nativePerc = ((nativePop*100)/population).toFixed(2);
      var otherPerc = ((otherPop*100)/population).toFixed(2);
      var whitePerc = ((whitePop*100)/population).toFixed(2);

      if (countySel == data2[i].county && data2[i].state == state) {
      jQuery('.county-name2').text(county+', '+data2[i].state);
      jQuery('.population2').text(population);
      jQuery('.case-rate2').text(casesRaw);
      jQuery('.death-rate2').text(deathRate);

      jQuery('.asian-pop2 span').text(asianPerc);
      jQuery('.black-pop2 span').text(blackPerc);
      jQuery('.hawaiian-pop2 span').text(hawaiianPerc);
      jQuery('.hispanic-pop2 span').text(hispanicPerc);
      jQuery('.multi-pop2 span').text(multiPerc);
      jQuery('.native-pop2 span').text(nativePerc);
      jQuery('.other-pop2 span').text(otherPerc);
      jQuery('.white-pop2 span').text(whitePerc);

      jQuery('.case-percent2').text(caseRate);
      }
    }
    jQuery('.context').css('display', 'block');
  });

}// end function pullData2(data)

jQuery('#open-county-sel').on('click', function() {
  jQuery(this).fadeOut(500);
  jQuery('.explainer').fadeOut(500);
  jQuery('.intro h2').fadeOut(500);
  setTimeout(function(){ jQuery('.selections').fadeIn(500); }, 500);

});
