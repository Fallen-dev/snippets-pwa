<script lang="ts">
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { fly, type FlyParams } from 'svelte/transition';

	const props = {
		duration: 600,
		y: 600
	} as FlyParams;
</script>

<Navbar />
<div class="min-h-screen max-w-md mx-auto p-4" transition:fly={props}>
	<slot />
</div>
