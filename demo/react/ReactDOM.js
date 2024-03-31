import { render } from "./React"


const ReactDOM = {
    createRoot(container) {
        return {
            render(el) {
                render(el, container)
            }
        }
    }
}

export default ReactDOM