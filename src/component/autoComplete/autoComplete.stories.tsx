import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import AutoComplete, {DataSourceType}  from './autoComplete'

interface userProps {
    login: string;
    url: string;
    avatar_url: string;
  }
const SimpleComplete = () => {
    const handleFetch = (query:string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
        .then(res =>res.json())
        .then(({items}) => {
            return items.slice(0,10).map((item:any) => ({value:item.login, ...item}))
        })
    }
    const renderOption = (item:DataSourceType) => {
        const data = item as DataSourceType<userProps>
        return (
            <div>{data.login}</div>     
        )
    }
    return (
        <AutoComplete 
            fetchSuggestions={handleFetch}
            onSelect={action('selected')}
            renderOption={renderOption}
        ></AutoComplete>
    )
}

storiesOf('AutoComplete component', module)
  .add('AutoComplete', SimpleComplete)