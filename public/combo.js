jQuery('.tab button').on('click', function() {

  var tabVal = jQuery(this).val();

  jQuery('.tab button').each(function() {

      jQuery(this).removeClass('selected');

  });
  jQuery(this).addClass('selected');
  jQuery('.featured-county').each(function() {
    console.log(tabVal);
    var countyVal = jQuery(this).attr('value');
    console.log(countyVal);
    if (countyVal == tabVal) {
      jQuery(this).removeClass('hide');
      jQuery('.load').attr('src', tabVal+'.js');
    }
    else {
      jQuery(this).addClass('hide');
    }
  });
  jQuery('.featured-illo img').each(function() {

    var imageVal = jQuery(this).attr('value');

    if (imageVal == tabVal) {
      jQuery(this).removeClass('hide');
      jQuery('.load').attr('src', tabVal+'.js');
    }
    else {
      jQuery(this).addClass('hide');
    }
  });
});

//percent function
function percent(part, whole) {
  return ((part*100)/whole).toFixed(2);
}

//reverse percent
function invPercent(part,whole) {
  return (100-(part*100)/whole).toFixed(2);
}

//open dropdowns
jQuery('.cta button').on('click', function() {
  jQuery('.cta button').fadeOut(500);
  jQuery('.cta p').fadeOut(500);
  setTimeout(function(){ jQuery('.county-dropdowns').css('display', 'flex').hide().fadeIn(500); }, 500);

});

jQuery.ajax({
  url : 'https://ghminternaldev.wpengine.com/wp-content/plugins/ghm-admin/covid1/combo.php',
  type : 'GET',
  success : function(data) {
    pullData(data);
  },
  error : function(request,error)
  {
    console.log("Request: "+JSON.stringify(request));
  }
})//end ajax

function pullData(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {

    var variable1 = data[i].foreign_born;
    variable1 = parseFloat(variable1).toLocaleString('en');
    var variable2 = data[i].language_other_than_english;

    var variable3 = data[i].median_household_income;
    variable3 = parseFloat(variable3).toLocaleString('en');
    var variable4 = data[i].with_health_insurance_coverage;

    var cases = data[i].cases_09012020;
    var casesStr = parseFloat(cases).toLocaleString('en');
    var deathRate = data[i].deathrate_per10000_09012020;

    var asianPop = data[i].asian;
    var blackPop = data[i].black;
    var hawaiianPop = data[i].hawaiian;
    var hispanicPop = data[i].hispanic;
    var multiPop = data[i].multi_race;
    var nativePop = data[i].native_amer;
    var otherPop = data[i].other;
    var whitePop = data[i].white;
    var totalPop = data[i].total_population;
    var totalPopStr = parseFloat(totalPop).toLocaleString('en');

    variable2 = percent(variable2,totalPop);
    variable2 = parseFloat(variable2).toLocaleString('en');
    variable4 = invPercent(variable4,totalPop);
  //  variable4 = parseFloat(100-variable4.toFixed(2)).toLocaleString('en');

    var county = data[i].county;
    var state = data[i].state;

    // featured county
    if (county == 'Essex' && state == 'New Jersey') {

      jQuery('.essex .fcounty').text(county);
      jQuery('.essex .fstate').text(state);

      jQuery('.essex .pop-fcounty span').text(totalPopStr);
      jQuery('.essex .cases-fcounty span').text(casesStr);
      jQuery('.essex .deaths-fcounty span').text(deathRate);

      jQuery('.essex .frace-fcounty span').text('Black population: '+percent(blackPop,totalPop));

      jQuery('.essex .exp-race-fcounty .asian-pop span').text(percent(asianPop,totalPop));
      jQuery('.essex .exp-race-fcounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('.essex .exp-race-fcounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
      jQuery('.essex .exp-race-fcounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
      jQuery('.essex .exp-race-fcounty .native-pop span').text(percent(nativePop,totalPop));
      jQuery('.essex .exp-race-fcounty .white-pop span').text(percent(whitePop,totalPop));
      jQuery('.essex .exp-race-fcounty .multi-pop span').text(percent(multiPop,totalPop));
      jQuery('.essex .exp-race-fcounty .other-pop span').text(percent(otherPop,totalPop));

    } else if (county == 'St. John the Baptist' && state == 'Louisiana') {
      jQuery('.st-john .fcounty').text(county);
      jQuery('.st-john .fstate').text(state);

      jQuery('.st-john .pop-fcounty span').text(totalPopStr);
      jQuery('.st-john .cases-fcounty span').text(casesStr);
      jQuery('.st-john .deaths-fcounty span').text(deathRate);

      jQuery('.st-john .frace-fcounty span').text('Black population: '+percent(blackPop,totalPop));

      jQuery('.st-john .exp-race-fcounty .asian-pop span').text(percent(asianPop,totalPop));
      jQuery('.st-john .exp-race-fcounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('st-john .exp-race-fcounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
      jQuery('.st-john .exp-race-fcounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
      jQuery('.st-john .exp-race-fcounty .native-pop span').text(percent(nativePop,totalPop));
      jQuery('.st-john .exp-race-fcounty .white-pop span').text(percent(whitePop,totalPop));
      jQuery('.st-john .exp-race-fcounty .multi-pop span').text(percent(multiPop,totalPop));
      jQuery('.st-john .exp-race-fcounty .other-pop span').text(percent(otherPop,totalPop));
    } else if (county == 'McKinley' && state == 'New Mexico') {
      jQuery('.mckinley .fcounty').text(county);
      jQuery('.mckinley .fstate').text(state);

      jQuery('.mckinley .pop-fcounty span').text(totalPopStr);
      jQuery('.mckinley .cases-fcounty span').text(casesStr);
      jQuery('.mckinley .deaths-fcounty span').text(deathRate);

      jQuery('.mckinley .frace-fcounty span').text('Black population: '+percent(blackPop,totalPop));

      jQuery('.mckinley .exp-race-fcounty .asian-pop span').text(percent(asianPop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('.mckinley .exp-race-fcounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .native-pop span').text(percent(nativePop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .white-pop span').text(percent(whitePop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .multi-pop span').text(percent(multiPop,totalPop));
      jQuery('.mckinley .exp-race-fcounty .other-pop span').text(percent(otherPop,totalPop));
    }



  }// end for loop

  //entered county
  jQuery('.state-selection').on('change', function() {

      jQuery('.county-select').html('<option>Select a county</option>');
    enteredState = jQuery(this).val();

    for (var i = 0; i < data.length; i++) {

      var county = data[i].county;
      var state = data[i].state;

      if (enteredState == state) {
       // alert('!')
        jQuery('.county-select').append('<option       value="'+data[i].county+'">'+data[i].county+'</option>');
      }

      console.log(enteredState);
      if(enteredState == 'Louisiana') {
        jQuery('.co-par-cap').text('Parish');
      } else {
        jQuery('.co-par-cap').text('County');
      }

      if(enteredState == 'Louisiana') {
        jQuery('.co-par-low').text('parish');
      } else {
        jQuery('.co-par-low').text('county');
      }

    }
  });

  jQuery('.county-select').on('change', function() {

    var enteredCounty = jQuery(this).val();

    for (var i = 0; i < data.length; i++) {

      var variable1 = data[i].foreign_born;
      variable1 = parseFloat(variable1).toLocaleString('en');
      var variable2 = data[i].language_other_than_english;

      var variable3 = data[i].median_household_income;
      variable3 = parseFloat(variable3).toLocaleString('en');
      var variable4 = data[i].with_health_insurance_coverage;

      var cases = data[i].cases_09012020;
      var casesStr = parseFloat(cases).toLocaleString('en');
      var deathRate = data[i].deathrate_per10000_09012020;

      var asianPop = data[i].asian;
      var blackPop = data[i].black;
      var hawaiianPop = data[i].hawaiian;
      var hispanicPop = data[i].hispanic;
      var multiPop = data[i].multi_race;
      var nativePop = data[i].native_amer;
      var otherPop = data[i].other;
      var whitePop = data[i].white;
      var totalPop = data[i].total_population;
      var totalPopStr = parseFloat(totalPop).toLocaleString('en');

      variable2 = percent(variable2,totalPop);
      variable2 = parseFloat(variable2).toLocaleString('en');
      variable4 = invPercent(variable4,totalPop);
    //  variable4 = variable4.toFixed(2);

      var county = data[i].county;
      var state = data[i].state;

      if (enteredState == state && enteredCounty == county) {
        jQuery('.ecounty').text(county);
        jQuery('.estate').text(state);

        jQuery('.pop-ecounty span').text(totalPopStr);
        jQuery('.cases-ecounty span').text(casesStr);
        jQuery('.deaths-ecounty span.death-rate').text(deathRate);

        if (jQuery('.featured-county.essex').hasClass('hide') == false || jQuery('.featured-county.st-john').hasClass('hide') == false) {
          jQuery('.frace-ecounty span').text('Black population: '+percent(blackPop,totalPop));
        } else {
          jQuery('.frace-ecounty span').text('Native American population: '+percent(nativePop,totalPop));
        }

        function tabChanged() {
          if (jQuery('.featured-county.essex').hasClass('hide') == false || jQuery('.featured-county.st-john').hasClass('hide') == false) {
            jQuery('.frace-ecounty span').text('Black population: '+percent(blackPop,totalPop));
          } else {
            jQuery('.frace-ecounty span').text('Native American population: '+percent(nativePop,totalPop));
          }

        }


        jQuery('.exp-race-ecounty .asian-pop span').text(percent(asianPop,totalPop));
        jQuery('.exp-race-ecounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('.exp-race-ecounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
        jQuery('.exp-race-ecounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
        jQuery('.exp-race-ecounty .native-pop span').text(percent(nativePop,totalPop));
        jQuery('.exp-race-ecounty .white-pop span').text(percent(whitePop,totalPop));
        jQuery('.exp-race-ecounty .multi-pop span').text(percent(multiPop,totalPop));
        jQuery('.exp-race-ecounty .other-pop span').text(percent(otherPop,totalPop));

        //set card data for ecounty

        //var0 (cases and deaths)
        jQuery('.var0 .ecounty-context').text(casesStr + ' COVID-19 cases');
        jQuery('.var0 .ecounty-context2').text(deathRate + ' percent died');

        //var1 (foreign-born)
        jQuery('.var1 .ecounty-context').text(variable1 + ' people');

        //var2 (asian american pop)
        jQuery('.var2 .ecounty-context').text(deathRate + ' percent');
        jQuery('.var2 .ecounty-context2').text(percent(asianPop,totalPop) + ' percent');

        //var3 (non-English)
        jQuery('.var3 .ecounty-context').text(variable2 + ' percent');

        //var4 (household income)
        jQuery('.var4 .ecounty-context').text('$'+variable3);

        //var5 (insurance rate)
        jQuery('.var5 .ecounty-context').text(variable4 + ' percent');
      }

    }

    jQuery('.featured-illo').fadeOut(500);
    jQuery('.cta .county-dropdowns').fadeOut(500);
    jQuery('.cta button').text('Select a new county');
    setTimeout(function(){
      jQuery('.cta button').fadeIn(500);
    }, 500);




    setTimeout(function(){ jQuery('.entered-county').css('display', 'flex').hide().fadeIn(500); }, 500);
    jQuery('.interactive-container').css('min-height', '100vh');


  });//end county select on change

}// end pullData(data)
