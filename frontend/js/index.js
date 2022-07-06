$(() => {
  //Start coding here!
  getAccounts()
  $("#add-account").click(function(event) {
    event.preventDefault();
    const inputValue = getInput()
    postAccounts(inputValue)
  })
 


});
