<script lang="ts" context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch(`/home.json`);
		if (res.ok) {
			const { categories, miscs } = await res.json();
			return {
				props: { categories, miscs }
			};
		}
	};
</script>

<script lang="ts">
	import { checkedAnswers, details, score, averageScore } from '../stores';
	import { onMount } from 'svelte';
	import Modals from '$lib/modals.svelte';
	import supabase from '$lib/db';

	//Models
	import type { Category } from '$lib/interfaces/category.interface';
	import type { Misc } from '$lib/interfaces/misc.interface';

	export let categories: Category[];
	export let miscs: Misc;

	onMount(async () => {
		//Set localStorage onMount as it doesn't exist until DOM is initialized
		checkedAnswers.useLocalStorage();
		details.useLocalStorage();
		score.useLocalStorage();

		//Weird fix for fetch bug in svelte
		// @ts-ignore
		fetch = window.fetch.bind(window);
	});

	//Sum up all the values of the selected inputs
	const calculateScore = () => {
		$score = 0;
		$checkedAnswers.map(
			(answer) =>
				($score += parseInt(
					document.querySelector(`input[value="${answer}"]`).getAttribute('data-value')
				))
		);

		postResults();
		getScores();

		return score;
	};

	//Transforms question to id format
	const transformToId = (value) => {
		return value.toLowerCase().replace(/\//g, '').replace(/ +/g, '-');
	};

	//Get scores from same gender from db
	const getScores = async () => {
		let { data: results, error } = await supabase
			.from('results-bucketlist')
			.select('score')
			.eq('gender', $details.gender);

		const averageScore = getAverageScore(results);
	};

	//Calculate average score
	const getAverageScore = (score) => {
		let totalScore = 0;
		score.map((item) => (totalScore += item.score));
		const average = Math.round(totalScore / score.length);
		$averageScore = average;
	};

	//Post results to db
	const postResults = async () => {
		const { data, error } = await supabase
			.from('results-bucketlist')
			.insert([{ gender: $details.gender, age: $details.age, score: $score }]);
	};

	// const addToAnswers = (e, value) => {
	// 	$checkedAnswers = e.checked ? [...$checkedAnswers, value] : $checkedAnswers.filter(item => item !== value)
	// }
</script>

<svelte:head>
	<title>Bucketlist</title>
</svelte:head>

<Modals miscs={miscs[0]}/>

<div class="card text-center shadow-2xl bg-secondary bg-opacity-10 m-2 lg:mb-7 lg:mt-7">
	<h1 class="card-title mt-7 mb-0 text-3xl font-semibold">Instructions</h1>
	<div class="card-body flex flex-row flex-wrap">
		<p>{miscs[0].rules}</p>
	</div>
</div>
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
							checked={$checkedAnswers.includes(transformToId(name)) ? true : false}
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
	<label
		for="result-modal"
		class="btn btn-primary modal-button text-white"
		on:click={calculateScore}>Calculate Score</label
	>
</footer>
