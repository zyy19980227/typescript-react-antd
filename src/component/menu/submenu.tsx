import React, { useContext, FunctionComponentElement, useState, FC } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuitem'
import Icon from '../icon/icon'
import Trs from '../transition/transition'

export interface SubMenuProps {
    /**设置Submenu的索引 */
    index?: string;
    /**设置Submenu的标题名 */
    title: string;
    /**设置Submenu的class */
    className?: string;
}

export const Submenu: FC<SubMenuProps> = ({index,title,children,className}) => {
    const context = useContext(MenuContext)
    const openSubmenu = context.defaultOpenSubmenu as Array<string>
    const isOpend = (index && context.mode === 'vertical') ? openSubmenu.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item submenu-item',className,{
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e:React.MouseEvent) => {
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e:React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
           setOpen(toggle) 
        }, 300);
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e:React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e:React.MouseEvent) => {handleMouse(e, false)}
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames('jackson-submenu', {
            'menu-open': menuOpen
        })
        const childrenComponent = React.Children.map(children,(child,i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'Menuitem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                })
            } else {
                console.error('warning: submenu has a child which is not a Menuitem component')
            }
        })
        return (
            <Trs in={menuOpen} timeout={300} animation='zoom-in-top'>
               <ul className={subMenuClasses}>{childrenComponent}</ul>
            </Trs>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
                <Icon icon='angle-down' className='arrow-icon'></Icon>
            </div>
            {renderChildren()}
        </li>
    )
}

Submenu.displayName = 'Submenu'

export default Submenu