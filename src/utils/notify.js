const callNotify = (
  notify,
  res,
  mode,
  setLoading,
  getData,
  setMode,
  onReset
) => {
  if (res.status === 500) {
    notify.error({
      message: `Gagal ${mode === 'Tambah' ? 'menambah' : 'mengubah'} data`,
      description: res.data.error,
    })
    setLoading(false)
  } else {
    notify.success({
      message: `Berhasil ${mode === 'Tambah' ? 'menambah' : 'mengubah'} data`,
      description: '',
    })
    setLoading(false)
    getData()
    setMode('Data')
    onReset()
  }
}

export default callNotify
