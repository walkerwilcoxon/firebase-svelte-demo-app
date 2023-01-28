<script lang="ts">
  import { Button, Card, Spinner } from 'flowbite-svelte'
  import { signUpUser } from '$lib/firebase'
  import CustomInput from '$lib/components/CustomInput.svelte'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  let email = ''
  let password = ''
  let confirmPassword = ''
  let confirmPasswordError = ''

  function handleSignUp() {
    // Retreive the signupToken from the URL query params (this would be sent in the email)
    let signupToken = $page.url.searchParams.get('signupToken')!
    if (password !== confirmPassword) {
      confirmPasswordError = 'Passwords do not match'
      return
    }
    signUpUser({ email, password, signupToken })
    goto('/login')
  }
</script>

<svelte:head>
  <title>Sign Up</title>
</svelte:head>

<div class="h-full w-96 px-4">
  <div class="w-full px-4">
    <Card size="md" class="px-4 py-10 pt-0 lg:px-10">
      <div class="my-3 text-center ">
        <h6 class="text-blueGray-500 text-sm font-bold">Sign Up</h6>
      </div>
      <form>
        <CustomInput
          id="email"
          label="Email"
          placeholder="johnsmith@gmail.com"
          bind:value={email}
        />
        <CustomInput
          id="password"
          label="Password"
          placeholder="*****"
          type="password"
          bind:value={password}
          error={confirmPasswordError}
        />
        <CustomInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="*****"
          type="password"
          bind:value={confirmPassword}
        />
        <Button on:click={handleSignUp}>
          Sign Up
        </Button>
      </form>
    </Card>
  </div>
</div>
