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
    Datepicker,
    Label,
  } from 'flowbite-svelte'
  import { onMount } from 'svelte'
  import { butterflyCollection, shipmentCollection, type Butterfly, type Shipment } from '$lib/firebase'
  import { addDoc, deleteDoc, doc, getDocs, onSnapshot, Query, query, setDoc } from 'firebase/firestore'
  import CustomInput from '$lib/components/CustomInput.svelte'
  let shipments: Shipment[] = []

  // Fetch shipment data and listen for changes
  onSnapshot(query(shipmentCollection), (snapshot) => {
    shipments = snapshot.docs.map((doc) => doc.data() as Shipment)
  })

  // Shipment data variables for adding a new shipment

  let supplier: string = ''
  let departDate: string = ''
  let arrivalDate: string = ''
  let numberOfButterflies: string = ''
</script>

<Card size="xl">
  <Heading>Shipments</Heading>

  <Table>
    <TableHead>
        <TableHeadCell>Shipment ID</TableHeadCell>
        <TableHeadCell>Supplier</TableHeadCell>
        <TableHeadCell>Depart Date</TableHeadCell>
        <TableHeadCell>Arrival Date</TableHeadCell>
        <TableHeadCell>Number of Butterflies</TableHeadCell>
    </TableHead>
    <TableBody tableBodyClass="divide-y">
      {#each shipments as shipment}
        <TableBodyRow>
          <TableBodyCell>{shipment.id}</TableBodyCell>
          <TableBodyCell>{new Date(shipment.departureDate).toLocaleDateString()}</TableBodyCell>
          <TableBodyCell>{new Date(shipment.arrivalDate).toLocaleDateString()}</TableBodyCell>
          <TableBodyCell>{shipment.numberOfButterflies}</TableBodyCell>
          <TableBodyCell>
            <Button
                class="h-10 "
                on:click={() => {
                    deleteDoc(doc(shipmentCollection, shipment.id))
                }}
            >Delete</Button>
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  <div class="flex items-center">
    <CustomInput
      label="Supplier"
      placeholder="Supplier"
      type="text"
      bind:value={supplier}
    />
    <CustomInput
      label="Depart Date"
      placeholder="Depart Date"
      type="date"
      bind:value={departDate}
    />
    <CustomInput
      label="Arrival Date"
      placeholder="Arrival Date"
      type="date"
      bind:value={arrivalDate}  
    />
    <CustomInput
      label="Number of Butterflies"
      placeholder="Number of Butterflies"
      type="number"
      bind:value={numberOfButterflies}
    />
    <Button
      class="h-10 "
      on:click={() => {
        // Generate random shipment ID
          const shipmentId = Math.random().toString(36).replace('0.', '')
        setDoc(doc(shipmentCollection, shipmentId), {
          id: shipmentId,
          departureDate: new Date(departDate).getTime(),
          arrivalDate: new Date(arrivalDate).getTime(),
          numberOfButterflies: +numberOfButterflies,
        })
      }}
    > Add Shipment</Button>
  </div>
</Card>
