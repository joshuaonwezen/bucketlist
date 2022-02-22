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
	import { checkedAnswers } from '../stores'
	import { onMount } from 'svelte'
	export let categories;
	let answers = [],
		results = 0;

	onMount(async() => {
		checkedAnswers.useLocalStorage();
	});

	const calculateScore = () => {
		results = 0;
		for(const answer in answers){
			results += parseInt(document.querySelector(`input[value="${answers[answer]}"]`).getAttribute('data-value'));
		}
		return results;
	}

	const transformToId = (value) => {
		return value.toLowerCase().replace(/\//g, '').replace(/ +/g, "-");
	}

	const addToArray = (e, value) => {
		$checkedAnswers = e.checked ? [...$checkedAnswers, value] : $checkedAnswers.filter(item => item !== value)
	}
</script>

<svelte:head>
	<title>Tigerpoints</title>
</svelte:head>

<h1 class="text-4xl mb-10 font-extrabold text-center">🐯 Tigerpoints 🐯</h1>
{#each categories as { name, question }}
	<div class="card text-center shadow-2xl mb-20">
		<h1 class="card-title">
			{name}
		</h1>
		<div class="card-body flex flex-row flex-wrap mb-4">
			{#each question as { name, value }}
				<div class="form-control w-1/3">
					<label class="cursor-pointer flex p-1 mb-3">
						<input type="checkbox" checked={$checkedAnswers.includes(transformToId(name)) ? 'checked' : ''} value={transformToId(name)} bind:group={answers} on:change={addToArray(this, transformToId(name))} data-value={value} class="checkbox checkbox-primary min-w-[24px]" />
						<span class="label-text ml-2 text-left">{name}</span>
					</label>
				</div>
			{/each}
		</div>
	</div>
{/each}
<label for="result-modal" class="btn modal-button" on:click={calculateScore}>Calculate Score</label>

<input type="checkbox" id="result-modal" class="modal-toggle">
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg"> 🐯 Keep it up. 🐯</h3>
    <p class="py-4">You have {results} tigerpoints.</p>
    <div class="modal-action">
      <label for="result-modal" class="btn">Click me for hot singles near you!</label>
    </div>
  </div>
</div>