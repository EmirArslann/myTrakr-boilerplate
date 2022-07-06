const showCategory = () => {
    $(document).ready(function(){
    $('option[name="new"]').on("change", function(){
        $("#category_input").show();
        $("#category_button").show();
        console.log("sa")
    })
});
}
