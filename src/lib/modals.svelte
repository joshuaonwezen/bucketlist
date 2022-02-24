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
	<div class="card bg-base-100 shadow-xl image image-full">
		<figure>
			<img
				src="https://images.photowall.com/products/52977/bengal-tiger.jpg?h=250&q=85"
				alt="Tiger"
			/>
		</figure>
		<div class="card-body">
			<h3 class="font-bold text-lg">Keep it up 🐯</h3>
			<p class="py-4">You have {$score} tigerpoints.</p>
			<div class="modal-action h-full items-end">
				<label for="result-modal" class="btn">Click here for hot singles near you!</label>
			</div>
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
	<div class="card bg-base-100 shadow-xl image image-full">
		<figure>
			<img
				src="https://t4.ftcdn.net/jpg/02/67/83/35/360_F_267833517_zd0boUNvOwNCZerHtoln2lIqt5flFsg4.jpg"
				alt="Tiger"
				class="max-h-[300px]"
				width="250px"
			/>
		</figure>
		<div class="card-body">
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
				class="input input-bordered input-secondary w-full min-h-[48px] max-w-xs"
			/>
			<div class="modal-action h-full items-end">
				<label for="details-modal" class="btn">Continue!</label>
			</div>
		</div>
	</div>
</div>
