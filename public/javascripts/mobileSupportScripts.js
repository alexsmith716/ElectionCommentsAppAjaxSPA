$(function() {
	// Open and close the mobile menu
	$('#openMenu').on('click', function() {
		$('header').addClass('menuOpen');

		$('#closeMenu, main, footer').one('click', function() {
			$('header').removeClass('menuOpen');
			$('#closeMenu, main, footer').off('click');
		});
	});

	// Handle scripts for the Food Service page
	if($('body#foodService').length > 0) {
		// When the main content area is scrolled, close all dropdowns
		$('body#foodService main').scroll(function() {
			$('body#foodService #distributorRegion').selectmenu("close");
		});

		// Handle the Food Service - Distributors region dropdown
		$('body#foodService #distributorRegion').selectmenu({
			change: function(event, data) {
				var region = data.item.value;

				// Show/hide distributors based upon those available in the region
				var hideDistributors = $('section[rel="distributors"] .expandSection:visible').not('.' + region);
				if(hideDistributors.length > 0) {
					hideDistributors.fadeOut().removeClass('current');
					$('section[rel="distributors"] .expandSection.' + region).delay(400).fadeIn();
				}
				else {
					$('section[rel="distributors"] .expandSection.' + region).fadeIn();
				}

				// Add a class to the first visible expandable section to designate
				// it as such for expand/collapse styling
				var topExpand = $($('section[rel="distributors"] .expandSection.' + region)[0]);
				if(topExpand != $('section[rel="distributors"] .topExpandSection')) {
					$('section[rel="distributors"] .topExpandSection').removeClass('topExpandSection');
					topExpand.addClass('topExpandSection');
				}

				// Add a class to the first visible expandable section to designate
				// it as such for expand/collapse styling
				var bottomExpand = $('section[rel="distributors"] .expandSection.' + region).filter(':last');
				if(bottomExpand != $('section[rel="distributors"] .bottomExpandSection')) {
					$('section[rel="distributors"] .bottomExpandSection').removeClass('bottomExpandSection');
					bottomExpand.addClass('bottomExpandSection');
				}
			}
		});
	}
});