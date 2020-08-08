import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import Dragger from './dragger'
import UploadList from './uploadList'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadProps {
    /**请求的后端接口 */
    action: string;
    /**默认的传输列表 */
    defaultFileList?: UploadFile[];
    /**上传前需要执行的函数 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /**上传过程中执行的函数 */
    onProgress?: (percentage: number, file:File) => void;
    /**上传成功后执行的函数 */
    onSuccess?: (data:any, file:File) => void;
    /**上传失败后执行的函数 */
    onError?: (err:any, file:File) => void;
    /**上传成功或失败后都需要执行的函数 */
    onChange?: (file: File) => void;
    /**删除上传文件后执行的函数 */
    onRemove?: (file: UploadFile) => void;
    /**添加自定义header */
    headers?: {[key:string]: any};
    /**添加自定义name */
    name?: string;
    /**添加自定义post formData */
    data?: {[key:string]: any};
    /**发送时是否携带cookie */
    withCredentials?: boolean;
    /**添加input的accept属性，限制上传文件类型 */
    accept?: string;
    /**添加input的multiple属性，是否允许一次上传多个文件 */
    multiple?: boolean;
    /**是否允许拖动上传 */
    drag?: boolean;
}

export interface UploadFile {
    // 文件的uid
    uid:string;
    // 文件的大小
    size: number;
    // 文件名
    name: string;
    // 文件的上传状态
    status?: UploadFileStatus
    // 文件的上传进度百分比
    percent?: number
    // 源文件
    raw?: File;
    // 请求接口后返回的数据
    responce?: any;
    // 请求接口后返回的错误
    error?: any;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        name,
        headers,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj}
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files) {
            return
        }
        uploadFiles(files)
        if(fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
               post(file) 
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }
    const post = (file: File) => { 
        let _file: UploadFile = {
            uid: Date.now() + 'upload_file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        //setFileList([_file, ...fileList])
        setFileList(prevList => {
            return [_file, ...prevList]
        })
        const formdata = new FormData()
        formdata.append(name || 'file', file)
        if (data) {
            Object.keys(data).forEach(key => {
                formdata.append(key, data[key])
            })
        }
        axios.post(action,formdata, {
            headers:{
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                let percentage = Math.round((e.loaded * 100) / e.total) || 0
                if (percentage < 100) {
                    updateFileList(_file, {percent: percentage, status: 'uploading'})
                    if (onProgress) {
                        onProgress(percentage,file)
                    }
                }
            }
        }).then((res) => {
            updateFileList(_file, {status: 'success', responce: res.data})
            if (onSuccess) {
                onSuccess(res.data, file)
            }
            if (onChange) {
                onChange(file)
            }
        }).catch((err) => {
            console.error(err)
            updateFileList(_file, {status: 'error', error: err})
            if (onError) {
                onError(err, file)
            }
            if (onChange) {
                onChange(file)
            }
        })
    }
    return (
        <div className="upload-component">
            <div className="upload-input" onClick={handleClick}>
                {drag ? <Dragger onFile={(files) => {uploadFiles(files)}}>{children}</Dragger> : children }
                <input 
                    className='file-input'
                    style={{display:'none'}}
                    type='file'
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                /> 
            </div>
            
            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div>
    )
}

Upload.defaultProps = {
    name: 'file'
}

export default Upload