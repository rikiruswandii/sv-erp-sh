<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import Plus from '@lucide/svelte/icons/plus';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Form from '$lib/components/ui/form';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { formSchema, type FormSchema } from '$lib/schemas/user/user';
	import { type DestroySchema } from '$lib/schemas/user/destroy';
	import { type ResetSchema } from '$lib/schemas/user/reset';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { m } from '$lib/paraglide/messages';
	import { toast } from 'svelte-sonner';

	import DataTable from './data-table.svelte';
	import { createColumns } from './columns';

	let {
		data
	}: {
		data: {
			form: SuperValidated<Infer<FormSchema>>;
			formDestroy: SuperValidated<Infer<DestroySchema>>;
			formReset: SuperValidated<Infer<ResetSchema>>;
		};
	} = $props();
	const form = superForm(data.form, {
		resetForm: true,
		validators: zodClient(formSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('User created successfully');
				isOpen = false;
			} else if (result.type === 'error') {
				toast.error(result.error?.message || 'Failed to create user');
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
	let isOpen = $state(false);
</script>

<header
	class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
>
	<div class="flex items-center gap-2 px-4">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href="/panel">Panel</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>User Management</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-primary dark:text-primary text-2xl font-semibold tracking-tight">
				User Management
			</h2>
			<p class="text-muted-foreground">You have {data?.countAllUser} user</p>
		</div>
		<div class="flex items-center gap-2">
			<Button onclick={() => (isOpen = true)} size="sm" variant="outline"><Plus /> Add user</Button>
		</div>
	</div>
	<Separator />
	<DataTable data={data?.allUser} columns={createColumns(data?.formDestroy, data?.formReset)} />
</div>

<!-- Create user dialog -->
<Dialog.Root bind:open={isOpen}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-primary font-semibold">Add User</Dialog.Title>
			<Dialog.Description>
				Use this form to add a new user to the system. Please fill in all the required fields
				accurately. Ensure that the username and email are unique. You may optionally upload a
				profile picture. Once all information is provided, click the "Save" button to create
				the user account.
			</Dialog.Description>
		</Dialog.Header>
		<form method="POST" action="?/create" use:enhance>
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="name">{m.name_label()}</Form.Label>
						<Input
							{...props}
							bind:value={$formData.name}
							autocomplete="name"
							required
							placeholder={m.label_interupt({ name: m.name_label().toLocaleLowerCase() })}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="email">{m.email_label()}</Form.Label>
						<Input
							{...props}
							bind:value={$formData.email}
							autocomplete="email"
							required
							placeholder={m.label_interupt({ name: m.email_label().toLocaleLowerCase() })}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="password">{m.password_label()}</Form.Label>
						<Input
							{...props}
							bind:value={$formData.password}
							autocomplete="current-password"
							type="password"
							required
							placeholder={m.label_interupt({ name: m.password_label().toLocaleLowerCase() })}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="confirmPassword">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="confirmPassword">{m.confirm_password_label()}</Form.Label>
						<Input
							{...props}
							bind:value={$formData.confirmPassword}
							autocomplete="off"
							type="password"
							required
							placeholder={m.confirm_interupt()}
						/>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="roleId">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Role Permission</Form.Label>
						<Select.Root type="single" bind:value={$formData.roleId} name={props.name}>
							<Select.Trigger {...props}>
								{$formData.roleId ? $formData.roleId : 'Select a verified role to display'}
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="1" label="Superadmin" />
								<Select.Item value="2" label="Admin" />
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description />
				<Form.FieldErrors />
			</Form.Field>
			<div class="mt-4">
				{#if $delayed}
					<Form.Button disabled  class="flex w-full justify-center">
						<LoaderCircle class="animate-spin" />
						Please wait
					  </Form.Button>
				{:else}
					<Form.Button class="flex w-full justify-center">Confirm</Form.Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>