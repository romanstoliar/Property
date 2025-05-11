export const propertyrecordFormComponents = {
	formId: 'propertyrecord',
	title: 'Record',
	components: [
		{
			name: 'Text',
			key: 'name',
			fields: [
				{ name: 'Label', value: 'Event Name' },
				{ name: 'Placeholder', value: 'Enter event name' }
			]
		},
		{
			name: 'Select',
			key: 'type',
			fields: [
				{ name: 'Label', value: 'Enter type of record' },
				{
					name: 'Items',
					value: [
						'sell / buy payment',
						'service',
						'utility bill',
						'inspection',
						'materials',
						'cleaning',
						'rent payment',
						'incident'
					]
				}
			]
		},
		{
			name: 'Textarea',
			key: 'description',
			fields: [
				{ name: 'Label', value: 'Description' },
				{ name: 'Placeholder', value: 'Enter description' }
			]
		},
		{
			name: 'Number',
			key: 'cost',
			fields: [
				{ name: 'Label', value: 'Cost' },
				{ name: 'Placeholder', value: 'Enter cost' }
			]
		}
	]
};
