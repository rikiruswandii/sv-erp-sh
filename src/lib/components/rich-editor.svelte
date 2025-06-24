<script lang="ts">
  let { value = $bindable() }  = $props();

  let editorElement: HTMLDivElement;
  let quill: any;

  // Svelte 5: gunakan $effect untuk side effect
  $effect(() => {
    if (!editorElement) return;

    (async () => {
      const Quill = (await import('quill')).default;
      await import('quill/dist/quill.core.css');
      await import('quill/dist/quill.snow.css');

      quill = new Quill(editorElement, {
        theme: 'snow',
        placeholder: 'Compose an epic...',
        modules: {
          syntax: true,
          toolbar: '#toolbar-container'
        }
      });

      // Set value awal dari parent ke editor
      quill.root.innerHTML = value;

      // Selalu update value ke parent, walaupun user belum mengetik
      value = quill.root.innerHTML;

      quill.on('text-change', () => {
        const currentValue = quill.root.innerHTML;
        value = currentValue;
      });
    })();
  });

  // Sinkronisasi jika value berubah dari luar (misal: reset form)
  $effect(() => {
    if (quill && value !== quill.root.innerHTML) {
      quill.root.innerHTML = value;
    }
  });
</script>

<svelte:head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
</svelte:head>

<div id="toolbar-container">
  <span class="ql-formats">
    <select class="ql-font"></select>
    <select class="ql-size"></select>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-bold" class="ql-bold"></button>
    <button aria-label="ql-italic" class="ql-italic"></button>
    <button aria-label="ql-underline" class="ql-underline"></button>
    <button aria-label="ql-strike" class="ql-strike"></button>
  </span>
  <span class="ql-formats">
    <select class="ql-color"></select>
    <select class="ql-background"></select>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-script-sub" class="ql-script" value="sub"></button>
    <button aria-label="ql-script-super" class="ql-script" value="super"></button>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-header-1" class="ql-header" value="1"></button>
    <button aria-label="ql-header-2" class="ql-header" value="2"></button>
    <button aria-label="ql-blockquote" class="ql-blockquote"></button>
    <button aria-label="ql-code-block" class="ql-code-block"></button>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-list-ordered" class="ql-list" value="ordered"></button>
    <button aria-label="ql-list-bullet" class="ql-list" value="bullet"></button>
    <button aria-label="ql-indent-min-1" class="ql-indent" value="-1"></button>
    <button aria-label="ql-indent-plus-1" class="ql-indent" value="+1"></button>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-direction" class="ql-direction" value="rtl"></button>
    <select class="ql-align"></select>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-link" class="ql-link"></button>
    <button aria-label="ql-image" class="ql-image"></button>
    <button aria-label="ql-video" class="ql-video"></button>
    <button aria-label="ql-formula" class="ql-formula"></button>
  </span>
  <span class="ql-formats">
    <button aria-label="ql-clean" class="ql-clean"></button>
  </span>
</div>
<div bind:this={editorElement}></div>
