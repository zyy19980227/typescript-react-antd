import React, { FC,ButtonHTMLAttributes,AnchorHTMLAttributes }  from 'react'
import classNames from 'classnames'

export type ButtonSize = 'lg' | 'sm'

export type BottonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    /**设置button的class */
    className?: string;
    /**设置button的禁用 */
    disabled?: boolean;
    /**设置button的尺寸 */
    size?: ButtonSize;
    /**设置button的类型 */
    btnType?: BottonType;
    children: React.ReactNode;
    /**设置link button的href */
    href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * 页面中最常用的按钮元素，适合于完成特定的交互。
 * ## 引用方法
 * ~~~js
 * import {Button} from 'jacksonUI'
 * ~~~
 */

export const Button: FC<ButtonProps> = (props) => {
    const {
        btnType,
        className,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    } else {
        return (
        <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button