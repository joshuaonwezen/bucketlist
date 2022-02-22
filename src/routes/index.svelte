<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch('/categories.json');
		if (res.ok) {
			const { categories } = await res.json();
			return {
				props: { categories }
			};
		}
	};
</script>

<script>
	export let categories;
	console.log(categories);
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<h1 class="text-4xl mb-10 font-extrabold text-center">Tigerpoints</h1>

{#each categories as { name, question }}
<div class="card text-center shadow-2xl mb-20">
	<h1>
		{name}
	</h1>
	<div class="card-body flex">
		{#each question as { name, value }}
			<p class="text-left">{name}</p>
			<input type="checkbox" />
		{/each}
	</div>
</div>
	<!-- <div class="card text-center shadow-2xl mb-20">
		<figure class="px-10 pt-10">
			<img src={coverImage.url} alt={`Cover image for ${title}`} />
		</figure>
        <div class="card-body">
            <h2 class="title">{title}</h2>
            <p>{excerpt}</p>
            <div class="flex justify-center mt-5 space-x-2">
                {#each tags as tag}
                    <span class="badge badge-primary">{tag}</span>    
                {/each}
            </div>
            <div class="justify-center card-actions">
                <a href={`/posts/${slug}`} class="btn btn-outline btn-primary">
                    Read &rArr;
                </a>
            </div>
        </div>
	</div> -->
{/each}
