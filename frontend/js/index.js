import Category, {getCategory, postCategory, hideCategory, showCategory, validateCategory} from './helpers/Category.js'
import{getAccounts, postAccounts, Account} from './helpers/Account.js'
import{getTransactions, postTransactions, validateTransactions, displayTable} from './helpers/Transaction.js'


$(() => {
  //Start coding here!
  hideCategory();
  getAccounts();
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

  // $('#filter_account').change(function(e){
  //   e.preventDefault();
  //   let filter =  $('#filter_account').val()
  //   console.log(filter)
  //   if(filter === "all"){
  //     displayTable(transaction)
  //   }
  //   // }if(filter === transaction.userName){
  //   //   displayTable(transaction.userName)
  //   //   console.log(transaction.username)

  //   // }

  
  // });

  $('#submit').click(function(e) {
    e.preventDefault();
   let transaction = {
      accountId : $('#select_account').val(),
      userName : $('#input').val(),
      trtype : $('input[name="transaction"]:checked').val(),
      accountIdFrom : $('#from').val(),
      accountIdTo : $('#to').val(),
      cat : $('#category_select').val(),
      desc1 : $('input[id="desc"]').val(),
      am1 : Number($('input[id="am"]').val())
    }
$.ajax({
        method: 'get',
        url: 'http://localhost:3000/accounts',
        dataType: 'json'
      }).done((acc) => {
        console.log('accounts', acc);
          const selectedAccount = acc.filter( (a) => {
            return a.id == $('#select_account').val()
            
    
          
          })
          let obj = new Account(selectedAccount[0]) 
          console.log("selected",selectedAccount)
          if(validateTransactions(obj)){
            postTransactions(transaction);
            $('#filter_account').change(function(event){
              event.preventDefault();
              let filter =  $('#filter_account').val()
              console.log(filter)
              if(filter === "all"){
                displayTable(transaction)
              }if(filter === acc.userId){
                displayTable(transaction.accountId)
                console.log(acc.userId)
              }else{
                displayTable(transaction)
              }

            
            });
           
          };
        });
        
    
    
    console.log(transaction);
  
})


  


});
