import { Link } from 'react-router-dom'
import navRoute from './nav-route'

const masterChild = []
const masterIdx = navRoute.findIndex((x) => x.label === 'Master')
const arrMaster = navRoute[masterIdx].children

arrMaster.forEach((item, index) => {
  masterChild.push({
    key: index,
    label: <Link to={item.href}>{item.label}</Link>,
  })
})

const userChild = []
const userIdx = navRoute.findIndex((x) => x.label === 'Pengguna')
const arrUser = navRoute[userIdx].children

arrUser.forEach((item, index) => {
  userChild.push({
    key: index,
    label: <Link to={item.href}>{item.label}</Link>,
  })
})

const academicChild = []
const academicIdx = navRoute.findIndex((x) => x.label === 'Akademik')
const arrAcademic = navRoute[academicIdx].children

arrAcademic.forEach((item, index) => {
  academicChild.push({
    key: index,
    label: <Link to={item.href}>{item.label}</Link>,
  })
})

const presenceChild = []
const presenceIdx = navRoute.findIndex(
  (x) => x.label === 'Absensi dan Penilaian'
)
const arrPresence = navRoute[presenceIdx].children

arrPresence.forEach((item, index) => {
  presenceChild.push({
    key: index,
    label: <Link to={item.href}>{item.label}</Link>,
  })
})

const reportChild = []
const reportIdx = navRoute.findIndex((x) => x.label === 'Laporan')
const arrReport = navRoute[reportIdx].children

arrReport.forEach((item, index) => {
  reportChild.push({
    key: index,
    label: <Link to={item.href}>{item.label}</Link>,
  })
})

const crumbDash = {
  href: '/',
  title: <i className="ri-dashboard-line"></i>,
}

const crumbChevron = (text) => {
  let icon = ''
  let items = []
  let withmenu = true
  switch (text) {
    case 'Master':
      icon = 'ri-school-line'
      items = masterChild
      break
    case 'Pengguna':
      icon = 'ri-group-line'
      items = userChild
      break
    case 'Akademik':
      icon = 'ri-graduation-cap-line'
      items = academicChild
      break
    case 'Absensi':
      icon = 'ri-list-check-3'
      items = presenceChild
      break
    case 'Inventaris':
      icon = 'ri-box-3-line'
      withmenu = false
      break
    case 'Keuangan':
      icon = 'ri-wallet-line'
      items = reportChild
      break
    case 'Laporan':
      icon = 'ri-file-chart-line'
      items = reportChild
      break
    default:
      icon = 'ri-school-line'
      break
  }
  return {
    title: (
      <>
        <i className={icon}></i>
        <span> {text}</span>
      </>
    ),
    menu: withmenu ? { items: items } : null,
  }
}

const breadCrumbItem = [
  {
    route: '/',
    items: [crumbDash],
  },
  {
    route: '/master/identitas-sekolah',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Identitas Sekolah',
      },
    ],
  },
  {
    route: '/master/kurikulum',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Kurikulum',
      },
    ],
  },
  {
    route: '/master/tahun-akademik',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Tahun Akademik',
      },
    ],
  },
  {
    route: '/master/gedung',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Gedung',
      },
    ],
  },
  {
    route: '/master/ruangan',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Ruangan',
      },
    ],
  },
  {
    route: '/master/unit',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Unit',
      },
    ],
  },
  {
    route: '/master/jurusan',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Jurusan',
      },
    ],
  },
  {
    route: '/master/ruang-kelas',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Ruang Kelas',
      },
    ],
  },
  {
    route: '/master/golongan',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Golongan',
      },
    ],
  },
  {
    route: '/master/jenis-ptk',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Jenis PTK',
      },
    ],
  },
  {
    route: '/master/jabatan',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Jabatan',
      },
    ],
  },
  {
    route: '/master/status-pegawai',
    items: [
      crumbDash,
      crumbChevron('Master'),
      {
        title: 'Status Pegawai',
      },
    ],
  },
  {
    route: '/pengguna/siswa',
    items: [
      crumbDash,
      crumbChevron('Pengguna'),
      {
        title: 'Siswa',
      },
    ],
  },
  {
    route: '/pengguna/pegawai',
    items: [
      crumbDash,
      crumbChevron('Pengguna'),
      {
        title: 'Pegawai',
      },
    ],
  },
  {
    route: '/akademik/kelompok-mata-pelajaran',
    items: [
      crumbDash,
      crumbChevron('Akademik'),
      {
        title: 'Kelompok Mata Pelajaran',
      },
    ],
  },
  {
    route: '/akademik/mata-pelajaran',
    items: [
      crumbDash,
      crumbChevron('Akademik'),
      {
        title: 'Mata Pelajaran',
      },
    ],
  },
  {
    route: '/akademik/jadwal-pelajaran',
    items: [
      crumbDash,
      crumbChevron('Akademik'),
      {
        title: 'Jadwal Pelajaran',
      },
    ],
  },
  {
    route: '/akademik/rentang-nilai',
    items: [
      crumbDash,
      crumbChevron('Akademik'),
      {
        title: 'Rentang Nilai',
      },
    ],
  },
  {
    route: '/absensi/siswa',
    items: [
      crumbDash,
      crumbChevron('Absensi'),
      {
        title: 'Absensi Siswa',
      },
    ],
  },
  {
    route: '/absensi/pegawai',
    items: [
      crumbDash,
      crumbChevron('Absensi'),
      {
        title: 'Absensi Pegawai',
      },
    ],
  },
  {
    route: '/penilaian/siswa',
    items: [
      crumbDash,
      crumbChevron('Absensi'),
      {
        title: 'Nilai Siswa',
      },
    ],
  },
  {
    route: '/inventaris',
    items: [crumbDash, crumbChevron('Inventaris')],
  },
  {
    route: '/keuangan/pembayaran-siswa',
    items: [
      crumbDash,
      crumbChevron('Keuangan'),
      {
        title: 'Pembayaran Siswa',
      },
    ],
  },
  // {
  //   route: '/keuangan/akun-biaya',
  //   items: [
  //     crumbDash,
  //     {
  //       title: titleIcon('Keuangan'),
  //       menu: { items: userChild },
  //     },
  //     {
  //       title: 'Pengaturan Pembayaran',
  //       menu: { items: userChild },
  //     },
  //     {
  //       title: 'Akun Biaya',
  //     },
  //   ],
  // },
  // finance miss
  {
    route: '/laporan/presensi-siswa',
    items: [
      crumbDash,
      crumbChevron('Laporan'),
      {
        title: 'Presensi Siswa',
      },
    ],
  },
  {
    route: '/laporan/presensi-pegawai',
    items: [
      crumbDash,
      crumbChevron('Laporan'),
      {
        title: 'Presensi Pegawai',
      },
    ],
  },
  {
    route: '/laporan/pembayaran',
    items: [
      crumbDash,
      crumbChevron('Laporan'),
      {
        title: 'Pembayaran',
      },
    ],
  },
  {
    route: '/laporan/keuangan',
    items: [
      crumbDash,
      crumbChevron('Laporan'),
      {
        title: 'Peuangan',
      },
    ],
  },
  {
    route: '/laporan/nilai',
    items: [
      crumbDash,
      crumbChevron('Laporan'),
      {
        title: 'Nilai',
      },
    ],
  },
]

export default breadCrumbItem
