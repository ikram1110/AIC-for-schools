import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import {
  storeAcademicYear,
  updateAcademicYear,
} from '../../../services/academicyear'
import DefaultForm from '../../../components/DefaultForm'
import academicYearFields from './fields'
import callNotify from '../../../utils/notify'

const AcademicYearForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (mode === 'Tambah') {
          await storeAcademicYear(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateAcademicYear(itemEdit.id, values).then((res) => {
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
      title={mode + ' Data Tahun Akademik'}
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
      <DefaultForm
        form={form}
        fields={academicYearFields}
        onFinish={onFinish}
      />
    </Card>
  )
}

export default AcademicYearForm
