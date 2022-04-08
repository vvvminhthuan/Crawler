import React, {useEffect, useState, useRef} from 'react'

type initProps = {
    title: string,
    classBody?: string,
    modalsID: string,
    option?: {
        isClose?: boolean,
        width?: number,
        heigth?: number,
    }
    onOpen?: Function,
    onClose?: Function
}

const Modals : React.FC<initProps> = ({children, title, modalsID, option={}, onOpen, onClose}) =>{
    option.width = option ? option.width ?? 600 : 600
    option.heigth = option ? option.heigth ?? 400 : 400
    option.isClose = option ? option.isClose ?? true : true
    const [status, setStatus] = useState('hidden')
   
    useEffect(()=>{
        const element = document.querySelectorAll(`[data-modals="${modalsID}"]`)
        element[0]?.addEventListener('click', function () {
            setTimeout(()=>{
                if (onOpen) {
                    onOpen()
                }
                show()
            },300)
        })
        window.addEventListener('click', function (event) {
            const element = document.elementFromPoint(event.clientX, event.clientY)
            if (element.id == modalsID) {
                close()
            }
        })
        return ()=>{
            element[0]?.removeEventListener('click', function () {
                setTimeout(()=>{
                    if (onOpen) {
                        onOpen()
                    }
                    show()
                },300)
            })
            window.addEventListener('click', function (event) {
                const element = document.elementFromPoint(event.clientX, event.clientY)
                if (element.id == modalsID) {
                    close()
                }
            })
        }
    },[])

    const show = () => {
        setStatus('show')
    }

    const close = () => {
        if (onClose) {
            onClose()
        }
        setStatus('hidden')
    }

    let htmlClose = option.isClose ? (<div className="modal-close" onClick={close}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>) : null
    return (
        <div className={`xda-modals ${status}`} id={modalsID}>
            <div className="xda-modals-content" style={{width: option.width, height: option.heigth}}>
                <div className="modal-header flex-r">
                    <div className="modal-title">
                        {title}
                    </div>
                    {htmlClose}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modals