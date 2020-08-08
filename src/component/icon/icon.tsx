import React, { FC } from 'react'
import classNames from 'classnames'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(fas)

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    /**设置Icon的主题 */
    theme?: ThemeProps
}
/**
 * 为网站提供各种图标，图标可自定义主题。
 * ## 引用方法
 * ~~~js
 * import { Icon } from 'jacksonUI'
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
    const { className, theme, ...restProps} = props
    const classes = classNames('jackson-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (
        <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
    )
}

export default Icon