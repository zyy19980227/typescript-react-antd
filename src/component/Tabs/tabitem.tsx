import React, { useContext, FC }  from 'react'
import classNames from 'classnames'
import { TabContext } from './tab'

export interface TabItemProps {
    /**设置Tabitem的index */
    index?: number;
    /**设置Tabitem是否可以被点击 */
    disabled?: boolean;
    /**设置Tabitem的class */
    className?: string;
    /**设置Tabitem的样式 */
    style?: React.CSSProperties;
    /**设置Tabitem的标签名 */
    label: string
}

export const Tabitem: FC<TabItemProps> = (props) => {
    const { index, disabled, className, style, children, label} = props
    const context = useContext(TabContext)
    const titleclasses = classNames('title', className,{
        'is-disabled': disabled,
        'is-active': context.index === index,
    })
    const contentclasses = classNames('content', className,{
        'show': context.index === index,
        'not-show': context.index !== index,
    })
    const handelClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index)
        }
    }
    return (
        <div className='tabitem-wrapper' style= {style} >
            <div className={titleclasses} onClick={handelClick}>{label}</div>
            <div className={contentclasses}>{children}</div>
        </div>
    )
}

Tabitem.displayName = 'Tabitem'

export default Tabitem