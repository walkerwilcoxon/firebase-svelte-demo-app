<script lang="ts">
  import { goto } from '$app/navigation'
  import { Button, Card, Checkbox } from 'flowbite-svelte'
  import { signInWithEmailAndPassword } from 'firebase/auth'

  import { auth } from '$lib/firebase'
  import CustomInput from '$lib/components/CustomInput.svelte'

  let email = ''
  let password = ''
  let rememberMe = false
  let errorMessage = ''
  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        goto('/')
      })
      .catch((error) => {
        errorMessage = error.message
      })
  }

</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<Card size="lg" class="w-96 px-4 py-10 pt-0 lg:px-10">
  <div class="my-3 text-center ">
    <h6 class="text-blueGray-500 text-sm font-bold">Sign in</h6>
  </div>
  <form>
    <CustomInput
      id="email"
      type="email"
      label="Email"
      placeholder="johnsmith@gmail.com"
      bind:value={email}
    />
    <CustomInput
      id="password"
      type="password"
      label="Password"
      placeholder="*******"
      bind:value={password}
    />
    <Checkbox id="rememberMe" bind:checked={rememberMe}>
      Remember me
    </Checkbox>
    <Button on:click={handleLogin}>
      Sign In
    </Button>
    {#if errorMessage}
      <div class="text-red-500 text-sm">{errorMessage}</div>
    {/if}
  </form>
</Card>