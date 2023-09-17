import { Button, Card, Form } from 'antd'
import { useEffect, useState } from 'react'
import { storeStudent, updateStudent } from 'src/services/student'
import DefaultFormImage from 'src/components/DefaultFormImage'
import fields from './fields'
import callNotify from 'src/utils/notify'
import moment from 'moment'

const StudentForm = (props) => {
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
          await storeStudent(formData).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateStudent(itemEdit.id, formData).then((res) => {
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
      idClassroom: itemEdit.idClassroom,
      idDepartment: itemEdit.idDepartment,
      nipd: itemEdit.nipd,
      nisn: itemEdit.nisn,
      name: itemEdit.name,
      generation: itemEdit.generation,
      address: itemEdit.address,
      rtrw: itemEdit.rtrw,
      dusun: itemEdit.dusun,
      kelurahan: itemEdit.kelurahan,
      kecamatan: itemEdit.kecamatan,
      kabupaten: itemEdit.kabupaten,
      postalCode: itemEdit.postalCode,
      initialStatus: itemEdit.initialStatus,
      photo: itemEdit.photo,
      nik: itemEdit.nik,
      birthPlace: itemEdit.birthPlace,
      birthDate:
        itemEdit.birthDate !== null
          ? moment(itemEdit.birthDate)
          : itemEdit.birthDate,
      gender: itemEdit.gender,
      religion: itemEdit.religion,
      specialNeeds: itemEdit.specialNeeds,
      kindStay: itemEdit.kindStay,
      transportation: itemEdit.transportation,
      phone: itemEdit.phone,
      email: itemEdit.email,
      skhun: itemEdit.skhun,
      kps: itemEdit.kps,
      kpsNumber: itemEdit.kpsNumber,
      active: itemEdit.active,
    })
    if (itemEdit.photo !== null) {
      setImageUrl(
        process.env.REACT_APP_API_URL +
          '/public/images/student/' +
          itemEdit.photo
      )
    }
    console.log(itemEdit.photo)
  }

  useEffect(() => {
    onReset()
    if (mode === 'Edit') onFill()
    // eslint-disable-next-line
  }, [mode])

  return (
    <Card
      title={mode + ' Data Siswa'}
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
          mode={'mode'}
        />
      </div>
    </Card>
  )
}

export default StudentForm
