import { Button, Card, Input, Modal, Table, notification } from 'antd'
import { useEffect, useState } from 'react'
import AcademicYearForm from './Form'
import {
  deleteAcademicYear,
  getAllAcademicYear,
} from '../../../services/academicyear'
import makeColumns from '../../../utils/column'
import academicYearFields from './fields'

const AcademicYear = () => {
  const [mode, setMode] = useState('Data')
  const [itemEdit, setItemEdit] = useState({})
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)
  const [source, setSource] = useState([])
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
        await deleteAcademicYear(id)
        getData()
        setLoadingDel(false)
      },
    })
  }

  const columns = makeColumns(academicYearFields, onEdit, onDelete)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    setLoading(true)
    const response = await getAllAcademicYear()
    setSource(response)
    setLoading(false)
  }

  return (
    <>
      {contextHolderModal}
      {contextHolderNotify}
      {mode === 'Data' ? (
        <Card
          title="Data Tahun Akademik"
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
      ) : (
        <AcademicYearForm
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

export default AcademicYear
