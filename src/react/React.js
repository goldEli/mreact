
const handleChildren = (children) => {
    return Array.isArray(children) ? children : [children]
}
const createElementText = (nodeValue) => {
    return {
        type: "ELEMENT_TEXT",
        props: {
            nodeValue,
            children: []
        }
    }
}

// const createElement = (el) => {
//     const children = typeof children === "string" ? [el.children] : el.children
//     return {
//         type: "ELEMENT",
//         props: {
//             ...el.props,
//             children
//         }
//     }
// }
export const render = (el, container) => {
    const dom = el.type === "ELEMENT_TEXT" ?
        document.createTextNode('') :
        document.createElement(el.type)

    const children = handleChildren(el.props.children)
    const { props } = el

    // handle props
    for (const key in props) {
        if (key !== "children") {
            dom[key] = props[key]
        }
    }

    // handle children
    for (const child of children) {
        if (typeof child === 'string') {
            render(createElementText(child), container)
            continue
        }
        render(child, container)
    }


    container.append(dom)
}
