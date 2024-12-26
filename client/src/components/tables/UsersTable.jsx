import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import useHttp from '../../hooks/useHttp'
import { useAuth } from '../../context/AuthContext'

import ProcessMessage from '../process/ProcessMessage'
import Select from '../slelects/Select'

import styles from './table.module.scss'

const UsersTable = () => {
	const [users, setUsers] = useState([])
	const [types, setTypes] = useState([])
	const { isAuthenticated, user } = useAuth()
	const { get, del, put, process } = useHttp()

	const fetchUsers = async () => {
		try {
			const data = await get('/users')
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
			await del('/users/delete', id)
		} catch (error) {
			console.error('Error deleting user:', error)
			setUsers(previousUsers)
		}
	}

	const handleUpdate = async (userId, typeId) => {
		try {
			const updatedUser = await put(`/users/update/${userId}`, { typeId })

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
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.name}>Name</th>
						<th className={styles.email}>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td className={styles.name}>{user.name}</td>
							<td className={styles.email}>{user.email}</td>
							<td>
								<Select
									options={types}
									placeholder={user?.type?.name}
									onChange={(option) => handleUpdate(user._id, option.value)}
								/>
							</td>
							<td>
								<div className={styles.actions}>
									<button type="button" onClick={() => handleDelete(user._id)}>
										<RiDeleteBinLine size={20} />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ProcessMessage process={process} items={users} />
		</>
	)
}

export default UsersTable
