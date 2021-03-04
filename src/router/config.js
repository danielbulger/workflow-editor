import {DefaultLayout, EditorLayout} from '@/components/layouts';
import Overview from '@/dashboard/Overview.vue';
import EditorView from '@/editor/Editor.vue';

export const publicRoutes = [];

export const privateRoutes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: Overview,
      },
    ],
  },
  {
    path: '/editor',
    component: EditorLayout,
    children: [
      {
        path: ':id',
        component: EditorView,
        props: true,
      },
    ],
  },
];