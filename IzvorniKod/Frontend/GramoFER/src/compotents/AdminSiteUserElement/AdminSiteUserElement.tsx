import styles from "./AdminSiteUserElement.module.css";

interface AdminSiteUserElementProps {
  email: string;
  firstname: string;
  lastname: string;
  username: string;
}

const AdminSiteUserElement: React.FC<AdminSiteUserElementProps> = ({
  email,
  firstname,
  lastname,
  username,
}) => {
  return (
    <>
      <div className={styles.list_element}>{email}</div>
      <div>{firstname}</div>
      <div>{lastname}</div>
      <div>{username}</div>
      <div className={styles.exchange_buttons}>
        <div>
          <img src="/images/x_icon.png" alt="" />
        </div>
      </div>
    </>
  );
};
export default AdminSiteUserElement;
