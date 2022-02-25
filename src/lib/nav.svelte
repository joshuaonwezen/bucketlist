<script>
	import { editDetails } from '../stores.js';
	export let pages;
</script>

<div class="navbar shadow-lg bg-neutral text-neutral-content mb-1 lg:mb-2">
	<!-- MOBILE -->

	<div class="navbar-start lg:hidden">
		<div class="dropdown">
			<label tabindex="0" class="btn btn-ghost btn-circle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h7"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-36 text-left"
			>
				<li>
					<a href={`/`} class="btn btn-ghost btn-sm rounded-btn h-auto justify-start"> Home </a>
				</li>
				{#each pages as { title, slug }}
					<li>
						<a href={`/${slug}`} class="btn btn-ghost btn-sm rounded-btn h-auto justify-start">
							{title}
						</a>
					</li>
				{/each}
				<li>
					<a class="btn btn-ghost btn-sm rounded-btn modal-button h-auto justify-start">
						<label for="details-modal" on:click={($editDetails = true)}>Edit details</label>
					</a>
				</li>
			</ul>
		</div>
	</div>

	<div class="navbar-center lg:hidden">
		<span class="font-extrabold text-accent text-2xl"> 🐯 Tigerpoints </span>
	</div>

	<!-- DESKTOP -->
	<div class="hidden px-2 mx-2 navbar-start lg:block">
		<span class="font-extrabold text-accent text-2xl"> 🐯 Tigerpoints </span>
	</div>

	<div class="hidden px-2 mx-2 navbar-center lg:flex">
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
