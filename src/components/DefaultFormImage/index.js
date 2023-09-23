import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Spin,
  Upload,
  notification,
} from 'antd'
import { useState } from 'react'

const DefaultFormImage = (props) => {
  const {
    form,
    fields,
    onFinish,
    imageUrl,
    setImageUrl,
    setUploadImage,
    setChangeImage,
    imageName,
    mode,
    readonly,
    withRef,
    nameRef,
  } = props

  const [loadingImg, setLoadingImg] = useState(false)
  const [notify, contextHolderNotify] = notification.useNotification()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notify.error({ message: 'You can only upload JPG/PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notify.error({ message: 'Image must smaller than 2MB!' })
    }
    return isJpgOrPng && isLt2M
  }

  const handleChange = (info) => {
    setLoadingImg(true)
    setUploadImage(info.fileList)
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url)
      setChangeImage(true)
      setLoadingImg(false)
    })
  }

  const uploadButton = (
    <div>
      {loadingImg ? <Spin size="small" /> : <i className="ri-add-line"></i>}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      layout="horizontal"
      onFinish={onFinish}
    >
      {contextHolderNotify}
      <div className="form-with-image">
        <div className="left">
          {fields.map((item) => {
            if (item.type === 'password' && mode === 'Edit') {
              return <></>
            } else
              return (
                <div key={item.name}>
                  {imageName !== item.name ? (
                    <Form.Item
                      key={item.name}
                      label={item.label}
                      name={
                        item.idInput === undefined ? item.name : item.idInput
                      }
                      rules={
                        item.require
                          ? [
                              {
                                required: true,
                                message: `Mohon masukan ${item.label}!`,
                              },
                            ]
                          : null
                      }
                    >
                      {item.type === 'input' ? (
                        <Input
                          readOnly={readonly ?? false}
                          ref={
                            nameRef !== undefined && item.name === nameRef
                              ? withRef
                              : null
                          }
                        />
                      ) : item.type === 'number' ? (
                        <InputNumber
                          style={{ width: '100%' }}
                          readOnly={readonly ?? false}
                          controls={item.controlNumber ?? true}
                        />
                      ) : item.type === 'password' ? (
                        <Input.Password />
                      ) : item.type === 'select' ? (
                        <Select options={item.inputItems} />
                      ) : item.type === 'radio' ? (
                        <Radio.Group>
                          {item.inputItems.map((rItem) => {
                            return (
                              <Radio key={rItem.value} value={rItem.value}>
                                {' '}
                                {rItem.label}{' '}
                              </Radio>
                            )
                          })}
                        </Radio.Group>
                      ) : item.type === 'date' ? (
                        <DatePicker style={{ width: '100%' }} />
                      ) : item.type === 'image' ? (
                        <Input type="file" />
                      ) : (
                        <></>
                      )}
                    </Form.Item>
                  ) : (
                    <></>
                  )}
                </div>
              )
          })}
        </div>
        <div className="right">
          <div className="wrap-image">
            <Upload
              accept="image/png, image/jpeg"
              name="image"
              listType="picture-card"
              className="image-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              maxCount={1}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="img-right"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '4px',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </div>
        </div>
      </div>
    </Form>
  )
}
export default DefaultFormImage
