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
					value: 'Enter property title'
				},
				{
					name: 'Label',
					value: 'Title'
				},
				{
					name: 'Required',
					value: true
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter detailed property description'
				},
				{
					name: 'Label',
					value: 'Description'
				}
			]
		},
		{
			name: 'Text',
			key: 'region',
			fields: [
				{ name: 'Placeholder', value: 'Enter region' },
				{
					name: 'Label',
					value: 'Region'
				}
			]
		},
		{
			name: 'Text',
			key: 'city',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter city'
				},
				{
					name: 'Label',
					value: 'City'
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
					value: 'Enter property type (e.g. apartment, house)'
				},
				{
					name: 'Label',
					value: 'Type'
				}
			]
		},
		{
			name: 'Select',
			key: 'buildingtype',
			fields: [
				{
					name: 'Placeholder',
					value: 'Choose a building type'
				},
				{
					name: 'Label',
					value: 'buildingtype'
				},
				{
					name: 'Items',
					value: ['new building', 'old stock']
				}
			]
		},
		{
			name: 'Number',
			key: 'area',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter property area in sq. m'
				},
				{
					name: 'Label',
					value: 'Area (sq. m)'
				}
			]
		},
		{
			name: 'Number',
			key: 'rooms',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter number of rooms'
				},
				{
					name: 'Label',
					value: 'Rooms'
				}
			]
		},
		{
			name: 'Number',
			key: 'floor',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter floor number'
				},
				{
					name: 'Label',
					value: 'Floor'
				}
			]
		},
		{
			name: 'Text',
			key: 'renovation',
			fields: [
				{
					name: 'Placeholder',
					value: 'Enter renovation details'
				},
				{
					name: 'Label',
					value: 'Renovation'
				}
			]
		},
		/*{
			name: 'Text',
			key: 'appliances',
			fields: [
				{
					name: 'Placeholder',
					value: 'List included appliances'
				},
				{
					name: 'Label',
					value: 'Appliances'
				}
			]
		},*/
		/*{
			name: 'Text',
			key: 'utilities',
			fields: [
				{
					name: 'Placeholder',
					value: 'List available utilities'
				},
				{
					name: 'Label',
					value: 'Utilities'
				}
			]
		},*/
		/*{
			name: 'Text',
			key: 'nearby',
			fields: [
				{
					name: 'Placeholder',
					value: 'List nearby infrastructure (shops, schools, transport)'
				},
				{
					name: 'Label',
					value: 'Nearby'
				}
			]
		},*/
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
					value: ['active', 'rent', 'sale', 'archived']
				}
			]
		},
		{
			name: 'Photo',
			key: 'thumb',
			fields: [
				{
					name: 'Photo',
					value: 'Upload a property photo'
				}
			]
		}
	]
};
