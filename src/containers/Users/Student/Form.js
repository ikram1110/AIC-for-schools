import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Skeleton,
  Spin,
  Upload,
} from 'antd'
import { useEffect, useState } from 'react'
import { storeStudent, updateStudent } from 'src/services/student'
import callNotify from 'src/utils/notify'
import moment from 'moment'
import { getAllUnit } from 'src/services/unit'
import { getAllDepartmentByUnit } from 'src/services/department'
import { getAllClassroomByDepartment } from 'src/services/classroom'

const StudentForm = (props) => {
  const { mode, setMode, getData, itemEdit, notify } = props
  const [loadingImg, setLoadingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingUnit, setLoadingUnit] = useState(false)
  const [loadingDepartment, setLoadingDepartment] = useState(false)
  const [loadingClassroom, setLoadingClassroom] = useState(false)
  const [unit, setUnit] = useState([])
  const [department, setDepartment] = useState([])
  const [classroom, setClassroom] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [changeImage, setChangeImage] = useState(false)
  const [uploadImage, setUploadImage] = useState([])

  const [form] = Form.useForm()

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      notify.error({ message: 'You can only upload JPG/PNG file!' })
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      notify.error({ message: 'Image must smaller than 2MB!' })
    }
    return isJpgOrPng && isLt2M
  }

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
    setLoadingUnit(true)
    setLoadingDepartment(true)
    setLoadingClassroom(true)
    form.setFieldsValue({
      idUnit: itemEdit.idUnit,
      idDepartment: itemEdit.idDepartment,
      idClassroom: itemEdit.idClassroom,
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
    unitOnChange(itemEdit.idUnit)
  }

  useEffect(() => {
    setLoadingDepartment(false)
  }, [department])

  useEffect(() => {
    setLoadingClassroom(false)
  }, [classroom])

  const handleChange = (info) => {
    setLoadingImg(true)
    setUploadImage(info.fileList)
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url)
      setChangeImage(true)
      setLoadingImg(false)
    })
  }

  const uploadButton = (
    <div>
      {loadingImg ? <Spin size="small" /> : <i className="ri-add-line"></i>}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )

  const religionOpt = [
    {
      value: 'Islam',
      label: 'Islam',
    },
    {
      value: 'Kristen',
      label: 'Kristen',
    },
    {
      value: 'Katolik',
      label: 'Katolik',
    },
    {
      value: 'Hindu',
      label: 'Hindu',
    },
    {
      value: 'Budha',
      label: 'Budha',
    },
    {
      value: 'Konghucu',
      label: 'Konghucu',
    },
  ]

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
    const resDepartment = await getAllDepartmentByUnit(id)
    const departmentItems = []
    let get = false
    resDepartment.forEach((item) => {
      departmentItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
      if (item.id === itemEdit.idDepartment) get = true
    })
    setDepartment(departmentItems)
    if (get === true) {
      form.setFieldsValue({ idDepartment: itemEdit.idDepartment })
      departmentOnChange(itemEdit.idDepartment)
    } else {
      form.setFieldsValue({ idDepartment: null, idClassroom: null })
    }
    setLoadingUnit(false)
  }

  const departmentOnChange = async (id) => {
    const resClassroom = await getAllClassroomByDepartment(id)
    const classroomItems = []
    let get = false
    resClassroom.forEach((item) => {
      classroomItems.push({
        value: item.id,
        label: item.code + ' - ' + item.name,
      })
      if (item.id === itemEdit.idClassroom) get = true
    })
    setClassroom(classroomItems)
    if (get === true) form.setFieldsValue({ idClassroom: itemEdit.idClassroom })
    else form.setFieldsValue({ idClassroom: null })
    setLoadingUnit(false)
  }

  useEffect(() => {
    getInitialForm()
    // eslint-disable-next-line
  }, [])

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
        <Form
          form={form}
          labelCol={{
            span: 4,
          }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <div className="form-with-image">
            <div className="left">
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
                  <Select
                    options={department}
                    onChange={(id) => departmentOnChange(id)}
                  />
                )}
              </Form.Item>
              <Form.Item
                key="idClassroom"
                label="Kelas"
                name="idClassroom"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan Kelas!`,
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
                key="nipd"
                label="NIPD"
                name="nipd"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan NIPD!`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                key="nisn"
                label="NISN"
                name="nisn"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan NISN!`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                key="name"
                label="Nama"
                name="name"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan Nama!`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                key="generation"
                label="Angkatan"
                name="generation"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan Angkatan!`,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item key="address" label="NIK" name="address">
                <Input />
              </Form.Item>
              <Form.Item key="rtrw" label="RT / RW" name="rtrw">
                <Input />
              </Form.Item>
              <Form.Item key="dusun" label="Dusun" name="dusun">
                <Input />
              </Form.Item>
              <Form.Item key="kelurahan" label="Kelurahan" name="kelurahan">
                <Input />
              </Form.Item>
              <Form.Item key="kecamatan" label="Kecamatan" name="kecamatan">
                <Input />
              </Form.Item>
              <Form.Item key="kabupaten" label="Kabupaten" name="kabupaten">
                <Input />
              </Form.Item>
              <Form.Item key="postalCode" label="Kode Pos" name="postalCode">
                <InputNumber controls={false} />
              </Form.Item>
              <Form.Item
                key="initialStatus"
                label="Status Awal"
                name="initialStatus"
              >
                <Input />
              </Form.Item>
              <Form.Item key="nik" label="NIK" name="nik">
                <Input />
              </Form.Item>
              <Form.Item
                key="birthPlace"
                label="Tempat Lahir"
                name="birthPlace"
              >
                <Input />
              </Form.Item>
              <Form.Item key="birthDate" label="Tanggal Lahir" name="birthDate">
                <DatePicker />
              </Form.Item>
              <Form.Item key="gender" label="Jenis Kelamin" name="gender">
                <Radio.Group>
                  <Radio key="true" value={'Laki-laki'}>
                    Laki-laki
                  </Radio>
                  <Radio key="false" value={'Perempuan'}>
                    Perempuan
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item key="religion" label="Agama" name="religion">
                <Select options={religionOpt} />
              </Form.Item>
              <Form.Item
                key="specialNeeds"
                label="Kebutuhan Khusus"
                name="specialNeeds"
              >
                <Input />
              </Form.Item>
              <Form.Item key="kindStay" label="Jenis Tinggal" name="kindStay">
                <Input />
              </Form.Item>
              <Form.Item
                key="transportation"
                label="Transportasi"
                name="transportation"
              >
                <Input />
              </Form.Item>
              <Form.Item key="phone" label="No. HP" name="phone">
                <InputNumber controls={false} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                key="email"
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item key="skhun" label="SKHUN" name="skhun">
                <Input />
              </Form.Item>
              <Form.Item key="kps" label="Penerima KPS" name="kps">
                <Radio.Group>
                  <Radio key="true" value={true}>
                    Ya
                  </Radio>
                  <Radio key="false" value={false}>
                    Tidak
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item key="kpsNumber" label="No. KPS" name="kpsNumber">
                <Input />
              </Form.Item>
              <Form.Item
                key="active"
                label="Status aktif"
                name="active"
                rules={[
                  {
                    required: true,
                    message: `Mohon masukan Status Aktif!`,
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
            </div>
            <div className="right">
              <div className="wrap-image">
                <Upload
                  accept="image/png, image/jpeg"
                  name="photo"
                  listType="picture-card"
                  className="image-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                  maxCount={1}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="img-right"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        borderRadius: '4px',
                      }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </Card>
  )
}

export default StudentForm
