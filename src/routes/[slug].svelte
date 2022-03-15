<script context="module">
	export const load = async ({ fetch, params}) => {
		const { slug } = params;
		const res = await fetch(`/pages/${slug}.json`);
		if (res.ok) {
			const { page } = await res.json();
			return {
				props: { page }
			};
		}
	};
</script>

<script lang="ts">
	export let page: any;
	import Modals from '$lib/modals.svelte';
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<h1 class="text-4xl font-semibold mb-5 m-5">{page.title}</h1>

<article class="m-5">
    {@html page.content.html}
</article>