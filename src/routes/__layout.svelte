<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/pages.json');
		if (res.ok) {
			const { pages } = await res.json();
			return {
				props: { pages }
			};
		}
	};
</script>

<script>
	import Nav from '$lib/nav.svelte';
	import '../app.css';

	export let pages;
</script>

<Nav {pages} />

<main class="container max-w-2xl mx-auto mb-[100px] lg:px-4">
	<slot />
</main>
