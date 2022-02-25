<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch(`/categories.json`);
		if (res.ok) {
			const { categories } = await res.json();
			return {
				props: { categories }
			};
		}
	};
</script>

<script>
	import { checkedAnswers, details, score } from '../stores';
	import { onMount } from 'svelte';
	import Modals from '$lib/modals.svelte';

	export let categories;

	onMount(async () => {
		//Set localStorage onMount as it doesn't exist until DOM is initialized
		checkedAnswers.useLocalStorage();
		details.useLocalStorage();
		score.useLocalStorage();
	});

	//Sum up all the values of the selected inputs
	const calculateScore = () => {
		$score = 0;
		for (const answer in $checkedAnswers) {
			$score += parseInt(
				document
					.querySelector(`input[value="${$checkedAnswers[answer]}"]`)
					.getAttribute('data-value')
			);
		}
		return $score;
	};

	//Transforms question to id format
	const transformToId = (value) => {
		return value.toLowerCase().replace(/\//g, '').replace(/ +/g, '-');
	};

	// const addToAnswers = (e, value) => {
	// 	$checkedAnswers = e.checked ? [...$checkedAnswers, value] : $checkedAnswers.filter(item => item !== value)
	// }
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<Modals />

{#each categories as { name, question }}
	<div class="card text-center shadow-2xl bg-secondary bg-opacity-10 m-2 lg:mb-7 lg:mt-7">
		<h1 class="card-title mt-7 mb-0 text-3xl font-semibold">
			{name}
		</h1>
		<div class="card-body flex flex-row flex-wrap">
			{#each question as { name, value }}
				<div class="form-control w-full lg:w-1/3">
					<label class="cursor-pointer flex p-1 mb-3">
						<input
							type="checkbox"
							checked={$checkedAnswers.includes(transformToId(name)) ? 'checked' : ''}
							value={transformToId(name)}
							bind:group={$checkedAnswers}
							data-value={value}
							class="checkbox checkbox-primary min-w-[24px]"
						/>
						<span class="label-text ml-2 text-left">{name}</span>
					</label>
				</div>
			{/each}
		</div>
	</div>
{/each}

<footer
	class="text-center fixed left-0 bottom-0 w-full p-3 shadow-lg bg-neutral text-neutral-content"
>
	<label for="result-modal" class="btn btn-primary modal-button text-white" on:click={calculateScore}
		>Calculate Score</label
	>
</footer>
