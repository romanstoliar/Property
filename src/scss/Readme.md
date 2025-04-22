# • SCSS FOLDER PACK BY WAW •

## I. GET STARTED
- Import app.scss to your global styles -> ```@import: "scss/waw";```

## II. STRUCTURE
### Atom
	1. display
	2. margin
	3. other
	4. padding
	5. size
	6. text

### Components
	1. w-btn
	2. w-checkbox
	3. w-card
	4. w-forms
	5. w-radio
	6. w-switch
	7. w-table

### Layout
	1. base
	2. grid
	3. scroll

### Utils
	1. fonts
	2. icons
	3. media
	4. mixins
	5. vars
	6. angular

### Vendors
	1. normalize

## III. SETTINGS
- Go to ```waw.scss``` and turn on/off imports scss files

## IV. INFO
1. atom - include atomic classes.
2. common - include styles which appears on few pages.
3. components - include independent blocks
4. layout - include global layout settings
5. pages - include style for specifically page
6. utils - include utilities styles
7. vendors - include imports resets, normalize, libs

## V. HOW TO USE COMPONENTS
- Go to ```scss/components/README.md``` - ready made html for components

## VI. HOW TO USE CLASESS
- Go to ```scss/Classes.md``` - ready made htnl classes

## VII. HTML/SCSS RULES

### We use BEM technology but changed a little for themselves (optional)

#### a. HTML
	1. block -> "header"
	2. element -> "header__link"
	3. modifier -> "_active"

#### b. SCSS
	1. block -> "header {}"
	2. element -> "&__link {}"
	3. modifier -> "&._active {}"
