import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'perPage',
    standalone: false
})
export class PerPagePipe implements PipeTransform {
	/**
	 * Transforms an array of data by paginating and sorting it according to the provided configuration.
	 * @param arr - The array of data to be paginated and sorted.
	 * @param config - The configuration object containing pagination and sorting settings.
	 * @param sort - The sorting object specifying the column to sort by and the direction.
	 * @param reload - An optional parameter to force reloading of the data (not used here).
	 * @returns The paginated and sorted array.
	 */
	transform(arr: any[], config: any, sort: any, reload?: string): any[] {
		// If the input is not an array, return an empty array
		if (!Array.isArray(arr)) return [];

		// If perPage is set to -1, return the entire array (no pagination)
		if (config.perPage === -1) return arr;

		// Clone the array to avoid mutating the original data
		arr = arr.slice();

		// Add a sequential number (num) to each item for easy reference
		for (let i = 0; i < arr.length; i++) {
			arr[i].num = i + 1;
		}

		// Sort the array if a sorting direction is provided
		if (sort.direction) {
			arr.sort((a: any, b: any) => {
				if (a[sort.title] < b[sort.title]) {
					return sort.direction == 'desc' ? 1 : -1;
				}
				if (a[sort.title] > b[sort.title]) {
					return sort.direction == 'desc' ? -1 : 1;
				}
				return 0;
			});
		}

		// Paginate the array by slicing it according to the current page and items per page
		return arr.slice(
			(config.page - 1) * config.perPage,
			config.page * config.perPage
		);
	}
}
