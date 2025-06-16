<script lang="ts">
	import Sidebar from '$lib/components/layouts/panel/sidebar.svelte';
	import Header from '$lib/components/layouts/panel/header.svelte';
	import type { LayoutData } from './$types';

	let { data, children } = $props<{ data: LayoutData }>();
    console.log("logging data in panel layout", data.user);
</script>
<svelte:head>
	<link rel="stylesheet" href="/assets/css/dashlite.css">
    <link rel="stylesheet" href="/assets/css/theme.css">
    <link rel="stylesheet" href="/assets/css/skins/theme-blue.css">
	<script src="/assets/js/bundle.js"></script>
    <script src="/assets/js/scripts.js"></script>
    <script src="/assets/js/charts/chart-ecommerce.js"></script>
</svelte:head>

<div class="nk-body ui-rounder npc-default has-sidebar">
    <div class="nk-app-root">
        <Sidebar data={data.user} />
        <!-- main @s -->
        <div class="nk-main ">
            <!-- wrap @s -->
            <div class="nk-wrap ">
                <!-- main header @s -->
                <Header data={data.user}/>
                <!-- main header @e -->
                <!-- content @s -->
                {@render children()}
                <!-- content @e -->
            </div>
            <!-- wrap @e -->
        </div>
        <!-- main @e -->
    </div>
    <!-- app-root @e -->
    <!-- select region modal -->
    <!-- .modal -->
    <!-- select region modal -->
    <!-- .modal -->
</div>