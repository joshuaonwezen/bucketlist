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
	import { score } from '../stores'
	export let categories;

	function calculateScore(){

		score.update(score)
		console.log(score)
	}
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<h1 class="text-4xl mb-10 font-extrabold text-center">Tigerpoints</h1>
<form>
	{#each categories as { name, question }}
		<div class="card text-center shadow-2xl mb-20">
			<h1 class="card-title">
				{name}
			</h1>
			<div class="card-body flex flex-row flex-wrap mb-4">
				{#each question as { name, value }}
					<div class="form-control w-1/3">
						<label class="cursor-pointer flex p-1">
							<input type="checkbox" data-value={value} class="checkbox checkbox-primary" />
							<span class="label-text ml-1">{name}</span>
						</label>
					</div>
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
	<input type="submit" class="btn" value="Calculate score" on:submit={calculateScore}>
</form>
