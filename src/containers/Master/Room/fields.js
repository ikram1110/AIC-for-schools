import { Tag } from 'antd'
import { getAllBuilding } from '../../../services/building'

const roomFields = [
  {
    label: 'Kode Ruangan',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Nama Gedung',
    name: 'nameBuilding',
    render: null,
    require: true,
    type: 'select',
    inputItems: await getAllBuilding().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idBuilding',
  },
  {
    label: 'Nama Ruangan',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Kapasitas Belajar',
    name: 'lessonCapacity',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Kapasitas Ujian',
    name: 'testCapacity',
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
export default roomFields
