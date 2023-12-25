$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 83) {
      $(".product__sticky-bar-wrapper").addClass("sticky-bar-visible");
    } else {
      $(".product__sticky-bar-wrapper").removeClass("sticky-bar-visible");
    }
  });

  // Function to update the span content based on the selected input
  function updateProductTitle() {
    var labelText = $(".data_fatch_input:checked").attr("id");
    var label_html = $("label[for=" + labelText + "]")
      .find(".data_fatch_tobe")
      .html();
    $("span.fatch_product_title").html($.trim(label_html));
    var combinedValues = [];

    $("variant-radios .js.product-form__input input:checked").each(function () {
      combinedValues.push($(this).val());
    });

    var result = combinedValues.join(" / ");

    $(".all_variantPrice input").each(function () {
      var input_val = $(this).val();
      if (result == input_val) {
        $("span.product_instock strong").text($(this).attr("variant_avail"));
      }
    });

    var price_var = $("label[for=" + labelText + "]")
      .find(".variant--price")
      .text();
    $(".fatch_product_price").text($.trim(price_var));
    // setTimeout(function(){
    //   var price = $('.product_price-wrapper .price__regular span.price-item').text();
    //    $('.fatch_product_price').text($.trim(price));
    //  },1000);
  }

  // Call the function when the document is ready
  updateProductTitle();

  // Bind the function to the change event of the input
  $(".data_fatch_input").on("change", function () {
    updateProductTitle();
  });
  $(".data_fatch_input").on("click", function () {
    updateProductTitle();
  });

  $("#variant-wrapper-3 input").on("change", function () {
    var uplaod = $("div#variant-wrapper-3 input:checked").attr("data-upload");
    $(".product_media-upload").text(uplaod);
  });
});
