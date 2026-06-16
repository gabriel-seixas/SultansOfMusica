<script>
	let { category = 'Vinil', artist = '' } = $props();
</script>

<div class="breadcrumb">
	<a href="/">{category}</a>
	{#if artist}
		<span>/</span>
		<p>{artist}</p>
	{/if}
</div>

<style>
	.breadcrumb {
		display: flex;
		gap: 10px;
		padding: 20px 60px;
		font-size: 14px;
	}
	.breadcrumb a {
		text-decoration: none;
		color: #999;
	}
	.breadcrumb p {
		color: #ffb700;
	}
</style>
