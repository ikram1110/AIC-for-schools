import { Tag } from 'antd'
import { getAllBuilding } from 'src/services/building'

const roomFields = [
  {
    label: 'Kode Ruangan',
    name: 'code',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Gedung',
    name: 'nameBuilding',
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
    require: true,
    type: 'input',
  },
  {
    label: 'Kapasitas Belajar',
    name: 'lessonCapacity',
    require: false,
    type: 'number',
  },
  {
    label: 'Kapasitas Ujian',
    name: 'testCapacity',
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
export default roomFields
