const UserTable = () => {

    const [users, setUsers] = useState(allUsers) // all users will be the initial value of users

  return (
    <div><table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      User ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Username
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {user.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Link
                          className="hover:text-blue-500"
                          href={`/users/${user.id}`}
                        >
                          {user.username}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {user.role}
                      </td>
                      <td className="px-6 py-4">
                        <DeleteUser id={user.id as number} />
                      </td>
                      <td className="px-6 py-4">
                        <EditUser />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table></div>
  )
}
export default UserTable