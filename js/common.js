var g_execed = 0;
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
			if(g_execed == 0){
				
				/*console.log('1');
				imgdx=document.getElementsByClassName('post-cover-img js-img-fadeIn')
				for(var i=0;i<imgdx.length;i++){
					console.log(imgdx[i].src)
					if(imgdx[i].src.indexOf('/blog-1/ida1.png')!=-1){
						imgdx[i].src='/images/laopo_lingxian.jpg'
					}
				}
				imgdx=document.getElementsByClassName('js-img-fadeIn')
				for(var i=0;i<imgdx.length;i++){
					console.log(imgdx[i].src)
					if(imgdx[i].src.indexOf('/blog-1/ida1.png')!=-1){
						imgdx[i].src='/images/laopo_lingxian.jpg'
					}
				}*/
				
				g_execed=1;
			}
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
