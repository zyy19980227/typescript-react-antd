import React, { FC } from 'react'
import classNames from 'classnames'
import Icon from '../icon/icon'

interface AlertProps {
    /**设置Alert的类型 */
    AlertType?: string;
    /**设置Alert的标题 */
    title?: string
    /**设置Alert的class */
    className?: string;
    /**设置Alert的内容 */
    text?: string;
    /**设置Alert的关闭按钮是否显示 */
    showclose?: boolean
}

const removeElement = () => {
    let e = (document.querySelector('#alertWrapper')) as Element
    document.body.removeChild(e)  
}
/**
 * 页面中最常用的弹框元素，适合用于信息提示。
 * ## 引用方法
 * ~~~js
 * import { alertFn } from 'jacksonUI'
 * <div onclick={alertFn(alertType:string, text:string, title:string)}>{children}</div>
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
    const {
        AlertType,
        title,
        className,
        text,
        showclose
    } = props
    const classes = classNames('alert', className,  AlertType)
    const closeClasses = classNames('close',{
        ['notshow']: showclose === false
    })
    if (title) {
        return (
            <span className={classes}>
                <div className='title'>{title}</div>
                <div className='text'>{text}</div>
                <div className={closeClasses} onClick={(e) => {e.preventDefault();removeElement()}}><Icon icon='times'></Icon></div>
            </span>
        )
    } else {
        return (
            <span className={classes}>
                <div className='text'>{text}</div>
                <div className={closeClasses} onClick={(e) => {e.preventDefault();removeElement()}}><Icon icon='times'></Icon></div>
            </span>
        )
    } 
}


Alert.defaultProps = {
    AlertType: 'success',
    text: 'this is a text',
    showclose: true
}

export default Alert