<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import { useSidebar } from "$lib/components/ui/sidebar/index.js";
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import BellIcon from "@lucide/svelte/icons/bell";
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import Sun from "@lucide/svelte/icons/sun";
  	import Moon from "@lucide/svelte/icons/moon";
  	import { toggleMode } from "mode-watcher";
  	import { Button } from "$lib/components/ui/button/index.js";
	  import * as Dialog from '$lib/components/ui/dialog';

	let { user }: { user: { name: string; email: string; avatar: string } } = $props();
	const sidebar = useSidebar();

	let isOpenLogout = $state(false);
	let isSubmitting = $state(false);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDownIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? "bottom" : "right"}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<Avatar.Image src={user.avatar} alt={user.name} />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<Button onclick={toggleMode} variant="outline" size="icon">
  							<Sun
    							class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
  							/>
  							<Moon
    							class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
  							/>
  							<span class="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<BadgeCheckIcon />
						Account
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<CreditCardIcon />
						Billing
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<BellIcon />
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<Button onclick={() => (isOpenLogout = true)} size="sm" variant="ghost"><LogOutIcon /> Log out</Button>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
<!-- User logout dialog -->
<Dialog.Root bind:open={isOpenLogout}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-primary font-semibold">Log Out</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to log out? You will need to sign in again to access the dashboard.
			</Dialog.Description>
		</Dialog.Header>		
		<!-- Form logout -->
		<form method="POST" action="/api/v1/auth/logout"  onsubmit={() => (isSubmitting = true)}>
			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => isOpenLogout = false}>
					Cancel
				</Button>						
				{#if isSubmitting}
					<Button disabled  variant="destructive">
						<LoaderCircle class="animate-spin" />
						Please wait
				  	</Button>
				{:else}
					<Button type="submit" variant="destructive">Logout</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>