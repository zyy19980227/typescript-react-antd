import React from 'react'
import { storiesOf} from '@storybook/react'
import Icon from './icon'

const icon = () => (
    <Icon icon='coffee' size='5x'></Icon>
)

const iconThemes = () => (
    <>
        <Icon icon='coffee' size='5x' theme='danger'></Icon>
        <Icon icon='coffee' size='5x' theme='dark'></Icon>
        <Icon icon='coffee' size='5x' theme='info'></Icon>
        <Icon icon='coffee' size='5x' theme='primary'></Icon>
        <Icon icon='coffee' size='5x' theme='secondary'></Icon>
        <Icon icon='coffee' size='5x' theme='success'></Icon>
        <Icon icon='coffee' size='5x' theme='warning'></Icon>
        <Icon icon='coffee' size='5x' theme='light'></Icon>
    </>
)

const iconSize = () => (
    <>
        <Icon icon='coffee' size='1x'></Icon>
        <Icon icon='coffee' size='2x'></Icon>
        <Icon icon='coffee' size='3x'></Icon>
        <Icon icon='coffee' size='4x'></Icon>
        <Icon icon='coffee' size='5x'></Icon>
    </>
)

storiesOf('icon component', module)
    .add('Icon', icon)
    .add('icon with different theme',iconThemes)
    .add('icon with different size',iconSize)