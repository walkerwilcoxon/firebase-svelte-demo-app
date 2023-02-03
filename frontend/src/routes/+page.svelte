<script lang="ts">
  // This is the home page for the app
  // Other pages are found in the other folders in the routes folder, such as src\routes\signup\+page.svelte
  // Svelte automatically generates the routes for these pages based on the folder structure
  
  // Flowbite-svelte is a UI library that has many components that look good and are highly customizable through tailwindcss 
  import { P, Card, Heading } from 'flowbite-svelte'

  
</script>

<Card size="xl">
  <Heading>Reiman Gardens</Heading>

  <P>
    Create an account to view shipments and butterflies, 
    or log into the admin account to view and edit shipments and butterflies. 
    (the admin credentials are email: admin@reimangardens.org and password: password)
  </P>
</Card>