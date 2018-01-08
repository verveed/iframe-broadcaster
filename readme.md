iframe-broadcaster
------------------

Why?
----

There's occasions where you may want to allow consumers of your embed to listen for events within your frame.

This module was designed to facilitate interactive tours of 3rd party systems.

Quick Start
-----------

In your child frame add the following script tag.

```html
<script src="https://unpkg.com/iframe-broadcaster@0.9.0/iframe-broadcaster.min.js"></script>
```

In your parent window add the following integration code.

```html
<script>
window.addEventListener('message', function(e){
    const valid = 
        e.origin == "expected-child-domain.com"
        && e.data 
        && e.data.type == 'iframe-broadcast'

    if( valid ){
        console.log( e.data )
    }
})
</script>
```

Live Demo
---------

[Glitch Playground](https://verveed-iframe-parent.glitch.me/)

Data Structure
--------------

#### e.data.eventType

A string indicating what type of event triggered the message to be sent.

Valid values:

- `'error'`
- `'click'`
- `'keydown'`
- `'focus'`
- `'blur'`
- `'submit'`
- `'drop'`
- `'play'`
- `'change'`
- `'input'`
- `'abort'`
- `'timeout'`
- `'progress'`
- `'loadstart'`
- `'loadend'`
- `'load'`

#### e.data.target.id

The HTML id attribute of the target element.


#### e.data.target.className

The HTML className attribute of the target element.

#### e.data.parent.id

The HTML id attribute of the target element's parent node.


#### e.data.target.className

The HTML id attribute of the target element's parent node.

#### e.data.coords

> For mouse events only

Contains a hash of `{ x:number, y:number }` objects for `layer`, `offset` and `page`.

Example: 

```js
// e.data.coords
{
    layer: { x:0, y: 0 }
    offset: { x:y, y: 0 }
    page: { x:y, y: 0 }
}
```


#### e.data.keyCode

> For keyboard events only

Used to identify which key was pressed in the child iframe.


#### e.data.shiftKey

> For keyboard events only

Used to identify if the shift key was active when the key event fired.


#### e.data.metaKey

> For keyboard events only

Used to identify if the meta key was active when the key event fired.


#### e.data.error

> For error events only

The error message that was fired in the child iframe context.


#### e.data.stack

> For error events only

The stack at the time an error fired in the child iframe context.

Future Work
-----------

Allow the parent and the child to opt-in / request to which events they want to broadcast.