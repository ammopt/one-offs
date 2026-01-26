  document.addEventListener("DOMContentLoaded", () => {
    if (document.URL.indexOf("opac-detail.pl") >= 0) {
      $("#holdings_panel").prepend(
        '<input style="margin-bottom:10px; "type="text" placeholder="Filter holdings" id="holdings_search_input">'
      );

      const elsTr = $("#holdingst tbody tr");
      const elSearchInput = $("#holdings_search_input");
      const regEsc = (v) => v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

      const filterRowsCustom = (evt) => {
        const val = evt.currentTarget.value.trim(); // Trim from whitespaces
        const reg = new RegExp(regEsc(val), "i"); // "i" = case insensitive

        $("#holdings_noresultsfound").remove();

        $.each(elsTr, function (index, elTr) {
          if (!reg.test(elTr.textContent.trim())) {
            $(elTr).addClass("d-none");
          } else {
            $(elTr).removeClass("d-none");
          }
        });

        if (val) {
          const visibleCount = $(elsTr).filter(":visible").length;
          const totalCount = $(elsTr).length;
          $(elSearchInput).after(
            `<span class="m-1" id="holdings_noresultsfound">Showing ${visibleCount} out of ${totalCount} holdings</span>`
          );
        }
      };

      $(elSearchInput).off();

      $(elSearchInput).on("input", function (e) {
        filterRowsCustom(e);
      });
    }
  });
