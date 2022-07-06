$(() => {
  //Start coding here!
  showCategory()
  getAccounts()
  $("#add-account").click(function(event) {
    event.preventDefault();
    postAccounts()
  })
  $("#category_button").click(function(event) {
    event.preventDefault();
  })
  


});
