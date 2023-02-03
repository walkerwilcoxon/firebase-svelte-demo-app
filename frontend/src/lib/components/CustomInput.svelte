<script lang="ts">
  // This is a custom component that can be reused in any route or component

  // Import the components from flowbite-svelte
  import { Helper, Input, Label } from 'flowbite-svelte'
  import type { InputType } from 'flowbite-svelte/types'

  // Props that can be passed to the component, which are passed down to the flowbite-svelte components
  export let id = ''
  export let type: InputType = 'text'
  export let placeholder = ''
  export let label = ''
  export let value = ''
  export let error = ''
  export let disabled = false
</script>

<div class="my-3">
  <Label class="my-2" for={id}>{label}</Label>
  <Input
    {id}
    {type}
    {placeholder}
    {disabled}
    bind:value
  />
  {#if error}
    <Helper color="red">{error}</Helper>
  {/if}
</div>
