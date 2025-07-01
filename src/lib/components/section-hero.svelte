<script lang="ts">
	import { APP_CONFIG } from '$lib/config/app';
	import Sun from '@lucide/svelte/icons/sun';
	import Moon from '@lucide/svelte/icons/moon';
	import { toggleMode } from 'mode-watcher';
	import Button from './ui/button/button.svelte';
	let isMenuOpen = $state(false);
</script>

<!-- perubahan hanya pada class Tailwind dark mode -->
<section id="home" class="bg-white font-mono transition-colors dark:bg-slate-900">
	<header class="absolute inset-x-0 top-0 z-50">
		<nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
			<div class="flex lg:flex-1">
				<a href="/" class="-m-1.5 p-1.5">
					<span class="sr-only">{APP_CONFIG.app_name}</span>
					<img class="h-8 w-auto" src="/pst-brand-logo-bg-none.png" alt={APP_CONFIG.app_name} />
				</a>
			</div>
			<div class="flex lg:hidden">
				<button
					type="button"
					class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
					onclick={() => (isMenuOpen = true)}
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="size-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
				</button>
			</div>
			<div class="hidden lg:flex lg:gap-x-12">
				<a
					href="#home"
					class="group relative inline-block text-sm font-semibold text-blue-900 dark:text-white"
				>
					Home
					<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>

				<a
					href="#service"
					class="group relative inline-block text-sm font-semibold text-blue-900 dark:text-white"
				>
					Service
					<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>

				<a
					href="#team"
					class="group relative ml-4 inline-block text-sm font-semibold text-blue-900 dark:text-white"
				>
					Team
					<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>

				<a
					href="#contact"
					class="group relative ml-4 inline-block text-sm font-semibold text-blue-900 dark:text-white"
				>
					Contact
					<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			</div>
			<div class="hidden lg:flex lg:flex-1 lg:justify-end">
				<Button onclick={toggleMode} variant="outline" size="icon">
					<Sun
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</nav>

		{#if isMenuOpen}
			<div class="lg:hidden" role="dialog" aria-modal="true">
				<div class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"></div>
				<div
					class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 text-gray-900 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-slate-800 dark:text-white"
				>
					<div class="flex items-center justify-between">
						<a href="/" class="-m-1.5 p-1.5">
							<span class="sr-only">{APP_CONFIG.app_name}</span>
							<img class="h-8 w-auto" src="/pst-brand-logo-bg-none.png" alt={APP_CONFIG.app_name} />
						</a>
						<button
							type="button"
							class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white"
							onclick={() => (isMenuOpen = false)}
						>
							<span class="sr-only">Close menu</span>
							<svg
								class="size-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
					<div class="mt-6 flow-root">
						<div class="-my-6 divide-y divide-gray-300/10 dark:divide-white/10">
							<div class="space-y-2 py-6">
								<a
									href="#home"
									class="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-slate-700"
									>Home</a
								>
								<a
									href="#service"
									class="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-slate-700"
									>Service</a
								>
								<a
									href="#team"
									class="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-slate-700"
									>Team</a
								>
								<a
									href="#contact"
									class="block rounded-lg px-3 py-2 text-base font-semibold hover:bg-gray-100 dark:hover:bg-slate-700"
									>Contact</a
								>
							</div>
							<div class="py-6">
								<Button onclick={toggleMode} variant="outline" size="icon">
									<Sun
										class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
									/>
									<Moon
										class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
									/>
									<span class="sr-only">Toggle theme</span>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</header>

	<div class="relative isolate px-6 pt-14 lg:px-8">
		<!-- Atas -->
		<div
			class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-pink-400 to-indigo-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>

		<!-- Konten -->
		<div class="mx-auto max-w-4xl py-32 text-center sm:py-48 lg:py-56">
			<div class="hidden sm:mb-8 sm:flex sm:justify-center">
				<div
					class="relative rounded-lg px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
				>
					Solusi Lengkap untuk Produktivitas dan Integrasi Bisnis
				</div>
			</div>
			<h1 class="text-5xl font-semibold tracking-tight text-blue-900 sm:text-7xl dark:text-white">
				Transformasi Digital yang Cerdas dan Terukur
			</h1>
			<p class="mt-8 text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-300">
				PT Pratama Solusi Teknologi adalah software house terpercaya yang menyediakan layanan
				pengembangan aplikasi, sistem informasi, integrasi API, dan solusi teknologi inovatif untuk
				mendukung pertumbuhan bisnis dan instansi Anda.
			</p>
			<div class="mt-10 flex items-center justify-center gap-x-6">
				<a
					href="#contact"
					class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 dark:hover:bg-blue-700"
				>
					Hubungi Kami
				</a>
				<a
					href="#service"
					class="group relative inline-block text-sm font-semibold text-gray-900 dark:text-gray-100"
				>
					Jelajahi Layanan Kami <span aria-hidden="true">→</span>
					<span
						class="absolute -bottom-1 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			</div>
		</div>

		<!-- Bawah -->
		<div
			class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			aria-hidden="true"
		>
			<div
				class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-pink-400 to-indigo-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
				style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
			></div>
		</div>
	</div>
</section>
