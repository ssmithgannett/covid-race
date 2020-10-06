jQuery.ajax({
  url : 'https://ghminternaldev.wpengine.com/wp-content/plugins/ghm-admin/covid1/mckinley-milken.php',
  type : 'GET',
  success : function(milken) {
    pullData2(milken);
  },
  error : function(request,error)
  {
    console.log("Request: "+JSON.stringify(request));
  }
});// end ajax

jQuery.ajax({
  url : 'https://ghminternaldev.wpengine.com/wp-content/plugins/ghm-admin/covid1/mckinley-usat.php',
  type : 'GET',
  success : function(usat) {
    pullData(usat);

    function alphabetize(a, b) {

      a = a.toLowerCase();
      b = b.toLowerCase();

      return (a < b) ? -1 : (a > b) ? 1 : 0;
    }

    usat.sort(function(a, b) {
      return alphabetize(a.county, b.county);

    })

  },
  error : function(request,error)
  {
    console.log("Request: "+JSON.stringify(request));
  }
});// end ajax

var windowWidth = jQuery(window).width();

//percent function
function percent(part, whole) {
  return ((part*100)/whole).toFixed(2);
}

//reverse percent
function invPercent(part,whole) {
  return (100-((part*100)/whole)).toFixed(2);
}

//open dropdowns
jQuery('.cta button').on('click', function() {
  jQuery('.cta button').fadeOut(500);
  jQuery('.cta p').fadeOut(500);
  setTimeout(function(){ jQuery('.county-dropdowns').css('display', 'flex').hide().fadeIn(500); }, 500);
  jQuery('.variables').fadeOut(500);
  jQuery('.var-pagination').fadeOut(500);

});

//expand race breakdown
jQuery('.frace-fcounty').on('click', function() {
  if (jQuery('.exp-race-fcounty').hasClass('open')) {
    jQuery('.exp-race-fcounty').css('opacity',0);
    setTimeout(function(){ jQuery('.exp-race-fcounty').css('margin-top', '-230px'); }, 600);
    jQuery('.exp-race-fcounty').removeClass('open');
    jQuery('.frace-fcounty .down-arrow').css({'transform': 'rotate(-45deg)', 'margin-top': '-5px'});
  } else {
    jQuery('.exp-race-fcounty').addClass('open');
    jQuery('.exp-race-fcounty').css('margin-top',0);
    setTimeout(function(){ jQuery('.exp-race-fcounty').css('opacity', '1'); }, 500);
    jQuery('.frace-fcounty .down-arrow').css({'transform': 'rotate(135deg)', 'margin-top': '5px'});
  }

});

jQuery('.frace-ecounty').on('click', function() {
  if (jQuery('.exp-race-ecounty').hasClass('open')) {
    jQuery('.exp-race-ecounty').css('opacity',0);
    setTimeout(function(){ jQuery('.exp-race-ecounty').css('margin-top', '-230px'); }, 600);
    jQuery('.exp-race-ecounty').removeClass('open');
    jQuery('.frace-ecounty .down-arrow').css({'transform': 'rotate(-45deg)', 'margin-top': '-5px'});
  } else {
    jQuery('.exp-race-ecounty').addClass('open');
    jQuery('.exp-race-ecounty').css('margin-top',0);
    setTimeout(function(){ jQuery('.exp-race-ecounty').css('opacity', '1'); }, 500);
    jQuery('.frace-ecounty .down-arrow').css({'transform': 'rotate(135deg)', 'margin-top': '5px'});
  }

});


function pullData(usat) {
console.log(usat);
  for (var i = 0; i < usat.length; i++) {

    var cases = usat[i].cases_09012020;
    var casesStr = parseFloat(cases).toLocaleString('en');
    var deaths = usat[i].deaths_09012020;
    var deathRate = percent(deaths,cases);

    var asianPop = usat[i].asian;
    var blackPop = usat[i].black;
    var hawaiianPop = usat[i].hawaiian;
    var hispanicPop = usat[i].hispanic;
    var multiPop = usat[i].multi_race;
    var nativePop = usat[i].native_amer;
    var otherPop = usat[i].other;
    var whitePop = usat[i].white;
    var totalPop = usat[i].total_population;
    var totalPopStr = parseFloat(totalPop).toLocaleString('en');

    var variable1 = usat[i].average_household_size;
    var variable3 = usat[i].percent_below_poverty_level;
    var variable4 = usat[i].language_other_than_english;
    varibale4 = percent(variable4,totalPop);
    var variable5 = usat[i].with_health_insurance_coverage;
    variable5 = invPercent(variable5,totalPop);


    var county = usat[i].county;
    var state = usat[i].state;

    // featured county
    if (county == 'McKinley' && state == 'New Mexico') {

      jQuery('.fcounty').text(county);
      jQuery('.fstate').text(state);

      jQuery('.pop-fcounty span').text(totalPopStr);
      jQuery('.cases-fcounty span').text(casesStr);
      jQuery('.deaths-fcounty span').text(deathRate);

      jQuery('.frace-fcounty span').text('Native American population: '+percent(nativePop,totalPop));

      jQuery('.exp-race-fcounty .asian-pop span').text(percent(asianPop,totalPop));
      jQuery('.exp-race-fcounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('.exp-race-fcounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
      jQuery('.exp-race-fcounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
      jQuery('.exp-race-fcounty .native-pop span').text(percent(nativePop,totalPop));
      jQuery('.exp-race-fcounty .white-pop span').text(percent(whitePop,totalPop));
      jQuery('.exp-race-fcounty .multi-pop span').text(percent(multiPop,totalPop));
      jQuery('.exp-race-fcounty .other-pop span').text(percent(otherPop,totalPop));

      //set card data for fcounty

      //var0 (cases and deaths)
      jQuery('.var0 .fcounty-context').text(deathRate + ' percent');
      jQuery('.var0 .fcounty-context2').text(percent(nativePop,totalPop) + ' percent');

      //var1 (household size)
      jQuery('.var1 .fcounty-context').text(variable1);

      //var3 (poverty)
      jQuery('.var3 .fcounty-context').text(variable3 + ' percent');

      //var4 (poverty)
      jQuery('.var4 .fcounty-context').text(variable4 + ' percent');

      //var5 (uninsured)
      jQuery('.var5 .fcounty-context').text(variable5 + ' percent');



    }



  }// end for loop

  //entered county
  jQuery('.state-selection').on('change', function() {

      jQuery('.county-select').html('<option>Select a county</option>');
    enteredState = jQuery(this).val();

    for (var i = 0; i < usat.length; i++) {

      var county = usat[i].county;
      var state = usat[i].state;

      if (enteredState == state) {
       // alert('!')
        jQuery('.county-select').append('<option       value="'+usat[i].county+'">'+usat[i].county+'</option>');
      }


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

    for (var i = 0; i < usat.length; i++) {

      var cases = usat[i].cases_09012020;
      var casesStr = parseFloat(cases).toLocaleString('en');
      var deaths = usat[i].deaths_09012020;
      var deathRate = percent(deaths,cases);

      var asianPop = usat[i].asian;
      var blackPop = usat[i].black;
      var hawaiianPop = usat[i].hawaiian;
      var hispanicPop = usat[i].hispanic;
      var multiPop = usat[i].multi_race;
      var nativePop = usat[i].native_amer;
      var otherPop = usat[i].other;
      var whitePop = usat[i].white;
      var totalPop = usat[i].total_population;
      var totalPopStr = parseFloat(totalPop).toLocaleString('en');

      var variable1 = usat[i].average_household_size;
      var variable3 = usat[i].percent_below_poverty_level;
      var variable4 = usat[i].language_other_than_english;
      var variable5 = usat[i].with_health_insurance_coverage;
      variable5 = invPercent(variable5,totalPop);

      var county = usat[i].county;
      var state = usat[i].state;

      if (enteredState == state && enteredCounty == county) {
        variable1 = percent(variable1,totalPop);

        jQuery('.ecounty').text(county);
        jQuery('.estate').text(state);

        jQuery('.pop-ecounty span').text(totalPopStr);
        jQuery('.cases-ecounty span').text(casesStr);
        jQuery('.deaths-ecounty span').text(deathRate);

        jQuery('.frace-ecounty span').text('Native American population: '+percent(nativePop,totalPop));

        jQuery('.exp-race-ecounty .asian-pop span').text(percent(asianPop,totalPop));
        jQuery('.exp-race-ecounty .black-pop span').text(percent(blackPop,totalPop)); jQuery('.exp-race-ecounty .hawaiian-pop span').text(percent(hawaiianPop,totalPop));
        jQuery('.exp-race-ecounty .hispanic-pop span').text(percent(hispanicPop,totalPop));
        jQuery('.exp-race-ecounty .native-pop span').text(percent(nativePop,totalPop));
        jQuery('.exp-race-ecounty .white-pop span').text(percent(whitePop,totalPop));
        jQuery('.exp-race-ecounty .multi-pop span').text(percent(multiPop,totalPop));
        jQuery('.exp-race-ecounty .other-pop span').text(percent(otherPop,totalPop));

        //set card data for ecounty

        //var0 (cases and deaths)
        jQuery('.var0 .ecounty-context').text(deathRate + ' percent');
        jQuery('.var0 .ecounty-context2').text(percent(blackPop,totalPop) + ' percent');

        //var1 (household size)
        jQuery('.var1 .ecounty-context').text(variable1);

        //var3 (poverty)
        jQuery('.var3 .ecounty-context').text(variable3 + ' percent');

        //var4 (poverty)
        jQuery('.var4 .ecounty-context').text(variable4 + ' percent');

        //var5 (uninsured)
        jQuery('.var5 .ecounty-context').text(variable5 + ' percent');


      }

    }

    jQuery('.featured-illo').fadeOut(500);
    jQuery('.cta .county-dropdowns').fadeOut(500);
    jQuery('.cta button').text('Select a new county');
    setTimeout(function(){
      jQuery('.cta button').fadeIn(500);
    }, 500);
    setTimeout(function() {
      jQuery('.variables').css('display', 'flex').hide().fadeIn(1000);
      jQuery('.var-pagination').css('display', 'flex').hide().fadeIn(1000);
    }, 500);



    setTimeout(function(){ jQuery('.entered-county').css('display', 'flex').hide().fadeIn(500); }, 500);
    jQuery('.interactive-container').css('min-height', '150vh');
    //standardize card heights
    var cardHeight = 0;
    jQuery('.card').each(function() {
      if (jQuery(this).height() > cardHeight) {
        cardHeight = jQuery(this).height();
        console.log(cardHeight);
      }
    });
    jQuery('.card').height(cardHeight);

    if (windowWidth > 425) {
      setTimeout(function() {
        jQuery('.counties').css('align-items','flex-start');
      }, 1000);
    }

  });//end county select on change

}// end pullData(usat)

function pullData2(milken) {
  console.log(milken);
    jQuery('.county-select').on('change',function() {

  var milkenCounty;
  for (var x = 0; x < milken.length; x++) {
    //just define milken vars
    milkenCounty = milken[x].county;

    if (milkenCounty == null) {
      continue;
    } else {
      milkenCounty = milkenCounty.substr(0,milkenCounty.length-1);
    }
    //console.log(county)

    var milkenState = milken[x].state;
    console.log()
    if (milkenState == null) {
      continue;
    } else {
        milkenState = milkenState.substr(0,milkenState.length-1);
    }

    var variable2 = milken[x].severe_housing_problems;
    var variable6 = milken[x].diabetes;

    var enteredCounty = jQuery(this).val();

    if (milkenState == enteredState && milkenCounty == enteredCounty) {
        jQuery('.var2 .ecounty-context').text(variable2);
        jQuery('.var6 .ecounty-context').text(variable6);
    } else if (milkenCounty == 'Essex' && milkenState == 'New Jersey') {
        //manipulate dom here for fcounty, only milken vars
        jQuery('.var2 .fcounty-context').text(variable2);
        jQuery('.var6 .fcounty-context').text(variable6);
      }
    }
  });///
}


//pagination

//set isOnScreen function
jQuery.fn.isOnScreen = function(){

  var win = $(window);

  var viewport = {
      top : win.scrollTop(),
      left : win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();

  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();

  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};

//Detect scroll direction
const el = jQuery('.variables');

// initialize last scroll position
let lastX = el.scrollLeft();

el.on('scroll', function() {
  // get current scroll position
  const currX = el.scrollLeft();

  // determine current scroll direction
  const x = (currX > lastX) ? 'right' : ((currX === lastX) ? 'none' : 'left');

//Manipulate dom according to scroll direction and visible cards
  if (x=='right') {

    //card1 selected
    if(jQuery('.var0 .card').isOnScreen() == true && jQuery('.var1 .card').isOnScreen() == true) {
      jQuery('.dot0').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot1').css('background-color','var(--gannett-blue)');
    }

    //card2 selected
    if(jQuery('.var1 .card').isOnScreen() == true && jQuery('.var2 .card').isOnScreen() == true) {
      jQuery('.dot1').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot2').css('background-color','var(--gannett-blue)');
    }

    //card3 selected
    if(jQuery('.var2 .card').isOnScreen() == true && jQuery('.var3 .card').isOnScreen() == true) {
      jQuery('.dot2').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot3').css('background-color','var(--gannett-blue)');
    }

    //card4 selected
    if(jQuery('.var3 .card').isOnScreen() == true && jQuery('.var4 .card').isOnScreen() == true) {
      jQuery('.dot3').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot4').css('background-color','var(--gannett-blue)');
    }

    //card5 selected
    if(jQuery('.var4 .card').isOnScreen() == true && jQuery('.var5 .card').isOnScreen() == true) {
      jQuery('.dot4').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot5').css('background-color','var(--gannett-blue)');
    }

    //card6 selected
    if(jQuery('.var5 .card').isOnScreen() == true && jQuery('.var6 .card').isOnScreen() == true) {
      jQuery('.dot5').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot6').css('background-color','var(--gannett-blue)');
    }


  }//end right scroll

  if (x=='left') {

    //card0 selected
    if(jQuery('.var0 .card').isOnScreen() == true && jQuery('.var1 .card').isOnScreen() == true) {
      jQuery('.dot1').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot0').css('background-color','var(--gannett-blue)');
    }

    //card1 selected
    if(jQuery('.var1 .card').isOnScreen() == true && jQuery('.var2 .card').isOnScreen() == true) {
      jQuery('.dot2').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot1').css('background-color','var(--gannett-blue)');
    }

    //card2 selected
    if(jQuery('.var2 .card').isOnScreen() == true && jQuery('.var3 .card').isOnScreen() == true) {
      jQuery('.dot3').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot2').css('background-color','var(--gannett-blue)');
    }

    //card3 selected
    if(jQuery('.var3 .card').isOnScreen() == true && jQuery('.var4 .card').isOnScreen() == true) {
      jQuery('.dot4').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot3').css('background-color','var(--gannett-blue)');
    }

    //card4 selected
    if(jQuery('.var4 .card').isOnScreen() == true && jQuery('.var5 .card').isOnScreen() == true) {
      jQuery('.dot5').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot4').css('background-color','var(--gannett-blue)');
    }

    //card5 selected
    if(jQuery('.var5 .card').isOnScreen() == true && jQuery('.var6 .card').isOnScreen() == true) {
      jQuery('.dot6').css('background-color','var(--gannett-light-grey)');
      jQuery('.dot5').css('background-color','var(--gannett-blue)');
    }
  }//end right scroll
    // update last scroll position to current position
    lastX = currX;
});


//Desktop card animation


if (windowWidth > 769) {
  var dots = jQuery('.var-pagination').html()
  jQuery('.var-pagination').html('<div class="left-arrow"></div>'+dots+'<div class="right-arrow"></div>');
}

jQuery('.var-pagination .right-arrow').on('click', function() {
  var scrollPos = jQuery('.variables').scrollLeft();
  scrollPos = scrollPos + windowWidth;
  // jQuery('.footer-nav').scrollLeft(scrollPos);

  jQuery('.variables').animate({

    scrollLeft: scrollPos
  }, 500, function() {
    // Animation complete.
  });
  //card1 selected
  if(jQuery('.var0 .card').isOnScreen() == true && jQuery('.var1 .card').isOnScreen() == true) {
    jQuery('.dot0').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot1').css('background-color','var(--gannett-blue)');
  }

  //card2 selected
  if(jQuery('.var1 .card').isOnScreen() == true && jQuery('.var2 .card').isOnScreen() == true) {
    jQuery('.dot1').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot2').css('background-color','var(--gannett-blue)');
  }

  //card3 selected
  if(jQuery('.var2 .card').isOnScreen() == true && jQuery('.var3 .card').isOnScreen() == true) {
    jQuery('.dot2').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot3').css('background-color','var(--gannett-blue)');
  }

  //card4 selected
  if(jQuery('.var3 .card').isOnScreen() == true && jQuery('.var4 .card').isOnScreen() == true) {
    jQuery('.dot3').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot4').css('background-color','var(--gannett-blue)');
  }

  //card5 selected
  if(jQuery('.var4 .card').isOnScreen() == true && jQuery('.var5 .card').isOnScreen() == true) {
    jQuery('.dot4').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot5').css('background-color','var(--gannett-blue)');
  }
});

jQuery('.var-pagination .left-arrow').on('click', function() {
  var scrollPos = jQuery('.variables').scrollLeft();
  scrollPos = scrollPos - windowWidth;
  // jQuery('.footer-nav').scrollLeft(scrollPos);

  jQuery('.variables').animate({

    scrollLeft: scrollPos
  }, 500, function() {
    // Animation complete.
  });
  //card0 selected
  if(jQuery('.var0 .card').isOnScreen() == true && jQuery('.var1 .card').isOnScreen() == true) {
    jQuery('.dot1').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot0').css('background-color','var(--gannett-blue)');
  }

  //card1 selected
  if(jQuery('.var1 .card').isOnScreen() == true && jQuery('.var2 .card').isOnScreen() == true) {
    jQuery('.dot2').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot1').css('background-color','var(--gannett-blue)');
  }

  //card2 selected
  if(jQuery('.var2 .card').isOnScreen() == true && jQuery('.var3 .card').isOnScreen() == true) {
    jQuery('.dot3').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot2').css('background-color','var(--gannett-blue)');
  }

  //card3 selected
  if(jQuery('.var3 .card').isOnScreen() == true && jQuery('.var4 .card').isOnScreen() == true) {
    jQuery('.dot4').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot3').css('background-color','var(--gannett-blue)');
  }

  //card4 selected
  if(jQuery('.var4 .card').isOnScreen() == true && jQuery('.var5 .card').isOnScreen() == true) {
    jQuery('.dot5').css('background-color','var(--gannett-light-grey)');
    jQuery('.dot4').css('background-color','var(--gannett-blue)');
  }
});
