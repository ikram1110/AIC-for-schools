import { Tag } from 'antd'

const curriculumFields = [
  {
    label: 'Nama Kurikulum',
    name: 'name',
    render: null,
    require: true,
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
export default curriculumFields
