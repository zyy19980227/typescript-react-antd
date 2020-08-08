import React from 'react'
import { storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './button'

const defaultButton = () => (
    <Button onClick={action('clicked')}>default button</Button>
)

const buttonWithSize = () => (
    <>
    <Button size='lg'>large button</Button>
    <Button size='sm'>small button</Button>
    </>
)

const buttonWithType = () => (
    <>
    <Button btnType='default'>default button</Button>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href='www.baidu.com'>link button</Button>
    </>
)

storiesOf('button component', module)
    .add('Button', defaultButton)
    .add('Button with different size', buttonWithSize)
    .add('Button with different type', buttonWithType)
