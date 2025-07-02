import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableHeaderButton from "$lib/components/data-table-header-button.svelte";
import type { Page } from "$lib/types"
import type { IdSchema } from "$lib/schemas/destroy";
import type { SuperValidated, Infer } from "sveltekit-superforms";
import ColumnHeader from "$lib/components/column-header.svelte";

export function createColumns(
    formDestroy: SuperValidated<Infer<IdSchema>>
): ColumnDef<Page>[] {
    return [
        {
            id: "select",
            header: ({ table }) =>
                renderComponent(Checkbox, {
                    checked: table.getIsAllPageRowsSelected(),
                    indeterminate:
                        table.getIsSomePageRowsSelected() &&
                        !table.getIsAllPageRowsSelected(),
                    onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
                    "aria-label": "Select all",
                }),
            cell: ({ row }) =>
                renderComponent(Checkbox, {
                    checked: row.getIsSelected(),
                    onCheckedChange: (value) => row.toggleSelected(!!value),
                    "aria-label": "Select row",
                }),
            enableSorting: false,
            enableHiding: false,
          },
        {
            accessorKey: "title",
            header: ({ column }) => {
				return renderComponent(ColumnHeader, {
					column,
					title: 'Title'
				});
			}
        },
        {
            accessorKey: "slug",
            header: ({ column }) => {
                            return renderComponent(ColumnHeader, {
                                column,
                                title: 'Slug'
                            });
                        }
        },
        {
            accessorKey: "createdAt",
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt as string | number | Date);
                return date.toLocaleDateString("en-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
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
            accessorKey: "updatedAt",
            cell: ({ row }) => {
                const date = new Date(row.original.updatedAt as string | number | Date);
                return date.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
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
            id: "actions",
            cell: ({ row }) => {
                return renderComponent(DataTableActions, {
                    id: row.original.id,
                    formDestroy,
                });
            },
            header: ({ column }) => {
                            return renderComponent(ColumnHeader, {
                                column,
                                title: 'Action'
                            });
                        }
        },
    ];
}
