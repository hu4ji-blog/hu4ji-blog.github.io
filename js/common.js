var g_execed = 0;

if(g_execed == 0){
	//console.log('123');
	var protocol = window.location.protocol;
	if (protocol == "http:") {
		var cur_url=window.location.href;
		cur_url=cur_url.substring(5,cur_url.length);
		url_localhost=cur_url.substring(7,16);
		//console.log(url_localhost)
		if (url_localhost == 'localhost'){
			goto exec_end;
		}
		cur_url="https:"+cur_url;
		//console.log(cur_url);
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.abort();
		window.stop();
		window.location.href = cur_url;

	}
	exec_end:
	g_execed = 1;
}

window.$claudia = {

    throttle: function (func, time) {
        var wait = false
        return function () {
            if (wait) return
            wait = true

            setTimeout(function () {
                func()
                wait = false
            }, time || 100)
        }
    },
    fadeInImage: function(imgs, imageLoadedCallback) {
        var images = imgs || document.querySelectorAll('.js-img-fadeIn')

        function loaded(event) {
            var image = event.currentTarget

            image.ontransitionend = function () {
                image.ontransitionend = null
                image.style.transition = null
            }
            image.style.transition = 'opacity 320ms'
            image.style.opacity = 1

            if (image.parentElement && image.parentElement.classList.contains('skeleton')) {
                image.parentElement.classList.remove('skeleton')
            }
            imageLoadedCallback && imageLoadedCallback(image)
        }

        images.forEach(function (img) {
            if (img.complete) {
                return loaded({ currentTarget: img })
            }

            img.addEventListener('load', loaded)
        })
    },
    blurBackdropImg: function(image) {
        if (!image.dataset.backdrop) return

        var parent = image.parentElement //TODO: Not finish yes, must be a pure function
        var parentWidth = Math.round(parent.getBoundingClientRect().width)
        var childImgWidth = Math.round(image.getBoundingClientRect().width)

        var isCovered = parentWidth === childImgWidth
        var blurImg = parent.previousElementSibling //TODO: Not finish yes, must be a pure function

        isCovered ? blurImg.classList.add('is-hidden') : blurImg.classList.remove('is-hidden')
    },
    getSystemTheme(callback) {
		
        var media = window.matchMedia('(prefers-color-scheme: dark)')
        media.addEventListener('change', function (e){
            callback && callback(e.matches ? "dark" : "light")
        })

        callback && callback(media.matches ? 'dark' : 'light')
    }
}
