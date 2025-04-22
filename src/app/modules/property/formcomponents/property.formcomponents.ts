export const propertyFormComponents = {
	formId: 'property',
	title: 'Property',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill property title'
				},
				{
					name: 'Label',
					value: 'Name'
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill property description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Text',
			key: 'address',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter property address'
				},
				{
					name: 'Label',
					value: 'Address'
				}
			]
		},
		{
			name: 'Text',
			key: 'type',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter property type'
				},
				{
					name: 'Label',
					value: 'Type'
				}
			]
		},
		{
			name: 'Number',
			key: 'area',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter property area'
				},
				{
					name: 'Label',
					value: 'Area (sq. m)'
				}
			]
		},
		{
			name: 'Number',
			key: 'price',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter property price'
				},
				{
					name: 'Label',
					value: 'Price'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Photo',
					value: 'photo'
				}
			]
		}
	]
};
