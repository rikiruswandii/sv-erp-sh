<script lang="ts">
	import GuestFooter from "$lib/components/guest-footer.svelte";
	import SectionAbout from "$lib/components/section-about.svelte";
	import SectionContact from "$lib/components/section-contact.svelte";
	import SectionHero from "$lib/components/section-hero.svelte";
	import SectionNewsletter from "$lib/components/section-newsletter.svelte";
	import SectionService from "$lib/components/section-service.svelte";
	import SectionTeam from "$lib/components/section-team.svelte";

</script>

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