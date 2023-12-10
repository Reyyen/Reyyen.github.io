
document.querySelector(".btn-ekle").addEventListener("click",function (urunSayisi) {
    
    document.querySelector(".num-of-urun").textContent =+document.querySelector(".num-of-urun").innerHTML+1 ;
    
})


const heartCheckboxes = document.querySelectorAll(".heart-checkbox");
const heartLabels = document.querySelectorAll(".heart-label");

heartCheckboxes.forEach(function (checkbox, index) {
    checkbox.addEventListener("change", function () {
    if (this.checked) {
        heartLabels[index].classList.add("checked");
        document.querySelector(".num-of-fa").textContent =+document.querySelector(".num-of-fa").innerHTML+1 ;

    } else {
        heartLabels[index].classList.remove("checked");
        document.querySelector(".num-of-fa").textContent =+document.querySelector(".num-of-fa").innerHTML-1 ;
    }
    });
});
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener("scroll", function () {
    var button = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block"; // Show the button when scrolled down
    } else {
        button.style.display = "none"; // Hide the button when at the top
        
    }
});

function closePopup() {
    var popup = document.querySelector('.popup');
    popup.style.display = 'none';
}