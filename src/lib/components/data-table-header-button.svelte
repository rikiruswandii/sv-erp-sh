<script lang="ts">
    import type { ComponentProps } from "svelte";
    import ArrowUpDown from "@lucide/svelte/icons/arrow-up-down";
    import { Button } from "$lib/components/ui/button/index.js";
    
    let { label, variant = "ghost", ...restProps }: ComponentProps<typeof Button> =
     $props();
   </script>
    
   <Button {variant} {...restProps}>
    {label}
    <ArrowUpDown class="ml-2" />
   </Button>