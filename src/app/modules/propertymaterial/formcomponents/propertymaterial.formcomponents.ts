export const propertymaterialFormComponents = {
	formId: 'propertymaterial',
	title: 'Propertymaterial',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill propertymaterial title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill propertymaterial description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
