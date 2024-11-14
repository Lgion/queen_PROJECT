
const handleEditorClick = e => {
    e.target.contentEditable = true
}
const handleEditorBlur = (e,editorProps) => {
    const {$,setter,dataKey,dataComponentKey,dataMain,fn} = editorProps

    // $?.[dataMain]?.[dataKey] = fn()
    // if ($ && $[dataMain] && $[dataMain][dataKey] && $[dataMain][dataKey][dataComponentKey]) 

    if ($ && $[dataMain]){
        if(typeof dataComponentKey == 'undefined'){
            $[dataMain][dataKey] = fn();
        }
        if(typeof dataComponentKey == 'string'){
            if ($[dataMain][dataKey] && $[dataMain][dataKey][dataComponentKey]) 
                $[dataMain][dataKey][dataComponentKey] = fn();
            else{
                alert('warning in "handleEditorBlur": valeur "dataComponentKey" n\'existe pas dans $[dataMain][dataKey]')
                // $[dataMain][dataKey] = fn();
            }
        }
        if(Array.isArray(dataComponentKey)){
            // CE CAS NE ME SEMBLE POUR L'INSTANT JAMAIS UTILE
        }
    }
    setter(prev => ({
        [dataMain]: {
            ...{...prev[dataMain]}
            , ...{...$[dataMain]}
        }
    }))
    
}
const adminProps = editorProps => ({
    onClick:handleEditorClick
    , onBlur:e => {
        console.log(editorProps);
        handleEditorBlur(e,editorProps)
    }
})

export {adminProps}