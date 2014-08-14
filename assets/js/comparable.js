// comparable.js
// BuzzFeed-style image comparison
// by Dan Diaz
// dan-diaz.com
var comparable = (function() {

    function compare(selector, settings) {
        var holders = document.querySelectorAll(selector);
        var opts = {};
        opts.split = settings&&settings.split!==null?settings.split:0.5;
        opts.splitReturn = settings&&settings.splitReturn?settings.splitReturn:false;
        opts.imageA = settings&&settings.imageA?settings.imageA:null;
        opts.imageB = settings&&settings.imageB?settings.imageB:null;

        Array.prototype.forEach.call(holders, function(holder) {
            var compareA;
            var compareB;

            if(opts.imageA !== null) {
                compareA = opts.imageA;
            } else if(holder.dataset && holder.dataset.compareA !== null) {
                compareA = holder.dataset.compareA;
            } else {
                compareA = null;
            }

            if(opts.imageB !== null) {
                compareB = opts.imageB;
            } else if(holder.dataset && holder.dataset.compareB !== null) {
                compareB = holder.dataset.compareB;
            } else {
                compareB = null;
            }

            if(compareA === null || compareB === null) {
                return false;
            } else {
                var slider = createImg(compareA,compareB, holder, opts);
                if(slider.children.length) {
                    userEvents(slider, holder, opts);
                }
            }
        });
    }

    // set initial img attributes and styles
    function createImg(a, b, holder, opts) {
        if(a!=='' && b!=='') {
            var compA = document.createElement('div');
            var compB = document.createElement('div');
            var compBSlider = document.createElement('div');
            var imgA = document.createElement('img');
            var imgB = document.createElement('img');
            var zIndexA = 10;
            var zIndexB = zIndexA + 1;

            holder.style.position = 'relative';

            // Element-A is the static background element
            compA.className = 'compare compare-a';
            compA.style.zIndex = zIndexA;
            compA.style.display = 'inline-block';

            // Element-B is the sliding foreground element
            compB.className = 'compare compare-b';
            compB.style.position = 'absolute';
            compB.style.left = 0;
            compB.style.top = 0;
            compB.style.width = '100%';
            compB.style.height = '100%';
            compB.style.zIndex = zIndexB;
            compB.style.display = 'inline-block';
            compB.style.backgroundColor = 'rgba(0,0,0,0)'; // IE9 fix

            // Element-B inner slider
            compBSlider.className ='compare-b-slider';
            compBSlider.style.position = 'absolute';
            // compBSlider.style.width = (100*opts.split) + '%';
            split(compBSlider,opts.split);
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

            // apply image width to holder
            imgA.addEventListener('load', function() {
                holder.style.width = imgA.scrollWidth + 'px';
            });

            // return the element so we can apply events
            return compB;
        } else {
            return false;
        }
    }

    // mouse and touch events
    function userEvents(slider, holder, opts) {
        slider.addEventListener('mousemove', function(e) {
            eventX(e, slider, holder);
        });

        slider.addEventListener('touchmove', function(e) {
            eventX(e, slider, holder);
        });

        if(opts.splitReturn) {
            slider.addEventListener('mouseleave', function() {
                split(slider.children[0],opts.split);
            });
            slider.addEventListener('touchend', function() {
                split(slider.children[0],opts.split);
            });
        }
    }

    // collect and use x coordinate
    function eventX(e, slider, holder) {
        var clientX = e.touches?e.touches[0].clientX:e.clientX;
        slider.children[0].style.width = clientX - holder.offsetLeft + 'px';
    }

    // apply split width to element
    function split(el,width) {
        el.style.width = (100*width) + '%';
    }

    return {
        compare:compare
    }
})();// test