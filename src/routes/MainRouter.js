import { Route, Routes } from 'react-router-dom'
import Dashboard from 'src/containers/Dashboard'
import SchoolIdentity from 'src/containers/Master/SchoolIdentity'
import Curriculum from 'src/containers/Master/Curriculum'
import AcademicYear from 'src/containers/Master/AcademicYear'
import Building from 'src/containers/Master/Building'
import Room from 'src/containers/Master/Room'
import Unit from 'src/containers/Master/Unit'
import Department from 'src/containers/Master/Department'
import Classroom from 'src/containers/Master/Classroom'
import Grade from 'src/containers/Master/Grade'
import PtkType from 'src/containers/Master/PtkType'
import Position from 'src/containers/Master/Position'
import EmployeeStatus from 'src/containers/Master/EmployeeStatus'
import Student from 'src/containers/Users/Student'
import Employee from 'src/containers/Users/Employee'
import LessonGroup from 'src/containers/Academic/LessonGroup'
import Lesson from 'src/containers/Academic/Lesson'
import LessonSchedule from 'src/containers/Academic/LessonSchedule'
import ValueRange from 'src/containers/Academic/ValueRange'
import Inventory from 'src/containers/Inventory'

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />

      <Route path="/master/identitas-sekolah" element={<SchoolIdentity />} />
      <Route path="/master/kurikulum" element={<Curriculum />} />
      <Route path="/master/tahun-akademik" element={<AcademicYear />} />
      <Route path="/master/gedung" element={<Building />} />
      <Route path="/master/ruangan" element={<Room />} />
      <Route path="/master/unit" element={<Unit />} />
      <Route path="/master/jurusan" element={<Department />} />
      <Route path="/master/ruang-kelas" element={<Classroom />} />
      <Route path="/master/golongan" element={<Grade />} />
      <Route path="/master/jenis-ptk" element={<PtkType />} />
      <Route path="/master/jabatan" element={<Position />} />
      <Route path="/master/status-pegawai" element={<EmployeeStatus />} />

      <Route path="/pengguna/siswa" element={<Student />} />
      <Route path="/pengguna/pegawai" element={<Employee />} />

      <Route
        path="/akademik/kelompok-mata-pelajaran"
        element={<LessonGroup />}
      />
      <Route path="/akademik/mata-pelajaran" element={<Lesson />} />
      <Route path="/akademik/jadwal-pelajaran" element={<LessonSchedule />} />
      <Route path="/akademik/rentang-nilai" element={<ValueRange />} />

      {/* <Route path="/inventaris" element={<Inventory />} /> */}

      <Route path="/inventaris" element={<Inventory />} />
    </Routes>
  )
}
export default MainRouter
