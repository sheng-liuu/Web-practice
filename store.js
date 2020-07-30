window.onload=function(){
    this.getData();
}

function getData(){
    firebase.database().ref('products/').once('value').then(function(snapshot){
        var  products_div=document.getElementById('products_list');
        products_div.innerHTML="";
        var data=snapshot.val();
        console.log(data);
        for(let[key,value] of Object.entries(data)){					
            products_div.innerHTML="<div class='gallery'>"+
            "<a target='_blank' href='"+value.image+"'>"+
            "<img class='productImg' src='"+value.image+"' alt='Cinque Terre'>"+
            "</a>"+
            "<div class='desc' style='color: black;'><p style='font-weight: bold;'>"+value.codigo+"</p>"+
            "<p>"+value.description+"</p>"+
            "</div></div>"+products_div.innerHTML;
        }
    });
}

function getFemale() {
    firebase.database().ref('female/').once('value').then(function(snapshot){
        var  products_div=document.getElementById('products_list');
        products_div.innerHTML="";
        var data=snapshot.val();
        console.log(data);
        for(let[key,value] of Object.entries(data)){					
            products_div.innerHTML="<div class='gallery'>"+
            "<a target='_blank' href='"+value.image+"'>"+
            "<img class='productImg' src='"+value.image+"' alt='Cinque Terre'>"+
            "</a>"+
            "<div class='desc' style='color: black;'><p style='font-weight: bold;'>"+value.codigo+"</p>"+
            "<p>"+value.description+"</p>"+
            "</div></div>"+products_div.innerHTML;
        }
    });
}

function getMale() {
    firebase.database().ref('male/').once('value').then(function(snapshot){
        var  products_div=document.getElementById('products_list');
        products_div.innerHTML="";
        var data=snapshot.val();
        console.log(data);
        for(let[key,value] of Object.entries(data)){					
            products_div.innerHTML="<div class='gallery'>"+
            "<a target='_blank' href='"+value.image+"'>"+
            "<img class='productImg' src='"+value.image+"' alt='Cinque Terre'>"+
            "</a>"+
            "<div class='desc' style='color: black;'><p style='font-weight: bold;'>"+value.codigo+"</p>"+
            "<p>"+value.description+"</p>"+
            "</div></div>"+products_div.innerHTML;
        }
    });
}