import Vue from 'vue';
import Router from 'vue-router';
import Funcionarios from './Funcionario/funcionarios';
import Setores from './Setor/setores';

Vue.use(Router);

export default new Router({
    mode:history,
    process:process.env.BASE_URL,
    routes: [
        {

        path: '/',
        name: 'funcionarios',
        component: Funcionarios,
        },
        {
        path: '/',
        name: 'setores',
        component: Setores
        }
    ],
});