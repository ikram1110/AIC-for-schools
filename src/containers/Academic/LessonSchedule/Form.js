import {
  Button,
  Card,
  Form,
  Input,
  Radio,
  Select,
  Skeleton,
  TimePicker,
} from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { getAllAcademicYear } from 'src/services/academicyear'
import { getAllClassroomByUnit } from 'src/services/classroom'
import { getAllEmployeeByUnit } from 'src/services/employee'
import { getAllLessonByUnit } from 'src/services/lesson'
import {
  storeLessonSchedule,
  updateLessonSchedule,
} from 'src/services/lessonschedule'
import { getAllRoom } from 'src/services/room'
import { getAllUnit } from 'src/services/unit'
import callNotify from 'src/utils/notify'

const LessonScheduleForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [loadingUnit, setLoadingUnit] = useState(false)
  const [loadingAcademicYear, setLoadingAcademicYear] = useState(false)
  const [loadingClassroom, setLoadingClassroom] = useState(false)
  const [loadingLesson, setLoadingLesson] = useState(false)
  const [loadingRoom, setLoadingRoom] = useState(false)
  const [loadingEmployee, setLoadingEmployee] = useState(false)
  const [unit, setUnit] = useState([])
  const [academicYear, setAcademicYear] = useState([])
  const [classroom, setClassroom] = useState([])
  const [lesson, setLesson] = useState([])
  const [room, setRoom] = useState([])
  const [employee, setEmployee] = useState([])
  const [defaultAcademicYear, setDefaultAcademicYear] = useState(null)

  const [form] = Form.useForm()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  const onFinish = (values) => {
    if (values.scheduleTime !== undefined) {
      values.startTime = values.scheduleTime[0].format('HH:mm')
      values.endTime = values.scheduleTime[1].format('HH:mm')
    }
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (mode === 'Tambah') {
          await storeLessonSchedule(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateLessonSchedule(itemEdit.id, values).then((res) => {
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
    setLoadingAcademicYear(true)
    setLoadingClassroom(true)
    setLoadingLesson(true)
    setLoadingRoom(true)
    setLoadingEmployee(true)
    form.setFieldsValue({
      idUnit: itemEdit.idUnit,
      idAcademicYear: itemEdit.idAcademicYear,
      idClassroom: itemEdit.idClassroom,
      idLesson: itemEdit.idLesson,
      idRoom: itemEdit.idRoom,
      idEmployee: itemEdit.idEmployee,
      parallelSchedule: itemEdit.parallelSchedule,
      serialSchedule: itemEdit.serialSchedule,
      scheduleTime:
        itemEdit.startTime === null
          ? null
          : [
              moment(itemEdit.startTime, 'HH:mm'),
              moment(itemEdit.endTime, 'HH:mm'),
            ],
      day: itemEdit.day,
      active: itemEdit.active,
    })
    unitOnChange(itemEdit.idUnit)
  }

  useEffect(() => {
    setLoadingClassroom(false)
  }, [classroom])

  useEffect(() => {
    setLoadingLesson(false)
  }, [lesson])

  useEffect(() => {
    setLoadingRoom(false)
  }, [room])

  useEffect(() => {
    setLoadingEmployee(false)
  }, [employee])

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

    const resAcademicYear = await getAllAcademicYear()
    const academicYearItems = []
    resAcademicYear.forEach((item) => {
      if (item.active === true) setDefaultAcademicYear(item.id)
      academicYearItems.push({
        value: item.id,
        label:
          item.active === true
            ? item.code + ' - ' + item.name + ' - Aktif'
            : item.code + ' - ' + item.name,
      })
    })
    setAcademicYear(academicYearItems)

    const resRoom = await getAllRoom()
    const roomItems = []
    resRoom.forEach((item) => {
      roomItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setRoom(roomItems)
  }

  const unitOnChange = async (id) => {
    const resClassroom = await getAllClassroomByUnit(id)
    const classroomItems = []
    resClassroom.forEach((item) => {
      classroomItems.push({
        value: item.id,
        label: item.name,
      })
    })
    setClassroom(classroomItems)

    const resLesson = await getAllLessonByUnit(id)
    const lessonItems = []
    resLesson.forEach((item) => {
      lessonItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setLesson(lessonItems)

    const resEmployee = await getAllEmployeeByUnit(id)
    const employeeItems = []
    resEmployee.forEach((item) => {
      employeeItems.push({
        value: item.id,
        label: item.nip + ' - ' + item.name,
      })
    })
    setEmployee(employeeItems)
    setLoadingUnit(false)
    setLoadingAcademicYear(false)
    setLoadingRoom(false)
  }

  useEffect(() => {
    getInitialForm()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    form.setFieldsValue({
      idAcademicYear: defaultAcademicYear,
    })
    // eslint-disable-next-line
  }, [defaultAcademicYear])

  const days = [
    {
      value: 'Senin',
      label: 'Senin',
    },
    {
      value: 'Selasa',
      label: 'Selasa',
    },
    {
      value: 'Rabu',
      label: 'Rabu',
    },
    {
      value: 'Kamis',
      label: 'Kamis',
    },
    {
      value: 'Jumat',
      label: 'Jumat',
    },
    {
      value: 'Sabtu',
      label: 'Sabtu',
    },
  ]

  return (
    <Card
      title={mode + ' Data Jadwal Pelajaran'}
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
            key="idAcademicYear"
            label="Tahun Akademik"
            name="idAcademicYear"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Tahun Akademik!`,
              },
            ]}
          >
            {loadingAcademicYear ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={academicYear} />
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
          <Form.Item
            key="idLesson"
            label="Mata Pelajaran"
            name="idLesson"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Mata Pelajaran!`,
              },
            ]}
          >
            {loadingLesson ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={lesson} />
            )}
          </Form.Item>
          <Form.Item
            key="idRoom"
            label="Ruangan"
            name="idRoom"
            rules={[
              {
                required: true,
                message: `Mohon masukkan Ruangan!`,
              },
            ]}
          >
            {loadingRoom ? (
              <Skeleton.Input active size="small" block />
            ) : (
              <Select options={room} />
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
          <Form.Item
            key="parallelSchedule"
            label="Jadwal Paralel"
            name="parallelSchedule"
          >
            <Input />
          </Form.Item>
          <Form.Item
            key="serialSchedule"
            label="Jadwal Serial"
            name="serialSchedule"
          >
            <Input />
          </Form.Item>
          <Form.Item
            key="scheduleTime"
            label="Waktu Pelajaran"
            name="scheduleTime"
          >
            <TimePicker.RangePicker format={'HH:mm'} />
          </Form.Item>
          <Form.Item key="day" label="Hari" name="day">
            <Select options={days} />
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

export default LessonScheduleForm
