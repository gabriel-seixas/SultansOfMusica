<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();
</script>

<div class="search-page">
  <h1>
    {#if data.query}
      Resultados para "{data.query}"
    {:else}
      Todos os produtos
    {/if}
  </h1>

  {#if data.error}
    <div class="alert error">{data.error}</div>
  {:else if data.products.length === 0}
    <p>Nenhum produto encontrado.</p>
  {:else}
    <div class="product-grid">
      {#each data.products as product}
  <a href={`/product/${product.id}`} class="product-card">
    <img
      src={product.cover || '/placeholder.jpg'}
      alt={product.title}
      class="product-image"
    />
    <div class="product-info">
      <h2>{product.title}</h2>
      <p class="artist">{product.artist}</p>
      <p class="price">R$ {(product.price / 100).toFixed(2)}</p>
      <p class="stock {product.stock === 0 ? 'out' : ''}">
        {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
      </p>
    </div>
  </a>
{/each}
    </div>
  {/if}
</div>

<style>
  .search-page {
    padding: 30px 60px;
    max-width: 1200px;
    margin: 0 auto;
  }
  h1 {
    font-size: 28px;
    margin-bottom: 30px;
  }
  .alert.error {
    background: #ffe0e0;
    color: #b30000;
    padding: 12px;
    border-radius: 6px;
    margin-bottom: 20px;
  }
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 25px;
  }

  a.product-card {
  text-decoration: none;
  color: inherit;
  display: block;
}

  .product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
}
  .product-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .product-info {
    padding: 15px;
  }
  .product-info h2 {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .artist {
    color: #777;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .price {
    font-weight: 700;
    color: #ffb700;
    font-size: 20px;
    margin-bottom: 10px;
  }
  .stock {
    font-size: 13px;
    color: #6c9b52;
    margin-bottom: 15px;
  }
  .stock.out {
    color: #c9302c;
  }
  .buy-btn {
    width: 100%;
    height: 40px;
    border: none;
    border-radius: 6px;
    background: #f4d600;
    font-weight: 600;
    cursor: pointer;
  }
  .buy-btn:disabled {
    background: #ddd;
    cursor: not-allowed;
  }

  @media (max-width: 700px) {
    .search-page {
      padding: 20px;
    }
  }
</style>