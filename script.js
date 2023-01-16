import data from './bikes_response.json' assert{type:'json'};
// using import instead of fetch 

// using VSCode 
// Install Live Server to Avoid Cors Error : Kovlyn Reddy
console.log("linked",data);

    $("#SearchButton").click(function(){
        var searchfor = $("#SearchPhrase").val();        
        var number = $("#RowNumber").val();
        Search(number-1);
        console.log("search Clicked" , searchfor);
        });
        
        $("#SortButton").click(function(){
            var number = $("#RowNumber").val();
            console.log("sort Clicked",number);
            sortTable(number-1);
            });


$(".Header").click(function(){
  // click eventhandler not working 
    var headId = $(this).attr('id');
    sortTable(headId);
    console.log("header Clicked",headId);
    });

$(document).ready( function () {


   // $('#Table_ID').DataTable();
    var tableHead = "";
    var TableBody = "";
    var heads = Object.keys(data[0]);
    
    console.log("before",heads); // headers 
    
    var row = "<tr><th class=\"Header 0\">";
    var next = "</th><th class=\"Header\">";
    var end = "</th class=\"Header\"></tr>";
    
    $.each(heads,function(head,val){
        console.log(head);
        var nextWithCount = next.replace("th c","th id=\""+(head+1)+"\" c");
        row = row + val + nextWithCount ;
        // formming header row
    });
    row = row + end;
    tableHead = row;

    $.each(data,function(index,entry){
    
    row = "<tr><td>";
    next = "</td><td>";
    end = "</td></tr>";
    $.each(heads,function(head,val){
    
    row = row + entry[val] + next ;
    // forming a row
    });
    // setting next row
    row = row+end;
    TableBody = TableBody+row;

    //console.log(row); // rows
});

$("#tBody").html(TableBody);
$("#tHead").html(tableHead);
// populating table
//$('#Table_ID').DataTable();
});

// code algorithms takne from W3 Schools and changed for my needs
function sortTable(rowNumber) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("Table_ID");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[rowNumber];
        y = rows[i + 1].getElementsByTagName("TD")[rowNumber];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }

  }

  function Search(col) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchPhrase");
    filter = input.value.toUpperCase();
    table = document.getElementById("Table_ID");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[col];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }

// const fs = require('fs');

// fs.readFile('bikes_response.json', (err, data) => {
//     if (err) throw err;
    
//     console.log(data.toString());

//     })

// fetch("./bikes_response.json")
//     .then(Response => Response.json())
//     .then(data => {
//         console.log(data);
//   		// or whatever you wanna do with the data
//     });

    // fetch("./bikes_response.json", {
    //     mode: 'cors',
    //     headers: {
    //       'Access-Control-Allow-Origin':'*'
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {  console.log(data);})