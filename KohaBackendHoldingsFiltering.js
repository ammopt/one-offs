$(document).ready(function() {
  if (window.location.href.indexOf("ill-requests.pl") > -1 && document.body.innerHTML.indexOf("<td>Backend</td><td>Koha</td>") > -1) {
    //PA - Add holdings filter to Koha backend search results page and make it use word boundary filtering
  
    const filtersWrapper = $('<div id="filters_wrapper"></div>');
    $("#results_table").prev("fieldset").append(filtersWrapper);

    $(filtersWrapper).append(
        '<input class="form-control" style="display:inline-block; margin:10px 0px;width:200px;" type="text" placeholder="Filter holdings" id="results_search_input">'
    );

    const holdingsTr = $("#results_table > tbody > tr");
    const itemsTr = $("#results_table table tbody tr");
    const elSearchInput = $("#results_search_input");
    const regEsc = (v) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

    const filterRowsCustom = (evt) => {
        const val = evt.currentTarget.value.trim(); // Trim from whitespaces
        const reg = new RegExp("^" + regEsc(val), "i"); // "i" = case insensitive

        $('#holdings_noresultsfound').remove();
        $('.results_all_hidden_message').remove();

        $.each(holdingsTr, function(index, holdingTr) {
            var allHidden = true;
            $.each($(holdingTr).find('table tbody tr'), function(index2, elTr2) {
                if(!reg.test(elTr2.textContent.trim())){
                    $(elTr2).addClass('d-none');
                }else{
                    $(elTr2).removeClass('d-none');
                    allHidden = false;
                }
            });

            if (allHidden) {
                $(holdingTr).children('td').last().append($('<td class="results_all_hidden_message" colspan="10">All holdings are hidden</td>'));
            }
        });

        if (val) {
            const visibleCount = $(itemsTr).filter(':visible:not(.results_all_hidden_message)').length;
            const totalCount = $(itemsTr).length;
            $(elSearchInput).after(`<span class="m-1" id="holdings_noresultsfound">Showing ${visibleCount} out of ${totalCount} holdings</span>`);
        }
    };

    $(elSearchInput).off();
    
    $(elSearchInput).on('input',function(e){
        filterRowsCustom(e);
    });
  // PA - Make holdings filter to use word boundary filtering

  //PA - Add year range input
  $(filtersWrapper).prepend(
    '&nbsp;<input class="form-control" placeholder="Search year e.g. \'1975\' " style="margin:10px 0px;width:200px;float:right;" id="year_range_search">'
  );

  $("#year_range_search").on("input", function (e) {
    let input = $("#year_range_search").val();
    $.each(holdingsTr, function(index, holdingTr) {
        $.each($(holdingTr).find('table tbody tr td'), function(index2, obj) {
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
            if (input && $(obj).text().indexOf(input) != -1) {
            $(obj).html('<span class="term">' + $(obj).html() + "</span>");
            }
        }
        });
    });
  });

  const publishedDateTd = $("#request-details td:contains('Published date')").next("td");
  const publishedDate = publishedDateTd.text().trim();

  if (!publishedDate) {
    const yearTd = $("#request-details td:contains('Year')").next("td");
    const yearDate = yearTd.text().trim();
    const year = yearDate.substring(0, 4);
    $("#year_range_search").val(year);
    $("#year_range_search").trigger("input");
  }else{
    const year = publishedDate.substring(0,4);
    $("#year_range_search").val(year);
    $("#year_range_search").trigger("input");
  }

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
    const strEntries = str.split("<br><br>");
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
  //PA - END Add year range input
  }
});


