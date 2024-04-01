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
     * 先找儿子
     * 没有儿子 找兄弟
     * 没有兄弟 返回父亲 找父亲的兄弟
     * 父亲没有兄弟 继续返回父亲的父亲
     * until null
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
    // 执行工作单元
    // 1. 执行当前工作单元
    // 2. 判断当前工作单元是否还有剩余工作
    // 3. 如果有剩余工作，则继续执行下一个工作单元

    let isYield = false
    // console.log(deadline.timeRemaining())
    while (!isYield && !!nextUnitOfWork) {
        nextUnitOfWork = performUnitOfWork()
        isYield = !(deadline.timeRemaining() > 0)
    }

    requestIdleCallback(workLoop)
}


export default React