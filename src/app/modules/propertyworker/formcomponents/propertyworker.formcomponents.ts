export const propertyworkerFormComponents = {
	formId: 'propertyworker',
	title: 'Propertyworker',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter full name'
				},
				{
					name: 'Label',
					value: 'Name'
				}
			]
		},
		{
			name: 'Text',
			key: 'region',
			fields: [
				{ name: 'Placeholder', value: 'Enter region' },
				{ name: 'Label', value: 'Region' }
			]
		},
		{
			name: 'Text',
			key: 'city',
			fields: [
				{ name: 'Placeholder', value: 'Enter city' },
				{ name: 'Label', value: 'City' }
			]
		},

		{
			name: 'Text',
			key: 'position',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter job position'
				},
				{
					name: 'Label',
					value: 'Position'
				}
			]
		},
		{
			name: 'Number',
			key: 'experience',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter years of experience'
				},
				{
					name: 'Label',
					value: 'Experience (Years)'
				}
			]
		},
		{
			name: 'Text',
			key: 'task',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter current task or responsibility'
				},
				{
					name: 'Label',
					value: 'Task'
				}
			]
		},
		{
			name: 'Text',
			key: 'status',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Available / On-site / Busy'
				},
				{
					name: 'Label',
					value: 'Status'
				}
			]
		},
		{
			name: 'Text',
			key: 'phone_number',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: '+380 XX XXX XX XX'
				},
				{
					name: 'Label',
					value: 'Phone Number'
				}
			]
		},
		{
			name: 'Text',
			key: 'email',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'example@email.com'
				},
				{
					name: 'Label',
					value: 'Email'
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			focused: true,
			fields: [
				{
					name: 'Photo',
					value: 'Upload a worker photo'
				}
			]
		}
	]
};
