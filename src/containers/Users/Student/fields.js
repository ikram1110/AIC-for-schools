import { Image } from 'antd'
import { getAllUnit } from 'src/services/unit'

const inventoryFields = [
  {
    label: 'Kode',
    name: 'code',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
    fixed: 'left',
  },
  {
    label: 'Nama Unit',
    name: 'nameUnit',
    render: null,
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
    idInput: 'idUnit',
  },
  {
    label: 'Nama',
    name: 'name',
    render: null,
    require: true,
    type: 'input',
    inputItems: null,
    fixed: 'left',
  },
  {
    label: 'Keterangan',
    name: 'description',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Kondisi',
    name: 'condition',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Jumlah',
    name: 'quantity',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Asal',
    name: 'source',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Tanggal Penerimaan',
    name: 'receiptDate',
    render: null,
    require: false,
    type: 'date',
    inputItems: null,
  },
  {
    label: 'Penanggung Jawab',
    name: 'responsiblePerson',
    render: null,
    require: false,
    type: 'input',
    inputItems: null,
  },
  {
    label: 'Gambar',
    name: 'image',
    render: (_, { image }) => (
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
          {image === null ? (
            <i className="ri-file-damage-line" style={{ fontSize: '24px' }}></i>
          ) : (
            <Image
              width={60}
              src={
                process.env.REACT_APP_API_URL +
                '/public/images/inventory/' +
                image
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
    inputItems: null,
  },
  {
    label: 'Kapasitas',
    name: 'capacity',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Panjang (m)',
    name: 'length',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Tinggi (m)',
    name: 'height',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
  {
    label: 'Lebar (m)',
    name: 'width',
    render: null,
    require: false,
    type: 'number',
    inputItems: null,
  },
]
export default inventoryFields
