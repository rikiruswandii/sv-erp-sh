<script lang="ts" module>
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import RotateCcw from '@lucide/svelte/icons/rotate-ccw';
	import Eye from '@lucide/svelte/icons/eye';
</script>
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	let { formReset, formDestroy, id }: { formReset: any, formDestroy: any, id: string } = $props();
	const destroyForm = superForm(formDestroy, {
		resetForm: true,
		id: `destroy-form-${id}`,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('User deleted successfully');
				isOpenDestroy = false;
			} else if (result.type === 'error') {
				toast.error(result.error?.message || 'Failed to delete user');
			}
		}
	});
	const { enhance: enhanceDestroy, delayed: delayedDestroy } = destroyForm;

	const resetForm = superForm(formReset, {
		resetForm: true,
		id: `reset-form-${id}`,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Form berhasil di-reset');
				isOpenReset = false;
			} else if (result.type === 'error') {
				toast.error(result.error?.message || 'Gagal me-reset form');
			}
		}
	});
	const { enhance: enhanceReset, delayed: delayedReset } = resetForm;

	let isOpenDestroy = $state(false);
	let isOpenReset = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
				<span class="sr-only">Open menu</span>
				<Ellipsis />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
			<DropdownMenu.Item>
				<Button onclick={() => (isOpenDestroy = true)} size="sm" variant="ghost"><Trash2 /> Delete</Button>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Button onclick={() => (isOpenReset = true)} size="sm" variant="ghost"><RotateCcw /> Reset password</Button>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<Button href={`/panel/user/${id}`} size="sm" variant="ghost"><Eye /> View profile</Button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- User delete dialog -->
<Dialog.Root bind:open={isOpenDestroy}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete User</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to delete this user? This action cannot be undone.
			</Dialog.Description>
		</Dialog.Header>
		<!-- Form delete -->
		<form method="POST" action="?/destroy" use:enhanceDestroy>
			<input type="hidden" name="id" value={id} />

			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline">
					<Dialog.Close>Cancel</Dialog.Close>
				</Button>
				{#if $delayedDestroy}
					<Button disabled  variant="destructive">
						<LoaderCircle class="animate-spin" />
						Please wait
				  	</Button>
				{:else}
					<Button type="submit" variant="destructive">Delete</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>

<!-- User reset dialog -->
<Dialog.Root bind:open={isOpenReset}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Reset Password User</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to reset password this user? This action cannot be undone.
			</Dialog.Description>
		</Dialog.Header>
		<!-- Form delete -->
		<form method="POST" action="?/reset" use:enhanceReset>
			<input type="hidden" name="id" value={id} />

			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline">
					<Dialog.Close>Cancel</Dialog.Close>
				</Button>
				{#if $delayedReset}
					<Button disabled  variant="destructive">
						<LoaderCircle class="animate-spin" />
						Please wait
				  	</Button>
				{:else}
					<Button type="submit" variant="destructive">Reset</Button>
				{/if}
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>