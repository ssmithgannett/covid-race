/*

var d1 = document.getElementById('grid-contain');

startGrid = function(){
	var $grid = $('.grid').imagesLoaded( function() {
  // init Masonry after all images have loaded
	  $grid.masonry({
	    itemSelector: '.grid-item',
	     percentPosition: true,
	     columnWidth: '.grid-sizer'
	  });
	  console.log("Masonry script done!")
	});

};


var grabInfo = function(){
 		fetch(`https://spreadsheets.google.com/feeds/cells/1MjsS03WtHL9f0w41DPfRzNVFn1W6FeKt6XxVrlr7ZNQ/1/public/full?alt=json`).then(function(response) { 
			return response.json();
		}).then(function(data) {
			for (let i = 4; i < data['feed']['entry'].length; i+=4) {
				d1.insertAdjacentHTML('beforeend', '<div class="grid-item"><a href="' + data['feed']['entry'][i+1]['content']['$t'] + '" target="_blank"><img src="' + data['feed']['entry'][i+2]['content']['$t'] + '" /><h5>' + data['feed']['entry'][i]['content']['$t'] + '</h5></a></div>');
			}
			console.log("Scrape script done!");
			startGrid();
		})
	};

grabInfo();
*/

$('.click-button').on('click',function(e){
	if($( '#fluid-container' ).hasClass('open') == true) {
		$('#fluid-container').removeClass('open');
		$('#fluid-container').addClass('closed');
		$('.click-button').html('Explore the series &raquo;')
		$('body').removeClass('overlay');
	}
	else {
		$('#fluid-container').addClass('open');
		$('#fluid-container').removeClass('closed');
		$('.click-button').html('<div id="iconCont" style="width: 24px; height: 24px;"><svg id="iconSVG" viewBox="0 0 24 24"><g id="icon-close_24"><polygon id="path-1" points="12 10.5857864 6.70710678 5.29289322 5.29289322 6.70710678 10.5857864 12 5.29289322 17.2928932 6.70710678 18.7071068 12 13.4142136 17.2928932 18.7071068 18.7071068 17.2928932 13.4142136 12 18.7071068 6.70710678 17.2928932 5.29289322 12 10.5857864"></polygon></g></svg></div>');
		$('body').addClass('overlay');
	}
})

$('.story-link').on('mouseenter',function(e){
	$(this).children('.thumb-hed').addClass('fade-in');
	$(this).children('.float-hed').addClass('fade-in');
})

$('.story-link').on('mouseleave',function(e){
	$(this).children('.thumb-hed').removeClass('fade-in');
	$(this).children('.float-hed').removeClass('fade-in');
})





