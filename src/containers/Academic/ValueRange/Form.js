import { Button, Card, Form, Input, InputNumber, Select, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { getAllClassroomByUnit } from 'src/services/classroom'
import { getAllUnit } from 'src/services/unit'
import { storeValueRange, updateValueRange } from 'src/services/valuerange'
import callNotify from 'src/utils/notify'

const ValueRangeForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [loadingUnit, setLoadingUnit] = useState(false)
  const [loadingClassroom, setLoadingClassroom] = useState(false)
  const [unit, setUnit] = useState([])
  const [classroom, setClassroom] = useState([])

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
          await storeValueRange(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateValueRange(itemEdit.id, values).then((res) => {
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
    setLoadingUnit(true)
    setLoadingClassroom(true)
    form.setFieldsValue({
      idUnit: itemEdit.idUnit,
      idClassroom: itemEdit.idClassroom,
      from: itemEdit.from,
      to: itemEdit.to,
      grade: itemEdit.grade,
      description: itemEdit.description,
    })
    unitOnChange(itemEdit.idUnit)
  }

  useEffect(() => {
    setLoadingClassroom(false)
  }, [classroom])

  useEffect(() => {
    onReset()
    if (mode === 'Edit') onFill()
    // eslint-disable-next-line
  }, [mode])

  const getInitialForm = async () => {
    const resUnit = await getAllUnit()
    const unitItems = []
    resUnit.forEach((item) => {
      unitItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setUnit(unitItems)
  }

  const unitOnChange = async (id) => {
    const resClassroom = await getAllClassroomByUnit(id)
    const classroomItems = []
    resClassroom.forEach((item) => {
      classroomItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setClassroom(classroomItems)
    setLoadingUnit(false)
  }

  useEffect(() => {
    getInitialForm()
    // eslint-disable-next-line
  }, [])

  return (
    <Card
      title={mode + ' Data Jurusan'}
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
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            key="idUnit"
            label="Nama Unit"
            name="idUnit"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Nama Unit!`,
              },
            ]}
          >
            {loadingUnit ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={unit} onChange={(id) => unitOnChange(id)} />
            )}
          </Form.Item>
          <Form.Item
            key="idClassroom"
            label="Kelas"
            name="idClassroom"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Kelas!`,
              },
            ]}
          >
            {loadingClassroom ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={classroom} />
            )}
          </Form.Item>
          <Form.Item key="from" label="Dari" name="from">
            <InputNumber />
          </Form.Item>
          <Form.Item key="to" label="Sampai" name="to">
            <InputNumber />
          </Form.Item>
          <Form.Item key="grade" label="Grade" name="grade">
            <Input />
          </Form.Item>
          <Form.Item key="description" label="Keterangan" name="description">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}

export default ValueRangeForm
