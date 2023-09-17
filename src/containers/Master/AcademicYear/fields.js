import { Tag } from 'antd'

const academicYearFields = [
  {
    label: 'Kode Tahun',
    name: 'code',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Tahun',
    name: 'name',
    require: true,
    type: 'input',
  },
  {
    label: 'Keterangan',
    name: 'description',
    require: false,
    type: 'input',
  },
  {
    label: 'Status Aktif',
    name: 'active',
    render: (_, { active }) => (
      <Tag color={active ? 'green' : 'red'}>{active ? 'YA' : 'TIDAK'}</Tag>
    ),
    require: true,
    type: 'radio',
    inputItems: [
      {
        value: true,
        label: 'Ya',
      },
      {
        value: false,
        label: 'Tidak',
      },
    ],
  },
]
export default academicYearFields
