<script lang="ts">
	import '../app.postcss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { fly } from 'svelte/transition';
</script>

<Navbar />
<div
	class="min-h-screen max-w-md mx-auto p-4"
	in:fly={{ y: 600, duration: 600 }}
	out:fly={{ y: 600, duration: 600, delay: 600 }}
>
	<slot />
</div>
