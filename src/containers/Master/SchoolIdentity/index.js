import { Button, Card, Form, Spin, notification } from 'antd'
import DefaultForm from 'src/components/DefaultForm'
import fields from './fields'
import { useEffect, useRef, useState } from 'react'
import {
  getSchoolIdentity,
  storeSchoolIdentity,
  updateSchoolIdentity,
} from 'src/services/schoolidentity'
import callNotify from 'src/utils/notify'

const SchoolIdentity = (props) => {
  const inputRef = useRef(null)
  const [id, setId] = useState(null)
  const [itemEdit, setItemEdit] = useState({})
  const [mode, setMode] = useState('Data')
  const [loading, setLoading] = useState(false)

  const [notify, contextHolderNotify] = notification.useNotification()
  const [form] = Form.useForm()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  const onReset = () => {
    form.resetFields()
  }

  const onFinish = (values) => {
    form
      .validateFields()
      .then(async () => {
        setLoading(true)
        if (id === null) {
          await storeSchoolIdentity(values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        } else {
          await updateSchoolIdentity(id, values).then((res) => {
            callNotify(notify, res, mode, setLoading, getData, setMode, onReset)
          })
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getSchoolIdentity()
    if (response.status === 200) {
      console.log(response.data.id)
      setId(response.data.id)
      setItemEdit(response.data)
    }
    setLoading(false)
  }

  useEffect(() => {
    form.setFieldsValue({
      name: itemEdit.name,
      npsn: itemEdit.npsn,
      nss: itemEdit.nss,
      address: itemEdit.address,
      postalCode: itemEdit.postalCode,
      phone: itemEdit.phone,
      kelurahan: itemEdit.kelurahan,
      kecamatan: itemEdit.kecamatan,
      kabupaten: itemEdit.kabupaten,
      province: itemEdit.province,
      website: itemEdit.website,
      email: itemEdit.email,
    })
    // eslint-disable-next-line
  }, [itemEdit])

  return (
    <>
      {contextHolderNotify}
      <Card
        title={mode === 'Ubah' ? 'Ubah Identitas Sekolah' : 'Identitas Sekolah'}
        extra={
          <div className="action-card">
            {mode === 'Ubah' ? (
              <>
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
              </>
            ) : (
              <Button
                type="primary"
                icon={<i className="ri-edit-2-line"></i>}
                onClick={() => {
                  setMode('Ubah')
                  inputRef.current.focus({
                    cursor: 'end',
                  })
                }}
              >
                Ubah
              </Button>
            )}
          </div>
        }
      >
        {loading ? (
          <Spin
            size="large"
            style={{
              display: 'flex',
              marginBlock: 100,
              justifyContent: 'center',
            }}
          />
        ) : (
          <div
            style={{ maxHeight: `calc(${vh}px - 240px)`, overflowY: 'scroll' }}
          >
            <DefaultForm
              form={form}
              fields={fields}
              readonly={mode === 'Data' ? true : false}
              onFinish={onFinish}
              withRef={inputRef}
              nameRef={'name'}
            />
          </div>
        )}
      </Card>
    </>
  )
}

export default SchoolIdentity
