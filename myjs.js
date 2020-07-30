function upload() {
    var image = document.getElementById('image').files[0];
    var codigo = document.getElementById('codigo').value;
    var description = document.getElementById('description').value;
    var type;
    if(document.getElementById('male').checked){
        type = document.getElementById('male').value;
    } else if(document.getElementById('female').checked){
        type = document.getElementById('female').value;
    }
    var imageName = image.name;

    var storageRef = firebase.storage().ref('images/' + imageName);
    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function(snapshot) {
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is " + progress+" done");
    }, function(error) {
        console.log(error.message);
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.database().ref(type).push().set({
                codigo: codigo,
                description: description,
                image: downloadURL,
                type: type
            },function(error){
                if(error){
                    alert("Error while uploading");
                }else{
                    alert("Successfully uploading");
                    document.getElementById('post-form').reset();
                    document.getElementById('image').reset();
                    getData();
                }
            });
        });
    });
}

window.onload=function(){
    this.getData();
}

function getData(){
    var posts_div=document.getElementById('posts');
    posts_div.innerHTML="";
    firebase.database().ref('male/').once('value').then(function(snapshot){
        var data=snapshot.val();
        console.log(data);
        for(let[key,value] of Object.entries(data)){
            posts_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class='card'>"+
            "<img src='"+value.image+"' style='height:250px;'>"+
            "<div class='card-body'><p class='card-text' style='font-weight: bold;'>"+value.codigo+"</p>"+
            "<p class='card-text'>"+value.description+"</p>"+
            "<button class='btn btn-danger' id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
            "</div></div></div>"+posts_div.innerHTML;
        }
    });
    firebase.database().ref('female/').once('value').then(function(snapshot){
        var data=snapshot.val();
        console.log(data);
        for(let[key,value] of Object.entries(data)){
            posts_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class='card'>"+
            "<img src='"+value.image+"' style='height:250px;'>"+
            "<div class='card-body'><p class='card-text' style='font-weight: bold;'>"+value.codigo+"</p>"+
            "<p class='card-text'>"+value.description+"</p>"+
            "<button class='btn btn-danger' id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
            "</div></div></div>"+posts_div.innerHTML;
        }
    });
}

function delete_post(key){
    firebase.database().ref('products/' + key).remove();
    getData();
}

function login(){
    var name = document.getElementById('name');
    var password = document.getElementById('password');

    firebase.database().ref('admin/').once('value').then(function(snapshot){
        var data=snapshot.val();
        if(data.name == name && data.password == password) {
            window.location.href = "admin.html";
        }else {
            alert("Error");
            document.getElementById('post-login').reset();
        }
    });
}