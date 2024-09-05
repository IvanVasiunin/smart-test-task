import { useUsersDispatch } from "../../store/hooks";
import { inputChange } from "../../store/users-slice";
import { type User } from "../../App";
import TableRow from "../TableRow/TableRow";
import styles from "./table.module.css";

type UsersTableProps = {
  users: User[];
};

export default function Table({ users }: UsersTableProps) {
  const dispatch = useUsersDispatch();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (
      name === "name" ||
      name === "username" ||
      name === "email" ||
      name === "phone"
    ) {
      dispatch(inputChange({ field: name, value }));
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
        <tr>
          <td>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles.input}
                onChange={handleInputChange}
                type="text"
                name="name"
                placeholder="Search..."
              />
            </div>
          </td>
          <td>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles.input}
                onChange={handleInputChange}
                type="text"
                name="username"
                placeholder="Search..."
              />
            </div>
          </td>
          <td>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles.input}
                onChange={handleInputChange}
                type="text"
                name="email"
                placeholder="Search..."
              />
            </div>
          </td>
          <td>
            <div className={styles["input-wrapper"]}>
              <input
                className={styles.input}
                onChange={handleInputChange}
                type="text"
                name="phone"
                placeholder="Search..."
              />
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={4} className={styles.noUsers}>
              No users found.
            </td>
          </tr>
        ) : (
          users.map((user) => <TableRow key={user.id} user={user} />)
        )}
      </tbody>
    </table>
  );
}
