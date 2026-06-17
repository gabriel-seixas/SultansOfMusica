<script lang="ts">
  import type { PageProps } from './$types';
  import { formatPrice } from '$lib/util';
  import { cart } from '$lib/stores/cart';  // ← importe a store

  let { data }: PageProps = $props();
  let { product, albumCovers, relatedProducts, tracklist, albumDescription, albumYear } = data;

  let selectedCover = $state(product.cover);
  let openPanel = $state<'tracks' | 'details' | null>(null);

  function selectCover(url: string) {
    selectedCover = url;
  }

  function togglePanel(panel: 'tracks' | 'details') {
    openPanel = openPanel === panel ? null : panel;
  }

  // Função correta para adicionar ao carrinho
  function addToCart() {
    cart.update(items => {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        // Aumenta a quantidade, respeitando o estoque
        return items.map(i =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
            : i
        );
      }
      // Adiciona novo item com quantity 1
      return [...items, { product, quantity: 1 }];
    });
  }
</script>

<section class="product-page">
	<!-- LEFT: Gallery -->
	<div class="gallery">
		<div class="main-image">
			<img src={selectedCover} alt={product.title} />
		</div>
		<div class="thumbs">
			{#each albumCovers as cover, i}
				<button
					class="thumb"
					class:active-thumb={cover === selectedCover}
					onclick={() => selectCover(cover)}
					aria-label={`Imagem ${i + 1}`}
				>
					<img src={cover} alt="" />
				</button>
			{/each}
		</div>
	</div>

	<!-- RIGHT: Details -->
	<div class="details">
		<h1>{product.title}</h1>
		<h3>{product.artist}</h3>

		<div class="price">{formatPrice(product.price)}</div>
		<span class="sku">#{product["api-id"]}</span>

		<p class="description"></p>

		<!-- FIX: Maybe remove this -->
		<!-- COLORS (static for now) -->
		<!-- <div class="colors">
			<div class="color black"></div>
			<div class="color wine"></div>
			<div class="color green"></div>
		</div> -->

		<!-- BUTTONS -->
		<div class="actions">
			<button class="buy-btn" onclick={addToCart}> Adicionar ao Carrinho </button>
			<a href={`/product/${product.id}/edit`}><button class="edit-btn"> Editar </button> </a>
		</div>

		{#if product.stock > 0}
			<div class="stock">✔ Em estoque — {product.stock} disponíveis</div>
		{:else}
			<div class="stock out-of-stock">✘ Fora de estoque</div>
		{/if}

		<!-- ACCORDION -->
		<div class="accordion">
			<div class="accordion-item" onclick={() => togglePanel('tracks')}>
				<span>Lista de Faixas</span>
				<b>{openPanel === 'tracks' ? '−' : '+'}</b>
			</div>
			{#if openPanel === 'tracks'}
				<div class="accordion-content">
					{#if tracklist.length > 0}
						<ol class="track-list">
							{#each tracklist as track}
								<li>
									{track.strTrack}{#if track.intDuration}
										— {Math.floor(Number(track.intDuration) / 60000)}:{String(
											Math.floor((Number(track.intDuration) % 60000) / 1000)
										).padStart(2, '0')}{/if}
								</li>
							{/each}
						</ol>
					{:else}
						<p class="empty-message">Nenhuma faixa encontrada.</p>
					{/if}
				</div>
			{/if}

			<div class="accordion-item" onclick={() => togglePanel('details')}>
				<span>Detalhes do Produto</span>
				<b>{openPanel === 'details' ? '−' : '+'}</b>
			</div>
			{#if openPanel === 'details'}
				<div class="accordion-content">
					{#if albumYear}
						<p><strong>Lançamento:</strong> {albumYear}</p>
					{/if}
					{#if albumDescription}
						<p class="album-description">{albumDescription}</p>
					{:else}
						<p class="empty-message">Nenhuma descrição disponível.</p>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- RELATED PRODUCTS -->
<section class="related">
	<!-- <h2>Produtos Relacionados</h2> -->
	<div class="related-grid">
		{#each relatedProducts as rp}
			<div class="related-card">
				<a href={`/product/${rp.id}`}>
					<img src={rp.cover} alt={rp.title} />
				</a>
				<div class="related-info">
					<div class="price-tag">{formatPrice(product.price)}</div>
					<h4>{rp.title}</h4>
					<p>{rp.artist}</p>
					<button onclick={addToCart}>Adicionar ao Carrinho</button>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	/* Scoped styles – same CSS you had, but inside <style> */
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.product-page {
		width: 100%;
		display: flex;
		gap: 80px;
		padding: 20px 60px 80px;
	}

	.gallery {
		flex: 1;
	}
	.main-image {
		width: 100%;
		max-width: 650px;
	}
	.main-image img {
		width: 100%;
		object-fit: contain;
	}

	.thumbs {
		display: flex;
		gap: 18px;
		margin-top: 30px;
	}

	.thumb {
		width: 110px;
		height: 110px;
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		background: white;
		padding: 0;
		border: none;
	}
	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.active-thumb {
		border: 2px solid #ffcc00;
	}

	.details {
		width: 520px;
	}
	.details h1 {
		font-size: 56px;
		margin-bottom: 5px;
	}
	.details h3 {
		color: #777;
		font-weight: 400;
		margin-bottom: 20px;
	}
	.price {
		color: #ffb700;
		font-size: 42px;
		font-weight: 700;
		margin-bottom: 20px;
	}
	.sku {
		color: #999;
		display: block;
		margin-bottom: 25px;
	}
	.description {
		line-height: 1.8;
		color: #555;
		margin-bottom: 30px;
	}

	.colors {
		display: flex;
		gap: 14px;
		margin-bottom: 35px;
	}
	.color {
		width: 35px;
		height: 35px;
		border-radius: 50%;
		cursor: pointer;
		border: 2px solid transparent;
	}
	.color:hover {
		border-color: #000;
	}
	.black {
		background: black;
	}
	.wine {
		background: #7d2955;
	}
	.green {
		background: #5d7430;
	}

	.actions {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}
	.buy-btn {
		flex: 1;
		height: 55px;
		border: none;
		border-radius: 6px;
		background: #f4d600;
		color: black;
		font-weight: 700;
		cursor: pointer;
	}
	.edit-btn {
		width: 170px;
		height: 55px;
		border: none;
		border-radius: 6px;
		background: #e7e7e7;
		font-weight: 600;
		cursor: pointer;
	}
	.stock {
		color: #6c9b52;
		margin-bottom: 40px;
	}

	.accordion {
		border-top: 1px solid #ddd;
	}
	.accordion-item {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #ddd;
		cursor: pointer;
	}
	.accordion-item span {
		font-weight: 500;
	}
	.accordion-item b {
		color: #ffcc00;
		font-size: 24px;
	}

	.related {
		padding: 0 60px 80px;
	}
	.related h2 {
		font-size: 48px;
		margin-bottom: 40px;
	}
	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 30px;
	}

	.related-card {
		background: white;
		border-radius: 10px;
		overflow: hidden;
		transition: 0.3s;
	}
	.related-card:hover {
		transform: translateY(-5px);
	}
	.related-card img {
		width: 100%;
		height: 240px;
		object-fit: cover;
	}
	.related-info {
		padding: 18px;
	}
	.price-tag {
		color: #666;
		font-weight: 700;
		margin-bottom: 12px;
	}
	.related-info h4 {
		font-size: 16px;
		margin-bottom: 6px;
	}
	.related-info p {
		color: #777;
		font-size: 14px;
		margin-bottom: 20px;
	}
	.related-info button {
		width: 100%;
		height: 45px;
		border: none;
		border-radius: 6px;
		background: #f4d600;
		font-weight: 600;
		cursor: pointer;
	}
	.out-of-stock {
		color: #b33;
	}

	/* Responsive */
	@media (max-width: 1100px) {
		.product-page {
			flex-direction: column;
		}
		.details {
			width: 100%;
		}
	}
	@media (max-width: 700px) {
		.product-page {
			padding: 30px;
		}
		.details h1 {
			font-size: 40px;
		}
		.price {
			font-size: 34px;
		}
		.actions {
			flex-direction: column;
		}
		.edit-btn {
			width: 100%;
		}
		.related {
			padding: 30px;
		}
		.related h2 {
			font-size: 34px;
		}
	}
</style>
