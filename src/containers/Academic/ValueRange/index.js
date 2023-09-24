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
import ValueRangeForm from './Form'
import { deleteValueRange, getAllValueRange } from 'src/services/valuerange'
import { getAllUnit } from 'src/services/unit'

const ValueRange = () => {
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
        await deleteValueRange(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = [
    {
      title: 'Unit',
      dataIndex: 'nameUnit',
      key: 'nameUnit',
      fixed: 'left',
    },
    {
      title: 'Kelas',
      dataIndex: 'nameClassroom',
      key: 'nameClassroom',
      fixed: 'left',
    },
    {
      title: 'Dari',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'Sampai',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Keterangan',
      dataIndex: 'description',
      key: 'description',
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
    const response = await getAllValueRange()
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
          title="Data Predikat"
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
        <ValueRangeForm
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

export default ValueRange
