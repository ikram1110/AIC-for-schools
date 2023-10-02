import { Tag } from 'antd'

const buildingFields = [
  {
    label: 'Kode Gedung',
    name: 'code',
    require: true,
    type: 'input',
    width: 130,
    fixed: 'left',
  },
  {
    label: 'Nama Gedung',
    name: 'name',
    require: true,
    type: 'input',
    width: 180,
    fixed: 'left',
  },
  {
    label: 'Jumlah Lantai',
    name: 'floor',
    render: (_, { floor }) => floor + ' Lantai',
    require: true,
    type: 'number',
    width: 100,
    align: 'right',
  },
  {
    label: 'Panjang (m)',
    name: 'length',
    require: false,
    type: 'number',
    width: 100,
    align: 'right',
  },
  {
    label: 'Tinggi (m)',
    name: 'height',
    require: false,
    type: 'number',
    width: 100,
    align: 'right',
  },
  {
    label: 'Lebar (m)',
    name: 'width',
    require: false,
    type: 'number',
    width: 100,
    align: 'right',
  },
  {
    label: 'Keterangan',
    name: 'description',
    require: false,
    type: 'input',
    width: 200,
  },
  {
    label: 'Status Aktif',
    name: 'active',
    render: (_, { active }) => (
      <Tag color={active ? 'green' : 'red'}>{active ? 'YA' : 'TIDAK'}</Tag>
    ),
    require: true,
    type: 'radio',
    width: 110,
    align: 'center',
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
