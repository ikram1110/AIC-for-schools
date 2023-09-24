import { getAllUnit } from 'src/services/unit'

const lessonGroupFields = [
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
    label: 'Jenis Kelompok Mapel',
    name: 'type',
    require: true,
    type: 'input',
  },
  {
    label: 'Nama Kelompok Mapel',
    name: 'name',
    require: false,
    type: 'input',
  },
]
export default lessonGroupFields
