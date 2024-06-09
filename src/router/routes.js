import MainLayout from 'layouts/MainLayout.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';
import ConnectLayout from 'layouts/ConnectLayout.vue';
import ReceivePage from 'pages/ReceivePage.vue';
import BalancePage from 'pages/BalancePage.vue';
import TransactionsPage from 'pages/TransactionsPage.vue';
import SentPage from 'pages/SentPage.vue';
import TestPage from 'pages/testPage.vue'
import ConnectPage from 'pages/ConnectPage.vue';
const routes = [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', component: ConnectPage, name: 'Connect' },
      { path: 'dashboard', component: BalancePage, name: 'Dashboard' },
      { path: 'receive', component: ReceivePage, name: 'Receive' },
      { path: 'balance', component: BalancePage, name: 'Balance' },
      { path: 'transactions', component: TransactionsPage, name: 'Transactions' },
      {path: 'send', component: SentPage, name: 'Send' },
      {path: 'test', component: TestPage, name: 'Test'}
    ]
  },
  /*{
    path: '/connect',
    component: ConnectLayout,
    meta: { requiresAuth: true },
    children: [{ path: '', component: ConnectPage, name: 'Connect' }],
  },*/
  { path: '/:catchAll(.*)*', component: ErrorNotFound },
]

export default routes
