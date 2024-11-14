
const $svg = "M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"
, $anchor = ["#","Content Text"]
, $anchorSvg = [...$anchor, [$svg]]
, $svgs = ['check-circle-fill', 'info-fill', 'exclamation-triangle-fill']
, $cls = "bi flex-shrink-0 me-2" // l'IA me dit que ces classes bootstrap sont inutiles

export {$svgs}
export function DefaultSvgPath(){ //Utilities_Features_svg
    return <path d={$svg} />
} 
export function SvgPaths({children,viewBox= "0 0 16 16",pathsArray,className,wh="24:24"}){ //Utilities_Features_svg
    // console.log(pathsArray)
    console.log(children);
    // Gestion plus robuste du parsing de wh
    const [width, height] = wh?.includes(":") 
    ? wh.split(":") 
    : [24, 24]; // Valeurs par défaut si le format n'est pas correct

    return <svg viewBox={viewBox} width={width} height={height} className={className}>{
        pathsArray?.map((pathItem,i) => typeof pathItem=="string"
            ? <path key={i} d={pathItem} />
            : Array.isArray(pathItem)
                ? <path key={i} {...pathItem[0]} d={pathItem[1]} />
                : pathItem instanceof Object 
                    ? Object.keys(pathItem).map((item,i) => {
                        switch(item){
                            case"rect":
                                return <rect key={i} {...pathItem[item].props} />
                            case"title":
                                return <title key={i} {...pathItem[item].props}>{pathItem[item].content}</title>
                            case"text":
                                return <text key={i} {...pathItem[item].props}>{pathItem[item].content}</text>
                            default:
                                return <rect key={i} {...pathItem[item].props} />
                        }
                    })
                    : <span>donnée svg incorrecte</span>
        ) 
        || children && children
        || <DefaultSvgPath />
    }</svg>
    return <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />
} 
export function LinkSvg({anchor=$anchorSvg,viewBox="0 0 24 24",}){
    return <a href={anchor[0]} >
        <SvgPaths viewBox={viewBox} pathsArray={anchor[2]}/>
        <span>{anchor[1]}</span>
    </a>
}

