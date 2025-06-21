<script lang="ts" module>
	import UserRound from '@lucide/svelte/icons/user-round';
	import Settings2 from '@lucide/svelte/icons/settings-2';
	import Logs from '@lucide/svelte/icons/logs';

	const projects = [
		{
			name: 'Profile',
			url: '/panel/user/[user]',
			icon: UserRound
		},
		{
			name: 'Setting',
			url: '#',
			icon: Settings2
		},
		{
			name: 'Activity',
			url: '#',
			icon: Logs
		}
	];
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { page } from '$app/state';

	let { data } = $props();
	let currentPath = $state(page.url.pathname);
	let projectItems = $state<Array<any>>([]);

	$effect(() => {
		projectItems = projects.map((item) => {
			const isActive = item.url.includes('[user]')
				? currentPath.startsWith('/panel/user/')
				: item.url === currentPath;

			return {
				...item,
				isActive,
			};
		});
	});
</script>

<Sidebar.Header>
	<Sidebar.Menu>
		{#each projectItems as project}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton isActive={project.isActive}>
					<project.icon />
					<span>{project.name}</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Header>
