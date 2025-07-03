<script lang="ts">
    import '../../app.css'
    import AppSidebar from "$lib/components/app-sidebar.svelte";
	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import type { LayoutProps } from './$types';
    import { ModeWatcher } from "mode-watcher";
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

    
    let { data, children }: LayoutProps = $props();
</script>
    
<ModeWatcher />
<Toaster position="top-center" />
<Sidebar.Provider>
	<AppSidebar data={data} />
	<Sidebar.Inset>
        {#if children}
            {@render children?.()}
        {:else}
            <div class="text-center text-gray-500">No content available</div>
        {/if}
	</Sidebar.Inset>
</Sidebar.Provider>

{#if isLoading}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm">
		<LoaderCircle class="h-8 w-auto animate-spin text-blue-500" />
	</div>
{/if}