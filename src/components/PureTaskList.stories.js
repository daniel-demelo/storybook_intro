import PureTaskList from './PureTaskList.svelte';
import MarginDecorator from './MarginDecorator.svelte';

import * as TaskStories from './Task.stories';

export default {
  component: PureTaskList,
  //👇 The auxiliary component will be added as a decorator to help show the UI correctly
  decorators: [() => MarginDecorator],
  title: 'PureTaskList',
  argTypes: {
    onPinTask: { action: 'onPinTask' },
    onArchiveTask: { action: 'onArchiveTask' },
  },
};

const Template = args => ({
  Component: PureTaskList,
  props: args,
  on: {
    ...TaskStories.actionsData,
  },
});
export const Default = Template.bind({});
Default.args = {
  // Shaping the stories through args composition.
  // The data was inherited from the Default story in task.stories.js.
  tasks: Array.from({length: 6}, (v,i)=>({ ...TaskStories.Default.args.task, id: i, title: 'Task '+i })),
};

export const WithPinnedTasks = Template.bind({});
WithPinnedTasks.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Default story.
  tasks: [
    ...Default.args.tasks.slice(0, 5),
    { ...TaskStories.Pinned.args.task, id: '6', title: 'Task 6 (pinned)' },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  tasks: [],
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  // Shaping the stories through args composition.
  // Inherited data coming from the Loading story.
  ...Loading.args,
  loading: false,
};
