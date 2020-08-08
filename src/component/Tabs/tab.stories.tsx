import React from 'react'
import { storiesOf} from '@storybook/react'
import Tab from './tab'
import Tabitem from './tabitem'

const tab = () => (
    <Tab>
        <Tabitem label='this is label 1'>这是一段长长的内容这是一段长长的内容</Tabitem>
        <Tabitem label='this is label 2'>这是一段短短的内容</Tabitem>
        <Tabitem label='this is a disabled label' disabled></Tabitem>
    </Tab>
)

storiesOf('tab component', module)
    .add('Tab', tab)