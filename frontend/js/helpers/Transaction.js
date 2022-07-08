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

// $('#submit').click(function(e){
//   e.preventDefault();
//   var acc1 = $('input[id="select_account"]').val();
//   var trtype = $('input[name="transaction"]:selected').val();
//   var from1 = $('input[id="from"]').val();
//   var to1 = $('input[id="to"]').val();
//   var cat = $('input[id="category_select"]').val();
//   var desc1 = $('input[id="desc"]').val();
//   var am1 = $('input[id="am"]').val();
//   console.log(desc1);
// })


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