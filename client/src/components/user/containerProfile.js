import { Button } from "react-bootstrap";
import Profile from "../../Assets/unnamed.jpg";
import { useNavigate } from "react-router-dom";

const styles = {
  containerProfile: {
    width: "1050px",
    background: "#FFD9D9",
    borderRadius: "8px",
    padding: "40px 44px 30px 35px",

    fontWeight: "600",
  },
  button: {
    width: "100%",
    height: "50px",
    marginTop: "18px",
    background: "#D60000",
    borderRadius: "5px",
    fontWeight: "600",
  },
  logo: {
    fontSize: "30px",
    marginRight: "22px",
  },
  label: {
    marginBottom: "9px",
    display: "block",
    fontSize: "14px",
    fontWeight: "900",
  },
  profile: {
    width: "226.67px",
    display: "block",
    borderRadius: "4px",
  },
};

export default function ContainerProfile() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };
  return (
    <div>
      <p
        style={{
          fontFamily: " Times New Roman",
          fontWeight: "bold",
          fontSize: "36px",
          marginBottom: "30px",
        }}
      >
        Profile
      </p>
      <div
        className="d-flex justify-content-between"
        style={styles.containerProfile}
      >
        <div>
          <div
            className="d-flex align-items-center "
            style={{ marginBottom: "40px" }}
          >
            <div>
              <i class="bi bi-envelope-fill" style={styles.logo}></i>
            </div>
            <div>
              <label style={styles.label}>Egi Gans</label>
              <label style={{ color: "#8A8C90" }}>Email</label>
            </div>
          </div>
          <div
            className="d-flex align-items-center "
            style={{ marginBottom: "40px" }}
          >
            <div>
              <i class="bi bi-gender-ambiguous " style={styles.logo}></i>
            </div>
            <div>
              <label style={styles.label}>Male</label>
              <label style={{ color: "#8A8C90" }}>Gender</label>
            </div>
          </div>
          <div
            className="d-flex align-items-center "
            style={{ marginBottom: "40px" }}
          >
            <div>
              <i class="bi bi-telephone-fill" style={styles.logo}></i>
            </div>
            <div>
              <label style={styles.label}>0812-8623-8911</label>
              <label style={{ color: "#8A8C90" }}>Mobile phone</label>
            </div>
          </div>
          <div
            className="d-flex align-items-center "
            style={{ marginBottom: "40px" }}
          >
            <div>
              <i class="bi bi-geo-alt-fill" style={styles.logo}></i>
            </div>
            <div>
              <label style={styles.label}>
                Perumahan Permata Bintaro Residence C-3
              </label>
              <label style={{ color: "#8A8C90" }}>Address</label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <img src={Profile} alt="" style={styles.profile} />
            <Button style={styles.button} onClick={handleEditProfile}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
