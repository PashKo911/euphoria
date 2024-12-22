import React from 'react'
import { Link } from 'react-router-dom'
import { RiEditLine, RiDeleteBinLine } from 'react-icons/ri'
import { useState, useEffect } from 'react'
import ProcessMessage from '../process/ProcessMessage'
import useHttp from '../../hooks/useHttp'

import styles from './table.module.scss'

const UsersTable = () => {
	const [users, setUsers] = useState([])
	const { get, process } = useHttp()

	const fetchUsers = async () => {
		try {
			const data = await get('/users')
			console.log(data)
			if (data) {
				setUsers(data.users || [])
			}
		} catch (error) {
			console.error('Error fetching users:', error)
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
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={index}>
							<td>{user.username}</td>
							<td>{user.email}</td>
							<td>{user.role}</td>
							<td>
								<div className={styles.actions}>
									<Link to={user.editLink}>
										<RiEditLine size={20} />
									</Link>
									<button type="button" onClick={user.onDelete}>
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
