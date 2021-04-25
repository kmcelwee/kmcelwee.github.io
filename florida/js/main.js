var fm;
var fw;

var j;
var GENDER;

var stage = `<div id="stage"></div>`
var sorter = `<div class="sorter">Sort by <button onclick="sortby('alph')">word</button> <button onclick="sortby('pop')">frequency</button></div>`

function activate_step1(e) {
	$('#choices').fadeIn(0)
	$('#florida').removeClass('clickable');

	j = null;
	GENDER =null;
	
	$('#step1').css({'height': '100vh'}).then(function() {
		$('#stage').remove()
		$('#tab').css({'display':'none'});
		$('#step3').css({'display': 'none'});
		$('.col1').removeClass('clickable')

		$('#step3').css({'width': '100%'});
		$('.col3').css({'width': '0px'});

		$('#stage').css({'justify-content': 'space-between'});
		$('#stage').css({'align-items': 'center'});

		$('#step2').text('');
		$('#step3').text('');
	});
	
}

function activate_step2(e) {
	$('#step2').text(GENDER)
	$('#step1').css({'height': 'var(--banner-thickness)'});
	$('#step3').css({'display': 'none'});
	
	$('#choices').fadeOut(0);
	
	$('#florida').addClass('clickable');
	$('#stage').remove()
	$('#step3').text('');
	$('#step3').css({'width': '100%'});
	$('.col3').css({'width': '0px'});
	$('#stage').css({'justify-content': 'space-between'});
	$('#stage').css({'align-items': 'center'});

	var htmlText = Object.keys(j['verbs']).sort(byCount).map(
		o => `<div class="button step2_button" onclick="activate_step3(this)">${o} <span class="count">(${j['verbs'][o]['count']})</span></div>`);

	$('.col2').append(stage)
	$('#stage').html(htmlText)
	$('#stage').prepend(sorter)
	
	$('.col1').removeClass('clickable');
}

function activate_step3(e) {
	$('#florida').addClass('clickable');
	$('#stage').remove()
	$('#step3').css({'display': 'flex'});
	var verb = e.textContent.toUpperCase().split(' (')[0];
	$('#step3').text(verb);
	$('#step3').css({'width': 'var(--banner-thickness)'});
	$('.col3').css({'width': '100%'})

	var allArticles = j['verbs'][verb.toLowerCase()]['articles'].map(o => `
	<div class="article_container">
		<div class="inner_container">
			<div class="title">${o.title}</div>
			<div class="lower">
				<div class="lower_left">
					<div class="url">
						<a href="${o.url}">Read more...</a>
					</div>
				</div>
				<div class="lower_right">
					<div class="date">Posted: ${o.time}</div>
					<div class="score">Score: ${o.score}</div>
					<div class="score"><a href="https://reddit.com/${o.permalink}" target="_blank">View reddit post</a></div>
				</div>
			</div>
		</div>
	</div>`)

	$('.col3').append(stage);
	$('#stage').html(allArticles);
	$('.article_container').wrapAll('<div id="articles_container"></div>');
	
	$('#stage').css({'justify-content': 'center'});
	$('#stage').css({'align-items': 'center'});

	$('.col1').addClass('clickable');

	window.scrollTo(0, 0);
}

$(document).ready(() => {
	$.getJSON("https://kmcelwee.github.io/mediumBlog/florida/fm.json", function(data) {
		fm = data;
		$('#man_count').text(`(${fm.count})`)
	});
	$.getJSON("https://kmcelwee.github.io/mediumBlog/florida/fw.json", function(data) {
		fw = data;
		$('#woman_count').text(`(${fw.count})`)
	});

	$('.step1_button').click(function() {
		$('#stage').remove()
		$('.col2').add(stage);

		$('#tab').css({'display':'flex'})
		var text = $(this).text().split(' (')[0];
		j = text == 'MAN' ? fm : fw;
		GENDER = text
		activate_step2()
	})

	$('body').click(function(evt){    
       if(evt.target.id == "about") { $('#overlay').css({'display': 'flex'}) }
       else { $('#overlay').css({'display': 'none'})  }
	});

	$('#florida').click(activate_step1)
	$('.col1').click(activate_step2)
});


function byCount(a, b) {
	a = -j['verbs'][a]['count']
	b = -j['verbs'][b]['count']
	if (a < b) { return -1; }
	if (a > b) { return 1; }
	return 0;
}

function sortby(f) {
	if (f == 'alph') {
		var htmlText = Object.keys(j['verbs']).sort().map(
			o => `<div class="button step2_button" onclick="activate_step3(this)">${o} <span class="count">(${j['verbs'][o]['count']})</span></div>`);
		$('#stage').html(htmlText)
		$('#stage').prepend(sorter)
	} else {
		var htmlText = Object.keys(j['verbs']).sort(byCount).map(
			o => `<div class="button step2_button" onclick="activate_step3(this)">${o} <span class="count">(${j['verbs'][o]['count']})</span></div>`);
		$('#stage').html(htmlText)
		$('#stage').prepend(sorter)
	}
}