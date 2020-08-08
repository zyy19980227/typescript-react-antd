import React from 'react'
import { storiesOf} from '@storybook/react'
import {alertFn} from './alertFn'
import AlertComponent from './Alert'

const alertButton1 = () => (
    <button onClick={() => alertFn('success', 'this is a success message', 'success title')}>点我弹出弹框</button>
)
const alertButton2 = () => (
    <button onClick={() => alertFn('warning', 'this is a warning message')}>点我弹出弹框</button>
)

const Alert = () => (
    <AlertComponent AlertType='danger' title='danger title' text='this is a danger message' showclose={false}></AlertComponent>
)

storiesOf('alert component', module)
    .add('Alert', Alert)
    .add('alert Button with title', alertButton1)
    .add('alert Button without title', alertButton2)