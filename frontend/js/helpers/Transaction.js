class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
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

