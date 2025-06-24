<script lang="ts" module>
	import Ellipsis from '@lucide/svelte/icons/ellipsis';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import SquarePen from '@lucide/svelte/icons/square-pen';
	import Eye from '@lucide/svelte/icons/eye';
</script>
<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	let { formDestroy, id }: { formDestroy: any, id: string } = $props();
	const destroyForm = superForm(formDestroy, {
		resetForm: true,
		id: `destroy-form-${id}`,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Page deleted successfully');
				isOpenDestroy = false;
			} else if (result.type === 'error') {
				toast.error(result.error?.message || 'Failed to delete page');
			}
		}
	});
	const { enhance: enhanceDestroy, delayed: delayedDestroy } = destroyForm;

	let isOpenDestroy = $state(false);
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
		</DropdownMenu.Group>
		<DropdownMenu.Item>
			<Button href={`/panel/page/update/${id}`} size="sm" variant="ghost"><SquarePen /> Edit page</Button>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<Button href={`/panel/page/view/${id}`} size="sm" variant="ghost"><Eye /> View page</Button>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<!-- User delete dialog -->
<Dialog.Root bind:open={isOpenDestroy}>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title  class="text-primary font-semibold">Delete Page</Dialog.Title>
			<Dialog.Description>
				Are you sure you want to delete this page? This action cannot be undone.
			</Dialog.Description>
		</Dialog.Header>
		<!-- Form delete -->
		<form method="POST" use:enhanceDestroy>
			<input type="hidden" name="id" value={id} />

			<div class="flex justify-end gap-2">
				<Button type="button" variant="outline" onclick={() => isOpenDestroy = false}>
					Cancel
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
