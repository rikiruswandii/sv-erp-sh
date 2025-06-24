<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import Plus from '@lucide/svelte/icons/plus';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Button } from '$lib/components/ui/button';
	import {createColumns} from './columns'
	import DataTable from './data-table.svelte';

	let {
		data
	} : {page: any} = $props();
	let isOpen = $state(false);

    const pages = {
        title: 'Page Management',
        excerpt: 'Manage your pages efficiently with our intuitive interface.'
    };
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
				<Breadcrumb.Item>
					<Breadcrumb.Page>Page Management</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-primary dark:text-primary text-2xl font-semibold tracking-tight">
				Page Management
			</h2>
			<p class="text-muted-foreground">You have {'0'} page</p>
		</div>
		<div class="flex items-center gap-2">
			<Button href="/panel/pages/create" size="sm" variant="outline"><Plus /> Add page</Button>
		</div>
	</div>
    <Separator />
	<DataTable data={data?.page} columns={createColumns()} />
</div>
