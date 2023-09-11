import { Tag } from 'antd'

const academicYearFields = [
  {
    label: 'Kode Tahun',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Nama Tahun',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Keterangan',
    name: 'description',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
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
