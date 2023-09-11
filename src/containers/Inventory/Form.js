import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import { storeInventory, updateInventory } from '../../services/inventory'
import DefaultFormImage from '../../components/DefaultFormImage'
import inventoryFields from './fields'
import callNotify from '../../utils/notify'

const InventoryForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)

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
        if (mode === 'Tambah') {
          await storeInventory(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateInventory(itemEdit.id, values).then((res) => {
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
      name: itemEdit.name,
      floor: itemEdit.floor,
      length: itemEdit.length,
      height: itemEdit.height,
      width: itemEdit.width,
      description: itemEdit.description,
      active: itemEdit.active,
    })
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
          fields={inventoryFields}
          onFinish={onFinish}
          imageName={'image'}
        />
      </div>
    </Card>
  )
}

export default InventoryForm
