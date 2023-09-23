import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import { storeEmployee, updateEmployee } from 'src/services/employee'
import DefaultFormImage from 'src/components/DefaultFormImage'
import fields from './fields'
import callNotify from 'src/utils/notify'
import moment from 'moment'

const EmployeeForm = (props) => {
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
          if (key === 'photo') continue
          if (Object.hasOwnProperty.call(values, key)) {
            if (values[key] === undefined || values[key] === null) {
            } else {
              if (key === 'birthDate')
                formData.append(key, moment(values[key]).format('YYYY-MM-DD'))
              else formData.append(key, values[key])
            }
          }
        }
        if (changeImage === true)
          if (imageUrl !== '')
            formData.append('photo', uploadImage[0].originFileObj)
        if (mode === 'Tambah') {
          await storeEmployee(formData).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateEmployee(itemEdit.id, formData).then((res) => {
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
      idUnit: itemEdit.idUnit,
      nip: itemEdit.nip,
      name: itemEdit.name,
      birthPlace: itemEdit.birthPlace,
      birthDate:
        itemEdit.birthDate !== null
          ? moment(itemEdit.birthDate)
          : itemEdit.birthDate,
      gender: itemEdit.gender,
      religion: itemEdit.religion,
      phone: itemEdit.phone,
      email: itemEdit.email,
      address: itemEdit.address,
      rtrw: itemEdit.rtrw,
      dusun: itemEdit.dusun,
      kelurahan: itemEdit.kelurahan,
      kecamatan: itemEdit.kecamatan,
      kabupaten: itemEdit.kabupaten,
      postalCode: itemEdit.postalCode,
      nuptk: itemEdit.nuptk,
      studyExpertise: itemEdit.studyExpertise,
      idPtkType: itemEdit.idPtkType,
      optionalTask: itemEdit.optionalTask,
      idEmployeeStatus: itemEdit.idEmployeeStatus,
      activeStatus: itemEdit.activeStatus,
      marriageStatus: itemEdit.marriageStatus,
      photo: itemEdit.photo,
      nik: itemEdit.nik,
      skCpns: itemEdit.skCpns,
      cpnsDate: itemEdit.cpnsDate,
      appointmentSk: itemEdit.appointmentSk,
      appointmentTmt: itemEdit.appointmentTmt,
      appointmentAgency: itemEdit.appointmentAgency,
      idGrade: itemEdit.idGrade,
      salarySource: itemEdit.salarySource,
      laboratoryExpert: itemEdit.laboratoryExpert,
      biologicalMotherName: itemEdit.biologicalMotherName,
      spouseName: itemEdit.spouseName,
      spouseNip: itemEdit.spouseNip,
      spouseWork: itemEdit.spouseWork,
      tmtPns: itemEdit.tmtPns,
      headmasterLicense: itemEdit.headmasterLicense,
      builtSchoolsCount: itemEdit.builtSchoolsCount,
      supervisionTraining: itemEdit.supervisionTraining,
      kkHandle: itemEdit.kkHandle,
      breileExpert: itemEdit.breileExpert,
      signLangExpert: itemEdit.signLangExpert,
      citizenship: itemEdit.citizenship,
      niynigk: itemEdit.niynigk,
      npwp: itemEdit.npwp,
    })
    if (itemEdit.photo !== null) {
      setImageUrl(
        process.env.REACT_APP_API_URL +
          '/public/images/employee/' +
          itemEdit.photo
      )
    }
  }

  useEffect(() => {
    onReset()
    if (mode === 'Edit') onFill()
    // eslint-disable-next-line
  }, [mode])

  return (
    <Card
      title={mode + ' Data Pegawai'}
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
          imageName={'photo'}
          mode={mode}
        />
      </div>
    </Card>
  )
}

export default EmployeeForm
