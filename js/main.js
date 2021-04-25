$(document).ready(function() {
	var blurbs = $('.outer_blurb');
	var hr = $('.hr');
	var flexes = $('.flex_container');

	$('#filter li').click(function() {
		blurbs.css({'display': 'none'});
		hr.css({'display': 'none'});
		
		$('.filter_active').toggleClass('filter_active');
		$(this).toggleClass('filter_active');
		
		var filter = $(this).attr('id');
		var tagged = $(`[tags *= "${filter}"]`);

		if (filter == 'show_all') { tagged = flexes; } 
		
		flexes.hide()
		tagged.show()
	});

	blurbs.css({'display': 'none'});
	hr.css({'display': 'none'});

	$('.box').click(function() {
		blurbs.show();
		hr.show();
		var where_to = '#' + this.id.substring(0, this.id.length-10) + '_flex_container';
		$('html, body').animate({scrollTop: $(where_to).offset().top - 20}, 500); //$(window).height()*.25
	});

	// colons ------------------------------------
	var colon_titles;
	var change_me = $('#updating_colon_title');
	$.getJSON("https://kmcelwee.github.io/mediumBlog/some_colon_titles.json", function(data) {
		colon_titles = data['t'];
		change_me.text(colon_titles[parseInt(Math.random()*1000)])
	});
	$('#colon_container').hover(function() {
		change_me.text(colon_titles[parseInt(Math.random()*1000)])
	});
	// -------------------------------------------
});


