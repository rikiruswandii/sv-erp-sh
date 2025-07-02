import type { ColumnDef } from '@tanstack/table-core';
import { renderComponent } from '$lib/components/ui/data-table/index.js';
import { Checkbox } from '$lib/components/ui/checkbox/index.js';
import DataTableActions from './data-table-actions.svelte';
import DataTableEmailButton from './data-table-email-button.svelte';
import type { SuperValidated, Infer } from 'sveltekit-superforms';
import type { DestroySchema } from '$lib/schemas/user/destroy';
import type { ResetSchema } from '$lib/schemas/user/reset';
import ColumnHeader from '$lib/components/column-header.svelte';

type AllUser = {
	id: string;
	email: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
	emailVerified: Boolean;
	role: { name: string };
};

export function createColumns(
	formDestroy: SuperValidated<Infer<DestroySchema>>,
	formReset: SuperValidated<Infer<ResetSchema>>
): ColumnDef<AllUser>[] {
	return [
		{
			id: 'select',
			header: ({ table }) =>
				renderComponent(Checkbox, {
					checked: table.getIsAllPageRowsSelected(),
					indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
					onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
					'aria-label': 'Select all'
				}),
			cell: ({ row }) =>
				renderComponent(Checkbox, {
					checked: row.getIsSelected(),
					onCheckedChange: (value) => row.toggleSelected(!!value),
					'aria-label': 'Select row'
				}),
			enableSorting: false,
			enableHiding: false
		},
		{
			accessorKey: 'name',
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Name'
				});
			}
		},
		{
			accessorKey: 'email',
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Email'
				});
			}
		},
		{
			accessorKey: 'role.name',
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Role'
				});
			}
		},
		{
			accessorKey: 'createdAt',
			cell: ({ row }) => {
				const date = new Date(row.original.createdAt as string | number | Date);
				return date.toLocaleDateString('en-EN', {
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				});
			},
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Created At'
				});
			}
		},
		{
			accessorKey: 'updatedAt',
			cell: ({ row }) => {
				const date = new Date(row.original.updatedAt as string | number | Date);
				return date.toLocaleDateString('en-EN', {
					day: '2-digit',
					month: 'long',
					year: 'numeric'
				});
			},
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Updated At'
				});
			}
		},
		{
			id: 'actions',
			cell: ({ row }) => {
				return renderComponent(DataTableActions, {
					id: row.original.id,
					formDestroy,
					formReset
				});
			},
			header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Action'
				});
			}
		}
	];
}
