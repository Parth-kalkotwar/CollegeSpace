window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.querySelector(".navbar").style.background = "rgba(0, 0, 0, 1)";
        document.querySelector(".navbar").style.boxShadow = "0 1px 10px rgba(0, 0, 0, .8)";
    } else {
        document.querySelector(".navbar").style.background = "transparent";
        document.querySelector(".navbar").style.boxShadow = "0 1px 10px rgba(0, 0, 0, 0)";
    }
}