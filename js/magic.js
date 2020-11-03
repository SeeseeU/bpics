(function (window, undefiend) {
  var jstool = function (selector, filter) {
    return new jstool.prototype.init(selector, filter);
  };
  jstool.prototype = {
    constructor: jstool,
    init: function () {
      return this;
    }
  };
  jstool.extend = jstool.prototype.extend = function (obj) {
    for (var key in obj) {
      this[key] = obj[key];
    }
  };
  // 生成相关
  jstool.extend({
    randomNum: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  });
  jstool.extend({
    magicCirle: function (radius, densety, color, clearOffset) {
      $(".scroll-down").after(
        '<canvas id="canvas" width="1700px" height="470"></canvas>'
      );
      $("");
      $.fn.circleMagic = function (options) {
        let width,
          height,
          largeContainer,
          canvas,
          ctx,
          target,
          animateHeader = true;
        let circles = [];
        // 对象合并
        let settings = $.extend(
          {
            elem: ".header",
            color: "rgba(255,225,225,.4)",
            radius: 20,
            densety: 0.3,
            clearOffset: 0.2,
          },
          options
        );

        initContainer();
        addListeners();

        function initContainer() {
          width = $(window).width();
          height = $(window).height();
          target = { x: 0, y: height };
          largeContainer = document.querySelector(settings.elem);
          largeContainer.style.height = height + "px";
          initCanvas();
          canvas = document.getElementById("canvas");
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext("2d");
          for (let x = 0; x < width * settings.densety; x++) {
            let c = new Circle();
            circles.push(c);
          }
          animate();
        }

        function initCanvas() {
          let canvasElement = document.createElement("canvas");
          canvasElement.id = "canvas";
          largeContainer.append(canvasElement);
        }

        function addListeners() {
          window.addEventListener("scroll", scrollCheck);
          window.addEventListener("resize", resize);
        }

        function scrollCheck() {
          if (document.body.scrollTop > height) animateHeader = false;
          else animateHeader = true;
        }

        function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          largeContainer.style.height = height + "px";
          canvas.width = width;
          canvas.height = height;
        }

        function animate() {
          if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (let i in circles) {
              circles[i].draw();
            }
          }
          requestAnimationFrame(animate);
        }

        function randomColor() {
          let r = Math.floor(Math.random() * 255);
          let g = Math.floor(Math.random() * 255);
          let b = Math.floor(Math.random() * 255);
          let alpha = Math.random().toPrecision(2);
          let rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          return rgba;
        }

        function Circle() {
          let self = this;
          (function () {
            self.pos = {};
            init();
          })();
          function init() {
            self.pos.x = Math.random() * width;
            self.pos.y = height + Math.random() * 100;
            self.alpha = 0.1 + Math.random() * settings.clearOffset;
            self.scale = 0.1 + Math.random() * 0.3;
            self.speed = Math.random();
            if (settings.color === "random") {
              self.color = randomColor();
            } else {
              self.color = settings.color;
            }
          }
          this.draw = function () {
            if (self.alpha <= 0) {
              init();
            }
            self.pos.y -= self.speed;
            self.alpha -= 0.0005;
            ctx.beginPath();
            ctx.arc(
              self.pos.x,
              self.pos.y,
              self.scale * settings.radius,
              0,
              2 * Math.PI,
              false
            );
            ctx.fillStyle = self.color;
            ctx.fill();
            ctx.closePath();
          };
        }
      };
      $(".full_page")
        .css({
          overflow: "hidden",
        })
        .circleMagic({
          elem: ".full_page",
          radius: radius ? radius : 18,
          densety: densety ? densety : 0.1,
          color: color ? color : "random",
          // color: 'rgba(255,105,180,.7)',
          clearOffset: clearOffset ? clearOffset : 0.3,
        });
      return this;
    },
    /**
     * 页脚养鱼
     * @date 2020-07-16
     * @returns {any}
     */
    footFish: function () {
      $("#footer-wrap").css({
        position: "absolute",
        "text-align": "center",
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        "z-index": 99,
      });
      $("footer").append(
        `<div class="container" id="jsi-flying-fish-container"></div>`
      );
      $("body").append(
        '<script src="https://cdn.jsdelivr.net/gh/seeseeu/bpics@main/js/fish.js"></script>'
      );
      return this;
    },
  });
  jstool.prototype.init.prototype = jstool.prototype;

  window.jstool = jstool;
})(window);

jst = new jstool();
jst.magicCirle();
jst.footFish();
