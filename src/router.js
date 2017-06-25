const routers = [{
    path: '/',
    meta: {
        title: '主页'
    },
    component: (resolve) => require(['./views/index.vue'], resolve),
    children: [
        {
            path: 'add',
            name: 'bot-add',
            component: resolve => require(['./views/bot-add.vue'], resolve)
        }, {
            path: ':bot',
            name: 'bot-main',
            component: resolve => require(['./views/bot.vue'], resolve),
            children: [
                {
                    path: 'info',
                    name: 'bot-info',
                    component: resolve => require(['./views/bot-info.vue'], resolve)
                }, {
                    path: 'messages',
                    name: 'bot-messages',
                    component: resolve => require(['./views/bot-messages.vue'], resolve)
                }, {
                    path: 'friends',
                    name: 'bot-friends',
                    component: resolve => require(['./views/bot-friends.vue'], resolve)
                }, {
                    path: 'groups',
                    name: 'bot-groups',
                    component: resolve => require(['./views/bot-groups.vue'], resolve)
                }, {
                    path: 'mps',
                    name: 'bot-mps',
                    component: resolve => require(['./views/bot-mps.vue'], resolve)
                }, {
                    path: 'articles',
                    name: 'bot-articles',
                    component: resolve => require(['./views/bot-articles.vue'], resolve)
                }
            ]
        }
    ]
}];
export default routers;