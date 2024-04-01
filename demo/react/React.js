const createTextNode = (nodeValue) => {
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
    // create root filter
    const rootFiber = {
        sibling: null,
        return: null,
        child: el,
        dom: container,
        props: {
            children: [el]
        }
    }
    nextUnitOfWork = rootFiber

    requestIdleCallback(workLoop)
}
const React = {
    render,
    createElement,
    // createTextNode
}

function createDom(type) {

    const dom = type === "ELEMENT_TEXT" ?
        document.createTextNode('') :
        document.createElement(type)
    return dom
}

function handleProps(dom, props) {

    Object.keys(props).forEach((key) => {
        if (key === "children") {
            return
        }
        dom[key] = props[key]
    })
}



let nextUnitOfWork = null

function performUnitOfWork() {
    console.log(nextUnitOfWork)
    const { props, type } = nextUnitOfWork

    if (!nextUnitOfWork.dom) {
        const dom = createDom(type)
        nextUnitOfWork.dom = dom
        nextUnitOfWork.return.dom.append(dom)
    }


    // handle props

    handleProps(nextUnitOfWork.dom, props)

    // handle children
    const { children } = props
    let prevChild = null
    children.forEach((child, index) => {
        const newFiber = {
            return: nextUnitOfWork,
            child: null,
            sibling: null,
            type: child.type,
            props: child.props,
            dom: null,
        }
        if (index === 0) {
            nextUnitOfWork.child = newFiber
        } else {
            prevChild.sibling = newFiber
        }
        prevChild = newFiber
    })

    // return nextUnitOfWork
    /**
     * look for child first
     * if child is not null, return child
     * else look for sibling
     * if sibling is not null, return sibling
     * else look for parent
     * if parent's sibling is not null, return parent's sibling
     * until parent is null
     */

    if (nextUnitOfWork.child) {
        return nextUnitOfWork.child
    }
    if (nextUnitOfWork.sibling) {
        return nextUnitOfWork.sibling
    }

    let parent = nextUnitOfWork.return
    while (parent) {
        if (parent.sibling) {
            return parent.sibling
        }
        parent = parent.return
    }

    return null

}

function workLoop(deadline) {
    /**
     * if there is time remaining, isYield = false and nextUnitOfWork is not null, continue performUnitOfWork
     * else isYield = true, break the loop and stop to performUnitOfWork
     */
    let isYield = false
    // console.log(deadline.timeRemaining())
    while (!isYield && !!nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork()
        isYield = !(deadline.timeRemaining() > 0)
    }

    requestIdleCallback(workLoop)
}


export default React