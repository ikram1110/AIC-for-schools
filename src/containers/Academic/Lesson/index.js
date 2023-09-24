import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Table,
  notification,
} from 'antd'
import { useEffect, useState } from 'react'
import LessonForm from './Form'
import { deleteLesson, getAllLesson } from 'src/services/lesson'
import { getAllUnit } from 'src/services/unit'

const Lesson = () => {
  const [mode, setMode] = useState('Data')
  const [itemEdit, setItemEdit] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [source, setSource] = useState([])
  const [filterUnit, setFilterUnit] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [actSource, setActSource] = useState([])

  const [modal, contextHolderModal] = Modal.useModal()
  const [notify, contextHolderNotify] = notification.useNotification()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  useEffect(() => {
    let tmpData = []
    if (search !== '' && filter === '')
      tmpData = source.filter((x) =>
        x.name.toLowerCase().includes(search.toLowerCase())
      )
    else if (search === '' && filter !== '')
      tmpData = source.filter((x) => x.idUnit.includes(filter))
    else if (search !== '' && filter !== '')
      tmpData = source.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.idUnit.includes(filter)
      )
    setActSource(tmpData)
    // eslint-disable-next-line
  }, [search, filter])

  const onSearch = (text) => {
    setSearch(text)
  }

  const onFilter = (text) => {
    if (text === undefined) setFilter('')
    else setFilter(text)
  }

  const onEdit = (id) => {
    const idx = source.findIndex((x) => x.id === id)
    setItemEdit(source[idx])
    setMode('Edit')
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
        await deleteLesson(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = [
    {
      title: 'Kode',
      dataIndex: 'code',
      key: 'code',
      fixed: 'left',
    },
    {
      title: 'Nama',
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Jurusan',
      dataIndex: 'nameDepartment',
      key: 'nameDepartment',
    },
    {
      title: 'Tingkat',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Guru Pengampu',
      dataIndex: 'nameEmployee',
      key: 'nameEmployee',
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
    const response = await getAllLesson()
    setSource(response)
    const resUnit = await getAllUnit()
    const unitItems = []
    resUnit.forEach((item) => {
      unitItems.push({
        value: item.id,
        label: item.name,
      })
    })
    setFilterUnit(unitItems)
    setLoading(false)
  }

  return (
    <>
      {contextHolderModal}
      {contextHolderNotify}
      {mode === 'Data' ? (
        <Card
          title="Data Mata Pelajaran"
          extra={
            <div className="action-card">
              <Input
                placeholder="Pencarian..."
                className="action-search"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Select
                placeholder="Unit"
                allowClear={true}
                className="action-filter"
                options={filterUnit}
                onChange={(e) => onFilter(e)}
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
      ) : (
        <LessonForm
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

export default Lesson
