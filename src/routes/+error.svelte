<script>
  import { page } from '$app/stores'
</script>

<h1>{JSON.stringify($page.error?.message)}</h1>

<section class="m-5">
  <h1>Page not found</h1>
  <p>
    Please check the URL or return to the <a href="/">homepage</a>
  </p>
</section>
