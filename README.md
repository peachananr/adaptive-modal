#Adaptive Modal by Pete R.
Adaptive modal will let you create a modal window that can be morphed from any elements on your website into a beautifully animate modal windows. 


Created by [Pete R.](http://www.thepetedesign.com), Founder of [Travelistly](http://www.travelistly.com) and [BucketListly](http://www.bucketlistly.com)

License: [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)

[![Adaptive Modal](http://www.thepetedesign.com/images/adaptive-modal_image.png "Adaptive Modal")](http://www.thepetedesign.com/demos/adaptive-modal_demo.html)


## Demo
[View demo](http://www.thepetedesign.com/demos/adaptive-modal_demo.html)

## Compatibility
Modern browsers such as Chrome, Firefox, and Safari on both desktop and mobile have been tested. Not tested on IE.

## Basic Usage
To use this plugin, simply include the latest jQuery library (preferably version 2.0.0 or higher) together with `jquery.adaptive-modal.js` and `adaptive-modal.css` into your document's `<head>` follow by an HTML markup as follows:

````html
<body>
  ..
  <a href="#" data-toggle="adaptive-modal" data-title="...">...</a>
  ..
</body>

````

Surprise, surprise, that's all you have to do. Follow the HTML markup shown above without calling any JS function and the modal will morphed from this link when trigger. The content inside `data-title` will be used on the modal window. The `data-title` also supports HTML tags.


## Show Existing Content
Instead of storing your content inside `data-title`, you can have them separately in another div container and reference the id of that container in the `href` attribute like this:

````html
<body>
  ..
  <a href="#form" data-toggle="adaptive-modal">...</a>
  <form id="form">
    ..
  </form>
  ..
</body>

````

## Show Remote Content
You can utilize the built-in ajax request by simply define the AJAX URL inside `href` attribute and add `data-remote="true"` to the markup:

````html
<body>
  ..
  <a href="http://www.remote-ajax-url.com" data-type=".." data-datatype=".." data-remote="true" data-toggle="adaptive-modal">...</a>
  ..
</body>

````

You can also define your own ajax type and datatype with data-type and data-datatype attributes respectively.

## Custom Class Names On Each Modal
You can define your own class name in case you want to customize the modal for each link by following the markup below:

````html
<body>
  ..
  <a href="#" data-toggle="adaptive-modal" data-title="..." data-am-custom-class="custom-class-name">...</a>
  ..
</body>

````

## Custom BG Color On Show
You can define your own background color instead of using the link background color by default by simply adding the data-am-custom-bgcolor attribute to your markup:

````html
<body>
  ..
  <a href="#" data-toggle="adaptive-modal" data-title="..." data-am-custom-bgcolor="#000">...</a>
  ..
</body>

````

## Via Javascript
You can initiate the function with javascript instead of an HTML markup in case you want to define global options you want to apply to all links.

````javascript
 $(".am-remote-link").adaptiveModal({
   elementAnimateTime: 100,                   // Define the animation time for each element to animate when the modal is openned/closed. The option accepts milliseconds. The default value is 100.
   customBgColor: "#333",                     // In case the link have no background color to derive from you can set the background color of the modal here. The option accepts HEX, RGB, and RGBA The default value is "#333333".
   remoteUrl: false,                          //  You can define the remote URL here as well as the markup. The option accepts generic URL. The default value is false.
   elementAnimateIn: "scaleShow",             // Require Animate.css extension: You can define the element inside the modal its own entrance animation by putting the Animate.css class name here. The default value is the built-in scaleShow animation.
   elementAnimateOut: "scaleHide",            // Require Animate.css extension: You can define the element inside the modal its own exit animation by putting the Animate.css class name here. The default value is the built-in scaleHide animation.
   beforeAnimate: function(el, status) {},    // Callback function execute before the animation begins. Parameters available are el, and status which returns the jQuery object and the status of the animation, ie "open" will return when the animation is opening the modal, and vice versa, respectively. 
   afterAnimate: function(el, status) {},     // Callback function execute after the animation stops. Parameters available are el, and status which returns the jQuery object and the status of the animation, ie "close" will return when the animation is closing the modal, and vice versa, respectively. 
   
   // Deafult Ajax Parameters. See here for more info: http://api.jquery.com/jquery.ajax/
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
 });
````

## Callbacks
Here are callbacks available for you to play around with:


### beforeAnimate: function(el, status)
This callback function will be called right before the animation starts. Parameters returned are el which returns the jQuery object and  status which returns the status of the animation, ie "open" will be returned when the animation is opening the modal, and "close" will be returned when the animation is closing the modal

````javascript
  $(".am-remote-link").adaptiveModal({
    beforeAnimate: function(el, status) {
      ...
    }
  });
````

### afterAnimation: function(el,status)
This callback function will be called right after the animation stops. Parameters returned are el which returns the jQuery object and  status which returns the status of the animation, ie "open" will be returned when the animation is opening the modal, and "close" will be returned when the animation is closing the modal

````javascript
  $(".am-remote-link").adaptiveModal({
    afterAnimate: function(el, status) {
      ...
    }
  });
````

## Public Methods
You can call these methods to programmatically interact with the plugin:

### $.fn.openModal()

You can open the modal prgrapmatically by calling this function as shown below:

````javascript
  $(".am-remote-link").openModal()
````

### $.fn.closeModal()

You can close the modal programmatically by calling this function as shown below:

````javascript
  $(".am-remote-link").closeModal()
````

If you want to see more of my plugins, visit [The Pete Design](http://www.thepetedesign.com/#plugins), or follow me on [Twitter](http://www.twitter.com/peachananr) and [Github](http://www.github.com/peachananr).

## Other Resources
- Tutorial (Coming Soon)