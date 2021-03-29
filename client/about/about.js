const img = document.querySelector(".img1");
var timesCliked = 0;
img.addEventListener('click', () => {
    timesCliked++;

    if (timesCliked % 2 == 0) {
        function evenTimesClicked() {
            img.style.border = '3px solid darkblue';
        }
        evenTimesClicked();
    } else {
        function oddTimesClicked() {
            img.style.border = '3px solid darkred';
        }
        oddTimesClicked();
    }

});