<script>
  import Task from "./Task.svelte";
  import LoadingRow from './LoadingRow.svelte';
  export let loading = false;
  export let tasks = [];

  //👇 Reactive declarations (computed prop in other frameworks)
  $: noTasks = tasks.length === 0;
  $: emptyTasks = noTasks && !loading;
  $: tasksInOrder = [
    ...tasks.filter(t => t.state === 'TASK_PINNED'),
    ...tasks.filter(t => t.state !== 'TASK_PINNED'),
  ];
</script>

{#if loading}
<div class="list-items">
  {#each Array(5) as _}
  <LoadingRow />
  {/each}
</div>
{:else if emptyTasks}
<div class="list-items">
  <div class="wrapper-message">
    <span class="icon-check" />
    <div class="title-message">You have no tasks</div>
    <div class="subtitle-message">Sit back and relax</div>
  </div>
</div>
{:else}
  {#each tasksInOrder as task}
  <Task {task} on:onPinTask on:onArchiveTask />
  {/each}
{/if}
