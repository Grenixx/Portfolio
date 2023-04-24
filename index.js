/*STOCKER DONNER DANS URL*/

var sections = $(".section");
var currentPosition = 0;
var scrollCount = 0;
var animationSpeed = 700;
var Buttons = $(".TeleportButton");

// stocker donné dans url
const params = new URLSearchParams(window.location.search);
const PositionActuelle = params.get("PositionActuelle");
currentPosition = parseInt(PositionActuelle);

ChangeColorOfButton();

function scrollHandler(event) {
  if (scrollCount == 0) {
    var delta = event.wheelDelta || -event.detail;
    console.log(delta);
    currentPosition += delta > 0 ? -1 : 1;

    if (currentPosition < 0) {
      currentPosition = 0;
    } else if (currentPosition > sections.length - 1) {
      currentPosition = sections.length - 1;
    }
    $("html").animate(
      {
        scrollTop: $(sections[currentPosition]).offset().top,
      },
      {
        duration: animationSpeed,
        done: function () {
          scrollCount = 0;
        },
      }
    );
    ChangeColorOfButton();
}
  scrollCount++;
}

window.addEventListener("mousewheel", scrollHandler, { passive: false });
window.addEventListener("DOMMouseScroll", scrollHandler, { passive: false });

function JumpTo(ButtonNumber) {
  $("html").animate({
    scrollTop: $(sections[ButtonNumber]).offset().top,
  });
  currentPosition = ButtonNumber;
  ChangeColorOfButton();
}

function ChangeColorOfButton() {
  for (let i = 0; i < Buttons.length; i++) {
    if (currentPosition == i) {
      Buttons[i].style.backgroundColor = "blue";
      StockerPositionDansURL();
    } else {
      Buttons[i].style.backgroundColor = "red";
      StockerPositionDansURL();
    }
  }
}


//stock notre derniere section pour ne pas revenir au début a chaque fois
function StockerPositionDansURL() {
  history.pushState(null, null, "?PositionActuelle=" + currentPosition);
}

/*
setInterval(() => {    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight/2 && rect.bottom > window.innerHeight/2) {
          currentSection = i;
          console.log(currentSection);
          break;
        }
      }
}, 500);
  */
