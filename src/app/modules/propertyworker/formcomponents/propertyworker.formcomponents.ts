export const propertyworkerFormComponents = {
	formId: 'propertyworker',
	title: 'Propertyworker',
	components: [
		{
			name: 'Text',
			key: 'fullname',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter full name'
				},
				{
					name: 'Label',
					value: 'Full Name'
				}
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
		}
	]
};
