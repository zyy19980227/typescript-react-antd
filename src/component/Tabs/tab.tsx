import React, { createContext, useState, FC }  from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabitem'

type SelectCallback = (selectedIndex: number) => void

export interface TabProps {
    /**设置Tab第一项的默认索引 */
    defaultIndex?: number;
    /**设置Tab的class */
    className?:string;
    /**设置Tab的回调函数，获取index值 */
    onSelect?: (selectedIndex: number) => void;
    /**设置Tab的样式 */
    style?: React.CSSProperties;
}

interface ITabContext {
    index: number;
    onSelect?: SelectCallback;
}
export const TabContext = createContext<ITabContext>({index:0})

/**
 * 为网站内容分类展示的标签。
 * ## 引用方法
 * ~~~js
 * import { Tab } from 'jacksonUI'
 * ~~~
 */
export const Tab: FC<TabProps> = (props) => {
    const { className, children, defaultIndex, style, onSelect} = props
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('tabs', className)
    const handleClick = (index:number) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: ITabContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
    }
    const renderChildren = () => {
        return React.Children.map(children,(child,index) => {
            const childElement = child as React.FunctionComponentElement<TabItemProps>
            const {displayName} = childElement.type
            if (displayName === 'Tabitem') {
               return React.cloneElement(childElement, {index})
            } else {
                console.error('warning: Tab has a child which is not a tabitem component')
            }
        })
    }
    return (
        // 通过标签包裹子元素，将passedContext传递给子元素
        <span className={classes} data-testid='test-tab' style={style}>
            <TabContext.Provider value={passedContext}>{renderChildren()}</TabContext.Provider>
        </span>
    )
}

Tab.defaultProps = {
    defaultIndex: 0
}

export default Tab