export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      handleScroll() {
        var interval = 250;
        var interval2 = 500;
        var interval3 = 250;
        var fadeInElements = Array.from(document.getElementsByClassName("fade-in"));
        var fadeInElements1 = Array.from(document.getElementsByClassName("fade-in-1"));
        
        for (let i = 0; i < fadeInElements.length; i++) {
          setTimeout(
            function () {
              var elem = fadeInElements[i];
              if (isElemVisible(elem)) {
                elem.style.opacity = "1";
                elem.style.transform = "translateY(0px)";
              }
            }.bind(this),
            i * interval
          );
        }
    
        for (let i = 0; i < fadeInElements1.length; i++) {
          setTimeout(
            function () {
              var elem = fadeInElements1[i];
              if (isElemVisible(elem)) {
                elem.style.opacity = "1";
                if (window.outerWidth < 668) {
                  elem.style.transform = "translateY(0px) translateX(0%)";
                } else {
                  elem.style.transform = "translateY(0px) translateX(-50%)";
                }
  
              }
            }.bind(this),
            interval3
          );
        }
        function isElemVisible(el) {
          var rect = el.getBoundingClientRect();
          var elemTop = rect.top; // 200 = buffer
          var elemBottom = rect.bottom;
          return elemTop < window.innerHeight && elemBottom >= 0;
        }
      },
    }
  }
})