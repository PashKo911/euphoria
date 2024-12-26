const transformOptions = (options) => {
	return options.map((option) => ({
		value: option._id,
		label: option.name,
	}))
}

export default transformOptions
