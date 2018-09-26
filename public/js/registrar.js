function registra() {
    let name= document.getElementById("name").value;
    let amount =document.getElementById("amount").value;
    axios.post('/people',{
        name: name,
        amount:amount,
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
    axios.post('/logs',{
        name: name,
        amount:amount,
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    });
}

console.log("registrar.js loaded")