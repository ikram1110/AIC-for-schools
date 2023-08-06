import { Dropdown } from "antd";
import logo from "../../assets/images/logo.svg";
import user from "../../assets/images/user.png";
import { getItem } from "../../utils/menu-item";

const HeaderNav = () => {
  const items = [
    getItem("profil", <i className="ri-user-line"></i>, "Profil"),
    getItem("logout", <i className="ri-logout-circle-r-line"></i>, "Logout"),
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="app-logo" width={64} />
        <h2
          style={{
            textAlign: "center",
            color: "#153131",
            marginTop: "0px",
            marginBottom: "0px",
            fontWeight: 400,
          }}
        >
          AIS for Schools
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span>Admin AIS</span>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <img
            src={user}
            alt="user"
            style={{
              width: "32px",
              height: "32px",
              objectFit: "cover",
              borderRadius: "50%",
              border: "1px solid #00B96B",
              marginLeft: "12px",
            }}
          />
        </Dropdown>
      </div>
    </div>
  );
};
export default HeaderNav;
