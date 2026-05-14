import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import useHttp from '../../hooks/useHttp'
import useRouteAccessSwitcher from '../../hooks/useRouteAccessSwitcher'

import ProcessMessage from '../process/ProcessMessage'
import Select from '../slelects/Select'

import styles from './table.module.scss'

const UsersTable = () => {
	const [users, setUsers] = useState([])
	const [types, setTypes] = useState([])
	const { get, del, put, processes } = useHttp()
	const hasAccess = useRouteAccessSwitcher(['admin'])

	const fetchUsers = async () => {
		try {
			const data = await get('/dashboard/users')
			if (data) {
				const formattedTypes = data.types.map((type) => ({
					label: type.name,
					value: type._id,
				}))

				setUsers(data.users || [])
				setTypes(formattedTypes || [])
			}
		} catch (error) {
			console.error('Error fetching users:', error)
		}
	}

	const handleDelete = async (id) => {
		const previousUsers = [...users]

		setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id))

		try {
			await del('/dashboard/users/delete', id)
		} catch (error) {
			console.error('Error deleting user:', error)
			setUsers(previousUsers)
		}
	}

	const handleUpdate = async (userId, typeId) => {
		try {
			const updatedUser = await put(`/dashboard/users/update/${userId}`, { typeId })

			setUsers((prevUsers) =>
				prevUsers.map((user) => (user._id === userId ? { ...user, type: updatedUser.type } : user))
			)
		} catch (error) {
			console.error('Error updating user type:', error)
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return (
		<>
			<table className={styles.tableUsers}>
				<thead>
					<tr>
						<th className={styles.name}>Name</th>
						<th className={styles.email}>Email</th>
						<th>Role</th>
						{hasAccess && <th>Actions</th>}
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td className={styles.name}>{user.name}</td>
							<td className={styles.email}>{user.email}</td>
							<td>
								{hasAccess ? (
									<Select
										options={types}
										placeholder={user?.type?.name}
										onChange={(option) => handleUpdate(user._id, option.value)}
										styles={{ minWidth: 'auto', maxWidth: 120 }}
									/>
								) : (
									user?.type?.name
								)}
							</td>
							{hasAccess && (
								<td>
									<div className={styles.actions}>
										<button type="button" onClick={() => handleDelete(user._id)}>
											<RiDeleteBinLine size={20} />
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			<ProcessMessage process={processes['/dashboard/users']} items={users} />
		</>
	)
}

export default UsersTable
