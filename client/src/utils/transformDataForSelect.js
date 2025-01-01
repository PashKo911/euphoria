export const transformOptions = (options) => {
	return options.map((option) => ({
		value: option._id,
		label: option.label,
		color: option?.value,
	}))
}

export const searchSelectedOptions = (selectedOptionsIdArr, optionsArr) => {
	return optionsArr.filter((option) => selectedOptionsIdArr.includes(option.value))
}
