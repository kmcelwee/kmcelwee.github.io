function percDif(a, b) {
  var a = parseFloat(a);
  var b = parseFloat(b);
  return (Math.abs(a-b) / ((a+b) / 2)) * 100
}

var d;
$.getJSON("https://www.brownanalytics.com/scrabble_luck/score_calc.json", function(json) {
    d = json;
});

function confidence(v) {
  v_o = v.toFixed(1)
  if (v_o > 90) {return 100}
  return 100 - d[v_o]
}

function fillTable() {
  var ones = [];
  var twos = [];

  $('#score_input_table tr:not(:first-child)').each(function (i, row) {  
    index = i + 1;
    one = $(this).find(`#player1_${index}`).val();
    two = $(this).find(`#player2_${index}`).val();
  
    if (one != '' && two != '') {
      var pd = percDif(one, two);
      var c = confidence(pd);
      $(`#percDiff_${index}`).text(pd.toFixed(2) + ' %');
      $(`#confidence_${index}`).text(c.toFixed(2) + ' %');

      if (one == two) {
        ones.push(0);
        twos.push(0);
      }
      else if (one > two) {
        ones.push(c);
        twos.push(0);
      }
      else if (two > one) {
        twos.push(c);
        ones.push(0);
      }
    }
  });
  
  return [ones, twos]
}

function runCalcs() {
  var calcs = fillTable();
  updateBar(calcs[0], calcs[1]);
}

function removeGame() {
  $last_row = $('#score_input_table tr:last-child');
  if ($last_row.attr('id') != 'row_1') {
    $last_row.remove();
  }
}

function updateBar(player1_wins, player2_wins) {
  const avg = list => list.reduce((a,b) => a + b, 0) / list.length;
  const one_perc = avg(player1_wins);
  const two_perc = avg(player2_wins);
  console.log(one_perc, two_perc, player1_wins, player2_wins)
  unc = 100 - two_perc - one_perc;

  $('#q').css({'width': unc + '%'});
  $('#p1').css({'width': one_perc + '%'});
  $('#p2').css({'width': two_perc + '%'});

  $('#qe').html(unc.toFixed(2) + ' %');
  $('#p1e').html(one_perc.toFixed(2) + ' %');
  $('#p2e').html(two_perc.toFixed(2) + ' %');

  // $('#q').css({'width': '75%'});
  // $('#p1').css({'width': '15%'});
  // $('#p2').css({'width': '20%'});

  $('#bar').css({'visibility': 'visible'})
  $('#bar').css({'opacity': 1, 'height': '300px'})
}

function addGame() {
  new_row_id = $('#score_input_table tr').length
  $('#score_input_table').append(
        `<tr id="row${new_row_id}">
          <td><input type="number" id="player1_${new_row_id}" min="0" step="1" required></td>
          <td><input type="number" id="player2_${new_row_id}" min="0" step="1" required></td>
          <td id="percDiff_${new_row_id}"></td>
          <td id="confidence_${new_row_id}"></td>
        </tr>`
    )
}