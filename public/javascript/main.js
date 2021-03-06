$(document).ready(function(){


  // ====== Adding item to cart ======
  // On click of "add to cart", append to cart
  $(".addOrderBtn").on("click", function() {
    var name = $(this).data("name");
    var price = $(this).data("price");
    var id = $(this).data("id");

    // SOME DOPE ES6 FEATURE FOR DELETING
    $( ".itemList" ).append( `<div class='singleItem' id=${id}>
    <span> ${name} </span> &nbsp; <button type='button' class='deleteCartItemBtn'>Delete</button>
    <p>SGD$: ${price} </p>
    <input class='addQuantity' type='number' value='1' min='0'>
      &nbsp;

    </div>`);
  });


  // ====== Date and time function ======
  var dateTime = function() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    return hour + ":" + min + ", " + day + "/" + month + "/" + year
  }


  // ====== MAIN ORDER BUTTON ======
  $("#mainOrderBtn").on("click", function() {
    // console.log($(".itemList").children("div"));
    // $(".itemList").children()

    var idArray = []
    var quantityArray = []
    var selectedCustomer;
    var custSelectValue = $("#custSelectDropdown").val();

    $(".itemList").children("div").each(function() {
      // for each child of itemlist, push the id inside
      // console.log($(this).attr("id"));
      idArray.push($(this).attr("id"));
    })

    $(".addQuantity").each(function() {
      // console.log($(this).val());
      quantityArray.push($(this).val());
    })

    var orderedItemsArray = []
    for(var i = 0; i < idArray.length; i++){
      var orderedItemsObj = {};
      orderedItemsObj["item_id"] = idArray[i];
      orderedItemsObj["quantity"] = quantityArray[i];
      orderedItemsObj["customer_id"] = custSelectValue;
      orderedItemsObj["dateOfPurchase"] = dateTime;

      orderedItemsArray.push(orderedItemsObj);
      // console.log(orderedItemsArray);


    }
    // console.log(orderedItemsArray[0].customer_id);



    $.ajax({
      url: /order/,
      type: 'post',
      data: {'object': orderedItemsArray},
      success: function(data) {
        console.log(data);
      },
      error: function(data){
        console.log(data);
      }
    });

  });

  // ====== DELETE BUTTON CUSTOMER ======
  $(".itemList").on("click", 'button', function(){
    // console.log($(this));
    $(this).parent().remove();
  })


  // ====== DELETE BUTTON CUSTOMER ======
  $(".deleteCustBtn").on("click", function(){
    var id = $(this).attr("id");
    $(this).parent().parent().parent().remove();

    $.ajax({
      url: '/customer/delete/' + id,
      type: 'delete',
      success: function(data) {
        // console.log(data);
      },
      error: function(data){
        // console.log(data);
      }
    });
  });

  // ====== DELETE ITEM CUSTOMER ======
  $(".deleteItemBtn").on("click", function(){
    var id = $(this).attr("id");
    $(this).parent().parent().parent().remove();


    $.ajax({
      url: '/item/delete/' + id,
      type: 'delete',
      success: function(data) {
        // console.log(data);
      },
      error: function(data){
        // console.log(data);
      }
    });
  });





}); // End document.ready
