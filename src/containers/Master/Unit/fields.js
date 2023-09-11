const unitFields = [
  {
    label: 'Kode Unit',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Nama Unit',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Tipe',
    name: 'type',
    render: null,
    require: true,
    type: 'radio',
    inputItems: [
      {
        value: 'Pendidikan',
        label: 'Pendidikan',
      },
      {
        value: 'Bisnis',
        label: 'Bisnis',
      },
    ],
  },
  {
    label: 'Keterangan',
    name: 'description',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
]
export default unitFields
