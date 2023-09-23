import { Tag } from 'antd'
import { getAllUnit } from 'src/services/unit'

const departmentFields = [
  {
    label: 'Kode Jurusan',
    name: 'code',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Unit',
    name: 'nameUnit',
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
    require: true,
    type: 'input',
  },
  {
    label: 'Bidang Keahlian',
    name: 'expertise',
    require: false,
    type: 'input',
  },
  {
    label: 'Kompetensi Umum',
    name: 'generalCompetence',
    require: false,
    type: 'input',
  },
  {
    label: 'Kompetensi Khusus',
    name: 'specialCompetence',
    require: false,
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
export default departmentFields
