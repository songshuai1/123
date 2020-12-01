export default {
    path: '/film',
    component: () => import('@/views/Film/film'),
    redirect: '/film/nowPlaying',
    children: [
        {
            path: 'nowPlaying',
            component: () => import('@/views/Film/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/views/Film/ComingSoon')
        }
    ]
}