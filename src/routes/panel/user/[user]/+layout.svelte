<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { Separator } from '$lib/components/ui/separator';
	import AppUserProfileSidebar from '$lib/components/app-user-profile-sidebar.svelte';
	import House from '@lucide/svelte/icons/house';
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	let { data, children } = $props();
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
					<Breadcrumb.Link href="/panel/user">User Management</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator class="hidden md:block" />
				<Breadcrumb.Item>
					<Breadcrumb.Page>User Profile {data?.user.name}</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</header>
<div class="hidden h-full flex-1 flex-col gap-8 p-8 md:flex">
	<div class="flex items-center justify-between gap-2">
		<div class="flex flex-col gap-1">
			<h2 class="text-primary dark:text-primary text-2xl font-semibold tracking-tight">
				User Profile: {data?.user.name}
			</h2>
			<p class="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
		</div>
		<div class="flex items-center gap-2"></div>
	</div>
	<Separator />
	<div class="flex flex-1 gap-2">
		<div class="w-48 shrink-0">
            <Sidebar.Group />
            <Sidebar.GroupContent>
                <AppUserProfileSidebar />
            </Sidebar.GroupContent>
            <Sidebar.Group />
        </div>
		<div class="flex-1 border rounded-lg border-border bg-background p-4">
			{@render children?.()}
		</div>
	</div>
</div>
