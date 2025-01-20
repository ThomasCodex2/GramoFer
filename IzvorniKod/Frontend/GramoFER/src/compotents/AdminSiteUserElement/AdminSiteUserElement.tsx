import styles from "./AdminSiteUserElement.module.css";

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
  const handleBan = async () => {
    const token = localStorage.getItem("aToken");
    //const id = parseInt(userId);
    try {
      const response = await fetch(
        `https://gramofer.work.gd/api/admintable/user/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //nothing to send again
        }
      );
      if (response.ok) {
        alert("Deleted user sucessfully");
        window.location.reload();
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
      <div className={styles.list_element}>{email}</div>
      <div>{firstName}</div>
      <div>{lastName}</div>
      <div>{username}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/x_icon.png" alt="" onClick={handleBan} />
        </div>
      </div>
    </>
  );
};
export default AdminSiteUserElement;
