import { Button, Card, Form, Input, InputNumber, Select, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import { getAllDepartmentByUnit } from 'src/services/department'
import { getAllEmployeeByUnit } from 'src/services/employee'
import { getAllUnit } from 'src/services/unit'
import { getAllBuilding } from 'src/services/building'
import { getAllRoomByBuilding } from 'src/services/room'
import { storeClassroom, updateClassroom } from 'src/services/classroom'
import callNotify from 'src/utils/notify'

const ClassroomForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [loadingUnit, setLoadingUnit] = useState(false)
  const [loadingEmployee, setLoadingEmployee] = useState(false)
  const [loadingDepartment, setLoadingDepartment] = useState(false)
  const [loadingBuilding, setLoadingBuilding] = useState(false)
  const [loadingRoom, setLoadingRoom] = useState(false)
  const [unit, setUnit] = useState([])
  const [employee, setEmployee] = useState([])
  const [department, setDepartment] = useState([])
  const [building, setBuilding] = useState([])
  const [room, setRoom] = useState([])

  const [form] = Form.useForm()

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (mode === 'Tambah') {
          await storeClassroom(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateClassroom(itemEdit.id, values).then((res) => {
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
    setLoadingEmployee(true)
    setLoadingDepartment(true)
    setLoadingBuilding(true)
    setLoadingRoom(true)
    form.setFieldsValue({
      code: itemEdit.code,
      idUnit: itemEdit.idUnit,
      name: itemEdit.name,
      idEmployee: itemEdit.idEmployee,
      idDepartment: itemEdit.idDepartment,
      idBuilding: itemEdit.idBuilding,
      idRoom: itemEdit.idRoom,
      quantity: itemEdit.quantity,
    })
    unitOnChange(itemEdit.idUnit)
    buildingOnChange(itemEdit.idBuilding)
  }

  useEffect(() => {
    setLoadingEmployee(false)
  }, [employee])

  useEffect(() => {
    setLoadingDepartment(false)
  }, [department])

  useEffect(() => {
    setLoadingRoom(false)
  }, [room])

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

    const resBuilding = await getAllBuilding()
    const buildingItems = []
    resBuilding.forEach((item) => {
      buildingItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setBuilding(buildingItems)
  }

  const unitOnChange = async (id) => {
    const resEmployee = await getAllEmployeeByUnit(id)
    const employeeItems = []
    resEmployee.forEach((item) => {
      employeeItems.push({
        value: item.id,
        label: item.nip + ' - ' + item.name,
      })
    })
    setEmployee(employeeItems)

    const resDepartment = await getAllDepartmentByUnit(id)
    const departmentItems = []
    resDepartment.forEach((item) => {
      departmentItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setDepartment(departmentItems)
    setLoadingUnit(false)
  }

  const buildingOnChange = async (id) => {
    const resRoom = await getAllRoomByBuilding(id)
    const roomItems = []
    resRoom.forEach((item) => {
      roomItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
    })
    setRoom(roomItems)
    setLoadingBuilding(false)
  }

  useEffect(() => {
    getInitialForm()
    // eslint-disable-next-line
  }, [])

  return (
    <Card
      title={mode + ' Data Ruang Kelas'}
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
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          key="code"
          label="Kode Kelas"
          name="code"
          rules={[
            {
              required: true,
              message: `Mohon masukan Kode Kelas!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          key="idUnit"
          label="Nama Unit"
          name="idUnit"
          rules={[
            {
              required: true,
              message: `Mohon masukan Nama Unit!`,
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
          key="name"
          label="Nama Kelas"
          name="name"
          rules={[
            {
              required: true,
              message: `Mohon masukan Nama Kelas!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          key="idEmployee"
          label="Wali Kelas"
          name="idEmployee"
          rules={[
            {
              required: true,
              message: `Mohon masukan Wali Kelas!`,
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
          key="idDepartment"
          label="Jurusan"
          name="idDepartment"
          rules={[
            {
              required: true,
              message: `Mohon masukan Jurusan!`,
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
          key="idBuilding"
          label="Gedung"
          name="idBuilding"
          rules={[
            {
              required: true,
              message: `Mohon masukan Gedung!`,
            },
          ]}
        >
          {loadingBuilding ? (
            <Skeleton.Input active size="small" block />
          ) : (
            <Select
              options={building}
              onChange={(id) => buildingOnChange(id)}
            />
          )}
        </Form.Item>
        <Form.Item
          key="idRoom"
          label="Ruangan"
          name="idRoom"
          rules={[
            {
              required: true,
              message: `Mohon masukan Ruangan!`,
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
          key="quantity"
          label="Jumlah Siswa"
          name="quantity"
          rules={[
            {
              required: true,
              message: `Mohon masukan Jumlah Siswa!`,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Card>
  )
}

export default ClassroomForm
