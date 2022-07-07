let categories = []

export function showCategory(){
    $("#category_input").show();
        $("#category_button").show();
}

export function  hideCategory() {
    $("#category_input").hide();
        $("#category_button").hide();
}



export function validateCategory(){
    let category_input = document.querySelector('#category_input').value;
    console.log(category_input);
    if(category_input === ""){
      alert("You can't create a category without name")
      return false
    }
    if(categories.length>0){
      for (let i = 0; i < categories.length; i++) {
        if(category_input === categories[i].name){
      alert("this category already set")
      return false
    } 
    }
  }
  return true
}

export function getCategory () {
    $.ajax({
      method: 'get',
      url: 'http://localhost:3000/categories',
      dataType: 'json',
      contentType:'application/json'
    }).done(data =>{
        categories = [...data]
      console.log(data)
    //   let category_input = document.querySelector('#category_input').value;
    //   console.log(category_input);
    //   if(category_input === ""){
    //         alert("You can't create a category without name")
    //         return false
    //       }
      if(data.length>0){
        for (let i = 0; i < data.length; i++) {
            $('#category_select').prepend(`<option>${data[i].name}</option>`)
        //   if(category_input === data[i].categories){
        // alert("this category already set")
        // return false
      } 
      }
        })
  }

  export function postCategory(category){
    const newCategory = category
    $.ajax({      
        method: 'post',
        data: JSON.stringify( {
          newCategory
        }),
        url: 'http://localhost:3000/categories',
        dataType: 'json',
        contentType:'application/json'
        }).done((data) => {
          console.log('data ajax post', data);
          $('#category_select').prepend(`<option>${data.name}</option>`);
        })
  }

  export default {postCategory, getCategory, hideCategory, showCategory}
