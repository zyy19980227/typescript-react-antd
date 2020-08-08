import React from 'react'
import ReactDOM from 'react-dom';
import Alert from './Alert'

export const alertFn = (AlertType: string, text: string,title?: string) => {
    if (!document.querySelector('#alertWrapper')) {
        let alert = <Alert AlertType={AlertType} text={text} title={title}></Alert>
        let div = document.createElement('div')
        document.body.appendChild(div)
        div.id = 'alertWrapper'
        ReactDOM.render(alert,div)
    } else {
        let div = document.querySelector('#alertWrapper') as Element
        document.body.removeChild(div)
        let alert = <div><Alert AlertType={AlertType} text={text} title={title}></Alert></div>
        let newdiv = document.createElement('div')
        document.body.appendChild(newdiv)
        newdiv.id = 'alertWrapper'
        ReactDOM.render(alert,newdiv)
    }
}