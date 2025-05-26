export const propertyrecordFormComponents = {
	formId: 'propertyrecord',
	title: 'Record',
	components: [
		{
			name: 'Text',
			key: 'name',
			fields: [
				{ name: 'Label', value: 'Event Name' },
				{ name: 'Placeholder', value: 'Enter event name' },
				{ name: 'Required', value: true }
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill record description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Select',
			key: 'type',
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose type of record'
				},
				{
					name: 'Label',
					value: 'Type'
				},
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
			name: 'Number',
			key: 'cost',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter cost'
				},
				{
					name: 'Label',
					value: 'Cost'
				}
			]
		},
		{
			name: 'Date',
			key: 'date',
			fields: [
				{
					name: 'Placeholder',
					value: 'Event Date'
				},
				{
					name: 'Label',
					value: 'Select event date'
				}
			]
		},
		{
			name: 'Select',
			key: 'status',
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose status'
				},
				{
					name: 'Label',
					value: 'Status'
				},
				{
					name: 'Items',
					value: ['planned', 'in progress', 'done']
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Photo',
					value: 'Upload a record photo'
				}
			]
		}
	]
};
