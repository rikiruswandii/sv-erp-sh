<script lang="ts">
	import { page } from '$app/state';
  console.log("error panel", page.error.status);
</script>
<svelte:head>
    <link rel="stylesheet" href="/assets/css/dashlite.css?ver=3.0.3">
    <link id="skin-default" rel="stylesheet" href="/assets/css/theme.css?ver=3.0.3">
    <!-- JavaScript -->
    <script src="/assets/js/bundle.js?ver=3.0.3"></script>
    <script src="/assets/js/scripts.js?ver=3.0.3"></script>
</svelte:head>
<body class="nk-body ui-rounder npc-default pg-error">
  <div class="nk-app-root">
      <!-- main @s -->
      <div class="nk-main ">
          <!-- wrap @s -->
          <div class="nk-wrap nk-wrap-nosidebar">
              <!-- content @s -->
              <div class="nk-content ">
                  <div class="nk-block nk-block-middle wide-md mx-auto">
                      <div class="nk-block-content nk-error-ld text-center">
                          <img class="nk-error-gfx" src="/images/gfx/error-404.svg" alt="">
                          <div class="wide-xs mx-auto">
                              <h3 class="nk-error-title">{page.status} - {page.error?.message} (panel)</h3>
                              <p class="nk-error-text">We are very sorry for inconvenience. It looks like you’re try to access a page that either has been deleted or never existed.</p>
                              <a href="/panel" class="btn btn-lg btn-primary mt-2">Back To Home</a>
                          </div>
                      </div>
                  </div><!-- .nk-block -->
              </div>
              <!-- wrap @e -->
          </div>
          <!-- content @e -->
      </div>
      <!-- main @e -->
  </div>
  <!-- app-root @e -->

</body>