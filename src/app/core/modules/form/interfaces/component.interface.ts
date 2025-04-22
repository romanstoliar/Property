export interface TemplateFieldInterface {
	name: string;
	value: unknown;
	skipTranslation?: boolean;
}

export interface TemplateComponentInterface {
	name: string;
	component: unknown;
	fields?: string[];
	fieldComponent?: Record<string, string>;
}

export interface FormComponentInterface {
	components?: FormComponentInterface[];
	// or
	name?: string; // template name
	key?: string; // submition location
	root?: boolean; // if key should be applied to data or root document
	focus?: () => void; // to set focus in components where we have focus functionality
	focused?: boolean; // in case of focus functionality, we focus on init
	hidden?: boolean; // if component should be hidden or shown
	class?: string; // put class on component container
	fields?: TemplateFieldInterface[]; // pass general info to component
	valid?: () => boolean; // check if component is valid
	required?: boolean; // set component requirement
	disabled?: boolean; // set component disabled
	// disabled?: boolean | (value: unknown) => boolean;
	component?: unknown; // deprecated
}
