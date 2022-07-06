
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }
  
  
 
}
let accounts = []

const getInput = () =>{
   let inpt = document.querySelector('#input').value
   console.log(inpt, "inpt")
   if(inpt === ""){
    alert("You can't create a account without name")
    return false
  }
  
  }

const getAccounts = () =>{
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json'
  }).done((acc) => {
    accounts = [...acc]
    console.log('accounts', acc);
    
  });
}



const postAccounts = () =>{
  const newAccount={
    username: $("#input").val(),
    transactions:[]
  }
  $.ajax({      
    method: 'post',
    data: JSON.stringify( {
      newAccount
    }),
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    contentType:'application/json'
    }).done((acc) => {
      data = acc
      const account = new Account(acc);
      console.log('data ajax post', acc);
      console.log(account.username.username);
      let inpt = document.querySelector('#input').value
      if(inpt.value === account.username.username){
        alert("this username already set")
        return false
        
      }
      $('#select_account').append(`<option>${account.username.username}</option>`);
      $('#filter_account').append(`<option>${account.username.username}</option>`);
      $('#username_summary').append(`<li>${account.username.username}</li>`)
      
    })
}