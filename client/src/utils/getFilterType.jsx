import SizeInput from '../components/inputs/SizeInput'
import CategoryInput from '../components/inputs/CategoryInput'
import ColorsInput from '../components/inputs/ColorsInput'
import SliderInput from '../components/inputs/SliderInput'

const filterComponents = {
	price: (props) => <SliderInput min={props.minPrice} max={props.maxPrice} {...props} />,
	styles: (props) => <CategoryInput {...props} />,
	colors: (props) => <ColorsInput {...props} />,
	sizes: (props) => <SizeInput {...props} />,
}

export default function getFilterType(filterType, additionalProps) {
	const Component = filterComponents[filterType]
	return Component ? (
		<Component
			filterType={filterType}
			key={additionalProps._id || additionalProps.label}
			{...additionalProps}
		/>
	) : null
}
