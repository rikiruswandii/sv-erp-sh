<script>
	import { APP_CONFIG } from '$lib/config/app';
</script>

<!-- Footer -->
<footer
	class="bg-white pt-12 pb-6 font-mono text-gray-600 transition-colors dark:bg-slate-900 dark:text-gray-300"
>
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-10 grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Tentang -->
			<div>
				<a href="/" class="-m-1.5 mb-2 flex items-center gap-2 p-1.5">
					<img
						class="h-8 w-auto"
						src="/pst-brand-logo-bg-none.png"
						alt="PT Pratama Solusi Teknologi"
					/>
				</a>
				<p class="text-sm text-gray-500 dark:text-gray-400 text-justify">
					{APP_CONFIG.about}
				</p>
			</div>

			<!-- Navigasi Cepat -->
			<div>
				<h4 class="mb-4 text-lg font-semibold text-blue-900 dark:text-white">Navigasi Cepat</h4>
				<ul class="space-y-2 text-sm">
					{#each [{ href: '#home', label: 'Home' }, { href: '#about', label: 'Tentang' }, { href: '#service', label: 'Layanan' }, { href: '#portfolio', label: 'Portofolio' }, { href: '#contact', label: 'Kontak' }] as nav}
						<li>
							<a
								href={nav.href}
								class="group relative inline-block hover:text-gray-900 dark:hover:text-white"
							>
								{nav.label}
								<span
									class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
								></span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Media Sosial -->
			<div>
				<h4 class="mb-4 text-lg font-semibold text-blue-900 dark:text-white">Hubungi Kami</h4>
				<div class="flex flex-col space-y-2 text-sm">
					<a
						aria-label="email"
						href="mailto:{APP_CONFIG.email}"
						class="group relative flex items-center gap-2 transition hover:text-gray-900 dark:hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="lucide lucide-mail size-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /><rect
								x="2"
								y="4"
								width="20"
								height="16"
								rx="2"
							/>
						</svg>
						<span class="relative inline-block">
							{APP_CONFIG.email}
							<span
								class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
							></span>
						</span>
					</a>
					<a
						aria-label="phone"
						href="tel:{APP_CONFIG.phone}"
						class="group relative flex items-center gap-2 transition hover:text-gray-900 dark:hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="lucide lucide-phone size-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
							<path d="M8 12h.01" />
							<path d="M12 12h.01" />
							<path d="M16 12h.01" />
						</svg>

						<span class="relative inline-block">
							{APP_CONFIG.phone}
							<span
								class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
							></span>
						</span>
					</a>
				</div>
			</div>
		</div>

		<!-- Copyright -->
		<div
			class="border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
		>
			<p>
				<span class="font-semibold text-blue-900 dark:text-white">{APP_CONFIG.copyright}</span>.
				Seluruh hak cipta dilindungi.
			</p>
			<p class="mt-1">
				<a href="/" class="group relative inline-block hover:text-gray-900 dark:hover:text-white">
					Syarat & Ketentuan
					<span
						class="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center -translate-x-1/2 transform bg-sky-500 transition-all duration-300 group-hover:w-full"
					></span>
				</a>
			</p>
		</div>
	</div>
</footer>
