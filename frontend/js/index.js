import Category, {getCategory, postCategory, hideCategory, showCategory, validateCategory} from './helpers/Category.js'
import{getAccounts, postAccounts} from './helpers/Account.js'
import{getTransactions, postTransactions, validateTransactions} from './helpers/Transaction.js'


$(() => {
  //Start coding here!
  hideCategory()
  getAccounts()
  getCategory();
  getTransactions();
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

  $('#submit').click(function(e) {
    e.preventDefault();
   let transaction = {
      accountId : $('#select_account').val(),
      trtype : $('input[name="transaction"]:checked').val(),
      accountIdFrom : $('#from').val(),
      accountIdTo : $('#to').val(),
      cat : $('#category_select').val(),
      desc1 : $('input[id="desc"]').val(),
      am1 : $('input[id="am"]').val()
    }
     if(validateTransactions()){
      postTransactions(transaction);
    }
    
  })
  


});
