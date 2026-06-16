<script lang="ts">
	const { currentPage = 1, totalPages = 1 } = $props<{
		currentPage?: number;
		totalPages?: number;
	}>();
</script>

<div class="pagination">
	<button disabled={currentPage === 1}>Anterior</button>

	<div class="pages">
		{#each Array(totalPages) as index (index)}
			<button class:active={index + 1 === currentPage}>{index + 1}</button>
		{/each}
	</div>

	<button disabled={currentPage === totalPages}>Próximo</button>
</div>

