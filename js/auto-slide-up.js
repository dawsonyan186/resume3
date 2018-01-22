! function() {
    var view1 = document.querySelectorAll('[data-x]');
    var view2 = document.querySelectorAll('nav.menu > ul > li');
    var controller = {
        specialTags: null,
        liTags: null,
        init: function(view1,view2) {
            this.specialTags = view1;
            this.liTags = view2;
            this.initView(this.specialTags);
            this.bindEvents(this.specialTags, this.liTags);
        },
        initView: function(specialTags) {
            for (let i = 0; i < specialTags.length; i++) {
                specialTags[i].classList.add('offset')
            }
            this.findClosestAndRemoveOffset(specialTags);
        },
        bindEvents: function(specialTags, liTags) {
            var self = this;
            window.addEventListener('scroll', function(x) {
                self.findClosestAndRemoveOffset(specialTags);
            })
            for (let i = 0; i < liTags.length; i++) {
                liTags[i].onmouseenter = function(x) {
                    x.currentTarget.classList.add('active')
                }
                liTags[i].onmouseleave = function(x) {
                    x.currentTarget.classList.remove('active')
                }
            }
        },
        findClosestAndRemoveOffset: function(specialTags) {
            let minIndex = 0
            for (let i = 1; i < specialTags.length; i++) {
                if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                    minIndex = i
                }
            }
            // minIndex 就是里窗口顶部最近的元素
            specialTags[minIndex].classList.remove('offset')
            let id = specialTags[minIndex].id
            let a = document.querySelector('a[href="#' + id + '"]')
            let li = a.parentNode
            let brothersAndMe = li.parentNode.children
            for (let i = 0; i < brothersAndMe.length; i++) {
                brothersAndMe[i].classList.remove('highlight')
            }
            li.classList.add('highlight')
        }

    }
    controller.init(view1, view2);
}.call()