<script>
	import { editDetails } from '../stores.js';
	export let pages;
</script>

<div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
	<div class="px-2 mx-2 navbar-start">
		<span class="hidden font-extrabold text-accent lg:block"> 🐯 Tigerpoints 🐯 </span>
		<span class="font-extrabold text-accent lg:hidden"> 🐯 </span>
	</div>
	<div class="px-2 mx-2 navbar-center lg:flex">
		<div class="flex items-stretch">
			<a href={`/`} class="btn btn-ghost btn-sm rounded-btn"> Home </a>
			{#each pages as { title, slug }}
				<a href={`/${slug}`} class="btn btn-ghost btn-sm rounded-btn">
					{title}
				</a>
			{/each}
			<label
				for="details-modal"
				on:click={($editDetails = true)}
				class="btn btn-ghost btn-sm rounded-btn modal-button">Edit details</label
			>
		</div>
	</div>
	<div class="navbar-end" />
</div>
