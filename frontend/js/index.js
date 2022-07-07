import Category, {getCategory, postCategory, hideCategory, showCategory, validateCategory} from './helpers/Category.js'
import{getAccounts, postAccounts} from './helpers/Account.js'

$(() => {
  //Start coding here!
  hideCategory()
  getAccounts()
  getCategory();
  $("#add-account").click(function(event) {
    event.preventDefault();
    postAccounts()
  })
  $("#category_button").click(function(event) {
    event.preventDefault();
    if(validateCategory()){
      postCategory($('#category_input').val());
    }
    
  })
  $('#category_select').on("change", function(e){
    if($('#category_select').val() === "add-new"){
      showCategory();
    } else {
      hideCategory();
    }
  })
  


});
