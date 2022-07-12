class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
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
    return this.amount;
  }
}


export function validateTransactions(){
  if($('input[id="am"]').val() <= 0 ){
    alert("You can't make transactions with amount of 0(zero)")
    return false
    
  }
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

export function displayTable(){
  $('#idth').append(`<th>${('#select_account').val()}</th>`)
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
  })
    
  
}