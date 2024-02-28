// Insert data coder
$("#btnsave").click(function(){
    console.log('button clicked');
    output="";
    let nm=$("#nameid").val();
    let em=$("#emailid").val();
    let csr=$("input[name=csrfmiddlewaretoken]").val();
    
    if(nm==""){
        console.log('please enter name');
    }else if(em==""){
        console.log('please enter email');
    }else{
        console.log(nm);
        console.log(em);
        mydata={ name:nm,email:em,csrfmiddlewaretoken:csr};
        $.ajax({
            url:"/save/",
            method :"POST",
            data : mydata,
            success: function(data){
                // console.log(data.status);
                x = data.student_data
                if(data.status == "Save"){
                    console.log('form submitted successfully..');
                    console.log(data.student_data);
                    $("form")[0].reset();
                    for(i=0; i<x.length;i++){
                     output+="<tr><td>"+x[i].id+"</td><td>"+x[i].name+"</td><td>"+x[i].email+"</td><td>"+
                     "<input type='button' data-sid="+ x[i].id + " value='Edit' class='btn btn-primary btn-edit'/>"+"</td><td>"+
                     "<input type='button' data-sid="+ x[i].id + " value='delete' class='btn btn-danger btn-del'/>"+"</td></tr>"
                    }
                    $("#tbody").html(output);
                }
                else{
                    console.log('unable to save')
                }
            }
        })
    }
   
});

//delete data code

$("tbody").on("click",".btn-del",function(){
    console.log("dele button clicked..")
    let id = $(this).attr("data-sid");
    let csr=$("input[name=csrfmiddlewaretoken]").val();
    console.log(id);
    mydata={sid : id,csrfmiddlewaretoken:csr}
    $.ajax({
        url:"/delete/",
        method:"POST",
        data:mydata,
        success:function(data){
          console.log(data);
          mythis=this;
          if(data.status == 1 ){
            console.log('successfully deleted..')
            document.getElementById('tbody').lastElementChild.remove();
            
          }
          else{
            console.log('unable to delete')
          }
        }
    })
})

//editing data 
$("tbody").on("click",".btn-edit",function(){
    console.log("edit button clicked..")
    let id = $(this).attr("data-sid");
    let csr=$("input[name=csrfmiddlewaretoken]").val();
    console.log(id);
    mydata={sid : id,csrfmiddlewaretoken:csr}
    $.ajax({
        url:"/edit/",
        method:"POST",
        data:mydata,
        datatype:"json",
        success:function(data){
          console.log(data);
          $("#nameid").val(data.name);
          $("#emailid").val(data.email);
          
          mythis=this;
          if(data.status == 1 ){
            console.log('successfully edited..')
          
          }
          else{
            console.log('unable to edit')
          }
        }
    })
})

