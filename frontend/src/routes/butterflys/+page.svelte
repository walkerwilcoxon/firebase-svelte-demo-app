<script lang="ts">
  import {
    Card,
    Table,
    Heading,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
    Button,
  } from 'flowbite-svelte'
  import { butterflyCollection, type Butterfly } from '$lib/firebase'
  import { deleteDoc, doc, onSnapshot, query, setDoc } from 'firebase/firestore'
  import CustomInput from '$lib/components/CustomInput.svelte'
  let butterflies: Butterfly[] = []

  // onSnapshot listens for changes to the collection to update the butterfly list
  // it also queries the collection once when called to populate the list
  onSnapshot(query(butterflyCollection), (snapshot) => {
    butterflies = snapshot.docs.map((doc) => doc.data() as Butterfly)
  })

  // Add butterfly data
  let scientificName: string = ''
  let commonName: string = ''
</script>

<Card size="xl">
  <Heading>Butterflies</Heading>

  <Table>
    <TableHead>
        <TableHeadCell>Scientific Name</TableHeadCell>
        <TableHeadCell>Common Name</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each butterflies as butterfly}
        <TableBodyRow>
          <TableBodyCell>{butterfly.scientificName}</TableBodyCell>
          <TableBodyCell>{butterfly.commonName}</TableBodyCell>
          <TableBodyCell>
            <Button
                class="h-10 "
                on:click={() => {
                    deleteDoc(doc(butterflyCollection, butterfly.scientificName))
                }}
            >Delete</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <div class="flex items-center">
    <CustomInput
      label="Scientific Name"
      placeholder="Scientific Name"
      type="text"
      bind:value={scientificName}
    />
    <CustomInput
      label="Common Name"
      placeholder="Common Name"
      type="text"
      bind:value={commonName}
    />
    <Button
    class="h-10 "
      on:click={() => {
        setDoc(doc(butterflyCollection, scientificName), {
          scientificName,
          commonName,
        })
      }}
    > Add Butterfly</Button>
  </div>
</Card>
