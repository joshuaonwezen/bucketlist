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

<script>
	export let page;
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<h1 class="text-4xl font-semibold mb-5">{page.title}</h1>

<article>
    {@html page.content.html}
</article>