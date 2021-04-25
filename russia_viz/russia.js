var y = {'1998': [], '1999 - 2000': [], '2001': [], '2004': [], '2005': ['MANAFORT'], '2006': ['COHEN', 'MANAFORT', 'SESSIONS'], '2007': ['TRUMP', 'MANAFORT'], '2008': ['TRUMP'], '2011': ['MANAFORT'], '2012': ['MANAFORT'], '2013': ['TRUMP', 'COHEN', 'MANAFORT', 'PAGE'], '2014': ['MAJOR', 'INVESTIGATIONS', 'RUSSIANS', 'FLYNN', 'SESSIONS'], '2015': ['MAJOR',  'INVESTIGATIONS',  'RUSSIANS',  'TRUMP',  'COHEN',  'MANAFORT',  'FLYNN',  'SESSIONS'], '2016': ['MAJOR',  'INVESTIGATIONS',  'RUSSIANS',  'TRUMP',  'COHEN',  'MANAFORT',  'KUSHNER',  'JR',  'FLYNN',  'PAPADOPOULOS',  'PAGE',  'SESSIONS'], '2018': ['MAJOR',  'INVESTIGATIONS',  'RUSSIANS',  'TRUMP',  'COHEN',  'MANAFORT',  'KUSHNER',  'JR',  'FLYNN',  'PAPADOPOULOS',  'PAGE',  'SESSIONS'], '2017': ['MAJOR',  'INVESTIGATIONS',  'RUSSIANS',  'TRUMP',  'COHEN',  'MANAFORT',  'KUSHNER',  'JR',  'FLYNN',  'PAPADOPOULOS',  'PAGE',  'SESSIONS'], '2019': ['MAJOR', 'RUSSIANS', 'COHEN', 'SESSIONS']};

var cal = `
	<div class="cal">
		<span style="width: 8.47%;">Jan</span>
		<span class="month" style="width: 7.92%;">Feb</span>
		<span class="month" style="width: 8.47%;">Mar</span>
		<span class="month" style="width: 8.2%;">April</span>
		<span class="month" style="width: 8.47%;">May</span>
		<span class="month" style="width: 8.2%;">June</span>
		<span class="month" style="width: 8.47%;">July</span>
		<span class="month" style="width: 8.47%;">Aug</span>
		<span class="month" style="width: 8.19%;">Sept</span>
		<span class="month" style="width: 8.47%;">Oct</span>
		<span class="month" style="width: 8.2%;">Nov</span>
		<span class="month" style="width: 8.47%;">Dec</span>
	</div>`

var after_info = `Data collected by the PBS NewsHour<br>
	Visualization by <a href="http://brownanalytics.com">Kevin McElwee</a><br>
	Source code available <a href="https://github.com/kmcelwee/russia_viz">here</a><br>
	Original data available <a href="https://docs.google.com/spreadsheets/d/1utamO_EzX9VMyTKqWGF4x2upqohYCRYIdzyrx6YEyyk/edit?usp=sharing">here</a><br><br>
	Last updated March 24, 2019`;

function toggle() {
	cat = event.target.classList[1];
	event.target.classList.toggle('active');

	arr = document.getElementsByClassName(cat);
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains('time_container')) {
			if (arr[i].style['height'] == '0px') {
				arr[i].style['height'] = '48px';
				arr[i].style['visibility'] = 'visible';
				arr[i].style['transition'] = 'visibility 0ms 0ms, height 500ms ease-out, opacity 100ms ease-in';
			} else {
				arr[i].style['height'] = '0px';
				arr[i].style['visibility'] = 'hidden';
				arr[i].style['transition'] = 'visibility 0ms 500ms, height 500ms ease-out, opacity 100ms ease-in';
			}
		}
		if (arr[i].classList.contains('above_item')) {
			if (arr[i].style['width'] == '0px') {
				arr[i].style['width'] = '25px';
				arr[i].style['margin-right'] = '5px';
				arr[i].style['visibility'] = 'visible';
				arr[i].style['transition'] = 'visibility 0ms 0ms, margin-right 150ms 500ms, width 500ms linear, opacity 100ms linear';
			} else {
				arr[i].style['width'] = '0px';
				arr[i].style['visibility'] = 'hidden';
				arr[i].style['margin-right'] = '0px';
				arr[i].style['transition'] = 'visibility 0ms 500ms, margin-right 150ms 500ms, width 500ms linear, opacity 100ms linear';
			}
		}
	}
}

function createYear(j, y) {
	return_s = "<div>";
	for (var i = 0; i < j.length; i++) {
		return_s += `<div id="${y}_${j[i]}" class="time_container ${j[i]}" onmouseover="highlight_cat('${j[i]}')" onmouseout="unhighlight_cat('${j[i]}')"></div>`;
	}
	if (['2004', '2001', '1999 - 2000', '1998'].indexOf(y) < 0) {
		return_s += cal;
	}
	return_s += '</div><br>';
	return return_s;
}

function years() {
	l = ['1998', '1999 - 2000', '2001', '2004', '2005', '2006', '2007', '2008', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
	output = "";
	for (var i = l.length - 1; i >= 0; i--) {
		var id = (l[i] == '1999 - 2000') ? '1999' : l[i]
		output += `<div id="y_${id}">
					<h2>${l[i]}</h2>
					<div class="above_container" id="sub_${l[i]}"></div>
					${createYear(y[l[i]], l[i])}
				</div>`;
	}
	document.getElementById("all_years").innerHTML = output;
}

function createAbove(m) {
	if (m.time_description != null) {
		var time = m.time_description + ' - ';
	} else {
		var time = ''
	}
	return `<a class="above_item_link" href="${m.url}" target="_blank"><div class="above_item ${m.cat_id}" onmouseover="highlight_cat('${m.cat_id}')" onmouseout="unhighlight_cat('${m.cat_id}')" tooltip="${time} ${m.info}" tooltip-position="right"></div></a>`;
}

function createRange(j) {
	var d = {
		0: 40,
		1: 34,
		2: 28,
	};
	// var pos = 'top';
	
	// if (j.start_p < 10) { var pos = "right"; } tooltip-position="${pos}" 
	// else if (j.start_p > 90) { var pos = "left"; }
	// else { var pos = "top"; }

	var return_s = (`<a href="${j.url}" target="_blank"><div class="date_range" tooltip="${j.time_description} - ${j.info}"
			
			style="top: ${d[j.level]}px; left: ${j.start_p}%; width: ${j['width']}%;"></div><a>`);

	return return_s;
}

function createCircle(j) {
  // var return_s = (`
  // <div class="tooltip">
  // <a href="${j.url}">
  //   <div class='circle ${j.category}' id='this_circle' 
  // style='top: 75px; right: ${j.start_p}%;'></div></a>
  //   <span class="tooltiptext">${j.time_description}<br>HI</span>
  // </div>`);
  // ${j.info}
	var d = {
		0: 10,
		1: 16,
		2: 22,
		3: 28,
		4: 34,
	}
	// if (j.start_p < 10) {
	// 	var pos = "right"
	// }
	// else if (j.start_p > 90) { tooltip-position="${pos}" 
	// 	var pos = "left"
	// // }
	// else { var pos = "top"}
	var return_s = (`<a href="${j.url}" target="_blank"><div class='circle' tooltip="${j.time_description} - ${j.info}"
		style='top: ${d[j.level]}px; left: ${j.start_p}%;'></div></a>`);
	return return_s;
}


function all_items(all_j) {
	for (var year in y) {
		for (var i = 0; i < y[year].length; i++) {
			cat = y[year][i];
			var output = "";
			for (var key in all_j) {
				var m = all_j[key];
				if (m["start"] != null) {
					if (m["year"] == year && m["cat_id"] == cat && m["end"] == null) {
						output += createCircle(m);
					}
					if (m["year"] == year && m["cat_id"] == cat && m["end"] != null) {
						output += createRange(m);
					}
				}
			}
			var id_text = `${year}_${cat}`;
			document.getElementById(id_text).innerHTML = output;
		}
	}

	for (var year in y) {
		var output = "";
		for (var key in all_j) {
			var m = all_j[key];
			if (m['year'] == year && m["start"] == null) { output += createAbove(m); }
		}
		var id_text = `sub_${year}`;
		document.getElementById(id_text).innerHTML = output;	
	}
	
}

function check_mobile() {
    var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) { alert("This page is meant to be viewed on a desktop. Some features will not be available on a mobile device."); } 
}

function highlight_cat(cat) {
	// var navs = document.getElementsByClassName("nav_button");
	var navs = document.getElementsByClassName(cat);
	for (var i = 0; i < navs.length; i++) {
		if (navs[i].classList.contains(cat)) {
			if (navs[i].classList.contains('nav_button')) {
				navs[i].style.transform = 'scale(1.05)';
			}
			else {
				navs[i].style.opacity = .8;
			}
		} 
	}
}

function unhighlight_cat(cat) {
	// var navs = document.getElementsByClassName("nav_button");
	var navs = document.getElementsByClassName(cat);
	for (var i = 0; i < navs.length; i++) {
		if (navs[i].classList.contains(cat)) {
			if (navs[i].classList.contains('nav_button')) {
				navs[i].style.transform = 'scale(1)';
			}
			else {
				navs[i].style.opacity = 1;
			}
		} 
	}
	console.log('hi!')
}

window.onload = function() {
    var all_j;
    $.getJSON("https://kmcelwee.github.io/russia_viz/data/clean.json", function(data) {
        var all_j = data;
        years();
        all_items(all_j);
        document.getElementById("after_info").innerHTML = after_info;
        check_mobile();
    });
}
