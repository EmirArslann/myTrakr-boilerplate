
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
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json'
  }).done(data =>{
    console.log(data)
    let inpt = document.querySelector('#input').value;
    console.log(inpt);
    if(inpt === ""){
          alert("You can't create a account without name")
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
            const account = new Account(acc);
            data = acc
            
            console.log('data ajax post', acc);
            console.log(account.username.username);
            $('#select_account').append(`<option>${account.username.username}</option>`);
            $('#filter_account').append(`<option>${account.username.username}</option>`);
            $('#username_summary').append(`<li>${account.username.username}</li>`);
          })
    
  })
}