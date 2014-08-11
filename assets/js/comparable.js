// comparable.js
// BuzzFeed-style image comparison
// by Dan Diaz
// dan-diaz.com
var comparable = (function() {

    function compare(selector) {
        var holders = document.querySelectorAll(selector);

        Array.prototype.forEach.call(holders, function(holder) {
            var compareA = holder.dataset.compareA;
            var compareB = holder.dataset.compareB;
            var slider = createImg(compareA,compareB, holder);
            if(slider.children.length === 1) { // need to error proof this!
                mouseEvents(slider, holder);
            }
        });
    }

    // set initial img attributes and styles
    function createImg(a, b, holder) {
        if(a !== '' && b !== '') {
            var compA = document.createElement('div');
            var compB = document.createElement('div');
            var compBSlider = document.createElement('div');
            var imgA = document.createElement('img');
            var imgB = document.createElement('img');
            var zIndexA = 10;
            var zIndexB = zIndexA + 1;

            holder.style.position = 'relative';
            // Element-A is the static background element
            compA.classList.add('compare','compare-a');
            compA.style.zIndex = zIndexA;
            compA.style.display = 'inline-block';

            // Element-B is the sliding foreground element
            compB.classList.add('compare','compare-b');
            compB.style.position = 'absolute';
            compB.style.left = 0;
            compB.style.top = 0;
            compB.style.width = '100%';
            compB.style.height = '100%';
            compB.style.zIndex = zIndexB;
            compB.style.display = 'inline-block';

            // Element-B inner slider
            compBSlider.classList.add('compare-b-slider');
            compBSlider.style.position = 'absolute';
            compBSlider.style.width = '50%';
            compBSlider.style.overflow = 'hidden';

            // image A - background image
            imgA.src = a;

            // image B - foreground image
            imgB.src = b;

            // insert elements into the DOM
            holder.appendChild(compA);
            holder.appendChild(compB);
            compA.appendChild(imgA);
            compB.appendChild(compBSlider);
            compBSlider.appendChild(imgB);

            return compB;
        } else {
            return 'incorrect number of data attributes.';
        }
    }

    function mouseEvents(slider, holder) {
        slider.addEventListener('mouseenter', function(evt) {
            evt.target.addEventListener('mousemove', function(e) {
                mouseX(e, slider, holder)
            });
        });
        slider.addEventListener('mouseleave', function(evt) {
            evt.target.removeEventListener('mousemove', function(e) {
                mouseX(e, slider, holder)
            });
        });
    }

    function mouseX(e, slider, holder) {
        slider.children[0].style.width = e.clientX - holder.offsetLeft + 'px';
    }

    return {
        compare:compare
    }
})();// test