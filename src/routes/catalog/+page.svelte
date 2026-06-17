<script lang="ts">
  import type { PageData } from './$types';
  import Header from '$lib/components/Header.svelte';

  let { data }: { data: PageData } = $props();

  
  let selectedDecades = $state<string[]>([]);
  let selectedCategories = $state<string[]>([]);
  let currentPage = $state(1);
  const itemsPerPage = 12;

  
  let allProducts = $derived(data.products ?? []);

  let filteredProducts = $derived(
    allProducts.filter((p) => {
      const year = parseInt(p.release_date?.split('-')[0] || p.release_date, 10);
      const decade = year ? `${Math.floor(year / 10) * 10}` : '';

      const decadeMatch = selectedDecades.length === 0 || selectedDecades.includes(decade);
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(p.type);

      return decadeMatch && categoryMatch;
    })
  );

  let totalPages = $derived(Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage)));

  let paginatedProducts = $derived(
    filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  );

  let decades = $derived(
    [...new Set(
      allProducts
        .map(p => parseInt(p.release_date?.split('-')[0] || p.release_date))
        .filter(y => !isNaN(y))
        .map(y => `${Math.floor(y / 10) * 10}`)
    )].sort()
  );

  let categories = $derived(
    [...new Set(allProducts.map(p => p.type).filter(Boolean))].sort()
  );

  
  function toggleDecade(decade: string) {
    if (selectedDecades.includes(decade)) {
      selectedDecades = selectedDecades.filter(d => d !== decade);
    } else {
      selectedDecades = [...selectedDecades, decade];
    }
    currentPage = 1;
  }

  function toggleCategory(category: string) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
    currentPage = 1;
  }

  function goToPage(page: number) {
    currentPage = Math.max(1, Math.min(page, totalPages));
  }
</script>

<Header />

<div class="page">
  
  <section class="breadcrumb">
    <a href="/">Início</a>
    <span>/</span>
    <p>Catálogo</p>
  </section>

  
  <section class="artist-banner">
    <h1>TODOS OS PRODUTOS</h1>
    <p>Explore nossa coleção completa</p>
  </section>

  <main class="container">
    
    <aside class="sidebar">
      <div class="filter-group">
        <h3>Década</h3>
        {#each decades as decade}
          <label class:checked={selectedDecades.includes(decade)}>
            <input
              type="checkbox"
              checked={selectedDecades.includes(decade)}
              on:change={() => toggleDecade(decade)}
            />
            {decade}
          </label>
        {/each}
      </div>

      <div class="filter-group">
        <h3>Categoria</h3>
        {#each categories as category}
          <label class:checked={selectedCategories.includes(category)}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              on:change={() => toggleCategory(category)}
            />
            {category}
          </label>
        {/each}
      </div>
    </aside>

    
    <section class="products">
      {#if data.error}
        <div class="alert error">{data.error}</div>
      {:else if paginatedProducts.length === 0}
        <p class="empty">Nenhum produto encontrado com esses filtros.</p>
      {:else}
        {#each paginatedProducts as product}
          <a href={`/product/${product.id}`} class="product-card">
            <img src={product.cover || '/placeholder.jpg'} alt={product.title} />
            <div class="product-info">
              <h4>{product.title}</h4>
              <p>{product.artist}</p>
              <span>{product.release_date?.split(' ')[0] ?? ''}</span>
              <small>{product.stock} disponível</small>
              <strong>R$ {(product.price / 100).toFixed(2).replace('.', ',')}</strong>
            </div>
          </a>
        {/each}
      {/if}
    </section>
  </main>

  <!-- PAGINAÇÃO -->
  {#if totalPages > 1}
    <section class="pagination">
      <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
        Anterior
      </button>

      <div class="pages">
        {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
          <span
            class:active-page={page === currentPage}
            role="button"
            tabindex="0"
            on:click={() => goToPage(page)}
            on:keydown={(e) => e.key === 'Enter' && goToPage(page)}
          >
            {page}
          </span>
        {/each}
      </div>

      <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
        Próximo
      </button>
    </section>
  {/if}

  <footer class="footer">
    © 2026 Sultans of Music LTDA. Todos os direitos reservados.
  </footer>
</div>

<style>
  /* Reset e fontes */
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Poppins', sans-serif; background:#f5f5f5; }

  /* Breadcrumb */
  .breadcrumb {
    width:100%;
    padding:18px 60px;
    display:flex;
    gap:10px;
    font-size:14px;
  }
  .breadcrumb a { text-decoration:none; color:#999; }
  .breadcrumb p { color:#ffb700; }

  /* Banner */
  .artist-banner {
    width:100%;
    padding:20px 60px 50px;
    border-bottom:1px solid #ddd;
  }
  .artist-banner h1 {
    font-size:90px;
    font-weight:800;
    letter-spacing:2px;
  }
  .artist-banner p {
    color:#888;
    font-size:22px;
  }

  /* Container principal */
  .container {
    width:100%;
    display:flex;
    gap:50px;
    padding:40px 60px;
  }

  /* Sidebar */
  .sidebar { width:240px; }
  .filter-group { margin-bottom:50px; }
  .filter-group h3 { margin-bottom:25px; font-size:18px; }
  .filter-group label {
    display:flex;
    align-items:center;
    gap:10px;
    margin-bottom:15px;
    color:#777;
    font-size:15px;
    cursor: pointer;
  }
  .checked { color:#ffcc00 !important; font-weight:600; }

  /* Grid de produtos */
  .products {
    flex:1;
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(260px, 1fr));
    gap:35px;
  }

  /* Card */
  a.product-card {
    text-decoration: none;
    color: inherit;
  }
  .product-card {
    background:white;
    border:1px solid #e5e5e5;
    border-radius:10px;
    overflow:hidden;
    transition:.3s;
    display: block;
  }
  .product-card:hover {
    transform:translateY(-5px);
    box-shadow:0 10px 20px rgba(0,0,0,.08);
  }
  .product-card img {
    width:100%;
    height:320px;
    object-fit:cover;
  }
  .product-info { padding:18px; }
  .product-info h4 { font-size:18px; margin-bottom:8px; }
  .product-info p { color:#777; font-size:14px; margin-bottom:5px; }
  .product-info span {
    display:block;
    color:#999;
    font-size:13px;
    margin-bottom:12px;
  }
  .product-info small {
    display:block;
    margin-bottom:12px;
    color:#666;
  }
  .product-info strong {
    color:#ffb700;
    font-size:20px;
  }

  /* Paginação */
  .pagination {
    width:100%;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:30px 60px;
  }
  .pagination button {
    width:100px;
    height:40px;
    border:none;
    border-radius:6px;
    background:#ffcc00;
    font-weight:600;
    cursor:pointer;
  }
  .pagination button:disabled {
    opacity:0.5;
    cursor:not-allowed;
  }
  .pages { display:flex; gap:10px; }
  .pages span {
    width:36px;
    height:36px;
    border:1px solid #ddd;
    border-radius:6px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:white;
    cursor: pointer;
  }
  .active-page { background:#ffcc00 !important; border:none !important; }

  .alert.error {
    background:#ffe0e0;
    color:#b30000;
    padding:12px;
    border-radius:6px;
    margin-bottom:20px;
  }
  .empty { color:#777; font-size:18px; }

  .footer {
    width:100%;
    padding:25px;
    background:black;
    color:#ffcc00;
    text-align:center;
    font-size:13px;
  }

  /* Responsivo */
  @media(max-width:1000px) {
    .container { flex-direction:column; }
    .sidebar { width:100%; }
    .artist-banner h1 { font-size:60px; }
  }
  @media(max-width:700px) {
    .artist-banner { padding:30px; }
    .artist-banner h1 { font-size:42px; }
    .artist-banner p { font-size:18px; }
    .container { padding:30px; }
    .pagination { flex-direction:column; gap:20px; }
  }
</style>