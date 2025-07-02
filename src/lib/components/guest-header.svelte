<script lang="ts">
	import { onMount } from 'svelte';
	import { APP_CONFIG } from '$lib/config/app';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import Button from './ui/button/button.svelte';

	// Scroll Behavior
	let lastScrollTop = 0;
	let hideHeader = $state(false);
	let isMenuOpen = $state(false);
	let scrollTimeout: ReturnType<typeof setTimeout>;

	onMount(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;

			if (currentScroll > lastScrollTop && currentScroll > 50) {
				hideHeader = true;
			} else {
				hideHeader = false;
			}
			lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				hideHeader = false;
			}, 150);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-in-out"
	class:translate-y-[-100%]={hideHeader}
>
	<nav
		class="mx-2 flex items-center justify-between rounded-t-2xl rounded-b-4xl bg-white/30 p-6 shadow backdrop-blur-md lg:px-8 dark:bg-gray-900/30 dark:shadow-sm dark:shadow-gray-600"
		aria-label="Global"
	>
		<!-- Kiri: Logo -->
		<div class="flex-1">
			<a href="/" class="flex items-center gap-2">
				<img src="/pst-brand-logo-bg-none.png" alt={APP_CONFIG.app_name} class="h-8 w-auto" />
				<span class="sr-only">{APP_CONFIG.app_name}</span>
			</a>
		</div>

		<!-- Tengah: Menu (Desktop) -->
		<div
			class="hidden flex-1 justify-center gap-6 text-sm font-semibold text-blue-900 lg:flex dark:text-white"
		>
			<a href="#home" class="group relative inline-block"
				>Beranda
				<span
					class="absolute -bottom-1 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
				></span>
			</a>
			<a href="#service" class="group relative inline-block"
				>Layanan<span
					class="absolute -bottom-1 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
				></span></a
			>
			<a href="#team" class="group relative inline-block"
				>Tim<span
					class="absolute -bottom-1 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
				></span></a
			>
			<a href="#contact" class="group relative inline-block"
				>Kontak<span
					class="absolute -bottom-1 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
				></span></a
			>
		</div>

		<!-- Kanan: Toggle dan Mobile Menu Button -->
		<div class="flex flex-1 items-center justify-end gap-2">
			<!-- Theme Toggle (Desktop) -->
			<div class="hidden lg:block">
				<Button onclick={toggleMode} variant="outline" size="icon">
					<Sun class="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					<Moon
						class="absolute h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>

			<!-- Mobile Menu Button -->
			<div class="lg:hidden">
				<button
					class="rounded p-2 text-gray-700 dark:text-white"
					on:click={() => (isMenuOpen = true)}
					aria-label="Open menu"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
						/>
					</svg>
				</button>
			</div>
		</div>
	</nav>
</header>
