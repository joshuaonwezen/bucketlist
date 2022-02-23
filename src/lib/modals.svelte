<script>
	import { details, score, editDetails } from '../stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		//Set localStorage onMount as it doesn't exist until DOM is initialized
		details.useLocalStorage();
		score.useLocalStorage();
	});

	$editDetails = $details.gender == undefined || $details.age == undefined ? true : false;
</script>

<input type="checkbox" id="result-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Keep it up 🐯</h3>
		<p class="py-4">You have {$score} tigerpoints.</p>
		<div class="modal-action">
			<label for="result-modal" class="btn">Click here for hot singles near you!</label>
		</div>
	</div>
</div>

<input
	type="checkbox"
	id="details-modal"
	class="modal-toggle"
	checked={$editDetails ? 'checked' : ''}
/>
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Details</h3>
		<div class="btn-group mt-3 mb-3">
			<input
				type="radio"
				bind:group={$details.gender}
				value="Male"
				name="options"
				data-title="Male"
				checked="checked"
				class="btn"
			/>
			<input
				type="radio"
				bind:group={$details.gender}
				value="Female"
				name="options"
				data-title="Female"
				class="btn"
			/>
			<input
				type="radio"
				bind:group={$details.gender}
				value="Other"
				name="options"
				data-title="Other"
				class="btn"
			/>
		</div>
		<input
			type="number"
      min="18"
      max="100"
			bind:value={$details.age}
			placeholder="Age"
			class="input input-bordered input-secondary w-full max-w-xs"
		/>
		<div class="modal-action">
			<label for="details-modal" class="btn">Continue!</label>
		</div>
	</div>
</div>
