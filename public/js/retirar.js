function retirar(){
    let name= document.getElementById("name").value;
    let amount =document.getElementById("amount").value;
    axios.post('/logs',{
        name: name,
        amount:amount*-1,
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}
