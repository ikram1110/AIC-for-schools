import { Route, Routes } from 'react-router-dom'
import Dashboard from '../containers/Dashboard'
import SchoolIdentity from '../containers/Master/SchoolIdentity'
import Curriculum from '../containers/Master/Curriculum'
import AcademicYear from '../containers/Master/AcademicYear'
import Building from '../containers/Master/Building'
import Room from '../containers/Master/Room'
import Unit from '../containers/Master/Unit'
import Department from '../containers/Master/Department'
import Class from '../containers/Master/Class'
import Position from '../containers/Master/Position'
import Inventory from '../containers/Inventory'

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
      <Route path="/master/golongan" element={<Class />} />
      <Route path="/master/jabatan" element={<Position />} />

      <Route path="/inventaris" element={<Inventory />} />
    </Routes>
  )
}
export default MainRouter
