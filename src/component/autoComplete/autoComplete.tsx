import React, {FC, useState, ChangeEvent, KeyboardEvent, ReactElement,useEffect, useRef} from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../input/input'
import Icon from '../icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Transition from '../transition/transition'

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str:string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item:DataSourceType) =>void;
    renderOption?: (item:DataSourceType) => ReactElement
}
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = DataSourceObject & T

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps} = props
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [ showDropdown, setShowDropdown] = useState(false)
    const [loading, setloading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    const debounceValue = useDebounce(inputValue, 500)
    useClickOutside(componentRef,() => {
        setSuggestions([])
    })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            const results = fetchSuggestions(debounceValue)
            if (results instanceof Promise) {
                setloading(true)
                results.then(data => {
                    setloading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                })
            } else {
               setSuggestions(results)
               setShowDropdown(true)
               if (results.length > 0) {
                setShowDropdown(true)
               }
            }
        } else {
            setShowDropdown(false)
        }
        setHighlightIndex(-1)
    },[debounceValue])
    const highlight = (index:number) => {
        if (index < 0) {index = 0}
        if (index >= suggestions.length) {
            index = suggestions.length -1
        }
        setHighlightIndex(index)
    }
    const handleKeydown = (e:KeyboardEvent<HTMLInputElement>) => {
        switch(e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                   handleSelect(suggestions[highlightIndex]) 
                }
                break
            case 38:
                highlight(highlightIndex - 1)
                break
            case 40:
                highlight(highlightIndex + 1)
                break
            case 27:
                setShowDropdown(false)
                break
            default:
                break       
        }
    }
    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }
    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        setShowDropdown(false)
        if (onSelect) {
            onSelect(item)
        }
        triggerSearch.current = false
    }
    const renderTemplate = (item:DataSourceType) => {
        return renderOption ? renderOption(item) : item.value
    }
    const generateDropdown = () => {
        return (
            <Transition in={showDropdown || loading} animation='zoom-in-top' timeout={300} onExited={() => {setSuggestions([])}}>
                <ul className='suggestion-list'>
                    {loading && <div className="suggstions-loading-icon"><Icon icon='spinner' spin></Icon></div>}
                    {suggestions.map((item,index) => {
                        const cnames = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li key={index} className={cnames} onClick={()=>handleSelect(item)}>{renderTemplate(item)}</li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }
    return (
        <div className="auto-complete" ref={componentRef}>
            <Input 
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeydown}
                {...restProps}
            />
            { (suggestions.length > 0) && generateDropdown()}
        </div>
    )
}

export default AutoComplete