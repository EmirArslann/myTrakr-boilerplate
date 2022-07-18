class Transaction {
  constructor(amount, account, username) {
    this.amount = amount;
    this.account = account;
    this.username = username
  
    
  }
  
  isallowed(){
    if(this.account.balance < this.amount){
      return false

    }
  }
  
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

class Transfer extends Transaction {
  constructor(accountIdFrom, accountIdTo) {
    this.accountIdFrom = accountIdFrom
    this.accountIdTo = accountIdTo
  }
  commit(){

  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount}


}


export function validateTransactions(account){   
      if($('input[id="am"]').val() <= 0 ){
        alert("You can't make transactions with amount of 0(zero).")
        return false
        
      }
      if($('#category_select').val() === "Category"){
        alert("You can't make a transaction without a category.")
        return false
    
      }
      if($('#select_account').val() === undefined){
        alert("You must choose a account")
        return false
      }
      if( $('input[name="transaction"]:checked').val() === undefined){
        alert("You must choose a transaction type")
        return false
      }
      if( $('input[name="transaction"]:checked').val() === "transfer"){
        if($('#from').val() === $('#to').val()){
          alert("You can't transfer thorugh same account")
          return false
    
        }
      }if ($('input[name="transaction"]:checked').val() === "transfer" || $('input[name="transaction"]:checked').val() === "withdraw" ){
        if(account.balance < $('input[id="am"]').val()){
          alert("You don't have enough money to make this transaction!!")
          return false
        }else{
          alert("Your transaction on its way")
        }
      }
      return true
  }


$('input[name="transaction"]').on("click", function(){
  var transac = $('input[name="transaction"]:checked').val();
  alert(transac);
});

$(document).ready(function(){
  $('input[name="transaction"]').on("change", function(){
    var test = $(this).val();
    $(".fromto").hide();
    $(".acc").show();
  });  
});

$(document).ready(function(){
  $('input[value="transfer"]').on("change", function(){
    var test1 = $(this).val();
    $(".fromto").show();
    $(".acc").hide();
    
  });
});

export function displayTable(transaction){
  console.log("hereee")
  $('.main-table').append(`
  <tr class="table">
    <td >${transaction.accountId}</td>
    <td >${transaction.userName}</td>
    <td >${transaction.trtype}</td>
    <td >${transaction.cat}</td>
    <td >${transaction.desc1}</td>
    <td >${transaction.am1}</td>
    <td >${transaction.accountIdFrom}</td>
    <td >${transaction.accountIdTo}</td>
  </tr>`)

}

// function filterTransaction(transaction){
//   let filter =  $('#filter_account').val()
//   if(filter === transaction.userName){
//     console.log(transaction.userName);
//   }
// }

function getBalance(transaction){
  if( $('input[name="transaction"]:checked').val() === "deposit"){
    console.log(transaction);
    let balance =  Number($(`#${transaction.accountId}`).text()) + Number($('input[id="am"]').val())
    console.log(balance)
    return balance 
  }
  alert("Your deposit didnt't go through")
  return false

}

let transactions = []

export function getTransactions(){
  $.ajax({
    method: "get",
    url: 'http://localhost:3000/transactions',
    datatype: 'json'
  }).done((data, ) => {
    transactions = [...data]
    console.log('transactions', data);
  });

}

export function postTransactions(transaction){
  const newTransaction = transaction
  console.log(newTransaction)
  $.ajax({
    method: 'post',
    data: JSON.stringify({
      newTransaction
    }),
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: 'application/json',  
  }).done((data) => {
    console.log('data ajax post', data);
    data.forEach(transaction => {
      displayTable(transaction);
      $(`#${transaction.accountId}`).text(getBalance(transaction))
    });
    
  })
    
  
}