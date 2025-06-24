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
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { pageSchema, type PageSchema } from '$lib/schemas/page/page';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import RichEditor from '$lib/components/rich-editor.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';

	let { data }: { data: { form: SuperValidated<Infer<PageSchema>> } } = $props();

	const pages = {
		title: 'Create Page',
		excerpt: 'Manage your pages efficiently with our intuitive interface.'
	};
	const form = superForm(data.form, {
		validators: zodClient(pageSchema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Page created successfully');
			} else if (result.type === 'error') {
				toast.error(result.error?.message || 'Failed to create page');
			}
		}
	});
	const { form: formData, enhance, delayed } = form;
</script>

<svelte:head>
	<title>{pages.title}</title>
	<meta name="description" content={pages.excerpt} />
</svelte:head>

<header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
					<Breadcrumb.Link href="/panel">Page Management</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Create Page</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-primary dark:text-primary text-2xl font-semibold tracking-tight">
				Create Page
			</h2>
			<p class="text-muted-foreground">You have {'0'} page</p>
		</div>
		<div class="flex items-center gap-2">
			<Button href="/panel/page" size="sm" variant="outline"><Reply /> Back</Button>
		</div>
	</div>
	<Separator />
	<form method="post" use:enhance>
		<div class="grid grid-cols-5 gap-4">
			<div class="col-span-2">
				<Form.Field {form} name="title">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label for="title">Title</Form.Label>
							<Input
								{...props}
								bind:value={$formData.title}
								autocomplete="on"
								required
								placeholder="Enter page title"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="col-span-2 col-start-3">
				<Form.Field {form} name="description">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label for="description">Description</Form.Label>
							<Textarea
								{...props}
								bind:value={$formData.description}
								autocomplete="on"
								required
								placeholder="Enter page description"
							/>
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="col-start-5 self-start">
				<Form.Field
					{form}
					name="published"
					class="mt-5.25 flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4"
				>
					<Form.Control>
						{#snippet children({ props })}
							<Checkbox {...props} bind:checked={$formData.published} />
							<Form.Label for="published">Published</Form.Label>
							<input name={props.name} value={$formData.published} hidden />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="col-span-5 row-span-3 row-start-2">
				<Form.Field {form} name="content">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label for="content">Content</Form.Label>
							<RichEditor {...props} bind:value={$formData.content} />
							<input type="hidden" name={props.name} value={$formData.content} />
						{/snippet}
					</Form.Control>
					<Form.Description />
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="col-span-5 mt-4 flex items-center justify-end gap-2">
				<Form.Button type="reset" variant="secondary" size="sm" class="w-full md:w-auto">
					Reset
				</Form.Button>
				<Form.Button type="submit" size="sm" class="w-full md:w-auto">Create Page</Form.Button>
			</div>
		</div>
		<!-- <div class="grid grid-cols-5 grid-rows-5 gap-4">
          <div class="col-span-2"><Skeleton class="h-10 w-full" /></div>
          <div class="col-span-2 col-start-3"><Skeleton class="h-10 w-full" /></div>
          <div class="col-start-5"><Skeleton class="h-10 w-full" /></div>
          <div class="col-span-5 row-span-3 row-start-2"><Skeleton class="h-64 w-full" /></div>
        </div> -->
	</form>
</div>
