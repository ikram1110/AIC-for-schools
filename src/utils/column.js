import { Button, Space } from 'antd'

const makeColumns = (fields, onEdit, onDelete, rightAction = false) => {
  const columns = []
  fields.forEach((item) => {
    columns.push({
      title: item.label,
      dataIndex: item.name,
      key: item.name,
      render: item.render,
      fixed: item.fixed ?? null,
    })
  })
  columns.push({
    title: 'Aksi',
    key: 'action',
    width: 90,
    fixed: rightAction ? 'right' : null,
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
  })
  return columns
}

export default makeColumns
