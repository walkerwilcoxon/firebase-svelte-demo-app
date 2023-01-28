<script lang="ts">
  // This is a layout file, which means it's not a route in itself but rather a wrapper for other routes
  import '../app.css'
  import { Navbar, FooterCopyright } from 'flowbite-svelte'
  import { auth, user } from '$lib/firebase'
</script>

<!-- Tailwindcss is a very useful library for styling that creates a bunch of utility classes 
  to make it easier to edit the styling of components. 
  The styling of the following div is equivalent to the following css:
  {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
  }
-->
<div class="flex min-h-screen flex-col items-center">
  <Navbar color="none" class="bg-green-400 font-semibold text-white">
    <a href="/">
      <img
        class="m-3 rounded-lg"
        src="https://www.reimangardens.com/wp-content/themes/reiman/images/logo.png"
        alt="Quote Connects"
        height="45"
        width="100"
      />
    </a>
    <!-- Can conditionally display different content based on variables using if/else blocks as follows -->
    {#if $user == null}
      <a href="/signup?signupToken=2413fb3709b05939" class="mx-3 hover:text-blue-700">
        <span class="p-4">Create Account</span>
      </a>
      <a href="/login" class="text-gray-800 mx-3 hover:text-blue-700">
        <span class="p-4">Log In</span>
      </a>
    {:else}
      <a href="/shipments" class="mx-3 hover:text-blue-700">
        <span class="p-4">Shipments</span>
      </a>
      <a href="/butterflys" class="mx-3 hover:text-blue-700">
        <span class="p-4">Butterflys</span>
      </a>
      <button class="mx-3 hover:text-blue-700" on:click={() => auth?.signOut()}>
        <span class="p-4">Log out of {$user.email}</span>
      </button>
    {/if}
  </Navbar>
  <main class="min-h-fit flex-1 py-12">
    <slot />
  </main>
  <FooterCopyright
    class="w-full bg-green-400 py-3 text-white"
    year={new Date().getFullYear()}
    by="Reiman Gardens"
  />
</div>
