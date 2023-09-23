import { Button, Card, Form } from 'antd'
import fields from './fields'
import { useEffect, useState } from 'react'
import DefaultForm from 'src/components/DefaultForm'
import {
  storeStudentParent,
  updateStudentParent,
} from 'src/services/studentparent'
import callNotify from 'src/utils/notify'

const StudentParentForm = (props) => {
  const { mode, setMode, getData, itemEdit, idStudent, notify } = props
  const [loading, setLoading] = useState(false)
  const [noData, setNoData] = useState(false)

  const [form] = Form.useForm()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  const onFinish = (values) => {
    values.idStudent = idStudent
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        console.log(noData)
        if (noData) {
          await storeStudentParent(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateStudentParent(itemEdit.id, values).then((res) => {
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
    console.log(noData)
    console.log(itemEdit)
    if (itemEdit === undefined) setNoData(true)
    form.setFieldsValue({
      fatherName: itemEdit?.fatherName ?? '',
      fatherBirthYear: itemEdit?.fatherBirthYear ?? null,
      fatherLastEducation: itemEdit?.fatherLastEducation ?? null,
      fatherOccupation: itemEdit?.fatherOccupation ?? null,
      fatherIncome: itemEdit?.fatherIncome ?? null,
      fatherPhone: itemEdit?.fatherPhone ?? null,
      motherName: itemEdit?.motherName ?? '',
      motherBirthYear: itemEdit?.motherBirthYear ?? null,
      motherLastEducation: itemEdit?.motherLastEducation ?? null,
      motherOccupation: itemEdit?.motherOccupation ?? null,
      motherIncome: itemEdit?.motherIncome ?? null,
      motherPhone: itemEdit?.motherPhone ?? null,
      guardName: itemEdit?.guardName ?? null,
      guardBirthYear: itemEdit?.guardBirthYear ?? null,
      guardLastEducation: itemEdit?.guardLastEducation ?? null,
      guardOccupation: itemEdit?.guardOccupation ?? null,
      guardIncome: itemEdit?.guardIncome ?? null,
      guardPhone: itemEdit?.guardPhone ?? null,
    })
  }

  useEffect(() => {
    onReset()
    if (mode === 'EditParent') onFill()
    // eslint-disable-next-line
  }, [mode])

  return (
    <Card
      title={'Edit Data Orang Tua Siswa'}
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
        <DefaultForm form={form} fields={fields} onFinish={onFinish} />
      </div>
    </Card>
  )
}

export default StudentParentForm
