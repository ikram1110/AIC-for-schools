const unitFields = [
  {
    label: 'Kode Unit',
    name: 'code',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Unit',
    name: 'name',
    require: true,
    type: 'input',
  },
  {
    label: 'Tipe',
    name: 'type',
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
    require: false,
    type: 'input',
  },
]
export default unitFields
