<script lang="ts">

	export let product;

	function formatPrice(price:number){

		return price.toLocaleString(
			'pt-BR',
			{
				style:'currency',
				currency:'BRL'
			}
		);

	}

</script>

<a
	class="product-card"
	href={`/product/${product.id}`}
>

	<img
		src={product.cover}
		alt={product.title}
	/>

	<div class="product-info">

		<h4>{product.title}</h4>

		<p>{product.artist}</p>

		<span>{product.release_date}</span>

		<small>
			{product.stock} disponíveis
		</small>

		<strong>
			{formatPrice(product.price)}
		</strong>

	</div>

</a>