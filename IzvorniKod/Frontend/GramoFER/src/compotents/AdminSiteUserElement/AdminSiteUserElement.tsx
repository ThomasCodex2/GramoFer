import styles from "./AdminSiteUserElement.module.css";
import { useNavigate } from "react-router-dom";
interface AdminSiteUserElementProps {
  userId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
}

const AdminSiteUserElement: React.FC<AdminSiteUserElementProps> = ({
  userId,
  username,
  email,
  firstName,
  lastName,
  registrationDate,
}) => {
  const navigate = useNavigate();
  const handleBan = async () => {
    const token = localStorage.getItem("aToken");
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/admintable/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        alert("Deleted user sucessfully");
        navigate("/admin-site");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className={styles.user_element} data-full-text={email}>
        {email}
      </div>
      <div className={styles.user_element} data-full-text={firstName}>
        {firstName}
      </div>
      <div className={styles.user_element} data-full-text={lastName}>
        {lastName}
      </div>
      <div className={styles.user_element} data-full-text={username}>
        {username}
      </div>
      <div>{registrationDate.toLocaleDateString()}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/x_icon.png" alt="" onClick={handleBan} />
        </div>
      </div>
    </>
  );
};
export default AdminSiteUserElement;
