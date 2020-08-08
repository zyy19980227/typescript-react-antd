import React  from 'react'
import {render,RenderResult, fireEvent, cleanup, wait} from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem from  './menuitem'
import Submenu from './submenu'

const testProps: MenuProps = {
    defaultIndex:'0',
    onSelect: jest.fn(),
    className: 'test'
}
const testVerProps: MenuProps = {
    defaultIndex:'0',
    mode: 'vertical'
}
const generateMenu = (props:MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>xyz</MenuItem>
            <Submenu title='dropdown'>
                <MenuItem>drop1</MenuItem>
            </Submenu>
        </Menu>
    )
}
const creatStyleFile = () => {
    const cssFile: string = `
    .jackson-submenu {
        display: none
    }
    .jackson-submenu.menu-open {
        display: block
    }`
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}
let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement
describe('test menu and menuitem compent', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(creatStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct menu and menitem based on default props', ()=> {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('jackson-menu test')
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })
    it('click items should change active and call the right callback', ()=> {
        const thirdItem = wrapper.getByText('xyz')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })
    it('should render vertical mode when mode is set to vertical', ()=> {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when hover on submenu', async ()=> {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})