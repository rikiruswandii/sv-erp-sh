<script lang="ts">
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	let { children } = $props();
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoaderCircle from '@lucide/svelte/icons/loader-circle';
	let isLoading = $state(false);

	onMount(() => {
		beforeNavigate(() => {
			isLoading = true;
		});

		afterNavigate(() => {
			isLoading = false;
		});
	});
</script>

<ModeWatcher />
<Toaster position="top-center" />
{@render children()}

{#if isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
		<LoaderCircle class="h-8 w-auto animate-spin text-blue-500" />
	</div>
{/if}
