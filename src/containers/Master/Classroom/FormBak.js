import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import {
  getAllDepartmentByUnit,
  storeDepartment,
  updateDepartment,
} from 'src/services/department'
import DefaultForm from 'src/components/DefaultForm'
import fields from './fields'
import callNotify from 'src/utils/notify'
import { getAllEmployeeByUnit } from 'src/services/employee'

const ClassroomFormBak = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState([])
  const [department, setDepartment] = useState([])
  const [room, setRoom] = useState([])

  const [form] = Form.useForm()

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (mode === 'Tambah') {
          await storeDepartment(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateDepartment(itemEdit.id, values).then((res) => {
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
      expertise: itemEdit.expertise,
      generalCompetence: itemEdit.generalCompetence,
      specialCompetence: itemEdit.specialCompetence,
      description: itemEdit.description,
      active: itemEdit.active,
    })
  }

  useEffect(() => {
    onReset()
    if (mode === 'Edit') onFill()
    // eslint-disable-next-line
  }, [mode])

  // const functions = {
  //   onChangeUnit: () => {
  //     console.log('change unit')
  //   },
  //   onChangeBuilding: () => {
  //     console.log('change unit')
  //   },
  // }
  const onChangeUnit = (id) => {
    console.log('change unit : ' + id)
    const dtEmployee = getAllEmployeeByUnit(id)
    setEmployee(dtEmployee)
    // const dtDepartment = getAllDepartmentByUnit(id)
    // setDepartment(dtDepartment)
  }
  const onChangeBuilding = (id) => {
    console.log('change building')
  }

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
      <DefaultForm
        form={form}
        fields={fields}
        onFinish={onFinish}
        eventOnChange={['unit', 'building']}
        effectOnChange={['employee', 'department', 'room']}
        functions={{ onChangeUnit, onChangeBuilding }}
        stateChange={{ employee, department, room }}
      />
    </Card>
  )
}

export default ClassroomFormBak
