import {
  Button,
  Card,
  Image,
  Input,
  Modal,
  Space,
  Table,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import StudentForm from './Form'
import { deleteStudent, getAllStudent } from 'src/services/student'
import { getAllStudentParent } from 'src/services/studentparent'
import StudentParentForm from './FormParent'

const Student = () => {
  const [mode, setMode] = useState('Data')
  const [itemEdit, setItemEdit] = useState({})
  const [itemParentEdit, setItemParentEdit] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [source, setSource] = useState([])
  const [sourceParent, setSourceParent] = useState([])
  const [idEdit, setIdEdit] = useState(null)
  const [search, setSearch] = useState('')
  const [actSource, setActSource] = useState([])

  const [modal, contextHolderModal] = Modal.useModal()
  const [notify, contextHolderNotify] = notification.useNotification()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  useEffect(() => {
    let tmpData = []
    if (search !== '')
      tmpData = source.filter(
        (x) =>
          x.code.toLowerCase().includes(search.toLowerCase()) ||
          x.name.toLowerCase().includes(search.toLowerCase())
      )
    setActSource(tmpData)
    // eslint-disable-next-line
  }, [search])

  const onSearch = (text) => {
    setSearch(text)
  }

  const onEdit = (id) => {
    const idx = source.findIndex((x) => x.id === id)
    setItemEdit(source[idx])
    setMode('Edit')
  }

  const onEditParent = (id) => {
    const idx = sourceParent.findIndex((x) => x.idStudent === id)
    setItemParentEdit(sourceParent[idx])
    setIdEdit(id)
    setMode('EditParent')
  }

  const onDelete = (id) => {
    modal.confirm({
      title: 'Yakin ingin menghapus data?',
      icon: null,
      content: '',
      okText: 'Ya',
      cancelText: 'Tidak',
      okButtonProps: {
        loading: loadingDel,
        danger: true,
      },
      async onOk() {
        setLoadingDel(true)
        await deleteStudent(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = [
    {
      title: 'Gambar',
      dataIndex: 'photo',
      key: 'photo',
      render: (_, { photo }) => (
        <>
          <div
            style={{
              border: '1px solid #d3d3d3',
              borderRadius: '4px',
              padding: '2px',
              display: 'flex',
              justifyContent: 'center',
              width: '86px',
            }}
          >
            {photo === null ? (
              <i
                className="ri-file-damage-line"
                style={{ fontSize: '24px' }}
              ></i>
            ) : (
              <Image
                width={80}
                src={
                  process.env.REACT_APP_API_URL +
                  '/public/images/student/' +
                  photo
                }
                preview={{
                  mask: <i className="ri-search-eye-line"></i>,
                }}
              />
            )}
          </div>
        </>
      ),
      fixed: 'left',
    },
    {
      title: 'Nama Siswa',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name, nipd, nisn }) => (
        <>
          {name}
          <br />
          NIPD : {nipd}
          <br />
          NISN : {nisn}
          <br />
        </>
      ),
      fixed: 'left',
    },
    {
      title: 'Angkatan',
      dataIndex: 'generation',
      key: 'generation',
    },
    {
      title: 'Jurusan',
      dataIndex: 'nameDepartment',
      key: 'nameDepartment',
    },
    {
      title: 'Kelas',
      dataIndex: 'nameClassroom',
      key: 'nameClassroom',
    },
    {
      title: 'Aksi',
      key: 'action',
      width: 130,
      fixed: 'right',
      render: (_, { id }) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<i className="ri-parent-line"></i>}
            onClick={() => onEditParent(id)}
          />
          <Button
            type="primary"
            icon={<i className="ri-edit-2-line"></i>}
            onClick={() => onEdit(id)}
          />
          <Button
            type="primary"
            danger
            icon={<i className="ri-delete-bin-6-line"></i>}
            onClick={() => onDelete(id)}
          />
        </Space>
      ),
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getAllStudent()
    setSource(response)
    const responseParent = await getAllStudentParent()
    setSourceParent(responseParent)
    setLoading(false)
  }

  return (
    <>
      {contextHolderModal}
      {contextHolderNotify}
      {mode === 'Data' ? (
        <Card
          title="Data Siswa"
          extra={
            <div className="action-card">
              <Input
                placeholder="Pencarian..."
                className="action-search"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Button
                type="primary"
                icon={<i className="ri-add-line"></i>}
                onClick={() => setMode('Tambah')}
              />
            </div>
          }
        >
          <Table
            rowKey={'id'}
            size="small"
            columns={columns}
            dataSource={actSource.length === 0 ? source : actSource}
            pagination={{
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: true,
            }}
            loading={loading}
            scroll={{ y: vh - 340 }}
          />
        </Card>
      ) : mode === 'EditParent' ? (
        <StudentParentForm
          mode={mode}
          setMode={setMode}
          getData={getData}
          itemEdit={itemParentEdit}
          idStudent={idEdit}
          notify={notify}
        />
      ) : (
        <StudentForm
          mode={mode}
          setMode={setMode}
          getData={getData}
          itemEdit={itemEdit}
          notify={notify}
        />
      )}
    </>
  )
}

export default Student
