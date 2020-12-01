export default {
    path: '/cinema/:cinemaId/film/:filmId?/:timestamp?',
    component: () => import('@/views/Cinema/cinePleX'),
}