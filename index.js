(function(){

    var parent = window.parent ? [window.parent] : []
        
    var messageFrom = {
        event: function messageFromEvent(e){
            return {
                type: 'iframe-broadcast'
            }
        },

        element: function messageFromElementEvent(e){
            return Object.assign(
                messageFrom.event(e), {
                    target: { 
                        id: e.target.id, 
                        className: e.target.className,  
                    },
                    parent: 
                        e.target.parentNode != null
                        ? {
                            id:e.target.parentNode.id,
                            className: e.target.parentNode.className
                        }
                        : null
                }
    
            )
        },

        click: function messageFromClickEvent(e){
            return Object.assign(
                messageFrom.element(e), {
                    eventType: 'click',
                    coords: {
                      page: { x: e.pageX, y: e.pageY },
                      layer: { x: e.layerX, y: e.layerY },
                      offset: { x: e.offsetX, y: e.offsetY }
                    }
                }
            )
        },

        keydown: function messageFromKeyEvent(e){
            return Object.assign(
                messageFrom.element(e), {
                    eventType: 'keydown',
                    keyCode: e.keyCode,
                    shiftKey: e.shiftKey,
                    meta: e.meta
                }
            )
        },
        
        error: function messageFromErrorEvent(e){
            return Object.assign(
                messageFrom.element(e), {
                    eventType: 'error',
                    error: e.message,
                    stack: e.stack
                }
            )
        }
    }

    parent.map(function(parent){
        [ 'error'
        , 'click'
        , 'keydown'
        , 'focus'
        , 'blur'
        , 'submit'
        , 'drop'
        , 'play'
        , 'change'
        , 'input'
        , 'abort'
        , 'timeout'
        , 'progress'
        , 'loadstart'
        , 'loadend'
        , 'load'
        ]
        .forEach(function(k){
            window.addEventListener(k, function(e){
                var message = 
                    messageFrom[k](e)
                    || messageFrom.element(e)
                parent.postMessage(message, '*')
            })
        })
    })
    
})()