(function(){

    ;(window.parent ? [window.parent] : []).map(function(parent){
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

                var message =  {
                    type: 'iframe-broadcast'
                    ,eventType: k
                    ,error: k == 'error' ? e.message : undefined
                    ,stack: k == 'error' ? e.stack : undefined
                    ,shiftKey: e.shiftKey
                    ,metaKey: e.metaKey
                    ,keyCode: e.keyCode
                    ,value: e.value
                    ,checked: e.checked
                    ,selectedIndex: e.selectedIndex
                    ,target: e.target
                        ? {
                            id: e.target.id
                            ,className: e.target.className
                        }
                        : undefined
                    ,parent: e.target && e.target.parentNode
                        ? {
                            id: e.target.parentNode.id
                            ,className: e.target.parentNode.className
                        }
                        : undefined
                    ,coords: k == 'click'
                        ? {
                            page: { x: e.pageX, y: e.pageY },
                            layer: { x: e.layerX, y: e.layerY },
                            offset: { x: e.offsetX, y: e.offsetY }
                        }
                        : undefined
                }
                parent.postMessage(message, '*')
            })
        })
    })
    
})()