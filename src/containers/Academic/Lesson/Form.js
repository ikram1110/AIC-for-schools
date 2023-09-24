import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Skeleton,
} from 'antd'
import { useEffect, useState } from 'react'
import { getAllCurriculum } from 'src/services/curriculum'
import { getAllDepartmentByUnit } from 'src/services/department'
import { getAllEmployeeByUnit } from 'src/services/employee'
import { storeLesson, updateLesson } from 'src/services/lesson'
import { getAllLessonGroupByUnit } from 'src/services/lessongroup'
import { getAllUnit } from 'src/services/unit'
import callNotify from 'src/utils/notify'

const LessonForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [loadingUnit, setLoadingUnit] = useState(false)
  const [loadingCurriculum, setLoadingCurriculum] = useState(false)
  const [loadingDepartment, setLoadingDepartment] = useState(false)
  const [loadingEmployee, setLoadingEmployee] = useState(false)
  const [loadingLessonGroup, setLoadingLessonGroup] = useState(false)
  const [unit, setUnit] = useState([])
  const [curriculum, setCurriculum] = useState([])
  const [department, setDepartment] = useState([])
  const [employee, setEmployee] = useState([])
  const [lessonGroup, setLessonGroup] = useState([])

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
          await storeLesson(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateLesson(itemEdit.id, values).then((res) => {
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
    setLoadingCurriculum(true)
    setLoadingDepartment(true)
    setLoadingEmployee(true)
    setLoadingLessonGroup(true)
    form.setFieldsValue({
      idUnit: itemEdit.idUnit,
      idCurriculum: itemEdit.idCurriculum,
      code: itemEdit.code,
      name: itemEdit.name,
      idDepartment: itemEdit.idDepartment,
      idEmployee: itemEdit.idEmployee,
      level: itemEdit.level,
      basicCompetence: itemEdit.basicCompetence,
      specialCompetence: itemEdit.specialCompetence,
      hours: itemEdit.hours,
      index: itemEdit.index,
      session: itemEdit.session,
      idLessonGroup: itemEdit.idLessonGroup,
      active: itemEdit.active,
    })
    unitOnChange(itemEdit.idUnit)
  }

  useEffect(() => {
    setLoadingDepartment(false)
  }, [department])

  useEffect(() => {
    setLoadingEmployee(false)
  }, [employee])

  useEffect(() => {
    setLoadingLessonGroup(false)
  }, [lessonGroup])

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

    const resCurriculum = await getAllCurriculum()
    const curriculumItems = []
    resCurriculum.forEach((item) => {
      curriculumItems.push({
        value: item.id,
        label: item.name,
      })
    })
    setCurriculum(curriculumItems)
  }

  const unitOnChange = async (id) => {
    const resDepartment = await getAllDepartmentByUnit(id)
    const departmentItems = []
    resDepartment.forEach((item) => {
      departmentItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setDepartment(departmentItems)

    const resEmployee = await getAllEmployeeByUnit(id)
    const employeeItems = []
    resEmployee.forEach((item) => {
      employeeItems.push({
        value: item.id,
        label: item.nip + ' - ' + item.name,
      })
    })
    setEmployee(employeeItems)

    const resLessonGroup = await getAllLessonGroupByUnit(id)
    const lessonGroupItems = []
    resLessonGroup.forEach((item) => {
      lessonGroupItems.push({
        value: item.id,
        label: item.name,
      })
    })
    setLessonGroup(lessonGroupItems)
    setLoadingUnit(false)
    setLoadingCurriculum(false)
  }

  useEffect(() => {
    getInitialForm()
    // eslint-disable-next-line
  }, [])

  return (
    <Card
      title={mode + ' Data Mata Pelajaran'}
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
            key="idCurriculum"
            label="Nama Kurikulum"
            name="idCurriculum"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Nama Kurikulum!`,
              },
            ]}
          >
            {loadingCurriculum ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={curriculum} />
            )}
          </Form.Item>
          <Form.Item key="code" label="Kode Mata Pelajaran" name="code">
            <Input />
          </Form.Item>
          <Form.Item key="name" label="Nama Mata Pelajaran" name="name">
            <Input />
          </Form.Item>
          <Form.Item
            key="idDepartment"
            label="Jurusan"
            name="idDepartment"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Jurusan!`,
              },
            ]}
          >
            {loadingDepartment ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={department} />
            )}
          </Form.Item>
          <Form.Item
            key="idEmployee"
            label="Guru Pengampu"
            name="idEmployee"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Guru Pengampu!`,
              },
            ]}
          >
            {loadingEmployee ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={employee} />
            )}
          </Form.Item>
          <Form.Item key="level" label="Tingkat" name="level">
            <Input />
          </Form.Item>
          <Form.Item
            key="basicCompetence"
            label="Kompentensi Umum"
            name="basicCompetence"
          >
            <Input />
          </Form.Item>
          <Form.Item
            key="specialCompetence"
            label="Kompetensi Khusus"
            name="specialCompetence"
          >
            <Input />
          </Form.Item>
          <Form.Item key="hours" label="Jumlah Jam" name="hours">
            <InputNumber />
          </Form.Item>
          <Form.Item key="index" label="Urutan" name="index">
            <InputNumber />
          </Form.Item>
          <Form.Item key="session" label="Sesi" name="session">
            <Input />
          </Form.Item>
          <Form.Item
            key="idLessonGroup"
            label="Kelompok"
            name="idLessonGroup"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Kelompok!`,
              },
            ]}
          >
            {loadingLessonGroup ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={lessonGroup} />
            )}
          </Form.Item>
          <Form.Item
            key="active"
            label="Status aktif"
            name="active"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Status Aktif!`,
              },
            ]}
          >
            <Radio.Group>
              <Radio key="true" value={true}>
                Ya
              </Radio>
              <Radio key="false" value={false}>
                Tidak
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </Card>
  )
}

export default LessonForm
