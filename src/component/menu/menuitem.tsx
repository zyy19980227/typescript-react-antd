import React, { useContext, FC}  from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    /**设置Menuitem的索引 */
    index?: string;
    /**设置Menuitem是否可被点击 */
    disabled?: boolean;
    /**设置Menuitem的class */
    className?: string;
    /**设置Menuitem的样式 */
    style?: React.CSSProperties;
}

export const Menuitem: FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children} = props
    // 获取从父元素中定义的context对象，context包含index和onSelect两个属性
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className,{
        'is-disabled': disabled,
        'is-active': context.index === index
    })
    const handelClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index)
        }
    }
    return (
        <li className={classes} style= {style} onClick={handelClick}>{children}</li>
    )
}

Menuitem.displayName = 'Menuitem'

export default Menuitem