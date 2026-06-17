<script lang="ts">
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  let rawSales = $derived(data.sales);
  let error = $derived(data.error);

  // Garantia de array
  let sales = $derived(Array.isArray(rawSales) ? rawSales : []);

  let currentPage = $state(1);
  const perPage = 5;
  let totalPages = $derived(Math.ceil(sales.length / perPage));
  let paginatedSales = $derived(sales.slice((currentPage - 1) * perPage, currentPage * perPage));

  function goToPage(page: number) {
    currentPage = Math.max(1, Math.min(page, totalPages));
  }

  function formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) return dateTime;
    return date.toLocaleDateString('pt-BR');
  }

  function formatPrice(cents: number): string {
    return (cents / 100).toFixed(2).replace('.', ',');
  }

  function totalSale(items: any[]) {
    return items.reduce((sum, i) => sum + i.price * i.amount, 0);
  }
</script>

<main class="history-container">
  <h1>Histórico de Pedidos</h1>
  <p class="subtitle">
    Confira o status de pedidos recentes, administre devoluções e reemita notas fiscais.
  </p>

  {#if error}
    <div class="alert error">{error}</div>
  {/if}

  {#if paginatedSales.length === 0 && !error}
    <p class="empty">Nenhum pedido encontrado.</p>
  {:else}
    {#each paginatedSales as sale (sale.id)}
      <section class="order-box">
        <div class="order-header">
          <div class="order-data">
            <div>
              <small>TOKEN</small>
              <strong>{sale.id}</strong>
            </div>
            <div>
              <small>Data</small>
              <strong>{formatDate(sale['date-time'])}</strong>
            </div>
            <div>
              <small>Total</small>
              <strong>R$ {formatPrice(sale.items.reduce((sum: number, i: any) => sum + i.price * i.amount, 0))}</strong>
            </div>
          </div>
          <div class="order-buttons">
            <button>Ver Pedido</button>
            <button>Ver NF-e</button>
          </div>
        </div>

        {#each sale.items as item (item['product-id'])}
          <div class="order-item">
            <img src={item.cover || '/placeholder.jpg'} alt={item['product-title']} />
            <div class="item-info">
              <h3>{item['product-title']}</h3>
              <p>{item.artist}</p>
              <span>{item.type}</span>
              <div class="links">
                <a href={`/product/${item['product-id']}`}>Ver Produto</a>
                <button class="link-btn" on:click={() => alert('Funcionalidade em breve!')}>Comprar Novamente</button>
              </div>
              <div class="status success">
                <span class="glyphicon glyphicon-ok"></span>
                Finalizado em {formatDate(sale['date-time'])}
              </div>
            </div>
            <strong class="price">R$ {formatPrice(item.price * item.amount)}</strong>
          </div>
        {/each}
      </section>
    {/each}
  {/if}

  <!-- Paginação -->
  {#if totalPages > 1}
    <section class="pagination">
      <button on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
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
      <button on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Próximo</button>
    </section>
  {/if}
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Princess+Sofia&display=swap');
  @import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family:'Poppins',sans-serif; background:#f3f3f3; }

  .history-container {
    max-width:1100px; margin:40px auto; padding:0 20px;
  }
  .history-container h1 {
    font-size:36px; font-weight:700; margin-bottom:8px;
  }
  .subtitle {
    color:#777; margin-bottom:35px;
  }
  .alert.error {
    background:#ffe0e0; color:#b30000; padding:12px; border-radius:6px; margin-bottom:20px;
  }
  .empty {
    font-size:18px; color:#666; margin:40px 0;
  }

  .order-box {
    margin-bottom:35px;
  }
  .order-header {
    background:#ececec; padding:18px 25px;
    display:flex; justify-content:space-between; align-items:center;
    border-radius:4px;
  }
  .order-data {
    display:flex; gap:70px;
  }
  .order-data small {
    display:block; font-size:11px; color:#777; margin-bottom:4px; text-transform:uppercase;
  }
  .order-data strong {
    font-size:14px; font-weight:600;
  }
  .order-buttons {
    display:flex; gap:10px;
  }
  .order-buttons button {
    background:#ffcc00; border:none; padding:10px 18px; font-size:12px;
    font-weight:600; border-radius:4px; cursor:pointer;
  }

  .order-item {
    display:flex; align-items:flex-start; gap:20px;
    padding:25px 0; border-bottom:1px solid #ddd;
  }
  .order-item:last-child { border-bottom:none; }
  .order-item img {
    width:95px; height:95px; object-fit:cover; border-radius:3px;
  }
  .item-info { flex:1; }
  .item-info h3 { font-size:17px; margin-bottom:3px; }
  .item-info p, .item-info span { font-size:13px; color:#666; display:block; }
  .links { margin:12px 0; display:flex; gap:20px; }
  .links a { text-decoration:none; font-size:12px; color:#d8aa00; }
  .link-btn {
    background:none; border:none; color:#d8aa00; font-size:12px;
    text-decoration:underline; cursor:pointer; padding:0;
  }
  .price { font-size:15px; font-weight:600; min-width:100px; text-align:right; }
  .status { font-size:13px; margin-top:10px; }
  .success { color:#4caf50; }

  .pagination {
    display:flex; justify-content:space-between; align-items:center; margin:30px 0;
  }
  .pagination button {
    width:100px; height:40px; background:#ffcc00; border:none;
    border-radius:4px; font-weight:600; cursor:pointer;
  }
  .pagination button:disabled { opacity:0.5; cursor:not-allowed; }
  .pages { display:flex; gap:8px; }
  .pages span {
    width:35px; height:35px; display:flex; justify-content:center;
    align-items:center; background:white; border:1px solid #ddd;
    border-radius:4px; cursor:pointer;
  }
  .active-page {
    background:#ffcc00 !important; border:none !important;
  }

  @media(max-width:900px) {
    .order-header { flex-direction:column; gap:20px; align-items:flex-start; }
    .order-data { flex-wrap:wrap; gap:30px; }
    .order-item { flex-direction:column; }
    .price { text-align:left; }
  }
  @media(max-width:700px) {
    .history-container { padding:0 15px; }
    .pagination { flex-direction:column; gap:15px; }
  }
</style>