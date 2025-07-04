<script lang="ts">
	import Reply from '@lucide/svelte/icons/reply';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Form from '$lib/components/ui/form';
	import { Separator } from '$lib/components/ui/separator';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import type { ContactMessage } from '$lib/types';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { ContactSchema } from '$lib/schemas/contact/contact';

	let {
		data
	}: {
		data: {
			contact: ContactMessage;
            form: SuperValidated<Infer<ContactSchema>>;
		};
	} = $props();

	const pages = {
		title: 'Detail Contact Message',
		excerpt: 'View detailed information about your contact message clearly and efficiently.'
	};
	const form = superForm(data.form);
	const { form: formData } = form;
</script>

<svelte:head>
	<title>{pages.title}</title>
	<meta name="description" content={pages.excerpt} />
</svelte:head>

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
				<Breadcrumb.Item class="hidden md:block">
					<Breadcrumb.Link href="/panel/pages">Contact Message</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Detail Contact Message</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-primary dark:text-primary text-2xl font-semibold tracking-tight">
				{pages.title}
			</h2>
			<p class="text-muted-foreground">
				{pages.excerpt}
			</p>
		</div>
		<div class="flex items-center gap-2">
			<Button href="/panel/contact" size="sm" variant="outline"><Reply /> Back</Button>
		</div>
	</div>
	<Separator />
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		<Form.Field name="firstName" {form}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="firstName">First Name</Form.Label>
					<Input {...props} bind:value={$formData.firstName} autocomplete="on" readonly />
				{/snippet}
			</Form.Control>
		</Form.Field>
		<Form.Field name="lastName" {form}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="lastName">Last Name</Form.Label>
					<Input {...props} bind:value={$formData.lastName} autocomplete="on" readonly />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<Form.Field name="email" {form}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="email">Email</Form.Label>
					<Input {...props} bind:value={$formData.email} autocomplete="on" readonly />
				{/snippet}
			</Form.Control>
		</Form.Field>
		<Form.Field name="company" {form}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="company">Company</Form.Label>
					<Input {...props} bind:value={$formData.company} autocomplete="on" readonly />
				{/snippet}
			</Form.Control>
		</Form.Field>
		<Form.Field name="phoneNumber" {form}>
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label for="phoneNumber">Phone Number</Form.Label>
					<Input {...props} bind:value={$formData.phoneNumber} autocomplete="on" readonly />
				{/snippet}
			</Form.Control>
		</Form.Field>

		<div class="md:col-span-2 lg:col-span-3">
			<Form.Field name="message" {form}>
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="message">Message</Form.Label>
						<Textarea {...props} bind:value={$formData.message} autocomplete="on" readonly />
					{/snippet}
				</Form.Control>
			</Form.Field>
		</div>

		<div class="md:col-span-2 lg:col-span-3">
			<Form.Field name="replyMessage" {form}>
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="replyMessage">Reply Message</Form.Label>
						<Textarea
							{...props}
							bind:value={$formData.replyMessage}
							autocomplete="on"
							readonly
						/>
					{/snippet}
				</Form.Control>
			</Form.Field>
		</div>
	</div>

	<!-- <div class="grid grid-cols-5 grid-rows-5 gap-4">
          <div class="col-span-2"><Skeleton class="h-10 w-full" /></div>
          <div class="col-span-2 col-start-3"><Skeleton class="h-10 w-full" /></div>
          <div class="col-start-5"><Skeleton class="h-10 w-full" /></div>
          <div class="col-span-5 row-span-3 row-start-2"><Skeleton class="h-64 w-full" /></div>
        </div> -->
</div>
