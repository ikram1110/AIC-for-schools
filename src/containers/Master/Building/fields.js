import { Tag } from 'antd'

const buildingFields = [
  {
    label: 'Kode Gedung',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Nama Gedung',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Jumlah Lantai',
    name: 'floor',
    render: (_, { floor }) => floor + ' Lantai',
    require: true,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Panjang (m)',
    name: 'length',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Tinggi (m)',
    name: 'height',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Lebar (m)',
    name: 'width',
    render: null,
    require: false,
    type: 'number',
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
export default buildingFields
