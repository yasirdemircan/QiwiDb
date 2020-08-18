

function resizewin(){
    let width = parseInt(window.getComputedStyle(document.getElementById("cardbody")).width.split("p")[0]);
    let height = parseInt(window.getComputedStyle(document.getElementById("cardbody")).height.split("p")[0]);
  require('electron').remote.getCurrentWindow().setSize(width,height);  
}
 
function nav(param){
   
    var createpage =document.getElementById("createmenu");
    var modifypage = document.getElementById("modifymenu");
    var querypage = document.getElementById("querymenu");
    
    if(param == "create"){
        createpage.style.display = "block";
        modifypage.style.display = "none";
        querypage.style.display = "none";
    
    }else if(param == "modify"){
        createpage.style.display = "none";
        modifypage.style.display = "block";
        querypage.style.display = "none";
    
    }else if(param == "query"){
        createpage.style.display = "none";
        modifypage.style.display = "none";
        querypage.style.display = "block";
        
    }
}