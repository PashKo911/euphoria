import { useState } from 'react'

import InfoInput from '../../components/inputs/InfoInput'
import styles from './userForm.module.scss'
import ButtonPurple from '../../components/buttons/ButtonPurple'

const UserForm = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		country: '',
		role: '',
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	const fields = [
		{ id: 'firstName', label: 'First Name*', type: 'text', placeholder: 'First Name' },
		{ id: 'lastName', label: 'Last Name*', type: 'text', placeholder: 'Last Name' },
		{ id: 'email', label: 'Email*', type: 'email', placeholder: 'Email' },
		{ id: 'phoneNumber', label: 'Phone Number*', type: 'number', placeholder: 'Phone Number' },
		{ id: 'country', label: 'Country*', type: 'text', placeholder: 'Country' },
		{ id: 'type', label: 'Type', type: 'text', placeholder: 'Type' },
	]

	return (
		<form action="#" className={styles.form}>
			{fields.map(({ id, label, type, placeholder }) => (
				<InfoInput
					key={id}
					id={id}
					label={label}
					type={type}
					name={id}
					placeholder={placeholder}
					value={formData[id]}
					onChange={handleChange}
				/>
			))}
			<ButtonPurple
				title={'Add new user'}
				style={{ gridColumn: 'span 2', width: 'max-content', justifySelf: 'center' }}
			/>
		</form>
	)
}

export default UserForm
