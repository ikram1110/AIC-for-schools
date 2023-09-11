import { Button, Card, Input, Modal, Table, notification } from 'antd'
import { useEffect, useState } from 'react'
import UnitForm from './Form'
import { deleteUnit, getAllUnit } from '../../../services/unit'
import makeColumns from '../../../utils/column'
import unitFields from './fields'

const Unit = () => {
  const [mode, setMode] = useState('Data')
  const [itemEdit, setItemEdit] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [source, setSource] = useState([])
  const [searchSource, setSearchSource] = useState([])

  const [modal, contextHolderModal] = Modal.useModal()
  const [notify, contextHolderNotify] = notification.useNotification()

  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )

  const onSearch = (text) => {
    if (text === '') setSearchSource([])
    else {
      const tmpData = source.filter((x) => x.name.includes(text))
      setSearchSource(tmpData)
    }
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
        await deleteUnit(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = makeColumns(unitFields, onEdit, onDelete)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getAllUnit()
    setSource(response)
    setLoading(false)
  }

  return (
    <>
      {contextHolderModal}
      {contextHolderNotify}
      {mode === 'Data' ? (
        <Card
          title="Data Unit"
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
            dataSource={searchSource.length === 0 ? source : searchSource}
            pagination={{
              showTotal: (total) => `Total ${total} items`,
              showSizeChanger: true,
            }}
            loading={loading}
            scroll={{ y: vh - 340 }}
          />
        </Card>
      ) : (
        <UnitForm
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

export default Unit
