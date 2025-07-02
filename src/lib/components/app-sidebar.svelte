<script lang="ts" module>
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import LayoutDashboard from '@lucide/svelte/icons/layout-dashboard';
	import BotIcon from '@lucide/svelte/icons/bot';
	import BookUser from '@lucide/svelte/icons/book-user';
	import CommandIcon from '@lucide/svelte/icons/command';
	import FolderGit2 from '@lucide/svelte/icons/folder-git-2';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import ListTodo from '@lucide/svelte/icons/list-todo';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import Users from '@lucide/svelte/icons/users';
	import SquareCode from '@lucide/svelte/icons/square-code';
	import Logs from '@lucide/svelte/icons/logs';
	import Contact from '@lucide/svelte/icons/contact';
	import MailCheck from '@lucide/svelte/icons/mail-check';
	import ShieldPlus from '@lucide/svelte/icons/shield-plus';
	import Shield from '@lucide/svelte/icons/shield';
	import NotebookTabs from '@lucide/svelte/icons/notebook-tabs';

	// This is sample data.
	const items = {
		teams: [
			{
				name: 'Superadmin',
				logo: ShieldPlus,
				plan: 'Enterprise'
			},
			{
				name: 'Admin',
				logo: Shield,
				plan: 'Business'
			},
			{
				name: 'Accounting',
				logo: NotebookTabs,
				plan: 'Basic'
			}
		],
		navMain: [
			{
				label: 'Ikhtisar',
				menus: [
					{
						title: 'Dashboard',
						url: '/panel',
						icon: LayoutDashboard
					}
				]
			},
			{
				label: 'Workspace',
				menus: [
					{
						title: 'Client',
						url: '#',
						icon: BookUser
					},
					{
						title: 'Project',
						url: '#',
						icon: FolderGit2
					},
					{
						title: 'Task',
						url: '#',
						icon: ListTodo
					}
				]
			},
			{
				label: 'Master',
				menus: [
					{
						title: 'User Management',
						url: '/panel/user',
						icon: Users
					},
					{
						title: 'Log Activity',
						url: '#',
						icon: Logs
					}
				]
			},
			{
				label: 'Front',
				menus: [
					{
						title: 'Pages',
						url: '/panel/pages',
						icon: SquareCode
					},
					{
						title: 'Contact',
						url: '#',
						icon: Contact
					},
					{
						title: 'Subscription',
						url: '/panel/subscription',
						icon: MailCheck
					}
				]
			},
			{
				label: 'Settings',
				menus: [
					{
						title: 'General',
						url: '#',
						icon: Settings2Icon
					}
				]
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { page } from '$app/state';
	let currentPath = $state(page.url.pathname);
	let navItems = $state<Array<any>>([]);

	$effect(() => {
		navItems = items.navMain.map((group) => ({
			...group,
			menus: group.menus.map((menu) => ({
				...menu,
				isActive: menu.url === currentPath
			}))
		}));
	});

	let {
		data,
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={items.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navItems} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
