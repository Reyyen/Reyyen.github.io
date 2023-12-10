var i = document.querySelectorAll(".drum").length;
for (let index = 0; index < i; index++) {
    document.querySelectorAll(".drum")[index].addEventListener("click", function (){
        var btninnerHtml = this.innerHTML;
        sound(btninnerHtml);
        butAnimation(btninnerHtml);
    }); 
}

document.addEventListener("keypress",function (event) {
    sound(event.key);
    butAnimation(event.key);
});

/*var audio = new Audio("./sounds/tom-1.mp3");
    audio.play();*/
    
    function sound(key) {
        switch(key){
            
            case "w":
                var s1 = new Audio("./sounds/tom-1.mp3");
                s1.play();
                break;
            case"a":
                var s2=new Audio ("./sounds/tom-2.mp3") ;
                s2.play ();
                break;
            case's':
                var s3=new Audio ('./sounds/tom-3.mp3') ;
                s3.play () ;
                break;
            case"d":
                var s4=new Audio('./sounds/tom-4.mp3');
                s4.play() ;
                break;
            case 'j':
                var s5=new Audio('./sounds/snare.mp3');
                s5.play() ;
                break;
            case"k":
                var s6=new Audio("./sounds/crash.mp3");
                s6.play() ;
                break;
            case"l":
                var s7=new Audio('./sounds/kick-bass.mp3');
                s7.play() ;
                break;
        }
    }

    function butAnimation(currentKey) {
        var activebtn = document.querySelector("."+currentKey);
        activebtn.classList.add("pressed");
        setTimeout(function (){
            activebtn.classList.remove('pressed')} ,100 );
    }