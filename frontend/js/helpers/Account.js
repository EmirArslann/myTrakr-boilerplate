
export class Account {
  constructor(acc) {
    this.id = acc.id;
    this.transactions = acc.transactions;
    this.username = acc.username;
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
    url: 'https://my-trakr.herokuapp.com/',
    dataType: 'json'
  }).done((acc) => {
    accounts = [...acc]
    console.log('accounts', acc);
    accounts.forEach(account => {
              
      console.log(account.username);
      $('#select_account').append(`<option value=${account.id}>${account.username}</option>`);
      $('#filter_account').append(`<option value=${account.id}>${account.username}</option>`);
      $('#username_summary').append(`<li>username: ${account.username} balance: <span id=${account.id}>${account.balance}</span> </li>`);
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
    url: 'https://my-trakr.herokuapp.com/accounts',
    dataType: 'json'
  }).done(data =>{
    console.log("post accounts", data)
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
          url: 'https://my-trakr.herokuapp.com/accounts',
          dataType: 'json',
          contentType:'application/json'
          }).done((acc) => {
            const account = new Account(acc);
            data = acc
            

            console.log('data ajax post', acc);
            
              
              // console.log(account.username);
              console.log("id: ", account.id);
              $('#select_account').append(`<option value=${account.id}>${account.username}</option>`);
              $('#filter_account').append(`<option value=${account.id}>${account.username}</option>`);
              $('#username_summary').append(`<li>username: ${account.username} balance: <span id=${account.id}>${account.balance}</span> </li>`);
              $('#to').append(`<option value=${account.id}>${account.username}</option>`)
              $('#from').append(`<option value=${account.id}>${account.username}</option>`)
            
          })
    
  })
}

export default {getAccounts, postAccounts, Account}