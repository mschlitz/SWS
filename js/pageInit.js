// handle slide switching
function switchToSlide(targetSlide, slideTotal, nameSlide, nameFloat, nameThumb, nameThumbBg) {
	for (j=1;j<=slideTotal;j++) {
		(function( ){
			var jLoop = j;
			// set opacity for thumbs
			$(nameThumb+jLoop).css( { background: 'transparent' } );
			$(nameThumb+jLoop+" "+nameThumbBg).css( { background: 'rgba(0,0,0,0.5)' } );
			if (jLoop == targetSlide) {
				// fade in the correct screen
				$(nameSlide+jLoop).stop(true, true).fadeIn(1000);
				$(nameFloat+jLoop).stop(true, true).fadeIn(1000);
				// set border for correct thumb and remove opacity
				$(nameThumb+jLoop).css( { background: 'url("images/bg_hover.png") 50% 0 no-repeat' } );
				$(nameThumb+jLoop).find(nameThumbBg).css( { background: 'rgba(0,0,0,0)' } );
			} else {
				// fade out any visible screen
				$(nameSlide+jLoop).stop(true, true).fadeOut(1000);
				$(nameFloat+jLoop).stop(true, true).fadeOut(1000);
			}
		})();
	}
}


$(document).ready(function() {

	// begin: setup slide
	var slideTotal = 4; // how many total slides?
	var nameSlide = "#slide_";
	var nameFloat = "#slide-float_";
	var nameThumb = "#slide-thumb_";
	var nameThumbBg = ".slide-thumb-transparent";
	var slideTransitionTime = 5000; // time in milliseconds
	var startSlide = 1;
	var tid = setTimeout(slideStartAuto, slideTransitionTime);
	
	function slideStartAuto() {
		startSlide = startSlide+1;
		if (startSlide > slideTotal) { startSlide = 1; }
		switchToSlide(startSlide, slideTotal, nameSlide, nameFloat, nameThumb, nameThumbBg);
		// loop slide auto function
		tid = setTimeout(slideStartAuto, slideTransitionTime);
	}
	
	function slideStopAuto() { // to be called when you want to stop the timer
		clearTimeout(tid);
	}
	
	for (i=1;i<=slideTotal;i++) {
		(function( ){
			var iLoop = i;
			// setup thumb mouseovers
			$(nameThumb+iLoop).hover(
				function () {
					switchToSlide(iLoop, slideTotal, nameSlide, nameFloat, nameThumb, nameThumbBg);
					// pause auto slide
					slideStopAuto();
				},
				function () {
					// resume slide
					startSlide = iLoop;
					tid = setTimeout(slideStartAuto, slideTransitionTime);
				}
			);
			// setup slide pause when mouse enters large slide area
			$(nameSlide+iLoop).hover(
				function () {
					// pause auto slide
					slideStopAuto();
				},
				function () {
					// resume slide
					startSlide = iLoop;
					tid = setTimeout(slideStartAuto, slideTransitionTime);
				}
			);
			$(nameFloat+iLoop).hover(
				function () {
					// pause auto slide
					slideStopAuto();
				},
				function () {
					// resume slide
					startSlide = iLoop;
					tid = setTimeout(slideStartAuto, slideTransitionTime);
				}
			);
		})();
	}
	//end: setup slide


	// begin: setup dropdown shop-menu
	$('.shop-menu li').hover(
    	function () {
			// show submenu
			if(!$(this).hasClass('active')) {
				$(this).addClass('active');
				$(this).children('ul').slideDown(100, function() {
					$(this).parent().removeClass('active');
				});
			}
		},
        function () {
            // hide its submenu
            $('ul', this).slideUp(100);        
        }
    );
	//end: setup dropdown shop-menu
	
	// begin: setup dropdown shop-menu
	$('.breadcrumbs li').hover(
    	function () {
			// show submenu
			if(!$(this).hasClass('active')) {
				$(this).addClass('active');
				$(this).children('ul').slideDown(100, function() {
					$(this).parent().removeClass('active');
				});
			}
		},
        function () {
            //hide its submenu
            $('ul', this).slideUp(100);        
        }
    );
	//end: setup dropdown shop-menu
	
	// show age gate on page load
	$("#backgroundPopup").fadeIn("fast");
	$("#popupAgeGate").fadeIn("fast");
	// for now, Submit button auto-hides the age gate with zero input required
	$("#popupAgeGate .ageGate-submit a").click(
		function () {
			$("#popupAgeGate").fadeOut("fast");
			$("#backgroundPopup").fadeOut("fast");
		}
	);
	
});