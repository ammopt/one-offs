  //PA - Add year range input
  
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
        if (
          year_ranges_array !== undefined &&
          year_ranges_array.length != 0
        ) {
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
     * Extracts a year range in the format "YYYY-YYYY" from a given string.
     * @param {string} str - the string to extract the year range from
     * @return {Array<number>} an array with two elements; the first is the start year, the second is the end year. If no valid year range is found, an empty array is returned.
     */
    function extractYearRangesArray(str) {
      let yearRangesArray = [];
      const strEntries = str.split("<br>");
      strEntries.forEach((entry) => {
        str = entry.replace(/[\s]/g, "");
        let matches = str.match(/(\d{4})-(\d{4})/);
        if(matches) {
          yearRangesArray.push([parseInt(matches[1], 10), parseInt(matches[2], 10)]);
        }
      });
      str = str.replace(/[\s]/g, "");
      return yearRangesArray;
    }

    /**
     * Extracts a year range start year from a given string.
     * @param {string} str - the string to extract the year range start from
     * @return {number} the year range start year. If no valid year range start is found, 0 is returned.
     */
    function extractYearRangeStart(str) {
      str = str.replace(/[\s]/g, "");
      const matches = str.match(/(\d{4})-/);
      return matches ? parseInt(matches[1], 10) : 0;
    }
  
  //PA - END Add year range input