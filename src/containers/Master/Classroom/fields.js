import { getAllBuilding } from 'src/services/building'
import { getAllDepartment } from 'src/services/department'
import { getAllUnit } from 'src/services/unit'

const classroomFields = [
  {
    label: 'Kode Kelas',
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
    label: 'Nama Kelas',
    name: 'name',
    require: true,
    type: 'input',
  },
  {
    label: 'Wali Kelas',
    name: 'nameEmployee',
    require: true,
    type: 'select',
    inputItems: [],
    idInput: 'idEmployee',
  },
  {
    label: 'Jurusan',
    name: 'nameDepartment',
    require: true,
    type: 'select',
    inputItems: await getAllDepartment().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idDepartment',
  },
  {
    label: 'Gedung',
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
    label: 'Ruangan',
    name: 'nameRoom',
    require: true,
    type: 'select',
    inputItems: [],
    idInput: 'idRoom',
  },
  {
    label: 'Jumlah Siswa',
    name: 'quantity',
    require: true,
    type: 'number',
  },
]
export default classroomFields
