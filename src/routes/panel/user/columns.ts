import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import { Checkbox } from "$lib/components/ui/checkbox/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableEmailButton from "./data-table-email-button.svelte";
import type { SuperValidated, Infer } from "sveltekit-superforms";
import type { DestroySchema } from "$lib/schemas/user/destroy";
import type { ResetSchema } from "$lib/schemas/user/reset";

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
    formReset: SuperValidated<Infer<ResetSchema>>): ColumnDef<AllUser>[] {
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
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "email",
            header: ({ column }) =>
                renderComponent(DataTableEmailButton, {
                    onclick: column.getToggleSortingHandler(),
                }),
        },
        {
            accessorKey: "role.name",
            header: "Role",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ row }) => {
                const date = new Date(row.original.createdAt);
                return date.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
            },
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => {
                const date = new Date(row.original.updatedAt);
                return date.toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                });
            },
        },        
        {
            id: "actions",
            cell: ({ row }) => {
                return renderComponent(DataTableActions, {
                    id: row.original.id,
                    formDestroy,
                    formReset,
                });
            },
        },
    ];
}
