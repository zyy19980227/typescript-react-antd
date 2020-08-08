import React from 'react'
import { storiesOf } from '@storybook/react'
import Menu from './menu'
import Menuitem from './menuitem'
import Submenu from './submenu'

const horizontalMenu = () => (
    <Menu>
        <Menuitem>cool link</Menuitem>
        <Menuitem disabled>cool link2</Menuitem>
        <Menuitem>cool link3</Menuitem>
    </Menu>
)

const verticalMenu = () => (
    <Menu mode='vertical'>
        <Menuitem>cool link</Menuitem>
        <Menuitem disabled>cool link2</Menuitem>
        <Menuitem>cool link3</Menuitem>
    </Menu>
)

const horizontalMenu1 = () => (
    <Menu>
        <Menuitem>cool link</Menuitem>
        <Menuitem disabled>cool link2</Menuitem>
        <Submenu title='dropdown'>
        <Menuitem>dropdown1</Menuitem>
        <Menuitem>dropdown2</Menuitem>
        </Submenu>
        <Menuitem>cool link3</Menuitem>
    </Menu>
)

const verticalMenu1 = () => (
    <Menu mode='vertical'>
        <Menuitem>cool link</Menuitem>
        <Menuitem disabled>cool link2</Menuitem>
        <Submenu title='dropdown'>
        <Menuitem>dropdown1</Menuitem>
        <Menuitem>dropdown2</Menuitem>
        </Submenu>
        <Menuitem>cool link3</Menuitem>
    </Menu>
)

storiesOf('menu component', module)
    .add('Menu', horizontalMenu)
    .add('vertican Menu', verticalMenu)
    .add('horizontal Menu with Submenu', horizontalMenu1)
    .add('vertical Menu with Submenu', verticalMenu1)