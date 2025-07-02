<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	let {
		items
	}: {
		items: {
			label: string;
			menus: {
				title: string;
				url: string;
				icon?: any;
				isActive?: boolean;
			}[];
		}[];
	} = $props();
</script>

{#each items as group (group.label)}
	<Sidebar.Group>
		<Sidebar.GroupLabel>{group.label}</Sidebar.GroupLabel>
		<Sidebar.Menu>
			{#each group.menus as item (item.title)}
				<Collapsible.Root open={item.isActive} class="group/collapsible">
					<Sidebar.MenuItem>
						<Sidebar.MenuButton tooltipContent={item.title} isActive={item.isActive}>
							{#if item.icon}
								<item.icon />
							{/if}
							<a href={item.url} class="flex w-full items-center gap-2">
								<span>{item.title}</span>
							</a>
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Collapsible.Root>
			{/each}
		</Sidebar.Menu>
	</Sidebar.Group>
{/each}
