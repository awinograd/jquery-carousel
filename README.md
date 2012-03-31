Hey! This project is a carousel jQuery plugin. However, rather than a "featured-image" type carousel, this is the type of carousel that lets your scroll through a list of items.

The carousel is implemented using solely jQuery and CSS. There are no images. The provided CSS can serve as a finished product or a boilerplate for customization. There are some styles that are required to not look broken, but many are just there for extra aesthetics.

All you have to do in order to use it is link to the js and css files as you normally would and call:

```
  $(element_containing_carousel_members).Carousel();
```

There are some options that you can use to change some behaviors.

```
$(element_containing_carousel_members).Carousel({
  duration: integer   // defaults to 150. Duration of the scrolling animation in milliseconds
  direction: 1/-1,    // defaults to 1. -1 will change the directions which the arrows scroll the carousel
  outerClass: string, // defaults to ''. Adds a class to the outer element that wraps around the element on which Carousel() is called
  bounce: true/false, // defaults to true. en/disables the bouncy effect if user tries to scroll past an end
  wrap: true/false    // defaults to false. en/disables wrap behavior (scrolling past one end jumps to the other, overrides 'bounce')
  });
```

I hope you enjoy using my plugin! Shoot me a message if you're using/enjoying it. And feel free to fork / suggest changes!