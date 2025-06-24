import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableHeaderButton from "$lib/components/data-table-header-button.svelte";
import type { Page } from "$lib/types"
import type { IdSchema } from "$lib/schemas/destroy";
import type { SuperValidated, Infer } from "sveltekit-superforms";

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
            header: ({ column }) =>
                renderComponent(DataTableHeaderButton, {
                    label: 'Title',
                    onclick: column.getToggleSortingHandler(),
                }),
        },
        {
            accessorKey: "slug",
            header: ({ column }) =>
                renderComponent(DataTableHeaderButton, {
                    label: 'Slug',
                    onclick: column.getToggleSortingHandler(),
                }),
        },
        {
            accessorKey: "createdAt",
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
                return date.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
            },
            header: ({ column }) =>
                renderComponent(DataTableHeaderButton, {
                    label: 'Created At',
                    onclick: column.getToggleSortingHandler(),
                }),
        },
        {
            accessorKey: "updatedAt",
            cell: ({ row }) => {
                const date = new Date(row.original.updatedAt);
                return date.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
            },
            header: ({ column }) =>
                renderComponent(DataTableHeaderButton, {
                    label: 'Updated At',
                    onclick: column.getToggleSortingHandler(),
                }),
        },        
        {
            id: "actions",
            cell: ({ row }) => {
                return renderComponent(DataTableActions, {
                    id: row.original.id,
                    formDestroy,
                });
            },
        },
    ];
}
