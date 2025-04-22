

1. ==== button ====
```
<button class="w-btn _primary">Add</button>
<button class="w-btn _second">Cancel</button>
<button class="w-btn _danger">Delete</button>
```

2. ==== input ====
```
 <label class="w-forms">
	<span class="w-forms__title">Text</span>
	<input class="w-forms__input" type="text" name="text" placeholder="Your text">
</label>
```

3. ==== select ====
```
<label class="w-forms">
	<span class="w-forms__title">Name</span>
	<span class="w-forms__chevron material-icons">expand_more</span>
	<select class="w-forms__select">
		<option value="Default">Default</option>
	</select>
</label>
```

4. ==== textarea ====
```
<label class="w-forms">
	<span class="w-forms__title">Text</span>
	<textarea class="w-forms__textarea" placeholder="Text"></textarea>
</label>
```

5. ==== switch ====
```
<label class="w-switch">
	<div class="w-switch__toggle">
		<input class="w-switch__input" type="checkbox">
		<span class="w-switch__slider _round"></span>
	</div>
	<div class="w-switch__text">Sound notification</div>
</label>
```

6. ==== checkbox ====
```
<label class="w-checkbox">
	<input class="w-checkbox__input" type="checkbox" name="text">
	<div class="w-checkbox__body">
		<span class="w-checkbox__svg"><svg width="12px" height="10px"><use xlink:href="#check"></use></svg></span>
		<span class="w-checkbox__text">Text</span>
	</div>
</label>
```

<!-- Checkbox SVG Sprites - put one time on page-->
```
<svg class="w-checkbox__svg-icon">
    <symbol id="check" viewbox="0 0 12 10">
        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </symbol>
</svg>
```

7. ==== radio ====
```
<label class="w-radio">
	<input type="radio" name="text" class="w-radio__input">
	<span class="w-radio__label"></span>
	<div class="w-radio__text">Text</div>
</label>
```

8. ==== table ====
```
<div class="w-table-wrapp">
	<table class="w-table">
		<thead class="w-table-header">
			<tr class="w-table-header__tr">
				<th class="w-table__th">Clients</th>
				<th class="w-table__th">Address</th>
				<th class="w-table__th">Email</th>
				<th class="w-table__th">Phone</th>
				<th class="w-table__th">additional phone</th>
				<th class="w-table__th">Gender</th>
				<th class="w-table__th">Date of birth</th>
			</tr>
		</thead>
		<tbody class="w-table-body">
			<tr class="w-table-body__tr" *ngFor="let item of [{},{},{},{},{},{},{},{},{},{},{}]">
				<td class="w-table__td">Ivan Petrneko</td>
				<td class="w-table__td">Street of Blue Flowers 23</td>
				<td class="w-table__td">korsun_anna@gmail.com</td>
				<td class="w-table__td">(201) 555-0124</td>
				<td class="w-table__td">(201) 555-0124</td>
				<td class="w-table__td">Woman</td>
				<td class="w-table__td">2.05.1978</td>
			</tr>
		</tbody>
	</table>
</div>
```


9. ==== card ====
```
<div class="w-card"></div>

<div class="w-card _pd"></div>

<div class="w-card">
	<div class="w-card__header"></div>
</div>

```
