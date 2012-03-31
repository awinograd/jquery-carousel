Hey! This project is a carousel jQuery plugin. However, rather than a "featured-image" type carousel, this is the type of carousel that lets your scroll through a list of items.

The carousel is implemented using solely jQuery and CSS. There are no images. The provided CSS can serve as a finished product or a boilerplate for customization. There are some styles that are required to not look broken, but many are just there for extra aesthetics.

All you have to do in order to use it is link to the js and css files as you normally would and call:

```
  $(element_containing_carousel_members).Carousel();
```

There are some options that you can use to change some behaviors.

```
  bounce: true/false // en/disables the bouncy effect if user tries to scroll past an end
  wrap: true/false   // en/disables wrap behavior (scrolling past one end jumps to the other, overrides 'bounce')
```

I hope you enjoy using my plugin! Shoot me a message if you're using/enjoying it. And feel free to fork / suggest changes!
awinograd