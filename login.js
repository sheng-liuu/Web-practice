function login(){
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    console.log(name);
    console.log(password);
    firebase.database().ref('admin/').once('value').then(function(snapshot){
        var data=snapshot.val();
        console.log(data);
        console.log(data.name);
        console.log(data.password);
        if(data.name == name && data.password == password) {
            window.location.href = "admin.html";
        }else {
            alert("Error");
            document.getElementById('post-login').reset();
        }
    });
}