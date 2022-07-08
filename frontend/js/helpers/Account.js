
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
export function getAccounts() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json'
  }).done((acc) => {
    accounts = [...acc]
    console.log('accounts', acc);
    accounts.forEach(account => {
              
      console.log(account.username);
      $('#select_account').append(`<option value=${account.id}>${account.username}</option>`);
      $('#filter_account').append(`<option value=${account.id}>${account.username}</option>`);
      $('#username_summary').append(`<li>username: ${account.username} balance: ${account.balance} </li>`);
      $('#to').append(`<option value=${account.id}>${account.username}</option>`)
      $('#from').append(`<option value=${account.id}>${account.username}</option>`)
    });
  });
}


export function postAccounts(){
  const newAccount={
    username: $("#input").val(),
    transactions:[]
  }
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json'
  }).done(data =>{
    console.log(data)
    let inpt = document.querySelector('#input').value;
    console.log(inpt);
    if(inpt === ""){
          alert("You can't create an account without name")
          return false
        }
    if(data.length>0){
      for (let i = 0; i < data.length; i++) {
        if(inpt === data[i].username){
      alert("this username already set")
      return false
    } 
    }
      }
    console.log('here')
        $.ajax({      
          method: 'post',
          data: JSON.stringify( {
            newAccount
          }),
          url: 'http://localhost:3000/accounts',
          dataType: 'json',
          contentType:'application/json'
          }).done((acc) => {
            const account = new Account(acc.username);
            data = acc
            
            console.log('data ajax post', acc);
            
              
              console.log(account.username);
              $('#select_account').append(`<option value=${account.id}>${account.username}</option>`);
              $('#filter_account').append(`<option value=${account.id}>${account.username}</option>`);
              $('#username_summary').append(`<li>username: ${account.username} balance: ${account.balance} </li>`);
              $('#to').append(`<option value=${account.id}>${account.username}</option>`)
              $('#from').append(`<option value=${account.id}>${account.username}</option>`)
            
          })
    
  })
}

export default {getAccounts, postAccounts}