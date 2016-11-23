var obj = {
  Austria: 'bank-account-six',
  Barbados: 'bank-account-six',
  Bermuda: 'bank-account-six',
  'Bosnia and Herzegovina': 'bank-account-six',
  Bulgaria: 'bank-account-six',
  Canada: 'bank-account-six',
  Croatia: 'bank-account-six',
  Cyprus: 'bank-account-six',
  'Czech Republic': 'bank-account-six',
  Denmark: 'bank-account-six',
  Estonia: 'bank-account-six',
  Finland: 'bank-account-six',
  Germany: 'bank-account-six',
  France: 'bank-account-six',
  Greece: 'bank-account-six',
  Guadeloupe: 'bank-account-six',
  Hungary: 'bank-account-six',
  Iceland: 'bank-account-six',
  Ireland: 'bank-account-six',
  Israel: 'bank-account-six',
  Italy: 'bank-account-six',
  Jamaica: 'bank-account-six',
  Latvia: 'bank-account-six',
  Liechtenstein: 'bank-account-six',
  Luxembourg: 'bank-account-six',
  Macedonia: 'bank-account-six',
  Malta: 'bank-account-six',
  Mauritius: 'bank-account-six',
  Monaco: 'bank-account-six',
  Montserrat: 'bank-account-six',
  Netherlands: 'bank-account-six',
  'New Zeland': 'bank-account-six',
  Norway: 'bank-account-six',
  Philippines: 'bank-account-six',
  Poland: 'bank-account-six',
  Portugal: 'bank-account-six',
  'Puerto Rico': 'bank-account-six',
  'Republic of Lithuania': 'bank-account-six',
  'San Marino': 'bank-account-six',
  Serbia: 'bank-account-six',
  Slovakia: 'bank-account-six',
  Slovenia: 'bank-account-six',
  Spain: 'bank-account-six',
  Sweden: 'bank-account-six',
  Switzerland: 'bank-account-six',
  Turkey: 'bank-account-six',
  'United Kingdom': 'bank-account-uk',
  'United States of America': 'bank-account-six',
  'Virgin Islands (USA)': 'bank-account-six'
};
var countries = Object.keys(obj);

var substringMatcher = function (strs) {
  return function (q, cb) {
    var matches = [];

    // regex used to determine if a string contains the substring `q`
    var substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function (i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    if (matches.length === 1) {
      loadFields(matches[0]);
    } else {
      $('#countryFields').hide();
    }

    cb(matches);
  };
};

function loadFields(text) {
  var $countryFields = $('#countryFields');

  // Hide and disable all bank fields
  $('.bank-fields-wrapper').hide();
  $countryFields.find('input').attr('disabled', true);
  $countryFields.find('textarea').attr('disabled', true);

  // Find the form for selected country and enable all of the fields
  var $form = $(document).find('[data-formId="' + obj[text] + '"]');

  if ($form.length > 0) {
    $form.find('input').attr('disabled', false);
    $form.find('textarea').attr('disabled', false);
    $countryFields.show();
    $form.show();
  }
}

$('#input-accountCountry').typeahead(
  {
    hint: true,
    highlight: true,
    minLength: 2
  },
  {
    name: 'countries',
    source: substringMatcher(countries)
  }
);

$(document).ready(function () {
  $('#input-accountCountry').val('United Kingdom');
  loadFields('United Kingdom');
});

$(document).on('click', '.tt-suggestion', function (e) {
  var text = $(e.target).text();
  loadFields(text);
});

$(document).on('focus', '#input-accountCountry', function () {
  $(this).select();
});

$(document).on('blur', '#input-accountCountry', function () {
  if ($('#countryFields:hidden') && $('.tt-suggestion').length === 1) {
    $('.tt-suggestion:first').trigger('click');
  }
});
