import { Tag } from 'antd'
import { getAllUnit } from '../../../services/unit'

const roomFields = [
  {
    label: 'Kode Jurusan',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Nama Unit',
    name: 'nameUnit',
    render: null,
    require: true,
    type: 'select',
    inputItems: await getAllUnit().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idUnit',
  },
  {
    label: 'Nama Jurusan',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Kemampuan',
    name: 'expertise',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Kompetensi Umum',
    name: 'generalCompetence',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Kompetensi Khusus',
    name: 'specialCompetence',
    render: null,
    require: false,
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
export default roomFields
