import { Tag } from 'antd'

const buildingFields = [
  {
    label: 'Kode Gedung',
    name: 'code',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Gedung',
    name: 'name',
    require: true,
    type: 'input',
  },
  {
    label: 'Jumlah Lantai',
    name: 'floor',
    render: (_, { floor }) => floor + ' Lantai',
    require: true,
    type: 'number',
  },
  {
    label: 'Panjang (m)',
    name: 'length',
    require: false,
    type: 'number',
  },
  {
    label: 'Tinggi (m)',
    name: 'height',
    require: false,
    type: 'number',
  },
  {
    label: 'Lebar (m)',
    name: 'width',
    require: false,
    type: 'number',
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
export default buildingFields
