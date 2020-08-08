import React, { createContext, useState, FC }  from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuitem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void

export interface MenuProps {
    /**设置Menu第一项的默认索引 */
    defaultIndex?: string;
    /**设置Menu的class */
    className?:string;
    /**设置Menu的模式为横向或纵向 */
    mode?: MenuMode;
    /**设置Menu的自定义样式 */
    style?: React.CSSProperties;
    /**设置Menu的回调函数，获取index值 */
    onSelect?: (selectedIndex: string) => void;
    /**设置Menu的下拉菜单是否默认打开 */
    defaultOpenSubmenu?: string[]
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubmenu?: string[]
}

export const MenuContext = createContext<IMenuContext>({index:'0'})

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ## 引用方法
 * ~~~js
 * import { Menu } from 'jacksonUI'
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubmenu} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('jackson-menu', className,{
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })
    const handleClick = (index:string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubmenu
    }
    const renderChildren = () => {
        return React.Children.map(children,(child,index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if (displayName === 'Menuitem' || displayName === 'Submenu') {
               return React.cloneElement(childElement, {index:index.toString()})
            } else {
                console.error('warning: Menu has a child which is not a Menuitem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid='test-menu'>
            <MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubmenu: []
}

export default Menu