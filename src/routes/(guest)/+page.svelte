<script lang="ts">
	import GuestFooter from "$lib/components/guest-footer.svelte";
	import GuestHeader from "$lib/components/guest-header.svelte";
	import SectionContact from "$lib/components/section-contact.svelte";
	import SectionHero from "$lib/components/section-hero.svelte";
	import SectionNewsletter from "$lib/components/section-newsletter.svelte";
	import SectionService from "$lib/components/section-service.svelte";
	import SectionTeam from "$lib/components/section-team.svelte";
	import { APP_CONFIG } from "$lib/config/app";

	let pages = {
		title: APP_CONFIG.app_name,
		excerpt: APP_CONFIG.about
	}
</script>
<svelte:head>
  <title>{pages.title}</title>
  <meta name="description" content={pages.excerpt} />
</svelte:head>

<!-- header -->
<GuestHeader />

<!-- hero -->
<SectionHero />

<!-- Layanan Kami Section -->
<SectionService />

<!-- team -->
<SectionTeam />

<!-- contact -->
<SectionContact />

<!-- newsletter -->
<SectionNewsletter />

<!-- footer -->
<GuestFooter />