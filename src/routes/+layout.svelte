<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	import hljs from 'highlight.js';
	import 'highlight.js/styles/base16/material.css';

	import { AppShell, Toast, storeHighlightJs } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	storeHighlightJs.set(hljs);

	export let data;

	$: ({ db, session } = data);

	onMount(() => {
		const { data: sessionData } = db.auth.onAuthStateChange((_, currentSession) => {
			if (currentSession?.expires_at !== session?.expires_at) invalidate('db:auth');

			return () => sessionData.subscription.unsubscribe();
		});
	});
</script>

<Toast position="t" />

<!-- App Shell -->
<AppShell>
	<div class="max-w-md mx-auto">
		<slot />
	</div>
</AppShell>
