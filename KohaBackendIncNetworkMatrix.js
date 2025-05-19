    var element = Array.from(document.querySelectorAll("#toggle-button"))
        .find(el => el.textContent.includes('Show request details'))
        .parentElement;

    var toggleButton = document.createElement('button');
    toggleButton.classList.add('btn', 'btn-link');
    let toggleButtonLabel = 'Show INC network matrix';
    let toggleButtonClosed = '<i class="fa fa-caret-down"></i> '+toggleButtonLabel;
    let toggleButtonOpen = '<i class="fa fa-caret-up"></i> '+toggleButtonLabel;
    toggleButton.innerHTML = toggleButtonClosed;
    toggleButton.onclick = function() {
        var matrix = document.getElementById('inc_network_matrix');
        if (matrix.style.display === 'none') {
            matrix.style.display = 'block';
            toggleButton.innerHTML = toggleButtonOpen;
        } else {
            matrix.style.display = 'none';
            toggleButton.innerHTML = toggleButtonClosed;
        }
    };
var htmlContent = `
    <div id="inc_network_matrix" style="display: none;">
        <div class="default_body"><span style="font-family: arial, helvetica, sans-serif;"><strong>INC Network Rota<br><br></strong></span>
        <table border="1" style="border-collapse: collapse; width: 100%; height: 86px;">
        <tbody>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>1 (own network)</strong></span></td>
        <td style="height: 14px; width: 12.5%;"><span style="font-family: arial, helvetica, sans-serif;"><strong>2</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>3</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>4</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>5</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>6</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif;"><strong>7</strong></span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 14px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>EDEN</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 14px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>S</strong>WIMS</span></td>
        <td style="width: 12.5%; height: 14px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>L</strong>ENDS</span></td>
        <td style="width: 12.5%; height: 14px;"><span style="font-family: arial, helvetica, sans-serif; color: #f1c40f;"><strong>M</strong>IDS</span></td>
        <td style="width: 12.5%; height: 14px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>K</strong>SS</span></td>
        <td style="width: 12.5%; height: 14px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 10px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>KSS</strong></span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>S</strong>WIMS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #f1c40f; font-family: arial, helvetica, sans-serif;"><strong>M</strong>IDS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>L</strong>ENDS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>E</strong>DEN</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 11px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>LENDS</strong></span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #f1c40f; font-family: arial, helvetica, sans-serif;"><strong>M</strong>IDS</span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>K</strong>SS</span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>E</strong>DEN</span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>S</strong>WIMS</span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 11px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 12px;"><span style="color: #f1c40f; font-family: arial, helvetica, sans-serif;"><strong>MIDS</strong></span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>L</strong>ENDS</span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>E</strong>DEN</span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>K</strong>SS</span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>S</strong>WIMS</span></td>
        <td style="width: 12.5%; height: 12px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 10px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>E</strong>DEN</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>S</strong>WIMS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>K</strong>SS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #f1c40f; font-family: arial, helvetica, sans-serif;"><strong>M</strong>IDS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>L</strong>ENDS</span></td>
        <td style="width: 12.5%; height: 10px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        <tr style="height: 15px;">
        <td style="width: 12.5%; height: 15px;"><span style="color: #3598db; font-family: arial, helvetica, sans-serif;"><strong>SWIMS</strong></span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #2dc26b; font-family: arial, helvetica, sans-serif;"><strong>K</strong>SS</span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #34495e; font-family: arial, helvetica, sans-serif;"><strong>N</strong></span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #843fa1; font-family: arial, helvetica, sans-serif;"><strong>E</strong>DEN</span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #f1c40f; font-family: arial, helvetica, sans-serif;"><strong>M</strong>IDS</span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #e03e2d; font-family: arial, helvetica, sans-serif;"><strong>L</strong>ENDS</span></td>
        <td style="width: 12.5%; height: 15px;"><span style="color: #7e8c8d; font-family: arial, helvetica, sans-serif;"><strong>z</strong>AFF</span></td>
        </tr>
        </tbody>
        </table></div>
    </div>
    `;
    element.insertAdjacentElement('afterend', toggleButton);
    toggleButton.insertAdjacentHTML('afterend', htmlContent);


