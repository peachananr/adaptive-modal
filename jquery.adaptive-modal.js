/* ===========================================================
 * jquery.adpative-modal.js v1.0
 * ===========================================================
 * Copyright 2014 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Adaptive Modal let you add a modal windows 
 * that can be morphed from anything
 *
 * https://github.com/peachananr/adaptive-modal
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    elementAnimateTime: 100,
    customBgColor: "#333",
    remoteUrl: false,
    elementAnimateIn: "scaleShow",
    elementAnimateOut: "scaleHide",
    beforeAnimate: function(el, status) {},
    afterAnimate: function(el, status) {},
    /* Deafult Ajax Parameters  */
    type: "GET",
    async: true,
    complete: function(xhr, text) {},
    cache: true,
    error: function(xhr, text, e) {},
    global: true,
    headers: {},
    statusCode: {},
    success: function(data, text, xhr) {},
    dataType: "html"
  };  
  
  // a function to replicate all styles from the original button
  
  $.fn.getStyleObject = function(){
      var dom = this.get(0);
      var style;
      var returns = {};
      if(window.getComputedStyle){
          var camelize = function(a,b){
              return b.toUpperCase();
          };
          style = window.getComputedStyle(dom, null);
          for(var i = 0, l = style.length; i < l; i++){
              var prop = style[i];
              var camel = prop.replace(/\-([a-z])/g, camelize);
              var val = style.getPropertyValue(prop);
              returns[camel] = val;
          };
          return returns;
      };
      if(style = dom.currentStyle){
          for(var prop in style){
              returns[prop] = style[prop];
          };
          return returns;
      };
      return this.css();
  }
  
  // Function to detect remote URL
  
  function urlCheck(url) {
    if(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
      return true;
    } else {
      return false;
    }
  }
  
  // Function to run animation in sequence
  
  function runAnimation(i, timeline, animations){
    setTimeout(function(){ 
      if (typeof animations[i].beforeAnimate == 'function') animations[i].beforeAnimate();        
      if (animations[i].remove) {
        if (animations[i].hide == true) {
          $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            $(this).hide();
            if (typeof animations[i].afterAnimate == 'function') animations[i].afterAnimate();
          });
        } else {
          $(animations[i].selector).removeClass(animations[i].remove).addClass(animations[i].step).show().one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if (typeof animations[i].afterAnimate == 'function') animations[i].afterAnimate();
          });
        }
      } else {
        if (animations[i].hide == true) {
          $(animations[i].selector).addClass(animations[i].step).one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            $(this).hide()
            if (typeof animations[i].afterAnimate == 'function') animations[i].afterAnimate();
          });
        } else {
          $(animations[i].selector).addClass(animations[i].step).show().one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
            if (typeof animations[i].afterAnimate == 'function') animations[i].afterAnimate();
          });
        }
      }
    }, timeline);
  }
  
  
  $.fn.adaptiveModal = function(options){
    
    return this.each(function(){
      var settings = $.extend({}, defaults, options),
          el = $(this);
          
      // Public Method to Open Modal Programatically
          
      $.fn.openModal = function() {
        var el = $(this),
            className = el.data("am-custom-class")||"",
            customBgColor = el.data("am-custom-bgcolor") || el.css('backgroundColor') || settings.customBgColor;
            h = el.outerHeight(),
            w = el.outerWidth(),
            posX = el.offset().left
            posY = el.offset().top - $(window).scrollTop(),
            styles = el.getStyleObject(),
            remote = "";
            
        // Prevent animation overlap when there's an ongoing animation    
        if (el.hasClass("am-animating")) {
          return false;
        }
        
        if (typeof settings.beforeAnimate == 'function') settings.beforeAnimate(el, "open");
        
        // Fallback default background color in case the button has no background color available
        if (el.css('backgroundColor') == "rgba(0 ,0 ,0 ,0)") customBgColor = settings.customBgColor;
     
        bgColor = customBgColor
        
        // animation flag to true
        el.addClass("am-animating");
      
      
        // Apply to remove URL only
        if (el.data("remote") == true || settings.remoteUrl != false) {
          content = "Loading.."
          remote = "am-remote"
          var type = (el.data("type")) ? el.data("type") : settings.type;
          var href = el.attr("href") || settings.remoteUrl;
          var datatype = (el.data("datatype")) ? el.data("datatype") : settings.dataType;
          
          // Call AJAX
          
          $.ajax({
            type: type,
            url: href,
            async: settings.async,
            complete: settings.complete,
            cache: settings.cache,
            error: settings.error,
            global: settings.global,
            headers: settings.headers,
            statusCode: settings.statusCode,
            success: function(data, text, xhr){
              
              // Animate Elements when ajax is completed
              if (typeof settings.success == 'function') {
                settings.success(data, text, xhr);
              } else {
                $(".am-remote").html(data)
              }
              
              $(".am-back > .am-modal-content > *").each(function() {
                animations.push({ 
                    time: 0,
                    step: "am-expanded",
                    selector: $(".am-back"),
                    beforeAnimate: function() {
      
                      $(".am-back").attr("style", "").css({
                        background: bgColor,
                        minHeight: $(".am-back").height()
                      });
                    }
                  },{ 
                      time: settings.elementAnimateTime,
                      step: "animated " + settings.elementAnimateIn,
                      selector: this,
                  });
              });
              animations.push({ 
                  time: 0,
                  step: "",
                  selector: $(".am-back"),
                  beforeAnimate: function() {
                    if (typeof settings.afterAnimate == 'function') settings.afterAnimate(el, "open");
                    el.removeClass("am-animating")
                  }
              });
        
      
              var timeline = 0;
      
              for(var i=0; i<animations.length; i++){
                timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
                runAnimation(i, timeline, animations);
              }
        
            },
            dataType : datatype
          });
      
        } else {
          // Use data-title or content from href if the link is not remote
          content = el.data("title")||$(el.attr("href")).html()
        }
      
        // Create objects to be animated
        $("body").append("<div class='am-overlay'><div class='am-close-backdrop'></div><div class='am-modal " + className + "'><div class='am-wrapper'></div></div></div>");
        el.clone().removeData("toggle").removeData("title").addClass("am-front").css(styles).appendTo(".am-modal .am-wrapper");
      
        $(".am-modal .am-wrapper").append("<div class='am-back'><div class='am-modal-content " + remote + "'>" + content + "</div></div>")
        
        $(".am-modal").css({
          width: w,
          height: h,
          top: posY,
          left: posX
        });
        
        // Get real height of the object to animate correctly
        $("body").prepend("<div class='am-sample'></div>")
        $(".am-back").clone().addClass("am-expanded " + className ).appendTo(".am-sample");
        $(".am-sample .am-back").wrap("<div class='am-modal am-expanded " + className + "'></div>");
      
        var realH = $(".am-sample .am-back").outerHeight();
        $(".am-sample").remove();
      
        $(".am-back").css({
          width: w,
          height: h,
          backgroundColor: bgColor
        });
      
        // Add close button
        $(".am-back").append("<a href='#' class='am-close'>&#215;</a>")
        
        // Close function
        $(".am-back .am-close, .am-close-backdrop, .am-trigger-close").click(function(e) {
          el.closeModal();
      
          return false;
        });
      
        // Complex series of class switching and CSS3 animation
        var animations = []
        
        animations.push({ 
          time: 500,
          step: "am-flipped",
          selector: $(".am-modal"),
          beforeAnimate: function() {
            el.css({
              visibility: "hidden"
            });
          }
        },{ 
          time: 500,
          step: "am-expanded",
          selector: $(".am-modal"),
          beforeAnimate: function() {
            $(".am-modal").attr("style", "");
          }
        },{ 
          time: 0,
          step: "am-expanded",
          selector: $(".am-back"),
          beforeAnimate: function() {
      
            $(".am-back").attr("style", "").css({
              background: bgColor,
              height: realH,
              minHeight: realH
            });
          }
        },{ 
          time: 500,
          step: "",
          selector: $(".am-back"),
          beforeAnimate: function() {
            if (!$(".am-back .am-modal-content").hasClass("am-remote")) {
              $(".am-back").css({
                height: "auto"
              });
              if (typeof settings.afterAnimate == 'function') settings.afterAnimate(el, "open");
              el.removeClass("am-animating")
            }
      
      
          }
        }
        );
        
        // Animate elemtn directly under the modal one by one
        $(".am-back > .am-modal-content > *").each(function() {
      
          animations.push({ 
                time: settings.elementAnimateTime,
                step: "animated scaleShow",
                selector: this,
            });
        });
      
        var timeline = 0;
      
        for(var i=0; i<animations.length; i++){
          timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
          runAnimation(i, timeline, animations);
        }
        
        $("body").addClass("am-modal-open");
      }
      
      // Public Method to Close Modal Programatically
      
      $.fn.closeModal = function() {
      
        var el2 = $(this),
            className = el2.data("am-custom-class")||"",
            animations = [],
            h = el2.outerHeight(),
            w = el2.outerWidth(),
            posX = el2.offset().left
            posY = el2.offset().top - $(window).scrollTop();
            
        // Prevent animation overlap when there's an ongoing animation       
        if (el2.hasClass("am-animating")) {
          return false;
        }
      
        if (typeof settings.beforeAnimate == 'function') settings.beforeAnimate(el2, "close");
        
        // Toggle Animation to true
        el2.addClass("am-animating");
        
        //Animate out modal content
        $(".am-back > .am-modal-content > *").each(function() {
          animations.push({ 
            time: settings.elementAnimateTime,
            step: settings.elementAnimateOut,
            remove: settings.elementAnimateIn,
            selector: this,
          });
        });
        
        // get real height to animate from
        $("body").prepend("<div class='am-sample'></div>")
        $(".am-back").clone().addClass("am-expanded " + className ).appendTo(".am-sample");
        $(".am-sample .am-back").wrap("<div class='am-modal am-expanded " + className + "'></div>");
        var realH = $(".am-sample .am-back").outerHeight();
        
        $(".am-sample").remove();
        
        // complex series of class switching and CSS3 animations
        animations.push({ 
          time: 0,
          selector: $(".am-expanded"),
          step: "",
          beforeAnimate: function() {
            $(".am-expanded").css({
              height: realH
            });          
          }
        },
        { 
          time: 300,
          remove: "am-expanded",
          selector: $(".am-back"),
          beforeAnimate: function() {
            $(".am-back").css({
              width: w,
              height: h,
              top: posY,
              left: posX,
              minHeight: 0
            });
          } 
        },
        { 
          time: 0,
          remove: "am-expanded",
          selector: $(".am-modal"),
          step: "",
          beforeAnimate: function() {
            $(".am-modal").css({
              width: w,
              height: h,
              top: posY,
              left: posX
            });          
          }
        },
        { 
          time: 200,
          remove: "am-flipped",
          step: "",
          selector: $(".am-modal")
        },
        {
          time: 0,
          step: "",
          selector: $(".am-modal"),
          beforeAnimate: function() {
            el2.css({
              visibility: "visible"
            })
          }
        },
        { 
          time: 500,
          remove: "am-modal-open",
          step: "",
          selector: $("body")
        },
        {
          time: 500,
          step: "",
          selector: $(".am-overlay"),
          beforeAnimate: function() {
            $(".am-overlay").remove();
            if (typeof settings.afterAnimate == 'function') settings.afterAnimate(el2, "close");
            el2.removeClass("am-animating");
          }
        });
      
      
      
        var timeline = 0;
      
        for(var i=0; i<animations.length; i++){
          timeline = parseInt(animations[i].time, 10) + parseInt(timeline, 10);
          runAnimation(i, timeline, animations);
      
          if (i - 1 == animations.length) {
      
          }
        }
      
      }
          
      // Determine the type of URL in the href attribute
      if (el.attr("href").length > 0 && el.attr("href") != "#") {
        if (!urlCheck(el.attr("href"))) $(el.attr("href")).hide();
      }
      // Add button trigger
      el.addClass("am-btn").click(function() {
        el.openModal()
        return false;
      });
          
          
    });
    
  }
  
  // Auto initialize when data-toggle='adaptive-modal' are present
  $(document).ready(function() {
    $("[data-toggle='adaptive-modal']").adaptiveModal();
  });
}(window.jQuery);