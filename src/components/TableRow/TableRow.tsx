import { type User } from "../../App";

import styles from './tablerow.module.css';

type TableRowProps = {
  user: User;
};

export default function TableRow({ user }: TableRowProps) {
  return (
    <tr className={styles.tr}>
      <td>{user.name}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
    </tr>
  );
}
