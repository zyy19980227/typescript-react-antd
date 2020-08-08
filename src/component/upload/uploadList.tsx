import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../icon/icon'
import Progress from '../progress/progress'

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void
}

export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props
    return (
        <ul className='upload-list'>
            {fileList.map(item => {
                return (
                    <div className='upload-list-item' key={item.uid}>
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon='file-alt' theme='secondary' />
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" theme="primary" spin />}
                            {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                            {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={() => { onRemove(item)}}/>
                        </span>
                        {item.status === 'uploading' && <Progress percent={item.percent || 0} />}
                    </div>
                )
            })}
        </ul>
    )
}

export default UploadList