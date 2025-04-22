export const propertyrecordFormComponents = {
	formId: 'propertyrecord',
	title: 'Record',
	components: [
		{
			name: 'Select',
			key: 'type',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill propertyrecord title'
				},
				{
					name: 'Items',
					value: [
						'sell / buy payment',
						'service',
						'materials',
						'rent payment',
						'incident'
					]
				}
			]
		},
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill propertyrecord title'
				},
				{
					name: 'Label',
					value: 'Title'
				}
			]
		},

		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill propertyrecord description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		}
	]
};
