import { Image, Tag } from 'antd'
import { getAllGrade } from 'src/services/grade'
import { getAllEmployeeStatus } from 'src/services/employeestatus'
import { getAllPtkType } from 'src/services/ptktype'
import { getAllUnit } from 'src/services/unit'

const inventoryFields = [
  {
    label: 'Gambar',
    name: 'photo',
    render: (_, { photo }) => (
      <>
        <div
          style={{
            border: '1px solid #d3d3d3',
            borderRadius: '4px',
            padding: '2px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {photo === null ? (
            <i className="ri-file-damage-line" style={{ fontSize: '24px' }}></i>
          ) : (
            <Image
              width={60}
              src={
                process.env.REACT_APP_API_URL +
                '/public/images/employee/' +
                photo
              }
              preview={{
                mask: <i className="ri-search-eye-line"></i>,
              }}
            />
          )}
        </div>
      </>
    ),
    require: false,
    type: 'image',
    fixed: 'left',
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
    fixed: 'left',
    showInTable: false,
    idInput: 'idUnit',
  },
  {
    label: 'NIP',
    name: 'nip',
    require: true,
    type: 'input',
    fixed: 'left',
    showInTable: false,
  },
  {
    label: 'Password',
    name: 'password',
    require: true,
    type: 'password',
    showInTable: false,
    showInEdit: false,
  },
  {
    label: 'Nama',
    name: 'name',
    render: (_, { name, nip, nameUnit }) => (
      <>
        {name}
        <br />
        {nip}
        <br />
        {nameUnit}
        <br />
      </>
    ),
    require: true,
    type: 'input',
    fixed: 'left',
  },
  {
    label: 'Tempat Lahir',
    name: 'birthPlace',
    require: true,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Tanggal Lahir',
    name: 'birthDate',
    require: true,
    type: 'date',
    showInTable: false,
  },
  {
    label: 'Jenis Kelamin',
    name: 'gender',
    require: true,
    type: 'radio',
    inputItems: [
      {
        value: 'Laki-laki',
        label: 'Laki-laki',
      },
      {
        value: 'Perempuan',
        label: 'Perempuan',
      },
    ],
  },
  {
    label: 'Agama',
    name: 'religion',
    require: true,
    type: 'select',
    inputItems: [
      {
        value: 'Islam',
        label: 'Islam',
      },
      {
        value: 'Kristen',
        label: 'Kristen',
      },
      {
        value: 'Katolik',
        label: 'Katolik',
      },
      {
        value: 'Hindu',
        label: 'Hindu',
      },
      {
        value: 'Budha',
        label: 'Budha',
      },
      {
        value: 'Konghucu',
        label: 'Konghucu',
      },
    ],
    showInTable: false,
  },
  {
    label: 'No. HP',
    name: 'phone',
    require: false,
    type: 'number',
    numberControl: false,
  },
  {
    label: 'Email',
    name: 'email',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Alamat',
    name: 'address',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'RT/RW',
    name: 'rtrw',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Dusun',
    name: 'dusun',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Kelurahan',
    name: 'kelurahan',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Kecamatan',
    name: 'kecamatan',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Kabupaten',
    name: 'kabupaten',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Kode Pos',
    name: 'postalCode',
    require: false,
    type: 'number',
    numberControl: false,
    showInTable: false,
  },
  {
    label: 'NUPTK',
    name: 'nuptk',
    require: false,
    type: 'number',
    numberControl: false,
    showInTable: false,
  },
  {
    label: 'Bidang Studi',
    name: 'studyExpertise',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Jenis PTK',
    name: 'namePtkType',
    require: true,
    type: 'select',
    inputItems: await getAllPtkType().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idPtkType',
  },
  {
    label: 'Tugas Tambahan',
    name: 'optionalTask',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Status Pegawai',
    name: 'nameEmployeeStatus',
    require: true,
    type: 'select',
    inputItems: await getAllEmployeeStatus().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idEmployeeStatus',
  },
  {
    label: 'Status Keaktifan',
    name: 'activeStatus',
    render: (_, { activeStatus }) => (
      <Tag color={activeStatus ? 'green' : 'red'}>
        {activeStatus ? 'YA' : 'TIDAK'}
      </Tag>
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
  {
    label: 'Status Nikah',
    name: 'marriageStatus',
    require: false,
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
    showInTable: false,
  },
  {
    label: 'NIK',
    name: 'nik',
    require: false,
    type: 'number',
    numberControl: false,
    showInTable: false,
  },
  {
    label: 'SK CPNS',
    name: 'skCpns',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Tanggal CPNS',
    name: 'cpnsDate',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'SK Pengangkatan',
    name: 'appointmentSk',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'TMT Pengangkatan',
    name: 'appointmentTmt',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Lemb. Pengangkatan',
    name: 'appointmentAgency',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Golongan',
    name: 'nameGrade',
    require: true,
    type: 'select',
    inputItems: await getAllGrade().then((results) => {
      const response = results.map((result) => {
        return {
          value: result.id,
          label: result.name,
        }
      })
      return response
    }),
    idInput: 'idGrade',
    showInTable: false,
  },
  {
    label: 'Sumber Gaji',
    name: 'salarySource',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Ahli Laboratorium',
    name: 'laboratoryExpert',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Nama Ibu Kandung',
    name: 'biologicalMotherName',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Nama Suami/Istri',
    name: 'spouseName',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'NIP Suami/Istri',
    name: 'spouseNip',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Pekerjaan Suami/Istri',
    name: 'spouseWork',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'TMT PNS',
    name: 'tmtPns',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Lisensi Kepsek',
    name: 'headmasterLicense',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Jml Sekolah Binaan',
    name: 'builtSchoolsCount',
    require: false,
    type: 'number',
    showInTable: false,
  },
  {
    label: 'Diklat Kepengawasan',
    name: 'supervisionTraining',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Mampu Handle KK',
    name: 'kkHandle',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Keahlian Breile',
    name: 'breileExpert',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Keahlian B.Isyarat',
    name: 'signLangExpert',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'Kewarganegaraan',
    name: 'citizenship',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'NIY NIGK',
    name: 'niynigk',
    require: false,
    type: 'input',
    showInTable: false,
  },
  {
    label: 'NPWP',
    name: 'npwp',
    require: false,
    type: 'number',
    numberControl: 'false',
    showInTable: false,
  },
]
export default inventoryFields
