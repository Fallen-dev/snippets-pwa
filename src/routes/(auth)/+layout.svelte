<script>
	import { fly } from 'svelte/transition';
</script>

<div class="min-h-screen space-y-4" in:fly={{ y: 600 }} out:fly={{ y: 600, delay: 600 }}>
	<slot />
</div>
