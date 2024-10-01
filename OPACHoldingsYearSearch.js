$("#holdings_panel").prepend(
  '&nbsp;<input class="form-control" placeholder="Search year e.g. \'1975\' " style="margin-bottom:10px;width:200px;float:right;" id="year_range_search">'
);

$("#year_range_search").on("input", function (e) {
  let input = $("#year_range_search").val();
  $("#holdingst tbody tr td.notes").each(function (i, obj) {
    $(obj).html($(obj).html().replace('<span class="term">', ""));
    $(obj).html($(obj).html().replace("</span>", ""));
    let year_ranges_array = extractYearRangesArray($(obj).html());
    let year_range_start = extractYearRangeStart($(obj).text());
    if (year_ranges_array !== undefined && year_ranges_array.length != 0) {
      year_ranges_array.forEach((range) => {
        if (
          range[0] <= input &&
          range[1] >= input &&
          range[0].toString().length == 4 &&
          range[1].toString().length == 4
        ) {
          $(obj).html('<span class="term">' + $(obj).html() + "</span>");
        }
      });
    } else if (year_range_start != 0 && year_range_start <= input) {
      $(obj).html('<span class="term">' + $(obj).html() + "</span>");
    } else {
      if ($(obj).text().indexOf(input) != -1) {
        $(obj).html('<span class="term">' + $(obj).html() + "</span>");
      }
    }
  });
});

/**
 * Extracts an array of year ranges from a given string. The string is split into entries by the "<br>" delimiter.
 * Each entry is then processed to find a year range in the format of "YYYY-YYYY".
 * If a valid year range is found in an entry, it is added to the array.
 * The function returns an array of year ranges. If no valid year ranges are found, an empty array is returned.
 * @param {string} str - the string to extract the year ranges from
 * @return {number[][]} an array of year ranges
 */
function extractYearRangesArray(str) {
  let yearRangesArray = [];
  const strEntries = str.split("<br>");
  strEntries.forEach((entry) => {
    str = entry.replace(/[\s]/g, "");
    let matches = str.match(/(\d{4})-(\d{4})/);
    if (matches) {
      yearRangesArray.push([
        parseInt(matches[1], 10),
        parseInt(matches[2], 10),
      ]);
    }
  });
  str = str.replace(/[\s]/g, "");
  return yearRangesArray;
}

/**
 * Extracts the start year from a given string. The string is processed to find a year range in the format of "YYYY-".
 * If a valid year range is found, the start year is returned. If no valid year range is found, 0 is returned.
 * @param {string} str - the string to extract the start year from
 * @return {number} the start year of the year range
 */
function extractYearRangeStart(str) {
  str = str.replace(/[\s]/g, "");
  const matches = str.match(/(\d{4})-/);
  return matches ? parseInt(matches[1], 10) : 0;
}
