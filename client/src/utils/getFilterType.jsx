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
/*
const data = {
	price: {
		title: 'Price',
		items: [<SliderInput key={uuid()} min={20} max={1000} />],
	},
	colors: {
		title: 'Colors',
		items: [
			<ColorsInput title={'Purple'} color={'#8434e1'} key={'#8434e1'} />,
			<ColorsInput title={'Black'} color={'#000000'} key={'#000000'} />,
			<ColorsInput title={'Red'} color={'#F35528'} key={'#F35528'} />,
			<ColorsInput title={'Orange'} color={'#F16F2B'} key={'#F16F2B'} />,
			<ColorsInput title={'Navy'} color={'#345EFF'} key={'#345EFF'} />,
		],
	},
	size: {
		title: 'Size',
		items: [
			<SizeInput title={'XXS'} key={'XXS'} />,
			<SizeInput title={'XS'} key={'XS'} />,
			<SizeInput title={'S'} key={'S'} />,
			<SizeInput title={'M'} key={'M'} />,
			<SizeInput title={'L'} key={'L'} />,
		],
	},
	style: {
		title: 'Dress Style',
		items: [
			<CategoryInput title={'Classic'} key={'Classic'} />,
			<CategoryInput title={'Casual'} key={'Casual'} />,
			<CategoryInput title={'Business'} key={'Business'} />,
		],
	},
}
	*/
