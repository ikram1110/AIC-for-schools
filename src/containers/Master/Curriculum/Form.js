import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import { storeCurriculum, updateCurriculum } from '../../../services/curriculum'
import DefaultForm from '../../../components/DefaultForm'
import curriculumFields from './fields'
import callNotify from '../../../utils/notify'

const CurriculumForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)

  const [form] = Form.useForm()

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (mode === 'Tambah') {
          await storeCurriculum(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateCurriculum(itemEdit.id, values).then((res) => {
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
      name: itemEdit.name,
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
      title={mode + ' Data Kurikulum'}
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
      <DefaultForm form={form} fields={curriculumFields} onFinish={onFinish} />
    </Card>
  )
}

export default CurriculumForm
