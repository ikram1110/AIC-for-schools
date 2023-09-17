import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import { storeInventory, updateInventory } from 'src/services/inventory'
import DefaultFormImage from 'src/components/DefaultFormImage'
import fields from './fields'
import callNotify from 'src/utils/notify'
import moment from 'moment'

const InventoryForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [changeImage, setChangeImage] = useState(false)
  const [uploadImage, setUploadImage] = useState([])

  const [form] = Form.useForm()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        let formData = new FormData()

        for (const key in values) {
          if (key === 'image') continue
          if (Object.hasOwnProperty.call(values, key)) {
            if (values[key] === undefined || values[key] === null) {
            } else {
              if (key === 'receiptDate')
                formData.append(key, moment(values[key]).format('YYYY-MM-DD'))
              else formData.append(key, values[key])
            }
          }
        }
        if (changeImage === true)
          if (imageUrl !== '')
            formData.append('image', uploadImage[0].originFileObj)
        if (mode === 'Tambah') {
          await storeInventory(formData).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateInventory(itemEdit.id, formData).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        }
      })
      .catch((err) => console.log(err))
  }

  const onReset = () => {
    form.resetFields()
  }

  const onFill = () => {
    form.setFieldsValue({
      code: itemEdit.code,
      idUnit: itemEdit.idUnit,
      name: itemEdit.name,
      description: itemEdit.description,
      condition: itemEdit.condition,
      quantity: itemEdit.quantity,
      source: itemEdit.source,
      receiptDate:
        itemEdit.receiptDate !== null
          ? moment(itemEdit.receiptDate)
          : itemEdit.receiptDate,
      responsiblePerson: itemEdit.responsiblePerson,
      image: itemEdit.image,
      capacity: itemEdit.capacity,
      length: itemEdit.length,
      height: itemEdit.height,
      width: itemEdit.width,
    })
    if (itemEdit.image !== null) {
      setImageUrl(
        process.env.REACT_APP_API_URL +
          '/public/images/inventory/' +
          itemEdit.image
      )
    }
    console.log(itemEdit.image)
  }

  useEffect(() => {
    onReset()
    if (mode === 'Edit') onFill()
    // eslint-disable-next-line
  }, [mode])

  return (
    <Card
      title={mode + ' Data Inventaris'}
      extra={
        <div className="action-card">
          <Button
            icon={<i className="ri-close-line"></i>}
            onClick={() => setMode('Data')}
          >
            Batal
          </Button>
          <Button
            type="primary"
            icon={<i className="ri-save-line"></i>}
            onClick={() => form.submit()}
            loading={loading}
          >
            Simpan
          </Button>
        </div>
      }
    >
      <div style={{ maxHeight: `calc(${vh}px - 240px)`, overflowY: 'scroll' }}>
        <DefaultFormImage
          form={form}
          fields={fields}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setChangeImage={setChangeImage}
          setUploadImage={setUploadImage}
          onFinish={onFinish}
          imageName={'image'}
        />
      </div>
    </Card>
  )
}

export default InventoryForm
