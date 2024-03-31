const createTextNode = (nodeValue) => {
    debugger
    return {
        type: "ELEMENT_TEXT",
        props: {
            nodeValue,
            children: []
        }
    }
}
export const createElement = (type, props, ...children) => {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                return typeof child === "string" ? createTextNode(child) : child
            })
        }
    }
}
export const render = (el, container) => {
    console.log(el)
    const dom = el.type === "ELEMENT_TEXT" ?
        document.createTextNode('') :
        document.createElement(el.type)

    const { props } = el

    // handle props
    for (const key in props) {
        if (key !== "children") {
            dom[key] = props[key]
        }
    }

    // handle children
    const children = el.props?.children ?? [];
    children.forEach((child) => {
        render(child, dom);
    });


    container.append(dom)
}
const React = {
    render,
    createElement,
    // createTextNode
}
export default React