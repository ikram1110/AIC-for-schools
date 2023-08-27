import { Menu } from "antd";
import { getItem } from "../../utils/menu-item";
import { Link } from "react-router-dom";

const SideNav = (props) => {
  const { setHeader } = props;

  const onClickMenu = (text) => {
    setHeader(text);
  };

  const items = [
    getItem(
      "1",
      <i className="ri-dashboard-line"></i>,
      <Link to={"/"} onClick={() => onClickMenu("Dashboard")}>
        Dashboard
      </Link>
    ),
    getItem("2", <i className="ri-school-line"></i>, "Master", [
      getItem(
        "2-1",
        null,
        <Link
          to={"/master/identitas-sekolah"}
          onClick={() => onClickMenu("Identitas Sekolah")}
        >
          Identitas Sekolah
        </Link>
      ),
      getItem(
        "2-2",
        null,
        <Link to={"/master/kurikulum"} onClick={() => onClickMenu("Kurikulum")}>
          Kurikulum
        </Link>
      ),
      getItem(
        "2-3",
        null,
        <Link
          to={"/master/tahun-akademik"}
          onClick={() => onClickMenu("Tahun Akademik")}
        >
          Tahun Akademik
        </Link>
      ),
      getItem(
        "2-4",
        null,
        <Link to={"/master/gedung"} onClick={() => onClickMenu("Gedung")}>
          Gedung
        </Link>
      ),
      getItem(
        "2-5",
        null,
        <Link to={"/master/ruangan"} onClick={() => onClickMenu("Ruangan")}>
          Ruangan
        </Link>
      ),
      getItem(
        "2-6",
        null,
        <Link to={"/master/unit"} onClick={() => onClickMenu("Unit")}>
          Unit
        </Link>
      ),
      getItem(
        "2-8",
        null,
        <Link to={"/master/jurusan"} onClick={() => onClickMenu("Jurusan")}>
          Jurusan
        </Link>
      ),
      getItem(
        "2-9",
        null,
        <Link to={"/master/golongan"} onClick={() => onClickMenu("Golongan")}>
          Golongan
        </Link>
      ),
      getItem(
        "2-10",
        null,
        <Link to={"/master/jabatan"} onClick={() => onClickMenu("Jabatan")}>
          Jabatan
        </Link>
      ),
      getItem(
        "2-11",
        null,
        <Link
          to={"/master/status-kepegawaian"}
          onClick={() => onClickMenu("Status Kepegawaian")}
        >
          Status Kepegawaian
        </Link>
      ),
      getItem(
        "2-7",
        null,
        <Link to={"/master/kelas"} onClick={() => onClickMenu("Kelas")}>
          Kelas
        </Link>
      ),
    ]),
    getItem("3", <i className="ri-group-line"></i>, "Pengguna", [
      getItem(
        "3-1",
        null,
        <Link to={"/pengguna/siswa"} onClick={() => onClickMenu("User Siswa")}>
          Siswa
        </Link>
      ),
      getItem(
        "3-2",
        null,
        <Link
          to={"/pengguna/pegawai"}
          onClick={() => onClickMenu("User Pegawai")}
        >
          Pegawai
        </Link>
      ),
    ]),
    getItem("4", <i className="ri-graduation-cap-line"></i>, "Akademik", [
      getItem(
        "4-1",
        null,
        <Link
          to={"/akademik/kelompok-mata-pelajaran"}
          onClick={() => onClickMenu("Kelompok Mata Pelajaran")}
        >
          Kelompok Mata Pelajaran
        </Link>
      ),
      getItem(
        "4-2",
        null,
        <Link
          to={"/akademik/mata-pelajaran"}
          onClick={() => onClickMenu("Mata Pelajaran")}
        >
          Mata Pelajaran
        </Link>
      ),
      getItem(
        "4-3",
        null,
        <Link
          to={"/akademik/jadwal-pelajaran"}
          onClick={() => onClickMenu("Jadwal Pelajaran")}
        >
          Jadwal Pelajaran
        </Link>
      ),
      getItem(
        "4-4",
        null,
        <Link
          to={"/akademik/rentang-nilai"}
          onClick={() => onClickMenu("Rentang Nilai")}
        >
          Rentang Nilai
        </Link>
      ),
    ]),
    getItem("5", <i className="ri-list-check-3"></i>, "Absensi", [
      getItem(
        "5-1",
        null,
        <Link
          to={"/absensi/siswa"}
          onClick={() => onClickMenu("Absensi Siswa")}
        >
          Siswa
        </Link>
      ),
      getItem(
        "5-2",
        null,
        <Link
          to={"/absensi/pegawai"}
          onClick={() => onClickMenu("Absensi Pegawai")}
        >
          Pegawai
        </Link>
      ),
    ]),
    getItem(
      "6",
      <i className="ri-box-3-line"></i>,
      <Link to={"/inventaris"} onClick={() => onClickMenu("Inventaris")}>
        Inventasi
      </Link>
    ),
    getItem("7", <i className="ri-wallet-line"></i>, "Keuangan", [
      getItem(
        "7-1",
        null,
        <Link
          to={"/keuangan/pembayaran-siswa"}
          onClick={() => onClickMenu("Pembayaran Siswa")}
        >
          Pembayaran Siswa
        </Link>
      ),
      getItem("7-3", null, "Pengaturan Pembayaran", [
        getItem(
          "7-3-1",
          null,
          <Link
            to={"/keuangan/akun-biaya"}
            onClick={() => onClickMenu("Akun Biaya")}
          >
            Akun Biaya
          </Link>
        ),
        getItem(
          "7-3-2",
          null,
          <Link
            to={"/keuangan/pos-bayar"}
            onClick={() => onClickMenu("Pos Bayar")}
          >
            Pos Bayar
          </Link>
        ),
        getItem(
          "7-3-3",
          null,
          <Link
            to={"/keuangan/unit-pos"}
            onClick={() => onClickMenu("Unit Pos")}
          >
            Unit Pos
          </Link>
        ),
      ]),
      getItem("7-2", null, "Kas & Bank", [
        getItem(
          "7-2-1",
          null,
          <Link
            to={"/keuangan/saldo-awal"}
            onClick={() => onClickMenu("Saldo Awal")}
          >
            Saldo Awal
          </Link>
        ),
        getItem(
          "7-2-2",
          null,
          <Link
            to={"/keuangan/kas-keluar"}
            onClick={() => onClickMenu("Kas Keluar")}
          >
            Kas Keluar
          </Link>
        ),
        getItem(
          "7-2-3",
          null,
          <Link
            to={"/keuangan/kas-masuk"}
            onClick={() => onClickMenu("Kas Masuk")}
          >
            Kas Masuk
          </Link>
        ),
      ]),
    ]),
    getItem("8", <i className="ri-group-line"></i>, "Laporan", [
      getItem(
        "8-1",
        null,
        <Link
          to={"/laporan/presensi-siswa"}
          onClick={() => onClickMenu("Laporan Presensi Siswa")}
        >
          Presensi Siswa
        </Link>
      ),
      getItem(
        "8-2",
        null,
        <Link
          to={"/laporan/presensi-pegawai"}
          onClick={() => onClickMenu("Laporan Presensi Pegawai")}
        >
          Presensi Pegawai
        </Link>
      ),
      getItem(
        "8-3",
        null,
        <Link
          to={"/laporan/pembayaran"}
          onClick={() => onClickMenu("Laporan Pembayaran")}
        >
          Pembayaran
        </Link>
      ),
      getItem(
        "8-4",
        null,
        <Link
          to={"/laporan/keuangan"}
          onClick={() => onClickMenu("Laporan Keuangan")}
        >
          Keuangan
        </Link>
      ),
      getItem(
        "8-5",
        null,
        <Link to={"/laporan/nilai"} onClick={() => onClickMenu("Nilai Siswa")}>
          Nilai
        </Link>
      ),
    ]),
  ];
  return (
    <>
      <Menu
        theme="light"
        mode="inline"
        items={items}
        style={{ background: "none", borderInlineEnd: "none" }}
      />
    </>
  );
};
export default SideNav;
