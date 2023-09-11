import { Button, Card, Input, Modal, Select, Table, notification } from 'antd'
import { useEffect, useState } from 'react'
import RoomForm from './Form'
import { deleteRoom, getAllRoom } from '../../../services/room'
import makeColumns from '../../../utils/column'
import roomFields from './fields'
import { getAllBuilding } from '../../../services/building'

const Room = () => {
  const [mode, setMode] = useState('Data')
  const [itemEdit, setItemEdit] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [source, setSource] = useState([])
  const [filterBuilding, setFilterBuilding] = useState([])
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
      tmpData = source.filter((x) => x.idBuilding.includes(filter))
    else if (search !== '' && filter !== '')
      tmpData = source.filter(
        (x) =>
          x.name.toLowerCase().includes(search.toLowerCase()) ||
          x.idBuilding.includes(filter)
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
        await deleteRoom(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = makeColumns(roomFields, onEdit, onDelete)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getAllRoom()
    setSource(response)
    const resBuilding = await getAllBuilding()
    const buildingItems = []
    resBuilding.forEach((item) => {
      buildingItems.push({
        value: item.id,
        label: item.name,
      })
    })
    setFilterBuilding(buildingItems)
    setLoading(false)
  }

  return (
    <>
      {contextHolderModal}
      {contextHolderNotify}
      {mode === 'Data' ? (
        <Card
          title="Data Ruangan"
          extra={
            <div className="action-card">
              <Input
                placeholder="Pencarian..."
                className="action-search"
                onChange={(e) => onSearch(e.target.value)}
              />
              <Select
                placeholder="Gedung"
                allowClear={true}
                className="action-filter"
                options={filterBuilding}
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
        <RoomForm
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

export default Room
