<script>
	import { fly } from 'svelte/transition';
</script>

<div
	class="container min-h-screen p-4 space-y-6"
	in:fly={{ y: 600, duration: 600, delay: 600 }}
	out:fly={{ y: 600, duration: 600 }}
>
	<slot />
</div>
