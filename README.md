
### createElement

* element => virtual
* createElement   type props children
* createTextNode 

### Reconcilers

* render
    * create dom (append dom)
    * update props
    * update children

* requestIdleCallback
    * 浏览器空闲时执行
    * execute nextUnitOfWork
    * nextUnitOfWork is fiber
    * fiber is a linked list, which has child, sibling, return.
    * create root fiber in render func
        * props
        * type
        * child
        * sibling
        * return
        * dom

