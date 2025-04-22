# ngx-collapse

## Usage

```html
<wcollapse [config]="config">
	<div header>
		<h1>This is the header collapse</h1>
	</div>
	<div body>
		<p>This is the body collapse</p>
	</div>
</wcollapse>
```

```html
config = {
	show: false,
	toggle: function() { this.show = !this.show },
	open: function() { this.show = true },
	close: function() { this.show = false }
}
```
